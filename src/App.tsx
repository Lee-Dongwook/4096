import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">4096 Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
