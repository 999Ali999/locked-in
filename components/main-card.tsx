"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const MainCard = () => {
  const [timeLeft, setTimeLeft] = useState<number>(1500);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="mt-10">
      <Card className="flex flex-col justify-center items-center gap-10">
        <CardHeader className="p-0 pt-4">
          <CardTitle className="flex justify-center gap-2">
            <Button variant="ghost" className="font-bold">
              Pomodoro
            </Button>
            <Button variant="ghost" className="font-bold">
              Short Break
            </Button>
            <Button variant="ghost" className="font-bold">
              Long Break
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <h1 className="text-9xl font-bold">{formatTime(timeLeft)}</h1>
        </CardContent>
        <CardFooter>
          {isActive ? (
            <Button
              onClick={handlePause}
              size="xl"
              className="font-bold text-xl"
            >
              Pause
            </Button>
          ) : (
            <Button
              onClick={handleStart}
              size="xl"
              className="font-bold text-xl"
            >
              Start
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export { MainCard };
