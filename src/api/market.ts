import { API_BASE_URL } from "@/api/config";

// Get market
export const getMarket = async () => {
  const response = await fetch(`${API_BASE_URL}/game/market`);
  if (!response.ok) {
    throw new Error("Failed to fetch market");
  }

  return response.json();
};

const mockDataSets = [
  {
    items: [
      {
        id: "b0a227ed-2faa-4fcd-a6ba-5a0dac23d2c2",
        name: "Enhanced Fishing Rod",
        type: "fishing_rod",
        description: "Increases chance of catching rare fish",
        cost: 10000,
      },
      {
        id: "d86c46bc-c021-42eb-8126-e897c61f7f28",
        name: "Poison of Leveling",
        type: "poison_leveling",
        description:
          "PERMANENTLY steals a level and XP from another player (also increases fishing interval by 30s)",
        cost: 250000,
      },
    ],
  },
  {
    items: [
      {
        id: "b0a227ed-2faa-4fcd-a6ba-5a0dac23d2c2",
        name: "Enhanced Fishing Rod",
        type: "fishing_rod",
        description: "Increases chance of catching rare fish",
        cost: 10000,
      },
      {
        id: "d86c46bc-c021-42eb-8126-e897c61f7f28",
        name: "Poison of Leveling",
        type: "poison_leveling",
        description:
          "PERMANENTLY steals a level and XP from another player (also increases fishing interval by 30s)",
        cost: 250000,
      },
    ],
  },
  {
    items: [
      {
        id: "b0a227ed-2faa-4fcd-a6ba-5a0dac23d2c2",
        name: "Enhanced Fishing Rod",
        type: "fishing_rod",
        description: "Increases chance of catching rare fish",
        cost: 100,
      },
      {
        id: "d86c46bc-c021-42eb-8126-e897c61f7f28",
        name: "Poison of Leveling",
        type: "poison_leveling",
        description:
          "PERMANENTLY steals a level and XP from another player (also increases fishing interval by 30s)",
        cost: 2500,
      },
    ],
  },
];

// Counter to cycle through data sets
let mockIndex = 0;

export const mockGetMarket = async () => {
  const data = mockDataSets[mockIndex];
  mockIndex = (mockIndex + 1) % mockDataSets.length; // Cycle through data sets
  return data;
};
