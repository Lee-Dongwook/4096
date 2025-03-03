export const getBestScore = () => {
  return Number(localStorage.getItem("bestScore")) || 0;
};

export const saveBestScore = (score: number) => {
  localStorage.setItem("bestScore", String(score));
};
