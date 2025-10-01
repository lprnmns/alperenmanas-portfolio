"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const LoadingOverlay = dynamic(() => import("@/components/ui/loading-overlay"), {
  ssr: false,
  loading: () => null,
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const finish = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    write(true);
    setActive(false);
  }, [write]);

  useEffect(() => {
    if (!active) return;

    timeoutRef.current = setTimeout(finish, Math.min(FALLBACK_TIMEOUT, LOADER_DURATION + 1000));

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
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
          key="glass-preloader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="relative flex w-full max-w-3xl flex-col items-center px-6">
            <motion.div
              className="mb-12 text-sm uppercase tracking-[0.35em] text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Baslatiliyor
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <LoadingOverlay target={100} duration={LOADER_DURATION} />
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={finish}
            className="mt-8 rounded-full border border-slate-700/50 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
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
