import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  useTransform,
} from "framer-motion";
import TextCopy from "./TextCopy";

const ComingSoon = ({ theme, setTheme }) => {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  // const overRef= useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center end", "end end"],
  });

  const images = useMemo(() => {
    const loadedImages = [];
    for (let i = 1; i <= 343; i++) {
      const img = new Image();
      img.src = `/img/images/${i}.webp`;
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 343]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [0, 1, 0]);
  // const x = useTransform(scrollYProgress, [0, 1], [500, -500]);

  const render = useCallback(
    (index) => {
      const canvas = targetRef.current;
      if (canvas && images[index - 1]) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Clear the canvas before drawing the new image
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the image scaled to fit the canvas
          const img = images[index - 1];
          const canvasAspectRatio = canvas.width / canvas.height;
          const imgAspectRatio = img.width / img.height;

          let drawWidth, drawHeight;

          if (canvasAspectRatio > imgAspectRatio) {
            drawWidth = canvas.height * imgAspectRatio;
            drawHeight = canvas.height;
          } else {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspectRatio;
          }

          const x = (canvas.width - drawWidth) / 2;
          const y = (canvas.height - drawHeight) / 2;

          ctx.drawImage(img, x, y, drawWidth, drawHeight);
        }
      }
    },
    [images]
  );

  // Handle canvas resizing
  const handleResize = useCallback(() => {
    const canvas = targetRef.current;
    if (canvas) {
      // Set canvas dimensions to match window dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Redraw the current image
      const index = Math.round(currentIndex.get());
      render(index);
    }
  }, [currentIndex, render]);

  // Update canvas size on window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Initial resize
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Number(latest.toFixed()));
  });

  return (
    <div className=" relative w-screen dark:bg-black ">
      <div>
        <p>Hello</p>
      </div>
      <motion.div ref={containerRef} className="w-screen  h-[350vh]  ">
        <canvas ref={targetRef} className="sticky top-0 left-0"></canvas>
        <TextCopy />
      </motion.div>
    </div>
  );
};

export default ComingSoon;
