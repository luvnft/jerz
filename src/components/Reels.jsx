import React, { useRef, useState, useEffect, useCallback } from "react";
import throttle from "lodash/throttle";
import "./Reels.css";
import videolinks from "./videolinks";

const Reel = ({ src, isPlaying, onVideoLoad, isMuted, toggleMute }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current
          .play()
          .catch((err) => console.error("Playback error:", err));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="reel">
      <video
        ref={videoRef}
        src={src}
        className="reel-video"
        loop
        muted={isMuted}
        playsInline
        onLoadedData={onVideoLoad}
        onClick={toggleMute}
      />
      <div className="reel-controls">
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
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

  useEffect(() => {
    setReelsData(videolinks);
  }, []);

  const loadMoreVideos = useCallback(() => {
    if (loadedVideos < reelsData.length) {
      setLoading(true);
      setTimeout(() => {
        setLoadedVideos((prev) => Math.min(prev + 2, reelsData.length));
        setLoading(false);
      }, 2000);
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

  return (
    <div className="reels-container">
      {reelsData.slice(0, loadedVideos).map((reel, index) => (
        <div key={reel.id} className="reel-wrapper">
          <Reel
            src={reel.src}
            isPlaying={currentReelIndex === index}
            onVideoLoad={() => {}}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
        </div>
      ))}

      {loading && <div className="loading">Loading more reels...</div>}
    </div>
  );
};

export default Reels;
