import { useState } from "react";

import { Button } from "@headlessui/react";
import { Card, CardContent, CardTitle } from "@/components/common/Card";
import { useGetMarket } from "@/hooks/useGetMarket";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
} from "@heroicons/react/16/solid";

import type { MarketItem } from "@/types/market";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

export function Market() {
  const { market, isLoading, error } = useGetMarket();
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const badgeColors: { [key: string]: string } = {
    poison_delay: "badge-warning",
    poison_leveling: "badge-error",
    poison_recovery: "badge-success",
    fishing_rod: "badge-secondary",
    poison_reveal_fishes: "badge-info",
  };

  const borderColors: { [key: string]: string } = {
    poison_delay: "border-warning",
    poison_leveling: "border-error",
    poison_recovery: "border-success",
    fishing_rod: "border-secondary",
    poison_reveal_fishes: "border-info",
  };

  return (
    <Card className="card-border border-primary h-full overflow-y-auto">
      <CardContent className="p-0">
        <CardTitle className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-t-2xl flex-wrap space-y-2">
          <h1 className="text-xl m-0">🛒 Market</h1>
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
              disabled={page === Math.ceil(market.length / itemsPerPage)}
            >
              <ChevronRightIcon className="size-2/3" />
            </Button>
            <Button
              className="btn btn-primary btn-square btn-xs"
              onClick={() => setPage(Math.ceil(market.length / itemsPerPage))}
              disabled={page === Math.ceil(market.length / itemsPerPage)}
            >
              <ChevronDoubleRightIcon className="size-2/3" />
            </Button>
          </div>
        </CardTitle>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 py-2 pb-6 [grid-auto-rows:1fr]">
            {market
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item: MarketItem) => (
                <Card className={`card-border ${borderColors[item.type]}`}>
                  <CardContent>
                    <CardTitle className="flex justify-between items-center">
                      <p className="text-lg font-bold">{item.name}</p>
                    </CardTitle>

                    <div
                      className={`mt-1 badge badge-sm ${
                        badgeColors[item.type]
                      }`}
                    >
                      {item.type}
                    </div>

                    <div className="divider m-0"></div>

                    <div className="flex flex-col h-full space-y-4">
                      <p className="text-sm text-justify">{item.description}</p>
                      <div className="mt-auto flex justify-between">
                        <p className="text-warning">{item.cost} Gold</p>

                        {item?.priceChange !== undefined && (
                          <div className="ml-2 text-xs flex items-center">
                            {item.priceChange === 0 ? (
                              <MinusIcon className="mr-1 size-3 text-gray-400" />
                            ) : item.priceChange > 0 ? (
                              <ArrowUpIcon className="mr-1 size-3 text-green-500" />
                            ) : (
                              <ArrowDownIcon className="mr-1 size-3 text-red-500" />
                            )}
                            {item.priceChange !== 0 &&
                              Math.abs(item.priceChange)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
