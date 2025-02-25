import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faRetweet, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Image from "next/image";

const TwitterPost = () => {
  return (
    <div className="bg-primaryBg text-white p-4 w-full border-b border-borderGray">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          src="/profile.jpg"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <span className="font-semibold">Narendra Modi</span>
          <span className="text-gray-500 ml-2">@narendramodi · 12h</span>
        </div>
      </div>
      
      {/* Content */}
      <p className="mt-2 text-gray-300 text-sm">
        Highlighted an inspiring effort from Adilabad, Telangana of how AI can be used to preserve and popularise India’s cultural diversity. <span className="text-blue-400">#MannKiBaat</span>
      </p>
      
      {/* Media */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-3 rounded-lg overflow-hidden border border-gray-700"
      >
        <Image
          src="/tweet-image.jpg"
          alt="Tweet Media"
          width={600}
          height={400}
          className="w-full object-cover"
        />
      </motion.div>
      
      {/* Video Label */}
      {/* <div className="bg-gray-800 px-2 py-1 text-xs font-semibold absolute bottom-4 left-4 rounded-md text-white">
        1:52
      </div> */}
      
      {/* Footer (Engagement Icons) */}
      <div className="flex justify-between mt-3 text-gray-500 text-sm">
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon icon={faComment} /> <span>399</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon icon={faRetweet} /> <span>1.8K</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon icon={faHeart} className="text-red-500" /> <span>7.2K</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon icon={faShare} /> <span>555K</span>
        </motion.div>
      </div>
    </div>
  );
};

export default TwitterPost;
