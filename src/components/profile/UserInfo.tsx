import { UserIcon } from "@heroicons/react/24/outline";

interface UserInfoProps {
  username: string;
  isGuest: boolean;
}

export function UserInfo({ username, isGuest }: UserInfoProps) {
  const userType = isGuest ? "Guest" : "Agent Rebel";

  return (
    <div className="flex items-center space-x-2">
      {/* Icon */}
      <div className="avatar avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full">
          <UserIcon className="w-1/2" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <div className="text-sm font-bold truncate">{username}</div>
        <div className="text-xs font-light truncate">
          {!isGuest ? "Unrecognized " : ""}
          {userType}
        </div>
      </div>
    </div>
  );
}
