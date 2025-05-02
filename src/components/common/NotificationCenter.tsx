import clsx from "clsx";
import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const NotificationCenter = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    notifications.length > 0 && (
      <div className="fixed top-5 sm:top-auto md:bottom-30 right-5 z-50 w-[90%] sm:w-[30%] space-y-2 overflow-hidden">
        {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            id={n.id}
            message={n.message}
            type={n.type}
            onClose={removeNotification}
          />
        ))}
      </div>
    )
  );
};

const NotificationItem = ({
  id,
  message,
  type,
  onClose,
}: {
  id: number;
  message: string;
  type: string;
  onClose: (id: number) => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      role="alert"
      className={clsx(
        `alert alert-${type} alert-outline !bg-base-200 !text-base-content flex items-center justify-between transition-transform duration-300`,
        visible ? "translate-x-0" : "translate-x-full"
      )}
    >
      <span className="text-sm">{message}</span>
      <button onClick={() => onClose(id)} className="btn btn-sm" title="Close">
        <XMarkIcon className="size-5" />
      </button>
    </div>
  );
};
