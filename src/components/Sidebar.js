import React from 'react';
import { FaSpotify } from 'react-icons/fa'; // Only use the Spotify Logo

const Sidebar = () => {
  return (
    <div className="w-64 p-4 flex flex-col bg-black">
      {/* Spotify Logo */}
      <div className="flex items-center space-x-3 mb-10">
        <FaSpotify className="text-white text-5xl" />
        <h2 className="text-white text-2xl font-semibold">Spotify</h2>
      </div>
    </div>
  );
};

export default Sidebar;
