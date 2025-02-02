import { useState, useEffect } from "react";

export default function Card({ children }) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-10 border border-gray-200 w-3/5 mx-auto mt-10 text-center">
      {children}
      <div className="mt-4 text-xl font-bold text-red-500">Time Left: {timeLeft}s</div>
    </div>
  );
}

export function Leaderboard() {
  const generateRandomPlayers = () => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah"];
    let players = {};
    for (let i = 0; i < 5; i++) {
      const id = `player${i + 1}`;
      players[id] = {
        id,
        name: names[Math.floor(Math.random() * names.length)],
        score: Math.floor(Math.random() * 100),
      };
    }
    return players;
  };

  const [players, setPlayers] = useState(generateRandomPlayers());

  const sortedPlayers = Object.values(players).sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white shadow-lg rounded-lg p-10 border border-gray-200 w-3/5 mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ol className="list-decimal list-inside text-left mx-auto inline-block">
        {sortedPlayers.map((player, index) => (
          <li key={player.id} className="text-lg font-medium">
            {player.name}: {player.score} pts
          </li>
        ))}
      </ol>
    </div>
  );
}
