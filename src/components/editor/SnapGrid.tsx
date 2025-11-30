import { motion } from "framer-motion";

interface SnapGridProps {
  show: boolean;
  gridSize?: number;
}

export const SnapGrid = ({ show, gridSize = 20 }: SnapGridProps) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--primary) / 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--primary) / 0.08) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    >
      {/* Corner markers for visual reference */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-primary/30 rounded-full" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-primary/30 rounded-full" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary/30 rounded-full" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary/30 rounded-full" />
      
      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-0.5 bg-primary/20" />
        <div className="w-0.5 h-8 bg-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </motion.div>
  );
};
