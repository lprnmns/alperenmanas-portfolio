import clsx from 'clsx';

type LoadingStage = 'loading' | 'transition' | 'final';

type LoadingScreenProps = {
  progress: number;
  stage: LoadingStage;
};

export default function LoadingScreen({ progress, stage }: LoadingScreenProps) {
  const progressValue = Math.round(Math.min(Math.max(progress, 0), 100));

  const overlayClasses = clsx(
    'fixed inset-0 z-40 bg-slate-950/95 transition-opacity duration-700',
    stage === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
  );

  const logoWrapperClasses = clsx(
    'fixed z-50 flex items-center justify-center text-white font-semibold transition-all duration-700 ease-out',
    stage === 'loading'
      ? 'top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2'
      : 'top-6 left-6 h-16 w-16 translate-x-0 translate-y-0 sm:h-20 sm:w-20'
  );

  const logoTextClasses = clsx(
    'tracking-[0.5em] lowercase transition-all duration-700 ease-out',
    stage === 'loading' ? 'text-4xl sm:text-5xl' : 'text-base sm:text-lg tracking-[0.35em]'
  );

  const ringClasses = clsx(
    'absolute inset-0 rounded-full transition-all duration-700 ease-out',
    stage === 'final' ? 'border border-slate-500/70 bg-slate-900/90' : 'border border-transparent'
  );

  const ringStyle =
    stage === 'final'
      ? undefined
      : {
          background: `conic-gradient(#38bdf8 ${progressValue * 3.6}deg, rgba(148, 163, 184, 0.15) ${
            progressValue * 3.6
          }deg)`,
        };

  return (
    <>
      <div className={overlayClasses} />
      <div className={logoWrapperClasses}>
        <div className="relative flex h-full w-full items-center justify-center">
          <div className={ringClasses} style={ringStyle} />
          <div
            className={clsx(
              'absolute inset-[12%] flex items-center justify-center rounded-full bg-slate-950 shadow-[0_0_50px_rgba(56,189,248,0.35)] transition-all duration-700 ease-out',
              stage !== 'loading' && 'shadow-none'
            )}
          >
            <span className={logoTextClasses}>am</span>
          </div>
          {stage === 'loading' && (
            <span className="absolute -bottom-14 text-xs font-medium tracking-[0.35em] text-slate-300">
              {progressValue}%
            </span>
          )}
        </div>
      </div>
    </>
  );
}
