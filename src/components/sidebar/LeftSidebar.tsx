"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSearch,
  faBell,
  faEnvelope,
  faRobot,
  faUsers,
  faStar,
  faUser,
  faEllipsisH,
  faFeather,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import {
  //   faHouse as faHouseOutline,
  //   faSearch as faSearchOutline,
  faBell as faBellOutline,
  faEnvelope as faEnvelopeOutline,
  //   faRobot as faRobotOutline,
  //   faUsers as faUsersOutline,
  faStar as faStarOutline,
  faUser as faUserOutline,
  //   faEllipsisH as faEllipsisHOutline,
} from "@fortawesome/free-regular-svg-icons";
import CreatePostModal from "../feed/CreatePostModal";

const navItems = [
  {
    name: "Home",
    href: "/",
    solid: faHouse,
    outline: faHouse,
    notification: true,
  },
  { name: "Explore", href: "/explore", solid: faSearch, outline: faSearch },
  {
    name: "Notifications",
    href: "/notifications",
    solid: faBell,
    outline: faBellOutline,
  },
  {
    name: "Messages",
    href: "/messages",
    solid: faEnvelope,
    outline: faEnvelopeOutline,
    active: false,
  },
  { name: "Grok", href: "/grok", solid: faRobot, outline: faRobot },
  {
    name: "Communities",
    href: "/communities",
    solid: faUsers,
    outline: faUsers,
  },
  { name: "Premium", href: "/premium", solid: faStar, outline: faStarOutline },
  { name: "Profile", href: "/profile", solid: faUser, outline: faUserOutline },
  { name: "More", href: "/more", solid: faEllipsisH, outline: faEllipsisH },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`h-full fixed bg-primaryBg text-white p-4 border-r border-borderGray flex flex-col justify-between lg:flex transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-96 lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Toggle Button */}
          <div className="flex justify-between items-center mb-4 px-4">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.56l-8.1 9.14 6.7 9.9-9.5-6.8L4 24l5.7-9.6L0 8.1l9.5 2.6L15 0l-1 10 10-5.44z" />
            </svg>
            <button
              className="lg:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map(
              ({ name, href, solid, outline, active, notification }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-4 px-4 py-2.5 rounded-full text-lg transition-all ${
                    pathname === href || active
                      ? "bg-[#273340] font-bold"
                      : "hover:bg-[#273340]"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={pathname === href || active ? solid : outline}
                    className="w-6 h-6 transition-all"
                  />
                  <span>{name}</span>
                  {notification && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></span>
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Post Button */}
          <button
            className="mt-6 flex items-center justify-center w-full bg-white text-black font-semibold py-3 rounded-full text-lg hover:bg-gray-300 transition"
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faFeather} className="w-5 h-5 mr-2" />
            Post
          </button>
          {showModal && <CreatePostModal onClose={() => setShowModal(false)} />}
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#273340] rounded-full cursor-pointer transition">
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
          <div>
            <p className="font-semibold">Tarush Singh</p>
            <p className="text-sm text-gray-400">@tarushsingh_</p>
          </div>
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="w-5 h-5 text-gray-400 ml-auto"
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-primaryBg border-t border-borderGray flex justify-around py-3">
        {navItems.slice(0, 4).map(({ href, solid, outline }) => (
          <Link key={href} href={href} className="text-white p-3">
            <FontAwesomeIcon
              icon={pathname === href ? solid : outline}
              className="w-6 h-6"
            />
          </Link>
        ))}
        {/* Sidebar Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-3">
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
