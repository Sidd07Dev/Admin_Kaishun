import React from "react";
import {
  Users,
  FileText,
  BarChart2,
  Clock,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
       <Helmet>
      <title>Dashboard | Kaishun  Admin Panel</title>
      <meta name="description" content="Manage student data, test series, and results from the admin dashboard." />
      <meta name="keywords" content="admin dashboard, coaching management, student results, test series manager, Kaishun admin" />
    </Helmet>
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", count: 1200, icon: <Users className="text-blue-500" /> },
          { title: "Total Tests", count: 58, icon: <FileText className="text-purple-500" /> },
          { title: "Total Results", count: 1095, icon: <BarChart2 className="text-green-500" /> },
          { title: "Pending Approvals", count: 15, icon: <Clock className="text-yellow-500" /> },
        ].map(({ title, count, icon }, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="text-3xl">{icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{title}</p>
              <p className="text-xl font-bold text-gray-800">{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Test Analytics</h2>
        <div className="w-full h-64 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center text-gray-400 text-xl">
          [ Chart Component Here ]
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="text-blue-600" /> Recent Activity
        </h2>
        <ul className="divide-y divide-gray-200">
          {[
            "Student Ram Kumar registered for SSC Test.",
            "Admin approved 5 new results.",
            "Railway Test created by Admin.",
            "New contact form received.",
          ].map((activity, index) => (
            <li key={index} className="py-3 flex items-center justify-between">
              <span>{activity}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
