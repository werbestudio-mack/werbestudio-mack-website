
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the cursor is over an interactive element
      const isInteractive = target.closest('button, a, .cursor-pointer, input, textarea');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      {/* 
          IMPORTANT: pointer-events-none ensures that the custom cursor element 
          never captures click events, allowing them to pass through to buttons/switches.
      */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#ef7800] pointer-events-none z-[11000] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(239, 120, 0, 0.2)' : 'rgba(239, 120, 0, 0)',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#ef7800] rounded-full pointer-events-none z-[11001]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};
