import React, { useEffect } from "react";
import "./FloatingEmojis.css";
// Array of emojis to randomly use
const emojis = [
  "📚",
  "💻",
  "🛠️",
  "📱",
  "🧪",
  "🔧",
  "📖",
  "⚙️",
  "🖥️",
  "📝",
  "🎓",
  "📐",
  "🖊️",
  "💡",
];
const EMOJI_SIZE = 14;
const MIN_DISTANCE = 60;

// const getRandomPosition = () => emojis.map(() => ({  
//   top: `${Math.random() * 80 + 10}%`,
//   left: `${Math.random() * 80 + 10}%`,
//   animationDelay: `${Math.random() * 2}s`,
//   animationDuration: `${Math.random() * 5 + 5}s`,
// }));

const FloatingEmojis = () => {
  const [position, setPosition] = React.useState([]);
  const generateRandomPosition = (existingPositions) => {
    let tries = 0;
    let newPos;

    // Keep trying until no collision or max tries reached
    do {
      const top = Math.random() * (window.innerHeight - EMOJI_SIZE);
      const left = Math.random() * (window.innerWidth - EMOJI_SIZE);
      newPos = { top, left, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 3}s` };
      tries++;
    } while (hasCollision(newPos, existingPositions) && tries < 50);

    return newPos;
  };

  // Check if a new position collides with existing ones
  const hasCollision = (newPos, existingPositions) => {
    return existingPositions.some(pos => {
      const dist = Math.sqrt(
        Math.pow(newPos.top - pos.top, 2) + Math.pow(newPos.left - pos.left, 2)
      );
      return dist < MIN_DISTANCE;
    });
  };

  // Generate all positions without collisions
  const generatePositions = () => {
    const newPositions = [];
    for (let i = 0; i < emojis.length; i++) {
      const pos = generateRandomPosition(newPositions);
      newPositions.push(pos);
    }
    return newPositions;
  };

  useEffect(() => {
    setPosition(generatePositions());
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F9F6EE] opacity-80">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="absolute w-14 h-14 bg-gray-400 bg-opacity-10 rounded-lg flex items-center justify-center text-3xl animate-float"
          style={{top: position[index]?.top, left: position[index]?.left, animationDelay: position[index]?.animationDelay, animationDuration: position[index]?.animationDuration}}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmojis;
