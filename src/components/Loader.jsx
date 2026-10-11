import { useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Loader.css";

export default function Loader({ finishLoading }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  const letters = "Michael".split("");

  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: {
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <div className="loader-content">
        <div className="loader-name">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                y: 35,
                opacity: 0,
                filter: "blur(6px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="loader-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: 0.45,
            duration: 0.5,
            ease: "easeInOut",
          }}
        />

        <motion.p
          initial={{
            y: 12,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.65,
            duration: 0.5,
          }}
        >
          Full-Stack Developer • Web & Mobile
        </motion.p>
      </div>
    </motion.div>
  );
}
