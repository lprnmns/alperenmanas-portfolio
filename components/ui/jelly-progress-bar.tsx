"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface JellyProgressBarProps {
  progress?: number;
  className?: string;
}

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

export default function JellyProgressBar({ progress = 0, className = "" }: JellyProgressBarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>();
  const targetRef = useRef(clamp(progress));
  const currentRef = useRef(clamp(progress));
  const [displayProgress, setDisplayProgress] = useState(() => Math.round(clamp(progress)));
  const displayRef = useRef(displayProgress);
  const draggingRef = useRef(false);

  const setProgressFromPointer = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const ratio = clamp(((clientX - rect.left) / rect.width) * 100);
    targetRef.current = ratio;
  }, []);

  useEffect(() => {
    targetRef.current = clamp(progress);
  }, [progress]);

  useEffect(() => {
    displayRef.current = displayProgress;
  }, [displayProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const width = container.clientWidth || 720;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
    directionalLight1.position.set(5, 5, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.set(2048, 2048);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffa836, 0.35);
    directionalLight2.position.set(-3, 1.5, 3);
    scene.add(directionalLight2);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
    rimLight.position.set(0, 0, -6);
    scene.add(rimLight);

    const jellyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff9500,
      metalness: 0.1,
      roughness: 0.35,
      transparent: true,
      opacity: 0.95,
      transmission: 0.1,
      thickness: 0.55,
      clearcoat: 0.25,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.1,
    });

    const jellyGeometry = new THREE.CapsuleGeometry(0.35, 1.8, 16, 32);
    const jelly = new THREE.Mesh(jellyGeometry, jellyMaterial);
    jelly.rotation.z = Math.PI / 2;
    jelly.castShadow = true;
    jelly.receiveShadow = true;
    scene.add(jelly);

    const barGeometry = new THREE.CapsuleGeometry(0.45, 5, 16, 32);
    const barMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe7e8ee,
      metalness: 0.08,
      roughness: 0.4,
      clearcoat: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.rotation.z = Math.PI / 2;
    bar.receiveShadow = true;
    scene.add(bar);

    const innerBarGeometry = new THREE.CapsuleGeometry(0.38, 4.8, 16, 32);
    const innerBarMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4d6e0,
      metalness: 0.12,
      roughness: 0.65,
      transparent: true,
      opacity: 0.35,
    });
    const innerBar = new THREE.Mesh(innerBarGeometry, innerBarMaterial);
    innerBar.rotation.z = Math.PI / 2;
    innerBar.position.z = -0.05;
    scene.add(innerBar);

    const cursorGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const cursorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.2,
      emissive: 0x404040,
      emissiveIntensity: 0.25,
    });
    const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
    cursor.position.set(0, 0.5, 0.5);
    jelly.add(cursor);

    const fingerGeometry = new THREE.ConeGeometry(0.08, 0.2, 8);
    const fingerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.2,
    });
    const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
    finger.position.set(0.1, -0.05, 0);
    finger.rotation.z = -Math.PI / 4;
    cursor.add(finger);

    const jellyPhysics = {
      velocity: 0,
      squash: 1,
      stretch: 1,
      targetSquash: 1,
      targetStretch: 1,
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) > 0.1) {
        currentRef.current += diff * 0.055;

        const targetX = -2.2 + (currentRef.current / 100) * 4.4;
        const currentX = jelly.position.x;
        const xDiff = targetX - currentX;

        jellyPhysics.velocity = xDiff * 0.18;
        const speed = Math.abs(jellyPhysics.velocity);
        jellyPhysics.targetStretch = 1 + speed * 2.4;
        jellyPhysics.targetSquash = 1 - speed * 0.6;

        jelly.position.x = currentX + jellyPhysics.velocity;
      } else {
        jellyPhysics.targetSquash = 1;
        jellyPhysics.targetStretch = 1;
      }

      jellyPhysics.squash += (jellyPhysics.targetSquash - jellyPhysics.squash) * 0.12;
      jellyPhysics.stretch += (jellyPhysics.targetStretch - jellyPhysics.stretch) * 0.12;

      jelly.scale.y = jellyPhysics.squash;
      jelly.scale.x = jellyPhysics.stretch;
      jelly.position.y = Math.sin(Date.now() * 0.002) * 0.05;
      jelly.rotation.z = Math.PI / 2 + Math.sin(Date.now() * 0.003) * 0.02;

      const rounded = Math.round(currentRef.current);
      if (rounded !== displayRef.current) {
        displayRef.current = rounded;
        setDisplayProgress(rounded);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const ref = containerRef.current;
      if (!ref) {
        return;
      }
      const newWidth = ref.clientWidth;
      const newHeight = ref.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      draggingRef.current = true;
      setProgressFromPointer(event.clientX);

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!draggingRef.current) {
          return;
        }
        setProgressFromPointer(moveEvent.clientX);
      };

      const handlePointerUp = () => {
        draggingRef.current = false;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp, { once: true });
    };

    window.addEventListener("resize", handleResize);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      jellyGeometry.dispose();
      jellyMaterial.dispose();
      barGeometry.dispose();
      barMaterial.dispose();
      innerBarGeometry.dispose();
      innerBarMaterial.dispose();
      cursorGeometry.dispose();
      cursorMaterial.dispose();
      fingerGeometry.dispose();
      fingerMaterial.dispose();
    };
  }, [setProgressFromPointer]);

  useEffect(() => {
    const handleBlur = () => {
      draggingRef.current = false;
    };

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
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
