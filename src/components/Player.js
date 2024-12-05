import React, { useEffect, useState, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa"; // Added FaVolumeMute for mute/unmute icon
import ReactPlayer from "react-player";

const Player = ({ song, playing, setPlaying, onNext, onPrevious }) => {
  const [played, setPlayed] = useState(0); // Track the played progress (0 to 1)
  const [volume, setVolume] = useState(0.8); // Volume level (0 to 1)
  const [duration, setDuration] = useState(0); // Duration of the song
  const [muted, setMuted] = useState(false); // Mute state
  const playerRef = useRef(null);

  useEffect(() => {
    setPlaying(true); // Auto-play when the song changes
  }, [song, setPlaying]);

  const imageUrl = song.cover
    ? `https://cms.samespace.com/assets/${song.cover}`
    : "/path/to/fallback-image.jpg"; // Fallback image

  const handleProgress = (state) => {
    setPlayed(state.played); // Update progress as the song plays
  };

  const handleSeek = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    const newCurrentTime = newPlayed * duration;
    if (!isNaN(newCurrentTime) && isFinite(newCurrentTime)) {
      playerRef.current.seekTo(newCurrentTime);
    }
  };

  const handleProgressClick = (e) => {
    const progressBarWidth = e.target.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const newPlayed = offsetX / progressBarWidth;

    if (!isNaN(newPlayed) && isFinite(newPlayed)) {
      setPlayed(newPlayed);
      const newCurrentTime = newPlayed * duration;
      if (!isNaN(newCurrentTime) && isFinite(newCurrentTime)) {
        playerRef.current.seekTo(newCurrentTime);
      }
    }
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
    setVolume(muted ? 0.8 : 0); // Set volume back to 80% if unmuted
  };

  const handleDuration = (duration) => {
    if (isFinite(duration)) {
      setDuration(duration);
    }
  };

  return (
    <div className="w-full h-full p-4 md:p-8 relative justify-center mt-3">
      {/* Song Title and Artist outside the image */}
      <div className="top-4 left-4 z-10 text-white">
        <h3 className="text-xl md:text-3xl font-bold mb-2">{song.name}</h3>
        <p className="text-sm md:text-base mb-4">{song.artist}</p>
      </div>

      {/* Image Section */}
      <div>
        <img
          src={imageUrl}
          alt={song.name}
          className="w-full h-[470px] object-cover"
        />
      </div>

      {/* Progress Bar for Song */}
      <div
        className="relative w-full mt-4"
        onClick={handleProgressClick}
        style={{ cursor: "pointer" }}
      >
        <div
          className="absolute top-0 left-0 h-1 bg-white rounded-full"
          style={{ width: `${played * 100}%` }}
        />
        <div className="h-1 w-full bg-gray-500 rounded-full"></div>
      </div>

      {/* Music Controls */}
      <div className="flex justify-center w-full items-center mt-6 space-x-4">
        <div className="flex items-center justify-center gap-x-4 px-56">
          <FaStepBackward
            className="cursor-pointer text-white"
            size={30}
            onClick={onPrevious}
          />
          <div
            className="w-12 h-12 flex items-center justify-center bg-white rounded-full cursor-pointer"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <FaPause className="text-gray-800" size={20} />
            ) : (
              <FaPlay className="text-gray-800" size={20} />
            )}
          </div>
          <FaStepForward
            className="cursor-pointer text-white"
            size={30}
            onClick={onNext}
          />
        </div>

        {/* Mute/Unmute Button */}
        <div className="cursor-pointer text-white" onClick={handleMuteToggle}>
          {muted ? (
            <FaVolumeMute className="text-white" size={20} />
          ) : (
            <FaVolumeUp className="text-white" size={20} />
          )}
        </div>
      </div>

      {/* ReactPlayer for playback */}
      <ReactPlayer
        url={song.url}
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
        onEnded={onNext}
        onDuration={handleDuration}
        width="0"
        height="0"
        ref={playerRef}
        className="hidden"
        progressInterval={500}
      />
    </div>
  );
};

export default Player;
