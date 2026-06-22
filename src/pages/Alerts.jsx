import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const alertsData = [
  { id: "AL-001", fridgeId: "FR-FSD-2", zone: "CBU", city: "Faisalabad", type: "High Temperature", severity: "Critical", status: "Active", time: "2 mins ago" },
  { id: "AL-002", fridgeId: "FR-HYD-3", zone: "SBU", city: "Hyderabad", type: "Power OFF", severity: "Critical", status: "Active", time: "5 mins ago" },
  { id: "AL-003", fridgeId: "FR-LHR-1", zone: "CBU", city: "Lahore", type: "Door Open", severity: "Warning", status: "Resolved", time: "10 mins ago" },
  { id: "AL-004", fridgeId: "FR-KHI-4", zone: "SBU", city: "Karachi", type: "Low Voltage", severity: "Warning", status: "Active", time: "7 mins ago" },
  { id: "AL-005", fridgeId: "FR-ISB-2", zone: "CBU", city: "Islamabad", type: "High Humidity", severity: "Warning", status: "Active", time: "12 mins ago" },
  { id: "AL-006", fridgeId: "FR-QTA-5", zone: "SBU", city: "Quetta", type: "Compressor Failure", severity: "Critical", status: "Active", time: "3 mins ago" },
  { id: "AL-007", fridgeId: "FR-FSD-6", zone: "CBU", city: "Faisalabad", type: "Temperature Spike", severity: "Critical", status: "Active", time: "1 min ago" },
  { id: "AL-008", fridgeId: "FR-KHI-7", zone: "SBU", city: "Karachi", type: "Door Open", severity: "Warning", status: "Resolved", time: "15 mins ago" },
  { id: "AL-009", fridgeId: "FR-LHR-5", zone: "CBU", city: "Lahore", type: "Power Fluctuation", severity: "Warning", status: "Active", time: "6 mins ago" },
  { id: "AL-010", fridgeId: "FR-HYD-8", zone: "SBU", city: "Hyderabad", type: "High Temperature", severity: "Critical", status: "Active", time: "4 mins ago" },
  { id: "AL-011", fridgeId: "FR-ISB-7", zone: "CBU", city: "Islamabad", type: "Sensor Failure", severity: "Critical", status: "Active", time: "9 mins ago" },
  { id: "AL-012", fridgeId: "FR-QTA-3", zone: "SBU", city: "Quetta", type: "Low Voltage", severity: "Warning", status: "Resolved", time: "20 mins ago" },
  { id: "AL-013", fridgeId: "FR-FSD-9", zone: "CBU", city: "Faisalabad", type: "Gas Leakage", severity: "Critical", status: "Active", time: "2 mins ago" },
  { id: "AL-014", fridgeId: "FR-KHI-10", zone: "SBU", city: "Karachi", type: "High Humidity", severity: "Warning", status: "Active", time: "11 mins ago" },
  { id: "AL-015", fridgeId: "FR-LHR-8", zone: "CBU", city: "Lahore", type: "Door Open", severity: "Warning", status: "Active", time: "3 mins ago" },
];

const Alerts = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ── FILTERED ALERTS ──
  const filteredAlerts = alertsData
    .filter((a) => {
      if (filter === "Critical") return a.severity === "Critical";
      if (filter === "Warning")  return a.severity === "Warning";
      if (filter === "Active")   return a.status === "Active";
      if (filter === "Resolved") return a.status === "Resolved";
      return true;
    })
    .filter((a) =>
      a.fridgeId.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase()) ||
      a.zone.toLowerCase().includes(search.toLowerCase())
    );

  // ── CHART 1: Severity Overview ──
  const sevChartData = [
    { name: "Critical", value: alertsData.filter((a) => a.severity === "Critical").length },
    { name: "Warning",  value: alertsData.filter((a) => a.severity === "Warning").length },
  ];

  // ── CHART 2: Alerts by Type (horizontal) ──
  const typeCounts = {};
  alertsData.forEach((a) => {
    typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
  });
  const typeChartData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* ── HEADER ── */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              🚨 Smart Alert Panel
            </h1>
            <p className="text-gray-500 mt-1">
              Real-time Coca-Cola refrigeration monitoring
            </p>
          </div>
          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-sm w-56"
          />
        </div>

        {/* ── FILTERS ── */}
        <div className="flex gap-3 flex-wrap">
          {["All", "Critical", "Warning", "Active", "Resolved"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === item
                  ? "bg-red-600 text-white shadow"
                  : "bg-white shadow hover:bg-red-50 text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ── SUMMARY CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Summary title="Total Alerts"    value={alertsData.length} />
          <Summary title="Critical Alerts" value={sevChartData[0].value} color="red" />
          <Summary title="Warnings"        value={sevChartData[1].value} color="yellow" />
        </div>

        {/* ── CHARTS ROW ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Chart 1 — Severity (vertical bars) */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Alert Severity Overview
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sevChartData} barCategoryGap="40%">
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 12px #0001" }}
                    cursor={{ fill: "#fef2f2" }}
                  />
                  <Bar dataKey="value" radius={[7, 7, 0, 0]}>
                    {sevChartData.map((entry, i) => (
                      <Cell
                        key={`sev-${i}`}
                        fill={entry.name === "Critical" ? "#E41E26" : "#d97706"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 — By Type (horizontal bars) */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Alerts by Type
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={typeChartData}
                  layout="vertical"
                  margin={{ left: 10, right: 20, top: 0, bottom: 0 }}
                >
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={130}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 12px #0001" }}
                    cursor={{ fill: "#fef2f2" }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {typeChartData.map((_, i) => (
                      <Cell
                        key={`type-${i}`}
                        fill={i % 2 === 0 ? "#E41E26" : "#B31217"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ── ALERTS TABLE ── */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="px-6 py-4 bg-red-600 text-white font-semibold flex justify-between items-center">
            <span>Alerts List</span>
            <span className="text-sm font-normal opacity-80">
              Showing {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-gray-600 font-semibold">ID</th>
                  <th className="px-5 py-3 text-left text-gray-600 font-semibold">Fridge</th>
                  <th className="px-5 py-3 text-left text-gray-600 font-semibold">Zone</th>
                  <th className="px-5 py-3 text-left text-gray-600 font-semibold">City</th>
                  <th className="px-5 py-3 text-left text-gray-600 font-semibold">Type</th>
                  <th className="px-5 py-3 text-center text-gray-600 font-semibold">Severity</th>
                  <th className="px-5 py-3 text-center text-gray-600 font-semibold">Status</th>
                  <th className="px-5 py-3 text-center text-gray-600 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-400">
                      No alerts match your search or filter.
                    </td>
                  </tr>
                ) : (
                  filteredAlerts.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-red-50 transition-colors">
                      <td className="px-5 py-3 text-xs text-gray-500 font-semibold">{a.id}</td>
                      <td className="px-5 py-3 font-semibold text-red-600">{a.fridgeId}</td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 font-medium">
                          {a.zone}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-700">{a.city}</td>
                      <td className="px-5 py-3 font-medium text-gray-800">{a.type}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          a.severity === "Critical"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}>
                          {a.severity}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          a.status === "Active"
                            ? "bg-red-100 text-red-600 animate-pulse"
                            : "bg-green-100 text-green-600"
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center text-xs text-gray-400">{a.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

// ── SUMMARY CARD ──
const Summary = ({ title, value, color }) => {
  const colorMap = {
    red: "text-red-600",
    yellow: "text-yellow-600",
  };
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-3xl font-extrabold mt-1 ${colorMap[color] || "text-gray-900"}`}>
        {value}
      </h2>
    </div>
  );
};

export default Alerts;