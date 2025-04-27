import React, { useRef, useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import videolinks from "./videolinks";
import {
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaVolumeUp,
  FaVolumeMute,
  FaComment,
  FaMusic,
  FaInfoCircle
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
  description,
  address,
  price,
  what3wordsAddress
}) => {
  const videoRef = useRef(null);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (isPlaying) {
      video.play().catch(err => console.error("Playback error:", err));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const handleLikeClick = () => {
    onLike();
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 1000);
  };

  const toggleInfo = () => {
    setShowDescription(!showDescription);
  };

  // Safely handle price display (object or string)
  const getPriceDisplay = () => {
    if (typeof price === 'string') return price;
    if (price && price.display) return price.display;
    return "Price not available";
  };

  return (
    <div className="relative h-screen w-full flex justify-center bg-black overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={toggleMute}
      />
      
      {/* Overlay UI */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        {/* Property Info */}
        <div className="text-white mb-4">
          <h3 className="font-bold text-lg">{address}</h3>
          <p className="text-sm opacity-90">{getPriceDisplay()}</p>
          <p className="text-xs opacity-80 mt-1">📍 {what3wordsAddress}</p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Right Sidebar Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">{id}</span>
          </div>
        </div>
        
        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button 
            onClick={handleLikeClick}
            className="text-white text-3xl"
          >
            {isLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span className="text-white text-xs mt-1">24.5K</span>
        </div>
        
        {/* Comments */}
        <div className="flex flex-col items-center">
          <button className="text-white text-3xl">
            <FaComment />
          </button>
          <span className="text-white text-xs mt-1">1.2K</span>
        </div>
        
        {/* Share */}
        <div className="flex flex-col items-center">
          <button 
            onClick={onShare}
            className="text-white text-3xl"
          >
            <FaShareAlt />
          </button>
          <span className="text-white text-xs mt-1">Share</span>
        </div>
        
        {/* Info */}
        <div className="flex flex-col items-center">
          <button 
            onClick={toggleInfo}
            className="text-white text-3xl"
          >
            <FaInfoCircle />
          </button>
        </div>
        
        {/* Music */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 mt-2">
          <FaMusic className="text-white text-sm" />
        </div>
      </div>
      
      {/* Animated Heart */}
      {animateHeart && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <FaHeart className="text-red-500 text-6xl" />
        </motion.div>
      )}
      
      {/* Description Overlay */}
      {showDescription && (
        <div className="absolute inset-0 bg-black/80 p-6 overflow-y-auto">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{address}</h2>
            <div className="whitespace-pre-line text-sm mb-6">{description}</div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-bold">Price</h3>
                <p>{getPriceDisplay()}</p>
              </div>
              <div>
                <h3 className="font-bold">Location</h3>
                <p>{what3wordsAddress}</p>
              </div>
            </div>
            <button
              onClick={toggleInfo}
              className="bg-white text-black px-4 py-2 rounded-full font-bold w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Reels = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState({});
  const containerRef = useRef(null);

  const toggleMute = () => setIsMuted(prev => !prev);

  const handleLike = (id) => {
    setLikedVideos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = (id) => {
    const shareUrl = `https://tv.creai.digital/video/${id}`;
    if (navigator.share) {
      navigator.share({
        title: "Check out this property!",
        text: "Amazing property available for crypto purchase!",
        url: shareUrl
      }).catch(err => console.error("Share failed", err));
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const handleScroll = throttle(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const windowHeight = container.clientHeight;
    const currentIndex = Math.round(scrollPosition / windowHeight);
    
    if (currentIndex !== currentReelIndex) {
      setCurrentReelIndex(currentIndex);
    }
  }, 200);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {videolinks.map((reel, index) => (
        <div 
          key={reel.id} 
          className="h-screen w-full snap-start"
        >
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
            description={reel.description}
            address={reel.address}
            price={reel.price}
            what3wordsAddress={reel.what3wordsAddress}
          />
        </div>
      ))}
    </div>
  );
};

export default Reels;
