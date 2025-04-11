import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Register() {
    const IP = import.meta.env.VITE_IP_ADDRESS;
    const [isSuccess, setIsSuccess] = useState(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSuccess(false)
        try {
            const response = await fetch(`http://${IP}:3000/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const result = await response.json();
            if(response.status == 200) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-100 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full space-y-6 animate-fade-in"
                >
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        Register
                    </h2>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                    {isSuccess && (
                    <div className="px-4 py-2 bg-green-100 border border-green-400 text-green-700 rounded">
                        ✅ Registration Successful!
                    </div>
                )}
                </form>
            </div>
        </>
    );
}

export default Register;
