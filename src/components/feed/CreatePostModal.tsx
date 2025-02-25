"use client;"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faGlobe,
  faImage,
  faChartBar,
  faSmile,
  faLocationDot,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal = ({ onClose }: CreatePostModalProps) => {
  const [postText, setPostText] = useState("");

  if (typeof window === "undefined") return null; // Prevent SSR errors

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
      <div className="bg-primaryBg text-white rounded-xl w-[500px] h-[240px] mt-10 p-4 shadow-lg">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <span className="text-blue-400 cursor-pointer text-sm">Drafts</span>
        </div>

        {/* Post Input Section */}
        <div className="flex mt-3">
          {/* Profile Picture */}
          <img
            src="/profile.jpg"
            alt="User"
            className="w-10 h-10 rounded-full mr-3"
          />

          {/* Input Area */}
          <div className="w-full">
            <textarea
              className="w-full bg-transparent text-lg focus:outline-none resize-none"
              rows={2}
              placeholder="What is happening?!"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            {/* Reply Settings */}
            <div className="text-blue-400 text-sm flex items-center gap-1 mt-2 cursor-pointer">
              <FontAwesomeIcon icon={faGlobe} size="sm" />
              Everyone can reply
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="border-t border-gray-700 mt-4 pt-3 flex items-center justify-between">
          {/* Action Icons */}
          <div className="flex gap-4 text-blue-400">
            <FontAwesomeIcon icon={faImage} size="lg" className="cursor-pointer" />
            <FontAwesomeIcon icon={faChartBar} size="lg" className="cursor-pointer" />
            <FontAwesomeIcon icon={faSmile} size="lg" className="cursor-pointer" />
            <FontAwesomeIcon icon={faCamera} size="lg" className="cursor-pointer" />
            <FontAwesomeIcon icon={faLocationDot} size="lg" className="cursor-pointer" />
          </div>

          {/* Post Button */}
          <button
            className={`px-5 py-1.5 rounded-full text-sm font-semibold ${
              postText
                ? "bg-blue-400 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!postText}
          >
            Post
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement // Portal target
  );
};

export default CreatePostModal;
