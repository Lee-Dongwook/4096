import React from "react";
import { motion } from "framer-motion";

interface TileProps {
  value: number;
}

const tileColors: { [key: number]: string } = {
  0: "bg-gray-500",
  2: "bg-blue-500",
  4: "bg-blue-600",
  8: "bg-yellow-500",
  16: "bg-yellow-600",
  32: "bg-orange-500",
  64: "bg-orange-600",
  128: "bg-red-500",
  256: "bg-red-600",
  512: "bg-purple-500",
  1024: "bg-purple-600",
  2048: "bg-green-500",
  4096: "bg-green-700",
};

const Tile: React.FC<TileProps> = ({ value }) => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`h-16 w-16 flex items-center justify-center font-bold text-white text-2xl ${
        tileColors[value] || "bg-gray-700"
      }`}
    >
      {value !== 0 && value}
    </motion.div>
  );
};

export default Tile;
