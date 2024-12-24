import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieAnimationProps {
  path: string;
  width?: number;
  height?: number;
}

export default function LottieAnimation({ path, width = 300, height = 300 }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path,
    });

    return () => {
      animation.destroy();
    };
  }, [path]);

  return <div ref={containerRef} style={{ width, height }} />;
} 