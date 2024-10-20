import React from "react";
import './FloatingEmojis.css';
// Array of emojis to randomly use
const emojis = ["😀", "🎉", "🚀", "💻", "🔥", "🍕", "🐱", "🌈", "⚡", "🎮"];

const getRandomPosition = () => ({
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`,
  animationDelay: `${Math.random() * 2}s`,
  animationDuration: `${Math.random() * 5 + 5}s`,
});

const FloatingEmojis = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden opacity-80">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="absolute w-14 h-14 bg-gray-400 bg-opacity-10 rounded-lg flex items-center justify-center text-3xl animate-float"
          style={getRandomPosition()}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmojis;
