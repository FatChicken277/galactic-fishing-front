import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";

import Header from "@/components/layout/Header";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { NotificationCenter } from "@/components/common/NotificationCenter";

export function MainApp() {
  const { isLogged } = useContext(UserContext) || { isLogged: false };

  useEffect(() => {
    const setHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`
        );
      }
    };

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
    return () => window.removeEventListener("resize", setHeaderHeight);
  }, []);

  return (
    <body className="vhs">
      <NotificationCenter />
      <Header className={`${isLogged ? "" : "bg-transparent"}`} />
      <main
        className={`h-dvh ${
          isLogged ? "pt-[var(--header-height)]" : "relative overflow-y-hidden"
        }`}
      >
        {isLogged ? (
          <Dashboard />
        ) : (
          <>
            <div className="scanner -z-100"></div>
            <div className="scanner -z-100"></div>
            <Login />
          </>
        )}
      </main>
    </body>
  );
}

export default MainApp;
