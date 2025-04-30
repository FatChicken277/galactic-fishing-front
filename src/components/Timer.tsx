import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/common/Card";
import { Button } from "@headlessui/react";

function Timer() {
  const [currentTime, setCurrentTime] = useState(30);
  const [baseTime, setBaseTime] = useState(30);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentTime <= 0 && timeInterval) {
      clearInterval(timeInterval);
      setTimeInterval(null);
    }
  }, [currentTime, timeInterval]);

  const handleStart = () => {
    if (timeInterval) return;

    if (currentTime === 0) {
      setCurrentTime(baseTime);
    }

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime - 1);
    }, 1000);

    setTimeInterval(interval);
  };

  const handleReset = () => {
    if (timeInterval) clearInterval(timeInterval);
    setTimeInterval(null);
    setCurrentTime(30);
    setBaseTime(30);
  };

  const handleAdd30 = () => {
    if (timeInterval) clearInterval(timeInterval);
    const newTime = baseTime + 30;
    setBaseTime(newTime);
    setCurrentTime(newTime);
    setTimeInterval(null);
  };

  const handleSubtract30 = () => {
    if (timeInterval) clearInterval(timeInterval);
    const newTime = baseTime - 30;
    setBaseTime(newTime);
    setCurrentTime(newTime);
    setTimeInterval(null);
  };

  return (
    <Card className="border border-primary shadow-xl bg-base-100">
      <CardTitle className="text-xl text-center p-6 bg-base-100 rounded-t-2xl">
        ⏱️ Timer
      </CardTitle>
      <CardContent className="flex flex-col items-center justify-center gap-4 pt-0 p-6 h-full overflow-auto">
        <h1 class="text-8xl">{currentTime}s</h1>

        <progress
          class="progress progress-primary"
          value={currentTime}
          max={baseTime}
        ></progress>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 w-full">
          <Button
            className="btn btn-success order-1 xl:order-2"
            onClick={handleStart}
            disabled={!!timeInterval}
          >
            Start
          </Button>
          <Button
            className="btn btn-warning order-2 xl:order-3"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            className="btn btn-info order-3 xl:order-1"
            onClick={handleSubtract30}
            disabled={currentTime < 60}
          >
            -30s
          </Button>
          <Button
            className="btn btn-info order-4 xl:order-4"
            onClick={handleAdd30}
          >
            +30s
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Timer;
