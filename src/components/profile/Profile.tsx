import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

import { Card, CardContent, CardTitle } from "@/components/common/Card";
import { LogoutButton } from "@/components/common/LogoutButton";

import { UserInfo } from "@/components/profile/UserInfo";
import { StatsSection } from "@/components/profile/StatsSection";

export function Profile() {
  const { player, username, isGuest } = useContext(UserContext) || {};

  return (
    <Card className="card-border border-primary">
      <CardContent className="h-full">
        <CardTitle className="flex items-center justify-between">
          <UserInfo username={username || ""} isGuest={isGuest || false} />
          <LogoutButton />
        </CardTitle>

        {!isGuest && player && (
          <>
            <div className="divider" />
            <StatsSection player={player} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
