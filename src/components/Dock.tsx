import clsx from "clsx";

import { TabGroup, Tab } from "@headlessui/react";
import {
  UserIcon,
  ClockIcon,
  TrophyIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

interface DockProps {
  className?: string;
  setSelectedTab: (tabIndex: number) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dock({ className, setSelectedTab }: DockProps) {
  return (
    <TabGroup
      className={clsx(
        `dock dock-sm sticky bottom-0 inset-x-0 gap-2 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]`,
        className
      )}
    >
      <Tab
        as="button"
        onClick={() => setSelectedTab(0)}
        className={({ selected }) =>
          classNames(selected ? "dock-active" : "", "p-2 focus:outline-none")
        }
      >
        <UserIcon className="size-[1.2em]" />
      </Tab>

      <Tab
        as="button"
        onClick={() => setSelectedTab(1)}
        className={({ selected }) =>
          classNames(selected ? "dock-active" : "", "p-2 focus:outline-none")
        }
      >
        <TrophyIcon className="size-[1.2em]" />
      </Tab>

      <Tab
        as="button"
        onClick={() => setSelectedTab(2)}
        className={({ selected }) =>
          classNames(selected ? "dock-active" : "", "p-2 focus:outline-none")
        }
      >
        <ShoppingCartIcon className="size-[1.2em]" />
      </Tab>

      <Tab
        as="button"
        onClick={() => setSelectedTab(3)}
        className={({ selected }) =>
          classNames(selected ? "dock-active" : "", "p-2 focus:outline-none")
        }
      >
        <ClockIcon className="size-[1.2em]" />
      </Tab>
    </TabGroup>
  );
}
