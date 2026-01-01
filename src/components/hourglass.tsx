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
  const [startTimestamp, setStartTimestamp] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      if (isActive && startTimestamp > 0) {
        const now = Date.now();
        const elapsed = now - startTimestamp;
        const remaining = Math.max(0, initialTime - elapsed);

        setTimeLeft(remaining);

        if (remaining <= 0) {
          setIsActive(false);
          setIsFinished(true);

          // play alarm sound repeatedly for 10 seconds
          playAlarm();
          const alarmInterval = setInterval(() => {
            playAlarm();
          }, 2000);

          setTimeout(() => {
            clearInterval(alarmInterval);
          }, 10000);

          // playAlarm();
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }
    };

    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(updateTimer, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);

        intervalRef.current = null;
      }
    };
  }, [isActive, startTimestamp, initialTime]);

  // Page Visibility API to handle tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isActive && startTimestamp > 0) {
        if (document.hidden) {
          // Tab is now hidden - timer will continue via timestamp logic
          console.log('Tab hidden - timer continues in background');
        } else {
          // Tab is now visible - recalculate time left
          const now = Date.now();
          const elapsed = now - startTimestamp;
          const remaining = Math.max(0, initialTime - elapsed);

          setTimeLeft(remaining);

          if (remaining <= 0 && isActive) {
            setIsActive(false);
            setIsFinished(true);
            playAlarm();
          }
          console.log('Tab visible - timer updated');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, startTimestamp, initialTime]);

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
    oscillator.stop(audioContext.currentTime + 0.8);
  };

  const startTimer = (milliseconds?: number) => {
    const timeToSet = milliseconds || timeLeft;
    if (timeToSet > 0) {
      const now = Date.now();
      setTimeLeft(timeToSet);
      setInitialTime(timeToSet);
      setStartTimestamp(now);
      setIsActive(true);
      setIsFinished(false);
    }
  };

  const handleTimeInputStart = (milliseconds: number) => {
    startTimer(milliseconds);
  };

  const stopTimer = () => {
    setIsActive(false);
    setStartTimestamp(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setInitialTime(0);
    setStartTimestamp(0);
    setIsFinished(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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
