import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("pthgtm611919@gmail.com");
  const [password, setPassword] = useState("1234@Abcd");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const API_URL =
        import.meta.env.MODE === "development"
          ? "/api/auth/login/"
          : "https://frotloginapi.onrender.com/api/auth/login";

      const res = await axios.post(API_URL, {
        email,
        password,
      });

      console.log("Token:", res.data.refresh);
      localStorage.setItem("token", res.data.refresh);
      setMessage("Login successful!");
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("Invalid email or password");
      } else {
        setMessage("Something went wrong. Try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
