import { Card, CardContent, CardTitle } from "@/components/common/Card";

import {
  MinusIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";

import type { MarketItemType } from "@/types/market";

interface MarketItemProps {
  item: MarketItemType;
}

export function MarketItem({ item }: MarketItemProps) {
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
    <Card className={`card-border ${borderColors[item.type]}`}>
      <CardContent>
        <CardTitle className="flex justify-between items-center">
          <p className="text-lg font-bold">{item.name}</p>
        </CardTitle>

        <div className={`mt-1 badge badge-sm ${badgeColors[item.type]}`}>
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
                {item.priceChange !== 0 && Math.abs(item.priceChange)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
