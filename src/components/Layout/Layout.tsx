import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "../../backend/apiClient";
import { useUser } from "../../hooks/userQueries";
import { getNameInitials } from "../../lib/getNameInitials";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { data: user } = useUser();

  useEffect(() => {
    if (client.authStore.isValid) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [client.authStore.isValid]);

  const renderMenuItems = (itemsArray: Record<string, JSX.Element>[]) =>
    itemsArray.map((item, index) => <div key={index}>{item.item}</div>);

  const loggedOutMenu = [
    {
      item: (
        <Link className="btn" href="/auth/login">
          Login
        </Link>
      ),
    },
    {
      item: (
        <Link className="btn" href="/auth/register">
          Register
        </Link>
      ),
    },
  ];

  const loggedInMenu = [
    {
      item: (
        <Link className="btn btn-ghost" href="/clients">
          Clients
        </Link>
      ),
    },
    {
      item: (
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="rounded-full bg-accent text-neutral-content w-10">
              <span>{getNameInitials(user?.name || "")}</span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52"
          >
            <li>
              <Link href="/user/profile">Profile</Link>
            </li>
            <li>
              <Link href="/auth/login" onClick={() => client.authStore.clear()}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section className="flex">
      {isLoggedIn && <Sidebar />}
      <div className="flex flex-col w-full max-h-screen">
        <div className="navbar bg-base-200">
          <div className="flex-1">
            <Link
              href="/dashboard"
              className="btn btn-ghost normal-case text-xl"
            >
              INVOICEr
            </Link>
          </div>
          <div className="flex-none gap-2 mr-2">
            {isLoggedIn && renderMenuItems(loggedInMenu)}
            {!isLoggedIn && renderMenuItems(loggedOutMenu)}
          </div>
        </div>
        <div className="p-4 grow overflow-auto">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
