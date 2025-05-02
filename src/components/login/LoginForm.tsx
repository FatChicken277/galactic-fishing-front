import React, { useState, useContext, useMemo } from "react";
import {
  Switch,
  Button,
  Fieldset,
  Field,
  Input,
  Label,
} from "@headlessui/react";

import { UserContext } from "@/context/UserContext";
import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";
import { useUsernameAnimation } from "@/hooks/useUsernameAnimation";

import type { PlayerType } from "@/types/user";

// Easter egg username :p
const ENCODED_USERNAME = "SSBhbSB5b3VyIGZsb3VuZGVyIQ==";

export function LoginForm() {
  const { setUser } = useContext(UserContext) || {}; // stores the user to use later

  const [isGuest, setIsGuest] = useState<boolean>(false);

  const { players, isLoading, error } = useGetLeaderboard();
  const { username, setUsername, animate } =
    useUsernameAnimation(ENCODED_USERNAME);

  // Avoid recomputation
  const player = useMemo(
    () => players.find((p: PlayerType) => p.username === username),
    [players, username]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsGuest(checked);
    if (checked) {
      animate();
    } else {
      setUsername("");
    }
  };

  const handleLogin = () => {
    if (!setUser) return;

    if (!isLoading && !error) {
      setUser({
        isLogged: true,
        isGuest: isGuest,
        username,
        player: player || null,
      });
    }
  };

  return (
    <Fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6 space-y-2 bg-gradient-to-br to-primary/[20.37%]">
      <div className="flex flex-col items-center space-y-2">
        <img src="/logo.webp" alt="Logo" width={200} />
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
          disabled={isGuest}
          value={username}
        />
      </Field>

      <Field className="flex items-center space-x-3">
        <Switch
          as="input"
          type="checkbox"
          className="toggle toggle-primary toggle-md md:toggle-sm"
          checked={isGuest}
          onChange={handleSwitchChange}
        />
        <Label className="label text-sm font-semibold">Enter as a Guest</Label>
      </Field>

      <Button
        className="mt-2 btn btn-primary"
        onClick={handleLogin}
        disabled={!username || isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </Button>
    </Fieldset>
  );
}
