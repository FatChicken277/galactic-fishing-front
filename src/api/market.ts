import { API_BASE_URL } from "@/api/config";

// Get market
export const getMarket = async () => {
  const response = await fetch(`${API_BASE_URL}/game/market`);
  if (!response.ok) {
    throw new Error("Failed to fetch market");
  }

  return response.json();
};
