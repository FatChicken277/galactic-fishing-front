import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NotificationProvider } from "@/context/NotificationContext";
import { UserProvider } from "@/context/UserContext";

import MainApp from "@/MainApp";

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NotificationProvider>
        <UserProvider>
          <MainApp />
        </UserProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}
