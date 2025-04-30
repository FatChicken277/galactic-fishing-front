import clsx from "clsx";
import { useContext } from "react";

import Mode from "@/components/ThemeToggle";
import Sync from "@/components/Sync";
import { UserContext } from "@/context/UserContext";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const { isLogged } = useContext(UserContext) || { isLogged: false };

  return (
    <header
      className={clsx(
        `absolute flex w-full justify-center z-10 bg-base-100`,
        className
      )}
    >
      <div className="flex container p-8 justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold space-x-1 md:space-x-2">
            <span className="text-[#0ba8e2] hidden sm:inline">GALACTIC</span>
            <span className="text-[#e40772] hidden sm:inline">FISHING</span>
            <span className="text-[#0ba8e2] sm:hidden">G</span>
            <span className="text-[#e40772] sm:hidden">F</span>
            <span>| NEXUS</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {isLogged && <Sync />}
          <Mode />
        </div>
      </div>
    </header>
  );
}

export default Header;
