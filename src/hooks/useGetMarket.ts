import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";

import { useNotification } from "@/context/NotificationContext";

import type { MarketItem } from "@/types/market";
import { getMarket } from "@/api/market";

export const useGetMarket = () => {
  const { addNotification } = useNotification();
  const [initialCacheLoaded, setInitialCacheLoaded] = useState(false);

  // Load previous market from localStorage
  const loadPreviousMarket = (): MarketItem[] | null => {
    try {
      const raw = localStorage.getItem("previousMarket");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      addNotification(
        "Failed to load previousMarket from localStorage",
        "error"
      );
      return null;
    }
  };

  // Save previous market to localStorage
  const savePreviousMarket = (items: MarketItem[]) => {
    try {
      localStorage.setItem("previousMarket", JSON.stringify(items));
    } catch (err) {
      addNotification("Failed to save previousMarket to localStorage", "error");
    }
  };

  const previousMarketRef = useRef<MarketItem[] | null>(loadPreviousMarket());

  // Hydrate with Service Worker cache if available
  useEffect(() => {
    async function loadInitialCache() {
      try {
        const cache = await caches.open("api-cache");
        const response = await cache.match(
          "https://api-game.bloque.app/game/market"
        );
        if (response) {
          const cached = await response.json();
          if (!previousMarketRef.current) {
            previousMarketRef.current = cached.items ?? [];
          }
        }
      } catch (err) {
        addNotification("Failed to load Service Worker cache", "warning");
      } finally {
        setInitialCacheLoaded(true);
      }
    }

    loadInitialCache();
  }, []);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["market"],
    queryFn: getMarket,
    enabled: initialCacheLoaded,
    select: (newData) => {
      const previous = previousMarketRef.current;

      const enriched: MarketItem[] = newData.items.map((item: MarketItem) => {
        const old = previous?.find((o) => o.id === item.id);
        const priceChange = old ? item.cost - old.cost : 0;
        return { ...item, priceChange };
      });

      // Persist new data for next load
      previousMarketRef.current = newData.items;
      savePreviousMarket(newData.items);

      return { ...newData, items: enriched };
    },
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });

  return {
    market: (data?.items as MarketItem[]) ?? [],
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
