"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { CountDown } from "./count-down";
import { Button } from "./ui/button";

type CountDownType = "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";

const MainCard = () => {
  const [timeLeft, setTimeLeft] = useState<number>(3);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [workSessions, setWorkSessions] = useState<number>(0);
  const [countDownType, setCountDownType] = useState<CountDownType>("POMODORO");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // session should be 25 minutes, short break should be 5 minutes and longer break after 4 work sessions should be 15 minutes

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);

            console.log("Timer ended");
            setWorkSessions((prevSessions) => {
              if (prevSessions === 3) {
                setWorkSessions(0);
                setCountDownType("LONG_BREAK");
                setTimeLeft(900);
                return 0;
              }
              setCountDownType("SHORT_BREAK");
              setTimeLeft(300);
              return prevSessions + 1;
            });
            setIsActive(false);

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

  console.log(isActive, workSessions);

  return (
    <div className="mt-10">
      <Card className="flex flex-col justify-center items-center">
        <CardHeader className="p-0 pt-4">
          <CardTitle className="flex justify-center gap-2">
            <Button
              onClick={() => {
                setCountDownType("POMODORO");
                setIsActive(false);
                setTimeLeft(3);
              }}
              size="sm"
              variant={countDownType === "POMODORO" ? "selectedGhost" : "ghost"}
              className="font-bold"
            >
              Pomodoro
            </Button>
            <Button
              onClick={() => {
                setCountDownType("SHORT_BREAK");
                setIsActive(false);
                setTimeLeft(300);
              }}
              size="sm"
              variant={
                countDownType === "SHORT_BREAK" ? "selectedGhost" : "ghost"
              }
              className="font-bold"
            >
              Short Break
            </Button>
            <Button
              onClick={() => {
                setCountDownType("LONG_BREAK");
                setIsActive(false);
                setTimeLeft(900);
              }}
              size="sm"
              variant={
                countDownType === "LONG_BREAK" ? "selectedGhost" : "ghost"
              }
              className="font-bold"
            >
              Long Break
            </Button>
          </CardTitle>
        </CardHeader>

        <CountDown
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          isActive={isActive}
          setIsActive={setIsActive}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          timerRef={timerRef}
        />
      </Card>
    </div>
  );
};

export { MainCard };
