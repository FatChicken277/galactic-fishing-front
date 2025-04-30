import { createContext, useState, useEffect } from "react";

// Type imports
import type { Player, UserContextType, UserProviderProps } from "@/types/user";

// Context creation
const UserContext = createContext<UserContextType | undefined>(undefined);

// Wraps the context to provide user data
function UserProvider({ children }: UserProviderProps) {
  const [user, setUserState] = useState<{
    isLogged: boolean;
    isGuest: boolean;
    username: string | null;
    player: Player | null;
  }>({
    username: null,
    player: null,
    isLogged: false,
    isGuest: false,
  });

  // Load session data from localStorage when the app starts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedIsLogged = localStorage.getItem("isLogged") === "true";
    const storedIsGuest = localStorage.getItem("isGuest") === "true";
    const storedPlayer = JSON.parse(
      localStorage.getItem("currentPlayer") || "null"
    );

    setUserState({
      username: storedUsername,
      player: storedPlayer,
      isLogged: storedIsLogged,
      isGuest: storedIsGuest,
    });
  }, []);

  // Set user context state and store data in localStorage
  const setUser = (newUser: {
    isLogged: boolean;
    isGuest: boolean;
    username: string | null;
    player: Player | null;
  }) => {
    setUserState(newUser);
    // Store the data in localStorage for persistence
    if (newUser.isLogged) {
      localStorage.setItem("username", newUser.username || "");
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("isGuest", newUser.isGuest ? "true" : "false");
      localStorage.setItem("currentPlayer", JSON.stringify(newUser.player));
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("isLogged");
      localStorage.removeItem("isGuest");
      localStorage.removeItem("currentPlayer");
    }
  };

  // Handle logout: clear context and localStorage
  const logout = () => {
    setUser({
      isLogged: false,
      isGuest: false,
      username: null,
      player: null,
    });
  };

  return (
    <UserContext.Provider value={{ ...user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
