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
  isPlaying,
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

  useEffect(() => {
    const video = videoRef.current;

    const playVideo = () => {
      if (isPlaying) {
        video.play().catch((err) => console.error("Playback error:", err.message || err));
      } else {
        video.pause();
      }
    };

    playVideo();

    return () => {};
  }, [isPlaying]);

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
    <div className="relative group w-full aspect-[9/16] flex justify-center items-center bg-black border-4 border-white shadow-lg rounded-lg overflow-hidden">
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

      <div className="absolute bottom-3 left-3 flex flex-col gap-2 z-10">
        <button
          onClick={handleMuteClick}
          className="bg-black/50 text-white text-xs px-2 py-1 rounded hover:bg-black/70"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={handleLikeClick}
          className={`text-xs px-2 py-1 rounded ${isLiked ? "bg-blue-500" : "bg-black/50 hover:bg-black/70"} text-white`}
        >
          <FaThumbsUp />
        </button>

        <button
          onClick={onShare}
          className="bg-black/50 text-white text-xs px-2 py-1 rounded hover:bg-black/70"
        >
          <FaShareAlt />
        </button>
      </div>

      <div className="absolute top-2 left-2 text-white text-xs bg-black/70 px-2 py-1 rounded">
        #Reel ID: {id}
      </div>

      <div className="absolute bottom-2 w-full flex flex-wrap justify-center gap-1 px-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-blue-400 hover:underline text-xs cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Reels = () => {
  const [reelsData, setReelsData] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
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
    const { innerHeight } = window;

    const nextReelIndex = Math.floor((scrollTop + innerHeight / 2) / innerHeight);

    if (nextReelIndex !== currentReelIndex) {
      setCurrentReelIndex(nextReelIndex);
    }

    if (scrollTop + innerHeight >= scrollHeight - 10) {
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
    const shareUrl = `https://insta-reels-one.vercel.app/video/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this reel!",
          text: "Amazing reel you should see!",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-black min-h-screen">
      {reelsData.slice(0, loadedVideos).map((reel, index) => (
        <div key={reel.id} className="flex justify-center">
          <Reel
            src={reel.src}
            isPlaying={currentReelIndex === index}
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
        <div className="col-span-full text-center text-white">
          Loading more reels...
        </div>
      )}
    </div>
  );
};

export default Reels;
