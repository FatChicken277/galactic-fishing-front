import { useEffect, useState } from "react";

/* Icons */
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ThemeToggle() {
  const [theme, setTheme] = useState("gf-dark");

  const toggleTheme = () => {
    setTheme(theme === "gf-dark" ? "gf-light" : "gf-dark");
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (htmlElement) {
      htmlElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on">
        <SunIcon className="size-5" />
      </div>
      <div className="swap-off">
        <MoonIcon className="size-5" />
      </div>
    </label>
  );
}

export default ThemeToggle;
