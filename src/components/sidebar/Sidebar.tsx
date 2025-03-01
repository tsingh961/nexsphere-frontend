"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Search, Compass, Clapperboard, MessageCircle, Heart, PlusSquare, User } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "Search", icon: Search, link: "/search" },
    { name: "Explore", icon: Compass, link: "/explore" },
    { name: "Reels", icon: Clapperboard, link: "/reels" },
    { name: "Messages", icon: MessageCircle, link: "/messages", badge: 2 },
    { name: "Notifications", icon: Heart, link: "/notifications" },
    { name: "Create", icon: PlusSquare, link: "/create" },
    { name: "Profile", icon: User, link: "/profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white p-5 flex flex-col border-r border-gray-800">
          {/* Logo */}
          <h1 className="text-2xl font-bold mb-8">Instagram</h1>

          {/* Menu Items */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  pathname === item.link ? "bg-gray-900" : "hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 flex justify-around py-3">
          {menuItems.slice(0, 5).map((item) => ( // Show only 5 items in bottom nav
            <Link key={item.name} href={item.link} className="flex flex-col items-center text-white">
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default Sidebar;
