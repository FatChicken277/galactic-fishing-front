import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

import { Card, CardContent, CardTitle } from "@/components/common/Card";
import LogOut from "@/components/LogOut";

import { UserIcon } from "@heroicons/react/24/outline";
import {
  TrophyIcon,
  AcademicCapIcon,
  SparklesIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

function Profile() {
  const { player, username, isGuest } = useContext(UserContext) || {};

  const userType = isGuest ? "Guest" : "Agent Rebel";
  const top3Emojis = ["🥇", "🥈", "🥉"];

  return (
    <Card className="card-border border-primary">
      <CardContent className="h-full">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 overflow-hidden">
            {/* Icon */}
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full">
                <UserIcon className="w-1/2" />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col min-w-0 overflow-hidden">
              <div className="text-sm font-bold truncate">{username}</div>
              <div className="text-xs font-light truncate">
                {!player && !isGuest ? "Unrecognized " : ""}
                {userType}
              </div>
            </div>
          </div>

          <LogOut />
        </CardTitle>

        {!isGuest && player && (
          <>
            <div className="divider" />

            <div className="grid grid-cols-1 gap-2 overflow-auto space-y-2 pr-2">
              {/* Rank */}
              <div className="stat shadow bg-base-100 p-4 rounded-lg">
                <div className="stat-figure text-primary">
                  <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="stat-title text-xs md:text-sm">Rank</div>
                <div className="stat-value text-primary text-xs md:text-lg">
                  {top3Emojis[player.rank - 1]} #{player.rank}
                </div>
                <div className="stat-desc text-[10px] sm:text-xs">
                  Leaderboard position
                </div>
              </div>

              {/* Level */}
              <div className="stat shadow bg-base-100 p-4 rounded-lg">
                <div className="stat-figure text-secondary">
                  <AcademicCapIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="stat-title text-xs md:text-sm">Level</div>
                <div className="stat-value text-secondary text-xs md:text-lg">
                  {player.fishEmojis} {player.level}
                </div>
                <div className="stat-desc text-[10px] sm:text-xs italic">
                  "{player.emojiDescription}"
                </div>
              </div>

              {/* XP */}
              <div className="stat shadow bg-base-100 p-4 rounded-lg">
                <div className="stat-figure text-accent">
                  <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="stat-title text-xs md:text-sm">XP</div>
                <div className="stat-value text-accent text-xs md:text-lg">
                  {player?.xp}
                </div>
                <div className="stat-desc text-[10px] sm:text-xs">
                  Experience points
                </div>
              </div>

              {/* Gold */}
              <div className="stat shadow bg-base-100 p-4 rounded-lg">
                <div className="stat-figure text-warning">
                  <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="stat-title text-xs md:text-sm">Gold</div>
                <div className="stat-value text-warning text-xs md:text-lg">
                  {player?.gold}
                </div>
                <div className="stat-desc text-[10px] sm:text-xs">
                  Spend wisely!
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Profile;
