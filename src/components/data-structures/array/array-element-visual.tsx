import { motion } from "motion/react";
import { ArrayElement } from "@/lib/types/data-structures";

interface ArrayElementVisualProps {
  element: ArrayElement;
  getElementX: (index: number) => number;
  elementWidth: number;
  elementHeight: number;
}

export function ArrayElementVisual({ 
  element, 
  getElementX, 
  elementWidth, 
  elementHeight 
}: ArrayElementVisualProps) {
  return (
    <motion.g
      key={element.id}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: getElementX(element.index),
      }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      }}
      layout
    >
      {/* Element box */}
      <motion.rect
        x={0}
        y={70}
        width={elementWidth}
        height={elementHeight}
        rx={8}
        className="fill-primary/70 stroke-primary stroke-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      />

      {/* Element value */}
      <motion.text
        x={elementWidth / 2}
        y={105}
        textAnchor="middle"
        className="text-lg font-bold fill-white"
      >
        {element.value}
      </motion.text>
    </motion.g>
  );
}