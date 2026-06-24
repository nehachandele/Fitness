import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between">

        <h1 className="text-3xl font-bold text-purple-600">
          FitTrack
        </h1>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>

          <Link to="/register">
            Register
          </Link>

          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;