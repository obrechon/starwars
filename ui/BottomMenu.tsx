import React from 'react';

interface BottomMenuProps {
  toggleMusic: React.MouseEventHandler<HTMLButtonElement>;
  isMusicPlaying: boolean;
}

export default function BottomMenu({ toggleMusic, isMusicPlaying }: BottomMenuProps) {

  return (
        <div className="bg-yellow-400 h-40 w-full">
          <button onClick={toggleMusic} className="w-5 bg-gray-200/80 p-2 rounded text-black">
              {isMusicPlaying ? 'Pause' : 'Play'}
          </button>
        </div>      
  );
};
