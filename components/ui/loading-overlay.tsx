"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicGlassProgressBar = dynamic(() => import("@/components/ui/GlassProgressBar"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full max-w-[600px] justify-center">
      <div className="h-[4px] w-full max-w-[400px] overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-slate-500" />
      </div>
    </div>
  ),
});

interface LoadingOverlayProps {
  target?: number;
  duration?: number;
}

export default function LoadingOverlay({ target = 100, duration = 6000 }: LoadingOverlayProps) {
  return (
    <div className="flex w-full justify-center">
      <Suspense>
        <DynamicGlassProgressBar initialPercentage={0} targetPercentage={target} duration={duration} />
      </Suspense>
    </div>
  );
}
