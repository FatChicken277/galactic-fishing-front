import { useNotification } from "@/context/NotificationContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const NotificationCenter = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 w-dvw p-10 h-10">
      {notifications.map((n) => (
        <div
          key={n.id}
          role="alert"
          className={`alert alert-${n.type} alert-soft shadow-md flex items-center justify-between`}
        >
          <span className="text-sm">{n.message}</span>
          <button
            onClick={() => removeNotification(n.id)}
            className="btn btn-sm btn-ghost"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>
      ))}
    </div>
  );
};
