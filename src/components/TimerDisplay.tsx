interface TimerDisplayProps {
  minutes: string;
  seconds: string;
  milliseconds: string;
  isFinished: boolean;
}

const TimerDisplay = ({ minutes, seconds, milliseconds, isFinished }: TimerDisplayProps) => {
  return (
    <>
      <div className='text-center space-y-2'>
        <div className='rounded-lg p-6 border border-border/50'>
          <div className='text-8xl font-mono font-extrabold text-white grid grid-cols-3 gap-4'>
            <div className='p-2 border-r border-emerald-700'>{minutes}</div>
            <div className='p-2 border-r border-emerald-700'>{seconds}</div>
            <div className='p-2'>{milliseconds}</div>
          </div>
        </div>

        {isFinished && (
          <div className='text-destructive font-semibold text-lg animate-pulse'>🔔 Time's Up!</div>
        )}
      </div>
    </>
  );
};

export default TimerDisplay;
