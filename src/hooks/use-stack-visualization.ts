"use client";

import { useMemo } from "react";
import { StackElement } from "@/lib/types/data-structures";

export function useStackVisualization(stackElements: StackElement[]) {
  const elementWidth = 160;
  const elementHeight = 60;
  const elementSpacing = 10;
  const verticalOffset = 70;
  const horizontalCenter = elementWidth / 2 + 150; // Center point + padding
  
  // Calculate the total height needed for the visualization
  const svgHeight = useMemo(() => 
    Math.max(300, (stackElements.length * (elementHeight + elementSpacing)) + 100),
    [stackElements.length]
  );
  
  // SVG width stays constant 
  const svgWidth = elementWidth + 300; // Element width + padding
  
  // Calculate y position for each element
  const getElementY = (position: number) => 
    svgHeight - verticalOffset - ((position + 1) * (elementHeight + elementSpacing));
  
  return {
    elementWidth,
    elementHeight,
    elementSpacing,
    horizontalCenter,
    svgHeight,
    svgWidth,
    getElementY,
  };
}
