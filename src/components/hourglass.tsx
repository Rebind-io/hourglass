'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TimeInput from './TimeInput';

export default function HourGlass() {
  const [inputMinutes, setInputMinutes] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 10) {
            // Timer finished
            setIsActive(false);
            setIsFinished(true);
            playAlarm();
            return 0;
          }
          return prevTime - 10; // Decrease by 10ms
        });
      }, 10);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      playAlarm();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const playAlarm = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 10);
  };

  const startTimer = () => {
    const minutes = parseFloat(inputMinutes);
    if (minutes > 0) {
      setTimeLeft(minutes * 60 * 1000); // Convert to milliseconds
      setIsActive(true);
      setIsFinished(false);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setIsFinished(false);
    setInputMinutes('');
  };

  const formatTime = (time: number) => {
    const totalSeconds = Math.ceil(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000) / 10);

    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(2, '0'),
    };
  };

  const { minutes, seconds, milliseconds } = formatTime(timeLeft);

  return (
    <div className='flex items-center justify-center my-20'>
      <Card className='w-full max-w-2xl shadow-3xl border border-border/60 bg-transparent backdrop-blur-3xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold text-card-foreground flex items-center justify-center gap-2'>
            Timer
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Input Section */}
          {/* <div className='space-y-2'>
            <label htmlFor='minutes-input' className='text-sm font-medium text-muted-foreground'>
              Timer Duration (minutes)
            </label>
            <Input
              id='minutes-input'
              type='number'
              placeholder='Enter minutes'
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              disabled={isActive}
              min='0.1'
              step='0.1'
              className='text-center text-lg'
            />
          </div> */}
          <div className='w-full flex justify-center'>
            <TimeInput onStart={(milliseconds) => {}} />
          </div>

          {/* Timer Display */}
          <div className='text-center space-y-2'>
            <div className='bg-muted rounded-lg p-6 border border-border/50'>
              <div className='text-4xl font-mono font-bold text-foreground'>
                {minutes}:{seconds}
              </div>
              <div className='text-xl font-mono text-muted-foreground'>.{milliseconds}</div>
            </div>

            {isFinished && (
              <div className='text-destructive font-semibold text-lg animate-pulse'>
                🔔 Time's Up!
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className='flex gap-2 justify-center'>
            {!isActive ? (
              <Button
                onClick={startTimer}
                disabled={!inputMinutes || parseFloat(inputMinutes) <= 0}
                className='flex-1 bg-green-600 hover:bg-green-700 text-white'
              >
                Start Timer
              </Button>
            ) : (
              <Button onClick={stopTimer} className='flex-1 bg-red-600 hover:bg-red-700 text-white'>
                Stop Timer
              </Button>
            )}

            <Button onClick={resetTimer} variant='outline' className='flex-1'>
              Reset
            </Button>
          </div>

          {/* Progress Bar */}
          {(isActive || timeLeft > 0) && (
            <div className='w-full bg-secondary rounded-full h-2'>
              <div
                className='bg-primary h-2 rounded-full transition-all duration-100 ease-out'
                style={{
                  width: `${
                    inputMinutes
                      ? ((parseFloat(inputMinutes) * 60 * 1000 - timeLeft) /
                          (parseFloat(inputMinutes) * 60 * 1000)) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
