import { useEffect } from "react";
import Tile from "./Tile";
import GameOverModal from "./GameOverModal";
import ScoreBoard from "./ScoreBoard";
import { useGameLogic } from "../hooks/useGameLogic";

const GameBoard = () => {
  const {
    board,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    score,
    bestScore,
    gameOver,
    resetGame,
  } = useGameLogic();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
      if (e.key === "ArrowUp") moveUp();
      if (e.key === "ArrowDown") moveDown();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveLeft, moveRight, moveUp, moveDown]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <ScoreBoard score={score} bestScore={bestScore} resetGame={resetGame} />
      <div className="grid grid-cols-4 gap-2 bg-gray-700 p-4 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={value} />
          ))
        )}
      </div>
      {gameOver && <GameOverModal resetGame={resetGame} />}
    </div>
  );
};

export default GameBoard;
