'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TimeInput from './TimeInput';
import TimerDisplay from './TimerDisplay';

export default function HourGlass() {
  const [initialTime, setInitialTime] = useState<number>(0);
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
    oscillator.stop(audioContext.currentTime + 1);
  };

  const startTimer = (milliseconds?: number) => {
    const timeToSet = milliseconds || timeLeft;
    if (timeToSet > 0) {
      setTimeLeft(timeToSet);
      setInitialTime(timeToSet);
      setIsActive(true);
      setIsFinished(false);
    }
  };

  const handleTimeInputStart = (milliseconds: number) => {
    startTimer(milliseconds);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setInitialTime(0);
    setIsFinished(false);
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
    <div className='flex items-center justify-center my-10'>
      <Card className='w-full max-w-2xl shadow-3xl border border-border/60 bg-transparent backdrop-blur-3xl'>
        {/* <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold text-card-foreground flex items-center justify-center gap-2'>
            Timer
          </CardTitle>
        </CardHeader> */}
        <CardContent className='space-y-6'>
          <div className='w-full flex justify-center'>
            {isActive ? (
              <TimerDisplay
                minutes={minutes}
                seconds={seconds}
                milliseconds={milliseconds}
                isFinished={isFinished}
              />
            ) : (
              <TimeInput onStart={handleTimeInputStart} disabled={isActive} />
            )}
          </div>

          {/* Control Buttons */}
          {isActive && (
            <div className='flex gap-2 justify-center'>
              <Button onClick={resetTimer} variant='outline' className='flex-1 cursor-pointer'>
                Reset
              </Button>
            </div>
          )}

          {/* Progress Bar */}
          {(isActive || timeLeft > 0) && (
            <div className='w-full bg-secondary rounded-full h-2'>
              <div
                className='bg-primary h-2 rounded-full transition-all duration-100 ease-out'
                style={{
                  width: `${initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0}%`,
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
