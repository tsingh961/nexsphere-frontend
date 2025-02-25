"use client";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faUser,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const RightSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const trendingTopics = ["fenerbahçe", "fenerbahce", "fakhar zaman"];
  const userSuggestions = [
    { name: "PIB Fact Check", handle: "@PIBFactCheck", verified: true },
    { name: "Forbes", handle: "@Forbes", verified: true },
    { name: "Farid Khan", handle: "@_FaridKhan", verified: true },
    { name: "What The F*** Facts", handle: "@WhatTheFFacts", verified: true },
  ];

  return (
    <div className="h-full max-h-[800px] sticky top-0 w-full md:w-[400px] border-l border-borderGray px-8 space-y-4 bg-primaryBg text-white">
      {/* Search Bar */}
      <div className="sticky top-0 bg-primaryBg z-10 py-3">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-3 left-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full px-9 py-2 bg-[#273340] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
          />
          {searchTerm && (
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-400 w-4 h-4 cursor-pointer ml-2"
              onClick={() => {
                setSearchTerm("");
                setShowDropdown(false);
              }}
            />
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          {/* Trending Topics */}
          <div className="border-b border-gray-700">
            {trendingTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center p-3 hover:bg-gray-800 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-gray-400 w-4 h-4 mr-3"
                />
                <p className="text-white font-medium">{topic}</p>
              </div>
            ))}
          </div>

          {/* User Suggestions */}
          <div>
            {userSuggestions.map((user, index) => (
              <div
                key={index}
                className="flex items-center p-3 hover:bg-gray-800 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-400 w-4 h-4 mr-3"
                />
                <div>
                  <p className="text-white font-medium flex items-center">
                    {user.name}{" "}
                    {user.verified && (
                      <span className="ml-1 text-blue-500">✔️</span>
                    )}
                  </p>
                  <p className="text-gray-400 text-sm">{user.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What's Happening */}
      <div className="bg-primaryBg border border-borderGray rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-bold">What's happening</h2>

        {/* Trending Topics */}
        <div className="space-y-2">
          {[
            { title: "#PoonamPandey", desc: "Trending in India" },
            { title: "#BoycottOYO", desc: "Trending in India · 28.8K posts" },
            {
              title: "#ArrestKavishAziz",
              desc: "Trending in India · 15.7K posts",
            },
            {
              title: "#dhanashreeverma",
              desc: "Sports · Trending · 9,542 posts",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col text-sm text-gray-400 p-2 rounded-lg cursor-pointer hover:bg-[#1e2732] transition"
            >
              <span>{item.desc}</span>
              <span className="text-white font-bold">{item.title}</span>
            </div>
          ))}
        </div>

        <a href="#" className="text-blue-400 text-sm hover:underline">
          Show more
        </a>
      </div>

      {/* Who to Follow */}
      <div className="bg-primaryBg border border-borderGray rounded-xl p-4 space-y-3">
        <h2 className="text-lg font-bold">Who to follow</h2>

        {/* User List */}
        {[
          {
            name: "freeCodeCamp.org",
            username: "@freeCodeCamp",
            img: "/freecodecamp-logo.png",
          },
          { name: "Dani", username: "@dani11129251", img: "/dani-avatar.png" },
          { name: "Angular", username: "@angular", img: "/angular-logo.png" },
        ].map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 cursor-pointer rounded-lg hover:bg-[#1e2732] transition"
          >
            <div className="flex items-center space-x-3">
              <Image
                src={user.img}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-sm">
                <p className="text-white font-bold">{user.name}</p>
                <p className="text-gray-400">{user.username}</p>
              </div>
            </div>
            <Button variant="secondary" rounded>
              Follow
            </Button>
          </div>
        ))}

        <a href="#" className="text-blue-400 text-sm hover:underline">
          Show more
        </a>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-xs space-x-2 flex flex-wrap justify-center md:justify-start">
        <span className="hover:underline cursor-pointer">Terms of Service</span>
        <span className="hover:underline cursor-pointer">Privacy Policy</span>
        <span className="hover:underline cursor-pointer">Cookie Policy</span>
      </div>
    </div>
  );
};

export default RightSidebar;
