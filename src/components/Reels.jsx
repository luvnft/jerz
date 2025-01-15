import React, { useRef, useState, useEffect } from "react";
import "./Reels.css";

const reelsData = [
  {
    id: 1,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 5,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 6,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 7,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 8,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 9,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 10,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 11,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 12,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 13,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 14,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 15,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 16,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 17,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 18,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 19,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 20,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 21,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 22,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 23,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 24,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 25,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 26,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 27,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 28,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 29,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 30,
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
];

const Reel = ({ src, isPlaying, onVideoInView, isLoading }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => console.error(error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="reel">
      {isLoading ? (
        <div className="loading-overlay">
          <span>Loading...</span>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          className="reel-video"
          loop
          muted={isMuted}
          playsInline
          onClick={() => setIsMuted(!isMuted)}
          onLoadedData={onVideoInView}
        />
      )}
      <div className="reel-controls">
        <button onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

const Reels = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(false); // Fix loading state
  const [loadedVideos, setLoadedVideos] = useState(2);

  // Handle scroll event to load more videos
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const reelHeight = window.innerHeight;
    const nextReelIndex = Math.floor(scrollPosition / reelHeight);

    if (nextReelIndex !== currentReelIndex) {
      setCurrentReelIndex(nextReelIndex);
    }

    if (
      scrollPosition + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      loadNextVideos();
    }
  };

  const loadNextVideos = () => {
    if (loadedVideos < reelsData.length) {
      setLoading(true);
      setTimeout(() => {
        setLoadedVideos((prev) => prev + 2); // Load next 2 videos
        setLoading(false); // Set loading to false after videos are loaded
      }, 1000); // Simulate delay for loading more videos
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentReelIndex]);

  const handleVideoInView = () => {
    setIsPlaying(true);
  };

  return (
    <div className="reels-container">
      {reelsData.slice(0, loadedVideos).map((reel, index) => (
        <div
          key={reel.id}
          style={{ height: "100vh", overflow: "hidden", position: "relative" }}
        >
          <Reel
            src={reel.src}
            isPlaying={currentReelIndex === index}
            onVideoInView={handleVideoInView}
            isLoading={loading}
          />
        </div>
      ))}

      {loading && (
        <div className="loading">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Reels;
