import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Zones from "./pages/Zones";
import Alerts from "./pages/Alerts";
import Devices from "./pages/Devices";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zones" element={<Zones/>} />
        <Route path="/alerts" element={<Alerts/>} />
        <Route path="/devices" element={<Devices/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;