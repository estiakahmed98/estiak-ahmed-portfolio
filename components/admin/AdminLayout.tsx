"use client";

import React, { useMemo, useState, type ReactNode } from "react";
import AdminSidebar, {
  SIDEBAR_COLLAPSED,
  SIDEBAR_EXPANDED,
} from "./AdminSidebar";
import { AnimatePresence, motion } from "framer-motion";
import AdminHeaderMobile from "./AdminHeaderMobile";

interface AdminLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  user?: {
    name: string;
    role: string;
    image?: string;
  };
}

const AdminLayout = ({ children, pageTitle, user }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const desktopSidebarWidth = useMemo(
    () => (sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED),
    [sidebarCollapsed]
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="md:flex">

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AdminSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          />
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />

              <motion.div
                className="fixed left-0 top-0 h-full z-50 md:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                <AdminSidebar
                  onNavigate={() => setSidebarOpen(false)}
                  collapsed={false}
                  onToggleCollapse={() => {}}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div
          className="flex-1 min-h-screen md:pl-[var(--sidebar-width)]"
          style={
            {
              "--sidebar-width": `${desktopSidebarWidth}px`,
            } as React.CSSProperties
          }
        >
          {/* Mobile Header */}
          <AdminHeaderMobile
            toggleSidebar={() => setSidebarOpen(true)}
            title={pageTitle || "Admin Dashboard"}
            user={user}
          />

          {/* Desktop Header */}
          <div className="hidden md:block">
            <AdminHeaderMobile
              title={pageTitle || "Admin Dashboard"}
              user={user}
              toggleSidebar={() => {}}
            />
          </div>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
