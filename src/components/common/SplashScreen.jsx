// SplashScreen.jsx
import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.img
        src="/logonav.png" // replace with your logo path
        alt="Logo"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-32 h-32"
      />
    </div>
  );
};

export default SplashScreen;
