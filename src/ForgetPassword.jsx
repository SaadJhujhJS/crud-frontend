import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter a new password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/website/login/get-logins");
      if (res.data.status !== "success" || !res.data.data) {
        toast.error("Unable to verify account. Please try again.");
        return;
      }
      const user = res.data.data.find((u) => u.email === email.trim());
      if (!user) {
        toast.error("No account found with this email.");
        return;
      }
      const id = user.id || user._id;
      const updateRes = await axios.put(
        `http://localhost:8000/api/website/login/update-logins/${id}`,
        { password: password.trim() }
      );
      if (updateRes.data?.status === "success" || updateRes.status === 200) {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.status === 404 ? "API not found. Please check the server." : "Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-blue-500/50">
        <h2 className="text-3xl font-bold text-center text-black mb-6 transition duration-300 hover:text-blue-500">
          Update your password
        </h2>
        <form className="space-y-7" onSubmit={handleUpdatePassword}>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              autoComplete="email"
              disabled={loading}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              autoComplete="password"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
          >
            {loading ? "Updating…" : "Update"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
