import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "./components/Player";
import SongList from "./components/SongList";
import SearchBar from "./components/SearchBar";
import NavigationTabs from "./components/NavigationTabs";
import SpotifyLogo from "./components/SpotifyLogo";
import "./App.css";
import bg from "./gradient";

function App() {
  const [songs, setSongs] = useState([]); // All songs from the API
  const [currentSong, setCurrentSong] = useState(null); // Currently playing song
  const [playing, setPlaying] = useState(false); // Is song playing
  const [tab, setTab] = useState("For You"); // Selected tab
  const [searchTerm, setSearchTerm] = useState(""); // Search filter

  // Fetch songs from the API
  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs") // Replace with your API
      .then((response) => {
        const fetchedSongs = response.data.data;
        setSongs(fetchedSongs);
        setCurrentSong(fetchedSongs[0]); // Set default song
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  // Change to the next song
  const handleNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  // Change to the previous song
  const handlePreviousSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  // Filter songs dynamically based on the selected tab and search term
  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());

    if (tab === "Top Tracks") {
      return song.top_track === true && matchesSearch;
    } else if (tab === "For You") {
      return matchesSearch; // Assuming all songs are "For You" by default
    }
    return matchesSearch; // Fallback
  });

  // Get the gradient class for the current song
  const currentGradient =
    currentSong && bg.find((gradient) => gradient.id === currentSong.id)
      ? bg.find((gradient) => gradient.id === currentSong.id).gradient
      : "bg-gradient-to-br from-gray-800 to-gray-900"; // Default fallback gradient

  return (
    <div
      className={`min-h-screen text-white flex transition-all duration-700 ease-in-out ${currentGradient}`}
    >
      {/* Sidebar */}
      <div className="p-6 flex flex-col items-start">
        <SpotifyLogo />
      </div>

      {/* Middle Section */}
      <div className="w-1/3 p-6 flex flex-col items-center">
        {/* Navigation Tabs */}
        <NavigationTabs currentTab={tab} onTabChange={setTab} />

        {/* Search Bar */}
        <SearchBar onSearch={(term) => setSearchTerm(term)} />

        {/* Song List */}
        <div className="mt-2 w-full">
          {filteredSongs.length > 0 ? (
            <div className="space-y-2"> {/* Container for song list */}
              <SongList songs={filteredSongs} onSelect={setCurrentSong} />
            </div>
          ) : (
            <p className="text-gray-400 text-lg mt-4">No songs available.</p>
          )}
        </div>
      </div>

      {/* Player Section */}
      <div className="w-1/2 h-full p-8 min-h-screen flex flex-col items-center justify-center">
        {currentSong && (
          <Player
            song={currentSong}
            playing={playing}
            setPlaying={setPlaying}
            onNext={handleNextSong}
            onPrevious={handlePreviousSong}
          />
        )}
      </div>
    </div>
  );
}

export default App;
