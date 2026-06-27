import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";
import { saveAuth } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      saveAuth(response);
      const user = response.data.user;

if (
    user.age == null ||
    user.height == null ||
    user.weight == null ||
    user.gender == null ||
    user.fitnessGoal == null
) {
    navigate("/profile/setup");
} else {
    navigate("/dashboard");
}

      toast.success("Login Successful", {
        style: {
          background: "#23084D",
          color: "#fff",
          borderRadius: "16px",
        },
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      toast.error("Invalid Email or Password", {
        style: {
          background: "#FFF1F2",
          color: "#BE123C",
          borderRadius: "16px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      bg-gradient-to-br
      from-white
      via-[#F8F5FF]
      to-[#EDE9FE]
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-[32px]
        p-8
        shadow-[0_15px_40px_rgba(35,8,77,0.08)]
        border
        border-violet-100
        "
      >
        <div className="text-center mb-8">
          <h1
            className="
            text-4xl
            font-bold
            text-[#23084D]
            "
          >
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue your fitness journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="
              w-full
              p-3
              rounded-xl
              border
              border-violet-200
              focus:outline-none
              focus:border-[#23084D]
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="
                w-full
                p-3
                rounded-xl
                border
                border-violet-200
                focus:outline-none
                focus:border-[#23084D]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                "
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="
            w-full
            bg-[#23084D]
            hover:bg-[#3B1175]
            text-white
            py-3
            rounded-xl
            font-medium
            transition-all
            duration-300
            hover:scale-[1.02]
            "
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        <p
          className="
          text-center
          mt-6
          text-gray-500
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
            text-[#23084D]
            font-semibold
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;