"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const JellyProgressBar = dynamic(() => import("@/components/ui/jelly-progress-bar"), {
  ssr: false,
  loading: () => (
    <div className="h-56 w-full max-w-3xl rounded-3xl bg-slate-900/60" />
  ),
});

const SESSION_KEY = "glass_preloader_seen";
const FALLBACK_TIMEOUT = 10000;
const LOADER_DURATION = 6000;

function useSessionFlag(key: string) {
  const isClient = typeof window !== "undefined";

  const read = () => {
    if (!isClient) return false;
    try {
      return window.sessionStorage.getItem(key) === "true";
    } catch {
      return false;
    }
  };

  const write = (value: boolean) => {
    if (!isClient) return;
    try {
      window.sessionStorage.setItem(key, value ? "true" : "false");
    } catch {
      /* ignore */
    }
  };

  return { read, write };
}

export default function PreloaderClamp() {
  const { read, write } = useSessionFlag(SESSION_KEY);
  const [active, setActive] = useState(() => !read());
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number>();

  const finish = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
    write(true);
    setActive(false);
  }, [write]);

  useEffect(() => {
    if (!active) {
      return;
    }

    setProgress(0);
    const start = performance.now();

    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const ratio = Math.min(elapsed / LOADER_DURATION, 1);
      const newProgress = Math.round(ratio * 100);
      console.log('[PreloaderClamp] Setting progress:', newProgress, 'elapsed:', elapsed);
      setProgress(newProgress);

      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    timeoutRef.current = setTimeout(finish, FALLBACK_TIMEOUT);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };
  }, [active, finish]);

  if (!active) {
    return null;
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="jelly-preloader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="relative flex w-full max-w-4xl flex-col items-center px-6">
            <motion.div
              className="mb-10 text-sm uppercase tracking-[0.45em] text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Baslatiliyor
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-full"
            >
              <JellyProgressBar progress={progress} />
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={finish}
            className="mt-10 rounded-full border border-slate-700/50 px-5 py-2 text-xs uppercase tracking-[0.3em] text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
