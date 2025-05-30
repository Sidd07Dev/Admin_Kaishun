import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
import { motion } from "framer-motion";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    const typingStyle = {
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      borderRight: "2px solid #2563eb", // Tailwind blue-600
      paddingRight: "8px",
      width: "0ch",
      animation: "typing 3s steps(25, end) infinite, blink 0.7s step-end infinite",
    };
  
    const keyframes = `
      @keyframes typing {
        0% { width: 0ch; }
        50% { width: 25ch; }
        100% { width: 0ch; }
      }
  
      @keyframes blink {
        0%, 100% { border-color: transparent; }
        50% { border-color: #2563eb; }
      }
    `;
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 relative overflow-hidden">
      {/* Animated blurred background circle */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-pink-400 rounded-full filter blur-3xl opacity-20 animate-pulse bottom-[-100px] right-[-100px]" />

      <div className="relative flex flex-col items-center space-y-6 z-10">
        {/* Rotating ring around logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="w-32 h-32 rounded-full border-4 border-dashed border-blue-300 flex items-center justify-center"
        >
          {/* Glowing logo */}
          <motion.img
            src="../public/favicon1.png"
            alt="Loading Logo"
            className="w-16 h-16 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0px rgba(59,130,246,0.4)",
                "0 0 20px rgba(59,130,246,0.6)",
                "0 0 0px rgba(59,130,246,0.4)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>

        {/* Typing-style loading text */}
       
        <div >
      {/* Inject keyframes dynamically */}
      <style>{keyframes}</style>

      <div className="flex flex-col items-center space-y-4">
  
        <div className="text-blue-700 text-lg font-semibold">
          <span style={typingStyle}>Loading, please wait...</span>
        </div>
      </div>
    </div>
        
      </div>
    </div>

    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
