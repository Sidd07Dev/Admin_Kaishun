import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
     <Sidebar/>
      <div className="flex-1 flex flex-col">
       
        <main className="p-4 bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
