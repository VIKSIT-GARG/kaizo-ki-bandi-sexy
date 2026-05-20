"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import data from "@/content/data.json";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

interface AudioContextType {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tracks = data.playlist;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.35); // Default 35% volume - soft start
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(tracks[currentTrackIndex].url);
    audio.volume = volume;
    audio.loop = tracks.length === 1; // Loop if single track
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTrackEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleTrackEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleTrackEnded);
    };
  }, [currentTrackIndex]);

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Fade in effect
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked by browser autoplay policy:", err);
        setIsPlaying(false);
      });
      
      // Gentle fade-in
      audioRef.current.volume = 0;
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < volume) {
          vol = Math.min(volume, vol + 0.05);
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      // Gentle fade-out
      let vol = audioRef.current.volume;
      const interval = setInterval(() => {
        if (vol > 0) {
          vol = Math.max(0, vol - 0.05);
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          if (audioRef.current) audioRef.current.pause();
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Adjust volume
  const setVolume = (newVolume: number) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolumeState(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentTrackIndex,
        isPlaying,
        volume,
        currentTime,
        duration,
        play,
        pause,
        togglePlay,
        nextTrack,
        prevTrack,
        selectTrack,
        setVolume,
        seek,
        audioRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
