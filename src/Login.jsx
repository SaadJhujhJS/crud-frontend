import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    axios.get("http://localhost:8000/api/website/login/get-logins")
    .then((res) => {
      console.log(res.data);
      if(res.data.status === "success" && res.data.data) {
        const user = res.data.data.find(
          (user) => user.email === email && user.password === password
        );
        if(user) {
          localStorage.setItem("isAuthenticated", "true");
          navigate("/");
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } else {
        toast.error("No users found. Please check the server.");
      }
    })
    .catch((err) => {
      console.log(err);
      if(err.response && err.response.status === 404) {
        toast.error("API endpoint not found. Please check the server.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-blue-500/50">
        <h2 className="text-3xl font-bold text-center text-black mb-6 transition duration-300 hover:text-blue-500">
          Login to Your Account
        </h2>
        <form className="space-y-7" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              value={password}
                name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
