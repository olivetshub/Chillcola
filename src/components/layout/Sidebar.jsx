import { SettingsIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // 🎨 Coca-Cola Theme Logic
  const getNavLinkClass = ({ isActive }) => {
    const base = "flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out whitespace-nowrap";
    const active = "bg-red-600 text-white shadow-lg shadow-red-200 ring-1 ring-red-700";
    const inactive = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
    
    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 shadow-xl fixed left-0 top-0 flex flex-col p-5 z-50">
      
      {/* 🥤 Logo Section */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-11 h-11 bg-red-600 rounded-2xl flex items-center justify-center text-white font-extrabold shadow-lg shadow-red-200 ">
          C
        </div>
        <h1 className="text-2xl font-black text-gray-950 tracking-tighter">
          Chill<span className="text-red-600 italic">Cola</span>
        </h1>
      </div>

      {/* 📌 Navigation Links */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={getNavLinkClass}>
          <DashboardIcon />
          <span>Dashboard</span>
        </NavLink>

        {/* <NavLink to="/zones" className={getNavLinkClass}>
          <ZonesIcon />
          <span>Zones</span>
        </NavLink> */}

        <NavLink to="/devices" className={getNavLinkClass}>
          <DevicesIcon />
          <span>Devices</span>
        </NavLink>

        <NavLink to="/alerts" className={getNavLinkClass}>
          <AlertsIcon />
          <span>Alerts</span>
        </NavLink>
        
        <NavLink to="/settings" className={getNavLinkClass}>
          <SettingsIcon />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* 👤 Admin Profile Card */}
      <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm">
        <div className="relative">
          <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full font-bold border-2 border-white shadow-md">
            A
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-gray-900 truncate">Admin User</p>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">System User</p>
        </div>
      </div>
    </div>
  );
};

// --- Simple Inline Icons to make it look great immediately ---

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
  </svg>
);

const ZonesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DevicesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const AlertsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export default Sidebar;