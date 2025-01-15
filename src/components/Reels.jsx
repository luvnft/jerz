import React, { useRef, useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import videolinks from "./videolinks";
import { FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaThumbsUp, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Reel = ({
  src,
  isPlaying,
  isMuted,
  toggleMute,
  onLike,
  onShare,
  isLiked,
  id,
}) => {
  const videoRef = useRef(null);
  const [animateThumb, setAnimateThumb] = useState(false);
  const [animateSpeaker, setAnimateSpeaker] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video
          .play()
          .catch((err) => console.error("Playback error:", err.message || err));
      } else {
        const pauseTimeout = setTimeout(() => {
          video.pause();
        }, 100);

        return () => clearTimeout(pauseTimeout);
      }
    }
  }, [isPlaying]);

  const handleLikeClick = () => {
    onLike();
    setAnimateThumb(true);
    setTimeout(() => setAnimateThumb(false), 2000);
  };

  const handleMuteClick = () => {
    toggleMute();
    setAnimateSpeaker(true);
    setTimeout(() => setAnimateSpeaker(false), 2000);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-black border-4 border-white shadow-lg p-4 box-border">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain cursor-pointer rounded-lg transition-opacity duration-300 ease-in-out"
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
      />

      {animateThumb && (
        <motion.div
          className="absolute z-20"
          animate={{ scale: 2, opacity: 1 }}
          initial={{ scale: 1, opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <FaThumbsUp className="text-white text-6xl" />
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
            <FaVolumeMute className="text-white text-6xl" />
          ) : (
            <FaVolumeUp className="text-white text-6xl" />
          )}
        </motion.div>
      )}

      <div className="absolute bottom-5 left-5 z-10 flex justify-center items-center gap-2">
        <motion.button
          onClick={handleMuteClick}
          className="bg-black/50 text-white text-base px-4 py-2 rounded-md transition-colors duration-300 hover:bg-black/70"
        >
          {isMuted ? "Unmute" : "Mute"}
        </motion.button>

        <motion.button
          onClick={handleLikeClick}
          className={`text-base px-4 py-2 rounded-md transition-colors duration-300 ${
            isLiked
              ? "bg-blue-500 text-white"
              : "bg-black/50 text-white hover:bg-black/70"
          }`}
        >
          <FaThumbsUp />
        </motion.button>

        <motion.button
          onClick={onShare}
          className="bg-black/50 text-white text-base px-4 py-2 rounded-md transition-colors duration-300 hover:bg-black/70"
        >
          <FaShareAlt />
        </motion.button>
      </div>
      <div className="absolute top-10 left-5 bg-black/70 text-white px-4 py-2 text-base rounded-md opacity-0 transform -translate-y-5 animate-fade-in">
        #AmazingReel id: {id}
      </div>
    </div>
  );
};

const Reels = () => {
  const [reelsData, setReelsData] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState(3);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState({});

  useEffect(() => {
    setReelsData(videolinks);
  }, []);

  const loadMoreVideos = useCallback(() => {
    if (loadedVideos < reelsData.length) {
      setLoading(true);
      setTimeout(() => {
        setLoadedVideos((prev) => Math.min(prev + 2, reelsData.length));
        setLoading(false);
      }, 1000);
    }
  }, [loadedVideos, reelsData.length]);

  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const nextReelIndex = Math.floor(
      (scrollTop + clientHeight / 2) / clientHeight
    );

    if (nextReelIndex !== currentReelIndex) {
      setCurrentReelIndex(nextReelIndex);
    }

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreVideos();
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLike = (id) => {
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `https://insta-reels-one.vercel.app/video/`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this reel!",
          text: "Check out this amazing video reel on Insta Reels!",
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
    <div className="relative w-full min-h-screen overflow-y-auto p-0 m-0">
      {reelsData.slice(0, loadedVideos).map((reel, index) => (
        <div key={reel.id} className="relative">
          <Reel
            src={reel.src}
            isPlaying={currentReelIndex === index}
            isMuted={isMuted}
            toggleMute={toggleMute}
            onLike={() => handleLike(reel.id)}
            onShare={() => handleShare(reel.id)}
            isLiked={likedVideos[reel.id]}
            id={reel.id}
          />
        </div>
      ))}

      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white z-50 flex justify-center items-center">
          Loading more reels...
        </div>
      )}
    </div>
  );
};

export default Reels;
