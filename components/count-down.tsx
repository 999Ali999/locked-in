import { SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import { CardContent, CardFooter } from "./ui/card";

type CountDownProps = {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  timerRef: React.RefObject<NodeJS.Timeout | null>;
};

const CountDown = ({
  timeLeft,
  isActive,
  setIsActive,
  setIsPaused,
  timerRef,
}: CountDownProps) => {
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

  const skipTimer = (): void => {};

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <CardContent className="p-10">
        <h1 className="text-9xl font-bold">{formatTime(timeLeft)}</h1>
      </CardContent>
      <CardFooter className="p-0 pb-6 flex justify-center gap-x-5">
        {isActive ? (
          <Button onClick={handlePause} size="xl" className="font-bold text-xl">
            Pause
          </Button>
        ) : (
          <Button onClick={handleStart} size="xl" className="font-bold text-xl">
            Start
          </Button>
        )}
        {isActive && (
          <Button onClick={skipTimer} size="myxl">
            <div>
              <SkipForward />
            </div>
          </Button>
        )}
      </CardFooter>
    </div>
  );
};

export { CountDown };
