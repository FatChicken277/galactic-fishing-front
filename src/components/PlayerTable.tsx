import { useContext, useEffect } from "react";
import { Tooltip } from "@/components/common/Tooltip";

import type { Player } from "@/types/user";

import { UserContext } from "@/context/UserContext";
import { useNotification } from "@/context/NotificationContext";

interface PlayerTableProps {
  players: Player[];
  page: number;
}

function PlayerTable({ players, page }: PlayerTableProps) {
  const { player: currentUser } = useContext(UserContext) || {};
  const { addNotification } = useNotification();

  const itemsPerPage = 30;
  const cols = ["Rank", "Rebel", "Level", "Xp", "Gold"];

  const top3Colors: { [key: number]: string } = {
    1: "bg-base-300/80",
    2: "bg-base-300/60",
    3: "bg-base-300/40",
  };

  useEffect(() => {
    addNotification("This worksxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!", "info");
  }, []);

  const top3Emojis = ["🥇", "🥈", "🥉"];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          {/* head */}
          <thead>
            <tr>
              {cols.map((title) => (
                <th key={title}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {players
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((player: Player) => (
                <tr
                  key={player.rank}
                  className={`${top3Colors[player.rank]} ${
                    player.username === currentUser?.username
                      ? "text-accent"
                      : ""
                  }`}
                >
                  {/* RANK */}
                  <td>
                    {`#${player.rank} ${top3Emojis[player.rank - 1] || ""}`}
                  </td>
                  {/* USERNAME */}
                  <td className="font-bold whitespace-nowrap">
                    <span className="mr-2">{player.username}</span>
                    {player.isInfected && (
                      <Tooltip dataTip="Infected">
                        <div className="inline-grid *:[grid-area:1/1]">
                          <div className="status status-error animate-ping"></div>
                          <div className="status status-error"></div>
                        </div>
                      </Tooltip>
                    )}
                  </td>
                  {/* LEVEL */}
                  <td className="whitespace-nowrap">
                    <Tooltip dataTip={player.emojiDescription}>
                      <div className="badge badge-soft badge-outline badge-secondary badge-sm py-3">
                        {player.fishEmojis}
                        <p>{player.level}</p>
                      </div>
                    </Tooltip>
                  </td>
                  {/* XP */}
                  <td className="text-info">{player.xp}</td>
                  {/* GOLD */}
                  <td className="text-warning">{player.gold}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PlayerTable;
