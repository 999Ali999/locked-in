"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountDown } from "./countdown";
import { CountDownModeButton } from "./countdown-mode-button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type CountDownType = "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";

type TimerState = {
  type: CountDownType;
  duration: number;
};

const Timers = [
  {
    mode: "POMODORO",
    title: "Pomodoro",
    time: 1500,
  },
  {
    mode: "SHORT_BREAK",
    title: "Short Break",
    time: 300,
  },
  {
    mode: "LONG_BREAK",
    title: "Long Break",
    time: 900,
  },
];

const getNextTimerState = (
  currentType: CountDownType,
  sessions: number
): TimerState => {
  if (currentType === "POMODORO") {
    if (sessions >= 3) {
      return { type: "LONG_BREAK", duration: 900 };
    }
    return { type: "SHORT_BREAK", duration: 300 };
  }
  return { type: "POMODORO", duration: 1500 };
};

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState<number>(1500);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [workSessions, setWorkSessions] = useState<number>(0);
  const [countDownType, setCountDownType] = useState<CountDownType>("POMODORO");
  const [shouldTransition, setShouldTransition] = useState<boolean>(false);
  const [totalWorkSessions, setTotalWorkSessions] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle timer state transitions
  useEffect(() => {
    if (shouldTransition) {
      const nextState = getNextTimerState(countDownType, workSessions);

      if (countDownType === "POMODORO") {
        setWorkSessions((prev) => (prev >= 3 ? 0 : prev + 1));
        setTotalWorkSessions((prev) => prev + 1);
      }

      setCountDownType(nextState.type);
      setTimeLeft(nextState.duration);
      setIsActive(false);
      setShouldTransition(false);
    }
  }, [shouldTransition, countDownType, workSessions]);

  // Handle timer countdown
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setShouldTransition(true);
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

  const resetWorkSession = () => {
    setTotalWorkSessions(0);
    setWorkSessions(0);
    setCountDownType("POMODORO");
    setTimeLeft(1500);
    setIsActive(false);
    setIsPaused(false);
    setShouldTransition(false);
  };

  return (
    <div className="mt-10">
      <Card className="flex flex-col justify-center items-center">
        <CardHeader className="p-0 pt-4">
          <CardTitle className="flex justify-center gap-2">
            {Timers.map((timer) => (
              <CountDownModeButton
                key={timer.title}
                title={timer.title}
                onClick={() => {
                  setCountDownType(timer.mode as CountDownType);
                  setIsActive(false);
                  setTimeLeft(timer.time);
                }}
                variant={
                  countDownType === timer.mode ? "ghostSelected" : "ghost"
                }
              />
            ))}
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
          skipTimer={() => setShouldTransition(true)}
        />
      </Card>

      <div className="mt-7 flex justify-center gap-x-1">
        <div className="flex gap-x-2">
          <HoverCard>
            <HoverCardTrigger>
              {" "}
              <Info />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col text-center justify-center gap-y-2">
                <div>
                  <span className="font-bold">Locked In</span> for{" "}
                  <span className="font-bold">
                    {totalWorkSessions * 25} minutes
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <AlertDialog>
            <AlertDialogTrigger>
              {" "}
              <p className="text-gray-500 font-bold cursor-pointer hover:text-gray-400">
                {workSessions} / 4
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Rest All Pomodoro Sessions?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetWorkSession}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export { Pomodoro };
