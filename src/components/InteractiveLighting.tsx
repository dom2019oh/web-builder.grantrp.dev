import { useEffect, useState } from "react";

const InteractiveLighting = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax effect - light moves slower than scroll
  const parallaxY = scrollY * 0.3;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y - parallaxY}px, rgba(55, 231, 247, 0.12), transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x * 0.8}px ${mousePosition.y * 0.8 - parallaxY}px, rgba(211, 77, 254, 0.08), transparent 80%)`,
        }}
      />
    </>
  );
};

export default InteractiveLighting;
