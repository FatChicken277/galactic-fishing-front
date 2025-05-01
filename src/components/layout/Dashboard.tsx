import { useState } from "react";

import Dock from "@/components/layout/Dock";

import Profile from "@/components/Profile";
import Timer from "@/components/Timer";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import Market from "@/components/Market";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="container mx-auto pt-5 px-8 w-full h-full flex flex-col md:pb-20">
      {/* BIG SCREENS */}
      <div className="hidden md:grid grid-cols-3 gap-4 flex-1 min-h-0 h-full">
        {/* Profile */}
        <div className="overflow-auto">
          <Profile />
        </div>

        {/* Leaderboard */}
        <div className="col-span-2 overflow-auto">
          <Leaderboard />
        </div>

        {/* Timer */}
        <div className="overflow-auto">
          <Timer />
        </div>

        {/* Market */}
        <div className="col-span-2 overflow-auto">
          <Market />
        </div>
      </div>

      {/* SMALL SCREENS */}
      <div className="grid grid-cols-1 gap-4 flex-1 min-h-0 h-full md:hidden pb-10">
        {/* Profile */}
        {selectedTab === 0 && (
          <div className="overflow-auto">
            <Profile />
          </div>
        )}

        {/* Leaderboard */}
        {selectedTab === 1 && (
          <div className="overflow-auto">
            <Leaderboard />
          </div>
        )}

        {/* Market */}
        {selectedTab === 2 && (
          <div className="overflow-auto">
            <Market />
          </div>
        )}

        {/* Timer */}
        {selectedTab === 3 && (
          <div className="overflow-auto">
            <Timer />
          </div>
        )}
      </div>

      <Dock className="mt-auto md:hidden" setSelectedTab={setSelectedTab} />
    </div>
  );
}

export default Dashboard;
