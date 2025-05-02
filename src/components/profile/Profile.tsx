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
          <UserInfo
            username={username || ""}
            isGuest={isGuest || false}
            player={player || null}
          />
          <LogoutButton />
        </CardTitle>

        <div className="divider" />

        {!isGuest && player ? (
          <StatsSection player={player} />
        ) : (
          <Card className="card-border border-warning">
            <CardContent className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <p>{"⎛⎝ ≽  >  ⩊   < ≼ ⎠⎞"}</p>
                <p className="text-center text-warning">! Encrypted data !</p>
                <p className="text-center">
                  Data was kidnapped by the empire, please send 100k fishes to{" "}
                  <span className="text-warning">@Fatchicken277472</span> to
                  recover the data or{" "}
                  <span className="text-warning">just log in</span>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
