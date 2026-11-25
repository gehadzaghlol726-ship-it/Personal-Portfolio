import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
        className="h-full w-full origin-left rtl:origin-right bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.9),0_0_24px_rgba(56,189,248,0.55)]"
      />
    </div>
  );
};
