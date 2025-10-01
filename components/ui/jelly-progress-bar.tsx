"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface JellyProgressBarProps {
  progress?: number;
  className?: string;
}

interface BeamData {
  compressedLength: number;
  amplitude: number;
  oscillation: number;
  startX: number;
  endX: number;
  midStart: number;
  midEnd: number;
  midLength: number;
}

interface CrossSectionPoint {
  y: number;
  z: number;
}

interface JellyPhysics {
  wobblePhase: number;
  wobbleAmplitude: number;
  lastTimestamp: number;
}

// Beam configuration (constant)
const beamConfig = {
  beamTotalLength: 3.85,
  beamThicknessY: 0.1,
  beamThicknessZ: 0.5,
  beamSegmentCount: 80,
  maxCompressionRatio: 0.8,
  minLengthRatio: 0.2,
  bucklingAmplitudeGain: 0.55,
  flatEndLeft: 0.20,
  flatEndRight: 0.20,
  transitionSmoothness: 0.18,
  wobbleDamping: 2.0,
  wobbleFrequency: 2.5,
  lateralWobbleGain: 0.4,
};

export default function JellyProgressBar({ progress = 0, className = "" }: JellyProgressBarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const beamNodeRef = useRef<THREE.Group | null>(null);
  const currentCompressionRef = useRef(0);
  const jellyPhysicsRef = useRef<JellyPhysics>({
    wobblePhase: 0,
    wobbleAmplitude: 0,
    lastTimestamp: 0,
  });

  const [displayProgress, setDisplayProgress] = useState(() => Math.round(Math.max(0, Math.min(100, progress))));

  const calculateBeamParameters = useCallback((compression: number, physics: JellyPhysics): BeamData => {
    const compressedLength = Math.max(
      beamConfig.beamTotalLength - compression,
      beamConfig.beamTotalLength * beamConfig.minLengthRatio
    );

    const baseAmplitude = beamConfig.bucklingAmplitudeGain * compression;
    const oscillation = Math.sin(physics.wobblePhase);
    const amplitude = baseAmplitude * (1 + 0.25 * physics.wobbleAmplitude * oscillation);

    const startX = -beamConfig.beamTotalLength / 2;
    const endX = startX + compressedLength;

    const clampedLeft = Math.min(beamConfig.flatEndLeft, compressedLength * 0.49);
    const clampedRight = Math.min(beamConfig.flatEndRight, compressedLength * 0.49);

    const midStart = startX + clampedLeft;
    const midEnd = endX - clampedRight;
    const midLength = Math.max(0.0001, midEnd - midStart);

    return { compressedLength, amplitude, oscillation, startX, endX, midStart, midEnd, midLength };
  }, []);

  const calculateBeamDeflection = useCallback((x: number, beamData: BeamData) => {
    let y = 0, dydx = 0, lateral = 0;

    if (x >= beamData.midStart && x <= beamData.midEnd) {
      const t = (x - beamData.midStart) / beamData.midLength;
      lateral = beamConfig.lateralWobbleGain * jellyPhysicsRef.current.wobbleAmplitude *
                beamData.oscillation * Math.sin(Math.PI * t) * 1.01;

      const asymmetryFactor = 1.0 - t * 0.9;
      const ys = beamData.amplitude * Math.sin(Math.PI * t) * asymmetryFactor;
      const dysdx = beamData.amplitude * Math.PI / beamData.midLength * Math.cos(Math.PI * t) * asymmetryFactor;

      const transitionWidth = Math.max(0.0001, Math.min(beamConfig.transitionSmoothness, beamData.midLength * 0.49));

      const smoothStep = (u: number) => {
        const v = Math.max(0, Math.min(1, u));
        return v * v * (3 - 2 * v);
      };

      const smoothStepDerivative = (u: number) => {
        const v = Math.max(0, Math.min(1, u));
        return 6 * v * (1 - v);
      };

      const uLeft = (x - beamData.midStart) / transitionWidth;
      const uRight = (beamData.midEnd - x) / transitionWidth;
      const leftBlend = smoothStep(uLeft);
      const rightBlend = smoothStep(uRight);
      const leftDeriv = smoothStepDerivative(uLeft) / transitionWidth;
      const rightDeriv = -smoothStepDerivative(uRight) / transitionWidth;

      const blend = leftBlend * rightBlend;
      const blendDeriv = leftDeriv * rightBlend + leftBlend * rightDeriv;

      y = blend * ys;
      dydx = blend * dysdx + blendDeriv * ys;
    }

    return { y, dydx, lateral };
  }, []);

  const createBeamGeometry = useCallback((beamData: BeamData): THREE.BufferGeometry => {
    const positions: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    // Cross section (rounded rectangle)
    const crossSection: CrossSectionPoint[] = [];
    const cornerSegments = 8;
    const radius = Math.min(beamConfig.beamThicknessY / 2, beamConfig.beamThicknessZ / 2);

    const addArc = (centerY: number, centerZ: number, startAngle: number, endAngle: number) => {
      for (let i = 0; i <= cornerSegments; i++) {
        const t = i / cornerSegments;
        const angle = startAngle + (endAngle - startAngle) * t;
        crossSection.push({
          y: centerY + radius * Math.cos(angle),
          z: centerZ + radius * Math.sin(angle),
        });
      }
    };

    addArc(beamConfig.beamThicknessY/2 - radius, beamConfig.beamThicknessZ/2 - radius, 0, Math.PI/2);
    addArc(-beamConfig.beamThicknessY/2 + radius, beamConfig.beamThicknessZ/2 - radius, Math.PI/2, Math.PI);
    addArc(-beamConfig.beamThicknessY/2 + radius, -beamConfig.beamThicknessZ/2 + radius, Math.PI, 3*Math.PI/2);
    addArc(beamConfig.beamThicknessY/2 - radius, -beamConfig.beamThicknessZ/2 + radius, 3*Math.PI/2, 2*Math.PI);

    // Generate vertices
    for (let i = 0; i < beamConfig.beamSegmentCount; i++) {
      const t = i / (beamConfig.beamSegmentCount - 1);
      const x = beamData.startX + t * beamData.compressedLength;

      const { y, dydx, lateral } = calculateBeamDeflection(x, beamData);

      const theta = Math.atan(dydx);
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      // Color gradient: white -> orange
      let color;
      if (t <= 0.5) {
        const u = t / 0.5;
        color = { r: 1.0, g: 1.0 - 0.65 * u, b: 1.0 - 1.0 * u };
      } else {
        color = { r: 1.0, g: 0.35, b: 0.0 };
      }

      for (const point of crossSection) {
        const worldX = x + lateral + (-sinTheta) * point.y;
        const worldY = y + cosTheta * point.y;
        const worldZ = point.z;

        positions.push(worldX, worldY, worldZ);
        colors.push(color.r, color.g, color.b);
      }
    }

    // Generate indices for body
    const crossSectionCount = crossSection.length;
    for (let i = 0; i < beamConfig.beamSegmentCount - 1; i++) {
      const baseA = i * crossSectionCount;
      const baseB = (i + 1) * crossSectionCount;

      for (let j = 0; j < crossSectionCount; j++) {
        const nextJ = (j + 1) % crossSectionCount;
        indices.push(baseA + j, baseB + j, baseB + nextJ);
        indices.push(baseA + j, baseB + nextJ, baseA + nextJ);
      }
    }

    // Add rounded end caps
    const firstRingBase = 0;
    const lastRingBase = (beamConfig.beamSegmentCount - 1) * crossSectionCount;
    const capLayers = 5;

    // First end cap
    const firstCapBaseIdx = positions.length / 3;
    let firstCenterX = 0, firstCenterY = 0, firstCenterZ = 0;
    for (let j = 0; j < crossSectionCount; j++) {
      const idx = firstRingBase + j;
      firstCenterX += positions[idx * 3];
      firstCenterY += positions[idx * 3 + 1];
      firstCenterZ += positions[idx * 3 + 2];
    }
    firstCenterX /= crossSectionCount;
    firstCenterY /= crossSectionCount;
    firstCenterZ /= crossSectionCount;

    for (let layer = 1; layer <= capLayers; layer++) {
      const layerT = layer / capLayers;
      const hemisphereAngle = layerT * Math.PI / 2;
      const radiusScale = Math.cos(hemisphereAngle);
      const depthOffset = -Math.sin(hemisphereAngle) * Math.min(beamConfig.beamThicknessY, beamConfig.beamThicknessZ) * 0.45;

      const capColorT = Math.max(0, layerT * 0.15);
      const capColor = {
        r: 1.0,
        g: 1.0 - 0.65 * capColorT,
        b: 1.0 - 1.0 * capColorT
      };

      for (let j = 0; j < crossSectionCount; j++) {
        const idx = firstRingBase + j;
        const origX = positions[idx * 3];
        const origY = positions[idx * 3 + 1];
        const origZ = positions[idx * 3 + 2];

        const scaledY = firstCenterY + (origY - firstCenterY) * radiusScale;
        const scaledZ = firstCenterZ + (origZ - firstCenterZ) * radiusScale;

        positions.push(origX + depthOffset, scaledY, scaledZ);
        colors.push(capColor.r, capColor.g, capColor.b);
      }
    }

    const firstTipIdx = positions.length / 3;
    const firstTipOffset = -Math.min(beamConfig.beamThicknessY, beamConfig.beamThicknessZ) * 0.45;
    positions.push(firstCenterX + firstTipOffset, firstCenterY, firstCenterZ);
    const tipColorT = 0.15;
    colors.push(1.0, 1.0 - 0.65 * tipColorT, 1.0 - 1.0 * tipColorT);

    for (let layer = 0; layer < capLayers; layer++) {
      const currentBase = layer === 0 ? firstRingBase : firstCapBaseIdx + (layer - 1) * crossSectionCount;
      const nextBase = layer === capLayers - 1 ? firstTipIdx : firstCapBaseIdx + layer * crossSectionCount;
      const isLastLayer = layer === capLayers - 1;

      for (let j = 0; j < crossSectionCount; j++) {
        const nextJ = (j + 1) % crossSectionCount;

        if (isLastLayer) {
          indices.push(currentBase + nextJ, nextBase, currentBase + j);
        } else {
          indices.push(currentBase + nextJ, nextBase + j, currentBase + j);
          indices.push(currentBase + nextJ, nextBase + nextJ, nextBase + j);
        }
      }
    }

    // Last end cap
    const lastCapBaseIdx = positions.length / 3;
    let lastCenterX = 0, lastCenterY = 0, lastCenterZ = 0;
    for (let j = 0; j < crossSectionCount; j++) {
      const idx = lastRingBase + j;
      lastCenterX += positions[idx * 3];
      lastCenterY += positions[idx * 3 + 1];
      lastCenterZ += positions[idx * 3 + 2];
    }
    lastCenterX /= crossSectionCount;
    lastCenterY /= crossSectionCount;
    lastCenterZ /= crossSectionCount;

    for (let layer = 1; layer <= capLayers; layer++) {
      const layerT = layer / capLayers;
      const hemisphereAngle = layerT * Math.PI / 2;
      const radiusScale = Math.cos(hemisphereAngle);
      const depthOffset = Math.sin(hemisphereAngle) * Math.min(beamConfig.beamThicknessY, beamConfig.beamThicknessZ) * 0.45;

      const capColor = { r: 1.0, g: 0.35, b: 0.0 };

      for (let j = 0; j < crossSectionCount; j++) {
        const idx = lastRingBase + j;
        const origX = positions[idx * 3];
        const origY = positions[idx * 3 + 1];
        const origZ = positions[idx * 3 + 2];

        const scaledY = lastCenterY + (origY - lastCenterY) * radiusScale;
        const scaledZ = lastCenterZ + (origZ - lastCenterZ) * radiusScale;

        positions.push(origX + depthOffset, scaledY, scaledZ);
        colors.push(capColor.r, capColor.g, capColor.b);
      }
    }

    const lastTipIdx = positions.length / 3;
    const lastTipOffset = Math.min(beamConfig.beamThicknessY, beamConfig.beamThicknessZ) * 0.45;
    positions.push(lastCenterX + lastTipOffset, lastCenterY, lastCenterZ);
    colors.push(1.0, 0.35, 0.0);

    for (let layer = 0; layer < capLayers; layer++) {
      const currentBase = layer === 0 ? lastRingBase : lastCapBaseIdx + (layer - 1) * crossSectionCount;
      const nextBase = layer === capLayers - 1 ? lastTipIdx : lastCapBaseIdx + layer * crossSectionCount;
      const isLastLayer = layer === capLayers - 1;

      for (let j = 0; j < crossSectionCount; j++) {
        const nextJ = (j + 1) % crossSectionCount;

        if (isLastLayer) {
          indices.push(currentBase + j, nextBase, currentBase + nextJ);
        } else {
          indices.push(currentBase + j, nextBase + j, currentBase + nextJ);
          indices.push(currentBase + nextJ, nextBase + j, nextBase + nextJ);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, [calculateBeamDeflection]);

  const updateBeamGeometry = useCallback(() => {
    if (!beamNodeRef.current) return;

    // Clear old geometry
    while (beamNodeRef.current.children.length > 0) {
      const child = beamNodeRef.current.children[0];
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
      beamNodeRef.current.remove(child);
    }

    const beamData = calculateBeamParameters(currentCompressionRef.current, jellyPhysicsRef.current);
    const geometry = createBeamGeometry(beamData);

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      metalness: 0.2,
      roughness: 0.35,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    beamNodeRef.current.add(mesh);
  }, [calculateBeamParameters, createBeamGeometry]);

  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    const compressionRatio = (100 - clampedProgress) / 100;
    currentCompressionRef.current = compressionRatio * beamConfig.beamTotalLength * beamConfig.maxCompressionRatio;
    setDisplayProgress(Math.round(clampedProgress));
  }, [progress]);

  // Separate effect to update geometry when beamNode is ready
  useEffect(() => {
    if (beamNodeRef.current && currentCompressionRef.current !== undefined) {
      updateBeamGeometry();

      // Move beam to the right as progress increases (visual feedback)
      const clampedProgress = Math.max(0, Math.min(100, progress));
      const offsetX = (clampedProgress / 100) * 1.5 - 0.75; // -0.75 to 0.75 range
      beamNodeRef.current.position.x = offsetX;
    }
  }, [progress, updateBeamGeometry]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 720;
    const height = container.clientHeight || 224; // h-56 = 224px

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const cameraRadius = 8;
    const cameraYawDegrees = 35;
    const cameraPitchDegrees = -25;
    const yaw = cameraYawDegrees * Math.PI / 180;
    const pitch = cameraPitchDegrees * Math.PI / 180;

    const x = cameraRadius * Math.cos(pitch) * Math.sin(yaw);
    const y = cameraRadius * Math.sin(pitch);
    const z = cameraRadius * Math.cos(pitch) * Math.cos(yaw);
    camera.position.set(x - 4, y + 8, z);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.sortObjects = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -beamConfig.beamThicknessY;
    floor.receiveShadow = true;
    scene.add(floor);

    // Beam
    const beamNode = new THREE.Group();
    scene.add(beamNode);
    beamNodeRef.current = beamNode;

    // Set initial compression
    const clampedProgress = Math.max(0, Math.min(100, progress));
    const compressionRatio = (100 - clampedProgress) / 100;
    currentCompressionRef.current = compressionRatio * beamConfig.beamTotalLength * beamConfig.maxCompressionRatio;

    updateBeamGeometry();

    // Animation
    const animate = (timestamp: number = 0) => {
      animationRef.current = requestAnimationFrame(animate);

      const physics = jellyPhysicsRef.current;
      if (physics.lastTimestamp === 0) {
        physics.lastTimestamp = timestamp;
      }
      const deltaTime = (timestamp - physics.lastTimestamp) / 1000;
      physics.lastTimestamp = timestamp;

      // Update wobble (only when wobble is active)
      if (physics.wobbleAmplitude > 0.0001) {
        physics.wobbleAmplitude = Math.max(0, physics.wobbleAmplitude * Math.exp(-beamConfig.wobbleDamping * deltaTime));
        physics.wobblePhase += 2 * Math.PI * beamConfig.wobbleFrequency * deltaTime;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const ref = containerRef.current;
      if (!ref || !cameraRef.current || !rendererRef.current) return;
      const newWidth = ref.clientWidth;
      const newHeight = ref.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className={`relative h-56 w-full select-none ${className}`} ref={containerRef}>
      <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-4xl font-light tracking-widest text-slate-300 drop-shadow-md">
        {displayProgress}%
      </div>
    </div>
  );
}
