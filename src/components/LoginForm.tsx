import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Switch } from "@headlessui/react";
import { Button } from "@headlessui/react";
import { Fieldset, Field, Input, Label } from "@headlessui/react";

import type { Player } from "@/types/user";

import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";
function LoginForm() {
  const { setUser } = useContext(UserContext) || {};

  const [username, setUsername] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [animationInterval, setAnimationInterval] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  const { players, isLoading, error } = useGetLeaderboard();

  const handleLogin = () => {
    if (!setUser) return;

    const player = players.find((p: Player) => p.username === username);

    if (!isLoading && !error) {
      setUser({
        isLogged: true,
        isGuest: isGuest,
        username,
        player: player || null,
      });
    }
  };

  const randomChar = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const animateUsername = () => {
    let frame = 0;
    const totalFrames = 15;
    const finalUsername = "SW0geW91ciBmYXRoZXIgOnY=";
    const interval = setInterval(() => {
      const progress = frame / totalFrames;
      const length = Math.floor(finalUsername.length * progress);
      const randomPart = Array(finalUsername.length - length)
        .fill(0)
        .map(() => randomChar())
        .join("");
      setUsername(finalUsername.slice(0, length) + randomPart);

      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        setUsername(finalUsername);
      }
    }, 50);
    setAnimationInterval(interval);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  const handleSwitchChange = (input: boolean) => {
    setEnabled(input);
    if (input) {
      animateUsername();
      setIsGuest(true);
    } else {
      setUsername("");
      clearInterval(animationInterval);
      setIsGuest(false);
    }
  };

  return (
    <Fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6 space-y-2 bg-gradient-to-br to-primary/[20.37%]">
      <div className="flex flex-col items-center space-y-2">
        <img src="/logo.webp" alt="Logo" width={200} />
        <h1 className="text-lg font-semibold"></h1>
      </div>

      <Field className="space-y-3">
        <Label className="label text-sm font-semibold">
          Rebel Identification
        </Label>
        <Input
          type="text"
          className="input input-primary"
          placeholder="Username"
          onChange={handleChange}
          disabled={enabled}
          value={username}
        />
      </Field>

      <Field className="flex items-center space-x-3">
        <Switch
          as="input"
          type="checkbox"
          className="toggle toggle-primary toggle-md md:toggle-sm"
          checked={enabled}
          onChange={handleSwitchChange}
        />
        <Label className="label text-sm font-semibold">Enter as a Guest</Label>
      </Field>

      <Button
        className="mt-2 btn btn-primary"
        onClick={handleLogin}
        disabled={!username}
      >
        Login
      </Button>
    </Fieldset>
  );
}

export default LoginForm;
