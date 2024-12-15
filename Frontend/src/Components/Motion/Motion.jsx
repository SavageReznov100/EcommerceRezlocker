import React, { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Motion = ({ children, direction, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: direction === "right" ? -100 : direction === "left" ? 100 : 0,
            y: direction === "down" ? -100 : direction === "up" ? 100 : 0,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
          },
        }}
        initial="hidden"
        animate={controls}
        transition={{
          duration: 1.25,
          type: "tween",
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Motion;
