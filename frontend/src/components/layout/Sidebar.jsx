import {
  FaHome,
  FaRunning,
  FaRobot,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Activities",
      path: "/activities",
      icon: <FaRunning />,
    },
    {
      name: "AI Coach",
      path: "/recommendations",
      icon: <FaRobot />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside
      className="
      hidden
      lg:flex
      flex-col
      w-72
      min-h-screen
      bg-[#23084D]
      text-white
      p-6
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        mb-10
        "
      >
        FitTrack
      </h1>

      <div className="space-y-3">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`
            flex
            items-center
            gap-3
            p-4
            rounded-2xl
            transition

            ${
              location.pathname === menu.path
                ? "bg-white text-[#23084D]"
                : "hover:bg-[#3B1175]"
            }
            `}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}
      </div>

      <button
        className="
        mt-auto
        bg-white
        text-[#23084D]
        p-4
        rounded-2xl
        font-semibold
        "
      >
        <FaSignOutAlt className="inline mr-2" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;