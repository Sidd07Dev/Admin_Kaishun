import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Image,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Students", to: "/students", icon: Users },
  { label: "Manage Tests", to: "/tests", icon: FileText },
  { label: "Results", to: "/results", icon: BarChart2 },
  { label: "Campaigns", to: "/admin/campaigns", icon: Megaphone },
  { label: "Gallery", to: "/gallery", icon: Image },
  { label: "Notices", to: "/admin/notices", icon: Megaphone },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-blue-950 to-blue-900 text-white min-h-screen shadow-md transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="px-4 py-5 border-b border-white/10 flex justify-between items-center">
        {!collapsed ? (
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-blue-200">Welcome, Admin</p>
          </div>
        ) : (
          <h1 className="text-white font-bold text-lg">AP</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-blue-200 hover:text-white transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6 space-y-1 px-2">
        {navLinks.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 px-4 py-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-blue-200 hover:text-white hover:bg-blue-800 px-4 py-2 w-full rounded-lg"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
