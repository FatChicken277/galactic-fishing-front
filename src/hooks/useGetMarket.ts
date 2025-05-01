import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";

import { useNotification } from "@/context/NotificationContext";

import type { MarketItem } from "@/types/market";
import { getMarket } from "@/api/market";

// Load Market from localStorage
const loadMarketData = () => {
  try {
    const raw = localStorage.getItem("marketCosts");
    if (!raw)
      return {
        current: {},
        reference: {},
        timestamp: 0,
        expirationTimestamp: 0,
      };

    const parsed = JSON.parse(raw);
    return {
      current: parsed.current || {},
      reference: parsed.reference || {},
      timestamp: parsed.timestamp || 0,
      expirationTimestamp: parsed.expirationTimestamp || 0,
    };
  } catch (err) {
    console.error("Failed to load marketCosts:", err);
    return { current: {}, reference: {}, timestamp: 0, expirationTimestamp: 0 };
  }
};

// Save to local storage
const saveMarketData = (
  current: { [id: string]: number },
  reference: { [id: string]: number },
  timestamp: number,
  expirationTimestamp: number
) => {
  try {
    const payload = { timestamp, expirationTimestamp, current, reference };
    localStorage.setItem("marketCosts", JSON.stringify(payload));
  } catch (err) {
    console.error("Failed to save marketCosts:", err);
  }
};

const TWELVE_HOURS = 12 * 60 * 60 * 1000; // 43,200,000 ms

export const useGetMarket = () => {
  const { addNotification } = useNotification();
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);

  const marketDataRef = useRef(loadMarketData());

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
          const cachedCosts = cached.items.reduce(
            (acc: any, item: MarketItem) => {
              acc[item.id] = item.cost;
              return acc;
            },
            {}
          );
          const timestamp = Date.now();
          let { reference, expirationTimestamp } = marketDataRef.current;

          // Check if expiration has passed
          if (expirationTimestamp && Date.now() > expirationTimestamp) {
            reference = { ...cachedCosts };
            expirationTimestamp = 0;
          } else {
            // Use existing reference if not expired, else set to cachedCosts
            reference = Object.keys(reference).length ? reference : cachedCosts;
            expirationTimestamp = timestamp + TWELVE_HOURS; // New expiration for cache
          }

          marketDataRef.current = {
            current: cachedCosts,
            reference,
            timestamp,
            expirationTimestamp,
          };
          saveMarketData(
            cachedCosts,
            reference,
            timestamp,
            expirationTimestamp
          );

          // Set marketItems with enriched items
          const enrichedItems = cached.items.map((item: MarketItem) => {
            const refCost = reference[item.id] ?? item.cost;
            const priceChange = item.cost - refCost;
            return { ...item, priceChange };
          });

          setMarketItems(enrichedItems);
        }
      } catch (err) {
        addNotification("Failed to load content", "warning");
      }
    }

    loadInitialCache();
  }, [addNotification]);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["market"],
    queryFn: getMarket,
    select: (newData) => {
      let { current, reference, timestamp, expirationTimestamp } =
        marketDataRef.current;

      // Check if expiration has passed
      if (expirationTimestamp && Date.now() > expirationTimestamp) {
        reference = { ...current }; // Reset reference to current
        expirationTimestamp = 0; // Clear expiration (no reset needed until new change)
        saveMarketData(current, reference, timestamp, expirationTimestamp);
        marketDataRef.current = {
          current,
          reference,
          timestamp,
          expirationTimestamp,
        };
      }

      // Map new costs by id
      const newCosts = newData.items.reduce((acc: any, item: MarketItem) => {
        acc[item.id] = item.cost;
        return acc;
      }, {});

      // Check for changes
      const hasChanges =
        !current ||
        Object.keys(newCosts).length !== Object.keys(current).length ||
        Object.entries(newCosts).some(([id, cost]) => current[id] !== cost);

      // Add cost difference to items
      const enrichedItems = newData.items.map((item: MarketItem) => {
        const refCost = reference[item.id] ?? item.cost;
        const priceChange = item.cost - refCost;
        return { ...item, priceChange };
      });

      if (hasChanges) {
        timestamp = Date.now();
        expirationTimestamp = timestamp + TWELVE_HOURS;
        marketDataRef.current = {
          current: newCosts,
          reference: current || newCosts,
          timestamp,
          expirationTimestamp,
        };
        saveMarketData(
          newCosts,
          current || newCosts,
          timestamp,
          expirationTimestamp
        );
      }

      return { items: enrichedItems, timestamp };
    },
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
  });

  return {
    market: data?.items.length ? data?.items : marketItems || [],
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
