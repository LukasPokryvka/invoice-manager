import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "../../backend/apiClient";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const loggedOutMenu = [
  {
    item: <Link href="/auth/login">Login</Link>,
  },
  {
    item: <Link href="/auth/register">Register</Link>,
  },
];

const loggedInMenu = [
  {
    item: <Link href="/clients">Clients</Link>,
  },
  {
    item: <Link href="/user/profile">MyInfo</Link>,
  },
  {
    item: (
      <Link href="/auth/login" onClick={() => client.authStore.clear()}>
        Logout
      </Link>
    ),
  },
];

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (client.authStore.isValid) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [client.authStore.isValid]);

  const renderMenuItems = (itemsArray: Record<string, JSX.Element>[]) =>
    itemsArray.map((item, index) => <li key={index}>{item.item}</li>);

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
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {isLoggedIn && renderMenuItems(loggedInMenu)}
              {!isLoggedIn && renderMenuItems(loggedOutMenu)}
            </ul>
          </div>
        </div>
        <div className="p-4 grow overflow-auto">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
