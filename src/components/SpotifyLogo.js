// src/components/SpotifyLogo.js

import React from 'react';
import { FaSpotify } from 'react-icons/fa'; // Import Spotify icon from react-icons

const SpotifyLogo = () => {
  return (
    <div className="flex items-center space-x-2 text-white">
      <FaSpotify size={32}  /> {/* Spotify icon className="text-green-500"  */}
      <h1 className="text-2xl font-bold">Spotify</h1>
    </div>
  );
};

export default SpotifyLogo;

