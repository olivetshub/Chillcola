import React, { useState } from "react";
import HeroImage from "../assets/Heroimage.JPG";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const defaultUsername = "admin";
    const defaultPassword = "123456";

    if (form.username === defaultUsername && form.password === defaultPassword) {
      if (form.remember) {
        localStorage.setItem("user", JSON.stringify({ username: form.username }));
      }
      window.location.href = "/dashboard";
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="flex h-screen w-full">

      {/* LEFT SIDE - IMAGE (65%) */}
      <div
        className="hidden lg:block lg:w-[60%] h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      ></div>

      {/* RIGHT SIDE - LOGIN FORM (35%) */}
      <div className="flex w-full lg:w-[40%] items-center justify-center bg-white">
        <div className="w-full max-w-sm px-6">

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-red-600">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">
                Please login to continue
              </p>
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                placeholder="admin"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                placeholder="123456"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="accent-red-600"
                />
                Remember me
              </label>

              <button type="button" className="text-red-600 hover:underline">
                Forgot?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold transition"
            >
              Login
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;