import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="
      bg-[#23084D]
      sticky
      top-0
      z-50
      shadow-lg
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        h-16
        flex
        justify-between
        items-center
      "
      >
        <h1 className="text-white text-xl sm:text-2xl font-bold">
          FitTrack
        </h1>

        <div className="flex gap-4 sm:gap-6 items-center">
          <Link
            to="/"
            className="text-violet-100 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/register"
            className="text-violet-100 hover:text-white"
          >
            Register
          </Link>

         <Link to="/login">
  <button
    className="
    bg-white
    text-[#23084D]
    px-4
    py-2
    rounded-xl
    font-semibold
    "
  >
    Login
  </button>
</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;