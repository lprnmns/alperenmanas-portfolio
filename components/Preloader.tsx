"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "preloader_seen";
const FALLBACK_TIMEOUT = 12000; // 12s safety timeout

function useSafeSessionStorage(key: string) {
  const isClient = typeof window !== "undefined";

  const getValue = () => {
    if (!isClient) {
      return false;
    }

    try {
      return window.sessionStorage.getItem(key) === "true";
    } catch (error) {
      console.warn("sessionStorage read failed", error);
      return false;
    }
  };

  const setValue = (value: boolean) => {
    if (!isClient) {
      return;
    }

    try {
      window.sessionStorage.setItem(key, value ? "true" : "false");
    } catch (error) {
      console.warn("sessionStorage write failed", error);
    }
  };

  return { getValue, setValue };
}

export default function Preloader() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { getValue, setValue } = useSafeSessionStorage(SESSION_KEY);
  const [show, setShow] = useState(() => !getValue());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) {
      return undefined;
    }

    timeoutRef.current = setTimeout(() => {
      finish();
    }, FALLBACK_TIMEOUT);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const finish = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setValue(true);
    setShow(false);
  };

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (!videoEl || Number.isNaN(videoEl.duration) || videoEl.duration === 0) {
      return;
    }

    const currentProgress = Math.min((videoEl.currentTime / videoEl.duration) * 100, 100);
    setProgress(currentProgress);
  };

  if (!show) {
    return null;
  }

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="relative w-full max-w-3xl px-6">
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src="/videos/intro.mp4"
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={finish}
                onError={finish}
              />
            </div>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                ref={progressRef}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.4em] text-slate-400">
            Yükleniyor
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
