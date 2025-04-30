import { API_BASE_URL } from "@/api/config";

// Get leaderboard
export const getLeaderboard = async () => {
  const response = await fetch(`${API_BASE_URL}/game/leaderboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }

  return response.json();
};
