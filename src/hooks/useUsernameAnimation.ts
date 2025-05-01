import { useState, useRef, useEffect } from "react";

import { getRandomChar } from "@/utils/strings";

export const useUsernameAnimation = (finalUsername: string) => {
  const [username, setUsername] = useState("");
  const animationRef = useRef<number | null>(null);

  const animate = () => {
    let frame = 0;
    const totalFrames = 15;

    const step = () => {
      const progress = frame / totalFrames;
      const length = Math.floor(finalUsername.length * progress);
      const randomPart = Array(finalUsername.length - length)
        .fill(0)
        .map(() => getRandomChar())
        .join("");
      setUsername(finalUsername.slice(0, length) + randomPart);

      frame++;
      if (frame <= totalFrames) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setUsername(finalUsername);
      }
    };

    step();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { username, setUsername, animate };
};
