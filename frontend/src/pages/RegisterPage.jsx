import { useState } from "react";
import { registerUser } from "../services/authService";

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await registerUser(formData);

      setMessage("Registration Successful");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "USER",
      });

    } catch (error) {

      setMessage(
        error.response?.data ||
          "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="firstName"
            placeholder="First Name"
            className="w-full border p-3 rounded"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            className="w-full border p-3 rounded"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full border p-3 rounded"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            className="w-full bg-purple-600 text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default RegisterPage;