import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";

import { Header } from "@/components/layout/Header";

import { LoginView } from "@/components/login/LoginView";
import { Dashboard } from "@/components/layout/Dashboard";

import { NotificationCenter } from "@/components/common/NotificationCenter";

export function MainApp() {
  const { isLogged = false } = useContext(UserContext) ?? {};

  // Set header height CSS variable on mount & resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${header.offsetHeight}px`
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  const mainClassNames = isLogged
    ? "pt-[var(--header-height)]" // dashboard
    : "relative overflow-y-hidden"; // login

  return (
    <body className="vhs">
      <NotificationCenter />
      <Header />
      <main className={`h-dvh ${mainClassNames}`}>
        {isLogged ? (
          <Dashboard />
        ) : (
          <>
            <div className="scanner -z-100" />
            <div className="scanner -z-100" />
            <LoginView />
          </>
        )}
      </main>
    </body>
  );
}

export default MainApp;
