import React from 'react';

const NavigationTabs = ({ currentTab, onTabChange }) => {
  return (
    <div className="flex justify-center space-x-10 text-lg font-semibold text-gray-300">
      <div
        className={`cursor-pointer ${currentTab === 'For You' ? 'border-b-2 border-indigo-500 text-white' : ''}`}
        onClick={() => onTabChange('For You')}
      >
        For You
      </div>
      <div
        className={`cursor-pointer ${currentTab === 'Top Tracks' ? 'border-b-2 border-indigo-500 text-white' : ''}`}
        onClick={() => onTabChange('Top Tracks')}
      >
        Top Tracks
      </div>
    </div>
  );
};

export default NavigationTabs;
