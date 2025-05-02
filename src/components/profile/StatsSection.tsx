import {
  TrophyIcon,
  AcademicCapIcon,
  SparklesIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

import { StatItem } from "@/components/common/StatItem";

import type { PlayerType } from "@/types/user";

interface StatsSectionProps {
  player: PlayerType;
}

const top3Emojis = ["🥇", "🥈", "🥉"];

export function StatsSection({ player }: StatsSectionProps) {
  const Sections = {
    Rank: {
      icon: <TrophyIcon />,
      title: "Rank",
      value: `${top3Emojis[player.rank - 1] || ""} #${player.rank}`,
      description: "Leaderboard position",
      color: "primary" as const,
    },
    Level: {
      icon: <AcademicCapIcon />,
      title: "Level",
      value: `${player.fishEmojis} ${player.level}`,
      description: `${player.emojiDescription}`,
      color: "secondary" as const,
    },
    XP: {
      icon: <SparklesIcon />,
      title: "XP",
      value: player.xp.toString(),
      description: "Experience points",
      color: "accent" as const,
    },
    Gold: {
      icon: <CurrencyDollarIcon />,
      title: "Gold",
      value: player.gold.toString(),
      description: "Spend wisely!",
      color: "warning" as const,
    },
  };

  return (
    <div className="grid grid-cols-1 gap-2 space-y-2 pr-2 overflow-y-scroll">
      {Object.entries(Sections).map(([key, value]) => (
        <StatItem
          key={key}
          icon={value.icon}
          title={value.title}
          value={value.value}
          description={value.description}
          color={value.color}
        />
      ))}
    </div>
  );
}
