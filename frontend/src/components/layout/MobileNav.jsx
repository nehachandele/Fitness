import {
  FaHome,
  FaRunning,
  FaRobot,
  FaUser,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  const items = [
    {
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      path: "/activities",
      icon: <FaRunning />,
    },
    {
      path: "/recommendations",
      icon: <FaRobot />,
    },
    {
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <div
      className="
      lg:hidden
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      border-violet-100
      flex
      justify-around
      py-4
      z-50
      "
    >
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
          text-xl

          ${
            location.pathname === item.path
              ? "text-[#23084D]"
              : "text-gray-400"
          }
          `}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;