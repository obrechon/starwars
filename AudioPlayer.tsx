import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlaying, loop = true }) => {
  // Use a ref to hold the Audio object instance.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the Audio object on the first render.
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = loop;
    }

    // Play or pause the audio based on the isPlaying prop.
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented. We'll wait for the first user interaction.
          console.log("Autoplay was prevented. Waiting for user interaction.");
          
          const playOnFirstInteraction = () => {
            audioRef.current?.play().catch(e => console.error("Audio play failed on interaction:", e));
            // Clean up the event listener so it only runs once.
            window.removeEventListener('click', playOnFirstInteraction);
            window.removeEventListener('keydown', playOnFirstInteraction);
          };

          window.addEventListener('click', playOnFirstInteraction, { once: true });
          window.addEventListener('keydown', playOnFirstInteraction, { once: true });
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, src, loop]);

  // Cleanup effect to pause audio when the component unmounts.
  // Also handles removing interaction listeners if the component is unmounted before interaction.
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      audioEl?.pause();
      // A dummy function to remove any lingering listeners on cleanup
      const cleanup = () => {};
      window.removeEventListener('click', cleanup);
      window.removeEventListener('keydown', cleanup);
    };
  }, []);

  return null; // This component does not render any UI.
};

export default AudioPlayer;