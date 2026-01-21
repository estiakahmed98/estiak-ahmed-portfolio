"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Home,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Shield,
  BookOpen,
} from "lucide-react";

interface Props {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const SIDEBAR_EXPANDED = 260;
export const SIDEBAR_COLLAPSED = 80;

const AdminSidebar = ({ onNavigate, collapsed, onToggleCollapse }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isControlled = typeof collapsed === "boolean";
  const isCollapsed = isControlled ? collapsed : internalCollapsed;

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const handleNavigate = () => {
    onNavigate?.();
  };

  return (
    <aside
      className="md:fixed md:left-0 md:top-0 md:z-50 md:h-screen h-screen flex flex-col transition-all duration-300 bg-[#003B3A] text-[#F3F4F2] w-full md:w-auto"
      style={{
        width: isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <div className="w-9 h-9 rounded-full bg-[#C49A3A] flex items-center justify-center">
              <Shield size={18} />
            </div>
          )}
          {!isCollapsed && (
            <span className="text-lg font-semibold">Hello! Estiak</span>
          )}
        </div>

        <button
          onClick={() => {
            if (isControlled) onToggleCollapse?.();
            else setInternalCollapsed((c) => !c);
          }}
          className="p-1 rounded bg-[#C49A3A]"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {[
          { name: "Dashboard", href: "/admin", icon: Home },
          { name: "Blog", href: "/admin/blog", icon: BookOpen },
        ].map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              onClick={handleNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition
                ${
                  isActive(item.href)
                    ? "bg-[#C49A3A] text-[#003B3A]"
                    : "hover:bg-white/10"
                }`}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <div className="w-10 h-10 rounded-full bg-[#C49A3A] flex items-center justify-center">
              <UserCog size={20} />
            </div>
          )}

          {!isCollapsed && (
            <div className="flex-1">
              <p className="font-medium">Admin User</p>
              <p className="text-sm opacity-70">admin@example.com</p>
            </div>
          )}

          <button
            onClick={async () => {
              try {
                await signOut({ callbackUrl: "/auth/signin" });
              } catch {
                router.push("/auth/signin");
              }
            }}
            className="p-2 rounded bg-[#C49A3A]"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
