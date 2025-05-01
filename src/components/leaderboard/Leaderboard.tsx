import { useState } from "react";

import { Button } from "@headlessui/react";
import { Card, CardContent, CardTitle } from "@/components/common/Card";
import { PlayerTable } from "@/components/leaderboard/PlayerTable";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";

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
          <div className="flex justify-center items-center space-x-4">
            <Button
              className="btn btn-primary btn-square btn-xs"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <ChevronDoubleLeftIcon className="size-2/3" />
            </Button>
            <Button
              className="btn btn-primary btn-square btn-xs"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <ChevronLeftIcon className="size-2/3" />
            </Button>
            <span className="text-base">{page}</span>
            <Button
              className="btn btn-primary btn-square btn-xs"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === Math.ceil(players.length / itemsPerPage)}
            >
              <ChevronRightIcon className="size-2/3" />
            </Button>
            <Button
              className="btn btn-primary btn-square btn-xs"
              onClick={() => setPage(Math.ceil(players.length / itemsPerPage))}
              disabled={page === Math.ceil(players.length / itemsPerPage)}
            >
              <ChevronDoubleRightIcon className="size-2/3" />
            </Button>
          </div>
        </CardTitle>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        <PlayerTable page={page} players={players} />
      </CardContent>
    </Card>
  );
}
