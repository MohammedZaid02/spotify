import React, { useState, useEffect } from 'react';

const SongList = ({ songs, onSelect }) => {
  const [songDurations, setSongDurations] = useState({});

  // Function to fetch and calculate the duration of each song
  const calculateDuration = (url) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        const durationInSeconds = audio.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        resolve(formattedDuration);
      };
      audio.onerror = () => reject('Error loading audio');
    });
  };

  // Calculate the durations for all songs
  useEffect(() => {
    const fetchDurations = async () => {
      const durations = {};
      for (let song of songs) {
        try {
          const duration = await calculateDuration(song.url);
          durations[song.id] = duration;
        } catch (error) {
          durations[song.id] = 'N/A'; // Error loading the song duration
        }
      }
      setSongDurations(durations);
    };

    fetchDurations();
  }, [songs]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 space-y-0"> {/* Reduced space-y from 4 to 2 */}
      {songs.map((song) => (
        <div
          key={song.id}
          onClick={() => onSelect(song)}
          className="p-2  rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition duration-200"
        >
          {/* Song Cover and Info */}
          <div className="flex items-center space-x-4">
            <img
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt={song.name}
              className="w-16 h-16"
            />
            <div>
              <h4 className="text-lg font-semibold text-white">{song.name}</h4>
              <p className="text-gray-400">{song.artist}</p>
            </div>
          </div>
          
          {/* Duration */}
          <span className="text-gray-500 text-sm">
            {songDurations[song.id] || 'Loading...'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SongList;
  