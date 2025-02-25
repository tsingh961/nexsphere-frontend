"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "@/components/feed/Post";
import {
  faImage,
  faFaceSmile,
  faChartBar,
  faCalendar,
  faMapMarkerAlt,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import RightSidebar from "@/components/sidebar/RightSidebar";

export default function Page() {
  const [postText, setPostText] = useState("");

  return (
    <div className="flex h-full justify-center">
      {/* Main Feed Container */}
      <div className="w-full bg-primaryBg">
        {/* Header */}
        <div className="text-center py-4 border-b border-borderGray text-xl sticky top-0 bg-primaryBg z-10">
          <h2>Feed</h2>
        </div>

        {/* Input Section */}
        <div className="flex p-4 space-x-4 border-b border-borderGray">
          {/* Profile Image */}
          <img
            src="/profile.jpg"
            alt="User Profile"
            className="w-12 h-12 rounded-full border border-borderGray shadow-lg"
          />

          {/* Input & Actions */}
          <div className="w-full">
            {/* Input Box */}
            <textarea
              rows={2}
              placeholder="What is happening?!"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full bg-transparent text-lg text-white placeholder-gray-500 outline-none resize-none focus:ring-0 focus:border-none"
            />

            {/* Icons & Post Button */}
            <div className="flex items-center justify-between mt-3">
              {/* Action Icons */}
              <div className="flex space-x-4 text-accent">
                {[faImage, faFileVideo, faChartBar, faFaceSmile, faCalendar, faMapMarkerAlt].map((icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>

              {/* Post Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className={`px-5 py-2 text-black font-semibold rounded-full transition-all duration-300 ${
                  postText.trim()
                    ? "bg-white hover:bg-gray-300 shadow-md"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                disabled={!postText.trim()}
              >
                Post
              </motion.button>
            </div>
          </div>
        </div>

        {/* Posts Section (Ensures posts appear below input) */}
        <div className="flex flex-col">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}
