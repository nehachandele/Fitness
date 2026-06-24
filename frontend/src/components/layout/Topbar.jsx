import { getUser } from "../../utils/auth";

const Topbar = () => {
  const user = getUser();

  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-5
      shadow-sm
      flex
      justify-between
      items-center
      "
    >
      <div>
        <h2
          className="
          text-xl
          font-bold
          text-[#23084D]
          "
        >
          Welcome Back 👋
        </h2>

        <p className="text-gray-500">
          {user?.firstName} {user?.lastName}
        </p>
      </div>

      <div
        className="
        w-12
        h-12
        rounded-full
        bg-gradient-to-r
        from-[#23084D]
        to-[#5B21B6]
        text-white
        flex
        items-center
        justify-center
        font-bold
        "
      >
        {user?.firstName?.charAt(0)}
      </div>
    </div>
  );
};

export default Topbar;