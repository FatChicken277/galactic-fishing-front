import type { ReactNode } from "react";

// Player Type (In Game)
export interface PlayerType {
  username: string;
  level: number;
  xp: number;
  gold: number;
  rank: number;
  fishEmojis: string;
  emojiDescription: string;
  isInfected: boolean;
}

// User Type (In Website)
export interface UserType {
  isLogged: boolean;
  isGuest: boolean;
  username: string;
  player: PlayerType;
}

// User Context Type
export interface UserContextType {
  username: string | null;
  player: PlayerType | null;
  isLogged: boolean;
  isGuest: boolean;

  setUser: (user: {
    isLogged: boolean;
    isGuest: boolean;
    username: string | null;
    player: PlayerType | null;
  }) => void;

  logout: () => void;
}

// User Provider Props
export interface UserProviderProps {
  children: ReactNode;
}
