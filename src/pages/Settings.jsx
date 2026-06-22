import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Settings
          </h1>
          <p className="text-gray-500">
            Manage system preferences and configurations
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-600">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Profile Settings
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
            Save Changes
          </button>
        </div>

        {/* System Preferences */}
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-600">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            System Preferences
          </h2>

          <div className="space-y-4">

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <span>Enable Alerts & Notifications</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-red-600"
              />
            </div>

            {/* Auto Refresh */}
            <div className="flex items-center justify-between">
              <span>Auto Refresh Dashboard</span>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={() => setAutoRefresh(!autoRefresh)}
                className="w-5 h-5 accent-red-600"
              />
            </div>

          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-600">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Security
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="New Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
            Update Password
          </button>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-600">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            System Information
          </h2>

          <p className="text-gray-600">
            Version: 1.0.0
          </p>
          <p className="text-gray-600">
            Environment: Production
          </p>
          <p className="text-gray-600">
            Last Updated: April 2026
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Settings;