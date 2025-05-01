import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface Theme {
  light: string;
  dark: string;
}

const THEMES: Theme = {
  light: "gf-light",
  dark: "gf-dark",
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme["light"] | Theme["dark"]>(
    THEMES.dark
  );

  const toggleTheme = () => {
    setTheme(theme === THEMES.dark ? THEMES.light : THEMES.dark);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate" aria-label="Toggle theme">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === THEMES.dark}
        aria-hidden="true"
      />
      <SunIcon className="size-5 swap-on" />
      <MoonIcon className="size-5 swap-off" />
    </label>
  );
}
