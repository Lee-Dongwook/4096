import React from "react";

interface GameOverModalProps {
  resetGame: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ resetGame }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">게임 오버!</h2>
        <button
          onClick={resetGame}
          className="bg-red-500 px-4 py-2 rounded-md text-white"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
