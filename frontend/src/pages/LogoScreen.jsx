// src/pages/LogoScreen.jsx
import { motion } from "framer-motion";

export default function LogoScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-300">
      <motion.img
        src="/logo.png" 
        alt="LoreWeaver"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2.5, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-64 h-auto drop-shadow-lg"
      />
    </div>
  );
}
