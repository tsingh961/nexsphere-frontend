"use client";

import { useState } from "react";
import {
  Home,
  Search,
  Compass,
  Clapperboard,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
} from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <Home />, link: "/" },
    { name: "Search", icon: <Search />, link: "/search" },
    { name: "Explore", icon: <Compass />, link: "/explore" },
    { name: "Reels", icon: <Clapperboard />, link: "/reels" },
    { name: "Messages", icon: <MessageCircle />, link: "/messages", badge: 2 },
    { name: "Notifications", icon: <Heart />, link: "/notifications" },
    { name: "Create", icon: <PlusSquare />, link: "/create" },
    { name: "Profile", icon: "/profile.jpg", link: "/profile" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white p-5 flex flex-col border-r border-gray-800">
      {/* Instagram Logo */}
      <h1 className="text-2xl font-bold mb-8">Instagram</h1>

      {/* Menu Items */}
      <nav className="flex flex-col gap-6">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
              active === item.name ? "bg-gray-900" : "hover:bg-gray-800"
            }`}
            onClick={() => setActive(item.name)}
          >
            {/* If profile, use Image, else use Lucide Icon */}
            {typeof item.icon === "string" ? (
              <Image
                src={item.icon}
                alt="Profile"
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <span className="w-6 h-6">{item.icon}</span>
            )}

            <span className="flex-1">{item.name}</span>

            {/* Notification Badge */}
            {item.badge && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* More Menu Button */}
      <div className="mt-auto">
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-gray-800"
        >
          <Menu className="w-6 h-6" />
          <span>More</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
