import React from "react";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Navbar />

      {/* Right Content Area */}
      <div className="flex flex-col flex-1 ml-64">

        {/* Main Content */}
        <main className="flex-grow p-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};

export default DashboardLayout;