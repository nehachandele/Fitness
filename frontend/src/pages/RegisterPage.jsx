import { useState } from "react";
import { registerUser } from "../services/authService";
import { toast} from "react-toastify";

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

        if (!formData.email.trim()) {
            toast.error("📧 Email is required");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("🔒 Password is required");
            return;
        }

        if (formData.password.length < 6) {
            toast.warning(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {

            setLoading(true);

            await registerUser(formData);

            toast.success(
                " Registration Successful!"
            );

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "USER",
            });

        } catch (error) {

            toast.error(
                error.response?.data ||
                "❌ Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            className="
 min-h-screen
 flex
 justify-center
 items-center
 px-4
 bg-gradient-to-br
 from-white
 via-[#F8F5FF]
 to-[#EDE9FE]
 "
        >

            <div
                className="
 bg-white
 w-full
 max-w-md
 rounded-3xl
 p-8
 shadow-[0_10px_30px_rgba(35,8,77,0.08)]
 "
            >
                <h2
                    className="
 text-3xl
 font-bold
 text-center
 text-[#23084D]
 "
                >
                    Create Account
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="firstName"
                        placeholder="First Name"
                        className="
w-full
p-3
rounded-xl
border
border-violet-200
focus:outline-none
focus:border-[#23084D]
"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                    <input
                        name="lastName"
                        placeholder="Last Name"
                        className="
w-full
p-3
rounded-xl
border
border-violet-200
focus:outline-none
focus:border-[#23084D]
"
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        className="
w-full
p-3
rounded-xl
border
border-violet-200
focus:outline-none
focus:border-[#23084D]
"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="
w-full
p-3
rounded-xl
border
border-violet-200
focus:outline-none
focus:border-[#23084D]
"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        className="
w-full
p-3
rounded-xl
border
border-violet-200
focus:outline-none
focus:border-[#23084D]
"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <button
                        disabled={loading}
                        className="
 w-full
 bg-[#23084D]
 hover:bg-[#3B1175]
 text-white
 py-3
 rounded-xl
 transition
 "
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

               

            </div>
        </div>
    );
};

export default RegisterPage;