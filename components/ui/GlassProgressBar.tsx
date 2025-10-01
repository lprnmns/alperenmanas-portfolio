"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import styles from "./GlassProgressBar.module.css";

interface GlassProgressBarProps {
  initialPercentage?: number;
  targetPercentage?: number;
  duration?: number;
}

export default function GlassProgressBar({
  initialPercentage = 0,
  targetPercentage = 100,
  duration = 6000,
}: GlassProgressBarProps) {
  const [percentage, setPercentage] = useState(initialPercentage);
  const requestRef = useRef<number>();
  const startRef = useRef<number>();
  const isDraggingRef = useRef(false);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const start = Math.max(Math.min(initialPercentage, 100), 0);
    const target = Math.max(Math.min(targetPercentage, 100), 0);

    const animate = (timestamp: number) => {
      if (!startRef.current) {
        startRef.current = timestamp;
      }

      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (target - start) * progress;
      setPercentage(Math.round(value));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      startRef.current = undefined;
    };
  }, [initialPercentage, targetPercentage, duration]);

  const updatePercentageFromEvent = (event: MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) {
      return;
    }

    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const nextValue = Math.min(Math.max((x / width) * 100, 0), 100);
    setPercentage(Math.round(nextValue));
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    updatePercentageFromEvent(event);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || event.buttons !== 1) {
      return;
    }
    updatePercentageFromEvent(event);
  };

  return (
    <div className={styles.container}>
      <div
        ref={progressBarRef}
        className={styles.progressBar}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.innerShadow} />
        <motion.div
          className={styles.progressFill}
          animate={{ width: percentage + '%' }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        >
          <div className={styles.handle} />
        </motion.div>
        <span className={styles.percentageText}>{percentage}%</span>
      </div>
    </div>
  );
}
