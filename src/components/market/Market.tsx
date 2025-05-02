import { useState } from "react";

import { Card, CardContent, CardTitle } from "@/components/common/Card";
import { Pagination } from "@/components/common/Pagination";
import { MarketItem } from "@/components/market/MarketItem";

import type { MarketItemType } from "@/types/market";

import { useGetMarket } from "@/hooks/useGetMarket";

export function Market() {
  const { market, isLoading, error } = useGetMarket();
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = 6;

  return (
    <Card className="card-border border-primary h-full overflow-y-auto">
      <CardContent className="p-0">
        <CardTitle className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-t-2xl flex-wrap space-y-2">
          <h1 className="text-xl m-0">🛒 Market</h1>
          <Pagination
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            items={market}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4 py-2 pb-6 [grid-auto-rows:1fr]">
            {market
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item: MarketItemType) => (
                <MarketItem key={item.id} item={item} />
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
