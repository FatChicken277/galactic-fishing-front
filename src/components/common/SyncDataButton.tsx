import { Button } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { Status } from "@/components/common/Status";

import { useGetMarket } from "@/hooks/useGetMarket";
import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";
import { useGetOnlineStatus } from "@/hooks/useGetOnlineStatus";

export function SyncDataButton() {
  const { refetch: refetchLB, isFetching: isFetchinLB } = useGetLeaderboard();
  const { refetch: refetchM, isFetching: isFetchingM } = useGetMarket();

  const isOnline = useGetOnlineStatus();

  const isFetching = isFetchinLB || isFetchingM;

  return (
    <div className="flex items-center space-x-4">
      {/* STATUS Indicator */}
      <div className="flex items-center space-x-2">
        <Status color={isOnline ? "success" : "error"} />
        <p className={`${isOnline ? "text-success" : "text-error"} text-sm`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      {/* SYNC Button */}
      <Button
        onClick={() => {
          refetchLB();
          refetchM();
        }}
        className="btn btn-square"
        disabled={isFetching || !isOnline}
      >
        <ArrowPathIcon
          className={`size-5 ${isFetching ? "animate-spin" : ""}`}
        />
      </Button>
    </div>
  );
}
