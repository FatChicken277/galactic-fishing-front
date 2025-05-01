import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Button } from "@headlessui/react";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

function LogOut() {
  const { logout } = useContext(UserContext) || {};

  return (
    <Button className="btn btn-square" onClick={logout}>
      <ArrowLeftStartOnRectangleIcon className="size-5" />
    </Button>
  );
}
export default LogOut;
