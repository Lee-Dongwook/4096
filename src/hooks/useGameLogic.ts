import { useState, useEffect } from "react";
import { saveBestScore, getBestScore } from "../utils/storage";

const BOARD_SIZE = 4;

const initialBoard = () => {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0)
  );
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

const addRandomTile = (board: number[][]) => {
  const emptyCells: [number, number][] = [];
  board.forEach((row, r) =>
    row.forEach((cell, c) => cell === 0 && emptyCells.push([r, c]))
  );
  if (emptyCells.length) {
    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[r][c] = Math.random() > 0.1 ? 2 : 4;
  }
};

// 한 줄을 왼쪽으로 정렬하는 함수
const slide = (row: number[]) => {
  let newRow = row.filter((num) => num !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }
  newRow = newRow.filter((num) => num !== 0);
  while (newRow.length < BOARD_SIZE) newRow.push(0);
  return newRow;
};

// 현재 보드에서 이동할 수 있는지 체크
const canMove = (board: number[][]) => {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === 0) return true; // 빈칸이 있으면 이동 가능
      if (c < BOARD_SIZE - 1 && board[r][c] === board[r][c + 1]) return true; // 가로 체크
      if (r < BOARD_SIZE - 1 && board[r][c] === board[r + 1][c]) return true; // 세로 체크
    }
  }
  return false;
};

export const useGameLogic = () => {
  const [board, setBoard] = useState(initialBoard);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(getBestScore());
  const [gameOver, setGameOver] = useState(false);

  const move = (direction: "left" | "right" | "up" | "down") => {
    const newBoard = board.map((row) => [...row]);
    let moved = false;
    let newScore = score;

    const moveLeft = () => {
      for (let r = 0; r < BOARD_SIZE; r++) {
        const originalRow = [...newBoard[r]];
        newBoard[r] = slide(newBoard[r]);
        if (originalRow.toString() !== newBoard[r].toString()) moved = true;
      }
    };

    const moveRight = () => {
      for (let r = 0; r < BOARD_SIZE; r++) {
        const originalRow = [...newBoard[r]];
        newBoard[r] = slide(newBoard[r].reverse()).reverse();
        if (originalRow.toString() !== newBoard[r].toString()) moved = true;
      }
    };

    const moveUp = () => {
      for (let c = 0; c < BOARD_SIZE; c++) {
        let column = newBoard.map((row) => row[c]);
        const originalColumn = [...column];
        column = slide(column);
        if (originalColumn.toString() !== column.toString()) moved = true;
        column.forEach((val, r) => (newBoard[r][c] = val));
      }
    };

    const moveDown = () => {
      for (let c = 0; c < BOARD_SIZE; c++) {
        let column = newBoard.map((row) => row[c]);
        const originalColumn = [...column];
        column = slide(column.reverse()).reverse();
        if (originalColumn.toString() !== column.toString()) moved = true;
        column.forEach((val, r) => (newBoard[r][c] = val));
      }
    };

    if (direction === "left") moveLeft();
    if (direction === "right") moveRight();
    if (direction === "up") moveUp();
    if (direction === "down") moveDown();

    if (moved) {
      newBoard.forEach((row) => {
        row.forEach((cell) => {
          if (cell > score) newScore = cell;
        });
      });

      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        saveBestScore(newScore);
      }
    }

    if (!canMove(newBoard)) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (!board.flat().includes(0) && !canMove(board)) {
      setGameOver(true);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(initialBoard());
    setScore(0);
    setGameOver(false);
  };

  return {
    board,
    moveLeft: () => move("left"),
    moveRight: () => move("right"),
    moveUp: () => move("up"),
    moveDown: () => move("down"),
    score,
    bestScore,
    gameOver,
    resetGame,
  };
};
