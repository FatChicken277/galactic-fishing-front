import { useQuery } from "@tanstack/react-query";

import { getLeaderboard } from "@/api/leaderboard";

import type { Player } from "@/types/user";

export const useGetLeaderboard = () => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
    refetchInterval: 60000, // 1 minute
    refetchIntervalInBackground: true,
  });

  return {
    players: (data?.players as Player[]) ?? [],
    tiers: data?.legend?.tiers ?? [],
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
