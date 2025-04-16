import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings } from 'lucide-react';
import { getOfflineVideoUrl, isVideoAvailableOffline } from '../services/offlineVideoService';
import { networkService } from '../services/networkService';

interface VideoPlayerProps {
  url: string;
  videoId: string;
  title?: string;
  onClose?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, videoId, title, onClose }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isOnline, setIsOnline] = useState(networkService.isOnline());
  const playerRef = useRef<ReactPlayer>(null);
  const controlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const unsubscribe = networkService.subscribe(setIsOnline);
    return () => unsubscribe();
  }, []);

  // Determine video source based on network status and availability
  const videoSource = React.useMemo(() => {
    if (isOnline) {
      return url;
    }
    return isVideoAvailableOffline(videoId) ? getOfflineVideoUrl(videoId) : '';
  }, [url, videoId, isOnline]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    if (playerRef.current) {
      playerRef.current.seekTo(newPlayed);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handlePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();
    
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    }
    return `${mm}:${ss.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
      {videoSource ? (
        <ReactPlayer
          ref={playerRef}
          url={videoSource}
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
          onClick={handlePlayPause}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-lg">
            This video is not available offline
          </p>
        </div>
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Title */}
        {title && (
          <div className="absolute top-0 left-0 right-0 p-4 text-white text-lg font-medium">
            {title}
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          {/* Progress Bar */}
          <div className="flex items-center mb-4">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onChange={handleSeekChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {playing ? <Pause size={24} /> : <Play size={24} />}
              </button>

              {/* Volume */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Time */}
              <span className="text-white text-sm">
                {formatTime(played * duration)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Playback Rate */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Settings size={20} />
                </button>
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg p-2">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRate(rate)}
                        className={`block w-full px-4 py-2 text-sm text-white hover:bg-gray-700 rounded ${
                          playbackRate === rate ? 'bg-gray-700' : ''
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer; 