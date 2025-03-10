"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import MainSidebar from "../sidebar/MainSidebar";
import SuggestionSidebar from "../sidebar/SuggestionSidebar";
import ThemeToggle from "../ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <main className="flex-1 transition-all duration-300 ease-in-out overflow-x-hidden">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="flex justify-end mb-4">
              <ThemeToggle />
            </div>
            {children}
          </div>
        </main>
        <SuggestionSidebar />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
