import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/website/login/login-insert", {
      email: email,
      password: password,
      name: name
    })
    .then((res) => {
      console.log(res.data);
      if(res.data.status === "success") {
        toast.success("Account created successfully! Redirecting to login...")
        navigate("/login");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    })
    .catch((err) => {
      console.log(err);
      if(err.response && err.response.status === 404) {
        toast.error("API endpoint not found. Please check the server.");
      } else {
        toast.error("Sign Up failed. Please try again.");
      }
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <ToastContainer />
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-blue-500/50">
        <h2 className="text-3xl font-bold text-center text-black mb-6 transition duration-300 hover:text-blue-500">
            Create Your Account
        </h2>
        <form className="space-y-7" onSubmit={handleSignUp}>
          {/* Email Input */}
          <div className="relative">
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
