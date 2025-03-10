"use client";
import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Home, 
  Search, 
  MessageCircle, 
  Bell, 
  User, 
  Settings, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface MainSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const MainSidebar = ({ collapsed, setCollapsed }: MainSidebarProps) => {
  // const location = useLocation();
  const pathname = usePathname();
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [notificationsExpanded, setNotificationsExpanded] = useState(false);

  return (
    <aside 
      className={cn(
        "border-r border-border bg-sidebar h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h1 className="text-xl font-semibold animate-fade-in">Insta Well</h1>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="space-y-1">
          <NavItemLink 
            to="/" 
            icon={<Home className="h-6 w-6" />} 
            label="Home" 
            active={pathname === "/"} 
            collapsed={collapsed} 
          />
          
          <NavItemLink 
            to="/search" 
            icon={<Search className="h-6 w-6" />} 
            label="Search" 
            active={pathname === "/search"} 
            collapsed={collapsed} 
          />
          
          <NavItemLink 
            to="/messages" 
            icon={<MessageCircle className="h-6 w-6" />} 
            label="Messages" 
            active={pathname === "/messages"} 
            collapsed={collapsed} 
          />
          
          <NavItemLink 
            to="/notifications" 
            icon={<Bell className="h-6 w-6" />} 
            label="Notifications" 
            active={pathname === "/notifications"} 
            collapsed={collapsed} 
          />
          
          <NavItemLink 
            to="/profile" 
            icon={<User className="h-6 w-6" />} 
            label="Profile" 
            active={pathname === "/profile"} 
            collapsed={collapsed} 
          />
          
          <NavItemLink 
            to="/settings" 
            icon={<Settings className="h-6 w-6" />} 
            label="Settings" 
            active={pathname === "/settings"} 
            collapsed={collapsed} 
          />
        </nav>
      </div>
    </aside>
  );
};

interface NavItemLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed: boolean;
}

const NavItemLink = ({ to, icon, label, active = false, collapsed }: NavItemLinkProps) => (
  <Link href={to} className="block">
    <div className={cn(
      "sidebar-item flex items-center p-3 rounded-lg cursor-pointer",
      active && "bg-sidebar-accent font-medium"
    )}>
      {icon}
      {!collapsed && <span className="ml-3 transition-opacity duration-200">{label}</span>}
    </div>
  </Link>
);

export default MainSidebar;
