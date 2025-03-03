import React from "react";

interface ScoreBoardProps {
  score: number;
  bestScore: number;
  resetGame: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  bestScore,
  resetGame,
}) => {
  return (
    <div className="flex justify-between w-64 bg-gray-800 text-white p-4 rounded-lg">
      <div>
        <p>점수: {score}</p>
        <p>최고 점수: {bestScore}</p>
      </div>
      <button onClick={resetGame} className="bg-red-500 px-4 py-2 rounded-md">
        리셋
      </button>
    </div>
  );
};

export default ScoreBoard;
