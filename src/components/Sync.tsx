import { Button } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";
import { useGetMarket } from "@/hooks/useGetMarket";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

function Sync() {
  const { refetch: refetchLeaderboard, isFetching: isFetchingLeaderboard } =
    useGetLeaderboard();
  const { refetch: refetchMarket, isFetching: isFetchingMarket } =
    useGetMarket();

  const isOnline = useOnlineStatus();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="inline-grid *:[grid-area:1/1]">
          <div
            className={
              isOnline
                ? "status status-success animate-ping"
                : "status status-error animate-ping"
            }
          ></div>
          <div
            className={
              isOnline ? "status status-success" : "status status-error"
            }
          ></div>
        </div>
        <p className={`${isOnline ? "text-success" : "text-error"} text-sm`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      <Button
        onClick={() => {
          refetchLeaderboard();
          refetchMarket();
        }}
        className="btn btn-square"
        disabled={isFetchingLeaderboard || isFetchingMarket || !isOnline}
      >
        <ArrowPathIcon
          className={`size-5 ${
            isFetchingLeaderboard || isFetchingMarket ? "animate-spin" : ""
          }`}
        />
      </Button>
    </div>
  );
}

export default Sync;
