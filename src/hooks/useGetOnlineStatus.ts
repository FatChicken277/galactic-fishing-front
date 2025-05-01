import { useState, useEffect } from "react";

export const useGetOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  const check = async () => {
    if (!navigator.onLine) return setIsOnline(false);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      await fetch("/ping.json", {
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeout);
      setIsOnline(true);
    } catch {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    check();
    const interval = setInterval(check, 10000);

    window.addEventListener("online", check);
    window.addEventListener("offline", check);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", check);
      window.removeEventListener("offline", check);
    };
  }, []);

  return isOnline;
};
