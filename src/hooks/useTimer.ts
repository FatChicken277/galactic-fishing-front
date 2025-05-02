import { useEffect, useState } from "react";

export const useTimer = (initialTime: number) => {
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [baseTime, setBaseTime] = useState(initialTime);
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
    setCurrentTime(initialTime);
    setBaseTime(initialTime);
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

  return {
    currentTime,
    baseTime,
    timeInterval,
    handleStart,
    handleReset,
    handleAdd30,
    handleSubtract30,
  };
};
