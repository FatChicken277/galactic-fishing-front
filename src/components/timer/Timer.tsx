import { Button } from "@headlessui/react";
import { Card, CardContent, CardTitle } from "@/components/common/Card";

import { useTimer } from "@/hooks/useTimer";

export function Timer() {
  const {
    currentTime,
    baseTime,
    timeInterval,
    handleStart,
    handleReset,
    handleAdd30,
    handleSubtract30,
  } = useTimer(30);

  return (
    <Card className="border border-primary shadow-xl bg-base-100">
      <CardTitle className="text-xl text-center p-6 bg-base-100 rounded-t-2xl">
        ⏱️ Timer
      </CardTitle>
      <CardContent className="flex flex-col items-center justify-center gap-4 pt-0 p-6 h-full overflow-auto">
        <h1 className="text-8xl">{currentTime}s</h1>

        <progress
          className="progress progress-primary"
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
            disabled={currentTime >= 300}
          >
            +30s
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
