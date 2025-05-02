import clsx from "clsx";
import { useContext } from "react";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SyncDataButton } from "@/components/common/SyncDataButton";

import { UserContext } from "@/context/UserContext";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { isLogged = false } = useContext(UserContext) || {};

  return (
    <header
      className={clsx(
        "absolute z-10 w-full bg-base-100 flex justify-center border-0",
        className
      )}
    >
      <div className="container flex items-center justify-between p-8">
        {/* LOGO TITLE */}
        <h1 className="text-xl font-bold space-x-1 md:space-x-2">
          <span className="text-[#0ba8e2] hidden sm:inline">GALACTIC</span>
          <span className="text-[#e40772] hidden sm:inline">FISHING</span>
          <span className="text-[#0ba8e2] sm:hidden">G</span>
          <span className="text-[#e40772] sm:hidden">F</span>
          <span>| NEXUS</span>
        </h1>

        {/* CONTROLS */}
        <div className="flex items-center space-x-4">
          {isLogged && <SyncDataButton />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
