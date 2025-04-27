import React, { useRef, useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import videolinks from "./videolinks";
import {
  FaShareAlt,
  FaThumbsUp,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Reel = ({
  src,
  isMuted,
  toggleMute,
  onLike,
  onShare,
  isLiked,
  id,
  tags,
}) => {
  const videoRef = useRef(null);
  const [animateThumb, setAnimateThumb] = useState(false);
  const [animateSpeaker, setAnimateSpeaker] = useState(false);

  const handleLikeClick = () => {
    onLike();
    setAnimateThumb(true);
    setTimeout(() => setAnimateThumb(false), 1000);
  };

  const handleMuteClick = () => {
    toggleMute();
    setAnimateSpeaker(true);
    setTimeout(() => setAnimateSpeaker(false), 1000);
  };

  return (
    <div className="relative group w-full h-[300px] flex justify-center items-center bg-black border-4 border-white shadow-lg rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover cursor-pointer transition-opacity duration-300 group-hover:opacity-90"
        loop
        muted={isMuted}
        playsInline
        autoPlay
        onClick={handleMuteClick}
      />

      {/* Optional Like animation */}
      {animateThumb && (
        <motion.div
          className="absolute z-20"
          animate={{ scale: 2, opacity: 1 }}
          initial={{ scale: 1, opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <FaThumbsUp className="text-sky-500 text-6xl" />
        </motion.div>
      )}

      {/* Optional Speaker animation */}
      {animateSpeaker && (
        <motion.div
          className="absolute z-20"
          animate={{ scale: 2, opacity: 1 }}
          initial={{ scale: 1, opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {isMuted ? (
            <FaVolumeMute className="text-sky-500 text-6xl" />
          ) : (
            <FaVolumeUp className="text-sky-500 text-6xl" />
          )}
        </motion.div>
      )}

      {/* Buttons appear on hover */}
      <div className="absolute bottom-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleMuteClick}
          className="bg-black/60 text-white text-sm px-3 py-1 rounded"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <button
          onClick={handleLikeClick}
          className={`text-sm px-3 py-1 rounded ${
            isLiked ? "bg-blue-500 text-white" : "bg-black/60 text-white"
          }`}
        >
          <FaThumbsUp />
        </button>

        <button
          onClick={onShare}
          className="bg-black/60 text-white text-sm px-3 py-1 rounded"
        >
          <FaShareAlt />
        </button>
      </div>

      {/* Optional: Tags at bottom */}
      <div className="absolute bottom-2 right-2 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-black/50 text-blue-400 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Reels = () => {
  const [reelsData, setReelsData] = useState([]);
  const [loadedVideos, setLoadedVideos] = useState(6);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState({});

  useEffect(() => {
    setReelsData(videolinks);
  }, []);

  const loadMoreVideos = useCallback(() => {
    if (loading || loadedVideos >= reelsData.length) return;
    setLoading(true);
    setTimeout(() => {
      setLoadedVideos((prev) => Math.min(prev + 6, reelsData.length));
      setLoading(false);
    }, 1000);
  }, [loading, loadedVideos, reelsData.length]);

  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreVideos();
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLike = (id) => {
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `https://tv.creai.digital/video/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this reel!",
          text: "Check out this amazing video reel!",
          url: shareUrl,
        })
        .catch((err) => console.error("Share failed", err));
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {reelsData.slice(0, loadedVideos).map((reel) => (
        <div key={reel.id}>
          <Reel
            src={reel.src}
            isMuted={isMuted}
            toggleMute={toggleMute}
            onLike={() => handleLike(reel.id)}
            onShare={() => handleShare(reel.id)}
            isLiked={likedVideos[reel.id]}
            id={reel.id}
            tags={reel.tags}
          />
        </div>
      ))}

      {loading && (
        <div className="col-span-full text-center text-white font-bold">
          Loading more reels...
        </div>
      )}
    </div>
  );
};

export default Reels;
