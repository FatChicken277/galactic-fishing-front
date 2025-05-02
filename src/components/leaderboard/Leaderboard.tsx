import { useState } from "react";

import { Card, CardContent, CardTitle } from "@/components/common/Card";
import { Pagination } from "@/components/common/Pagination";

import { PlayerTable } from "@/components/leaderboard/PlayerTable";

import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";

export function Leaderboard() {
  const { players, isLoading, error } = useGetLeaderboard();
  const [page, setPage] = useState(1);
  const itemsPerPage = 30;

  return (
    <Card className="card-border border-primary h-full">
      <CardContent className="p-0 h-full">
        <CardTitle className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-t-2xl flex-wrap space-y-2">
          <h1 className="text-xl m-0">🏆 Leaderboard</h1>
          <Pagination
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            items={players}
          />
        </CardTitle>

        {isLoading ? (
          <div className="p-5 h-full w-full">
            <div className="flex w-full h-full flex-col gap-4 pb-5">
              <div className="skeleton h-[80%] w-full"></div>
              <div className="skeleton h-[10%] w-full"></div>
              <div className="skeleton h-[10%] w-full"></div>
            </div>
          </div>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <PlayerTable page={page} players={players} />
        )}
      </CardContent>
    </Card>
  );
}
