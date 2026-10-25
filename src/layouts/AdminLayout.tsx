import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/organisms/Navbar";
import AdminSidebar from "../components/admin/organisms/AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar navItems={[]} />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <div className="border-b border-text-light/15 px-5 py-3 lg:hidden">
            <button
              type="button"
              aria-controls="admin-sidebar"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-md border border-text-light/23 px-3 py-2 text-sm font-bold text-text-light hover:bg-extra-background"
            >
              Menu
            </button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
