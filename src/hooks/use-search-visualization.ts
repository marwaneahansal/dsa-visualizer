"use client";

import { useMemo } from "react";
import { SearchElement } from "@/lib/types/algorithms";

export function useSearchVisualization(elements: SearchElement[]) {
  const elementMaxHeight = 300;
  const elementWidth = 50;
  const elementMargin = 10;
  const svgPadding = 40;
  
  // Calculate maximum value in the array to scale elements
  const maxValue = useMemo(() => {
    return elements.length > 0 
      ? Math.max(...elements.map(el => el.value)) 
      : 100;
  }, [elements]);
  
  // Calculate the total width needed for the visualization
  const svgWidth = useMemo(() => {
    return Math.max(500, (elementWidth + elementMargin) * elements.length + svgPadding * 2);
  }, [elements.length]);
  
  // Calculate the height needed for the visualization
  const svgHeight = useMemo(() => {
    return elementMaxHeight + svgPadding * 2;
  }, []);
  
  // Calculate the x position for each element
  const getElementX = (index: number) => {
    return svgPadding + index * (elementWidth + elementMargin);
  };
  
  // Calculate the height of an element based on its value
  const getElementHeight = (value: number) => {
    return (value / maxValue) * elementMaxHeight;
  };
  
  // Calculate the y position for an element (from top)
  const getElementY = (value: number) => {
    return svgHeight - svgPadding - getElementHeight(value);
  };
  
  return {
    elementWidth,
    elementMaxHeight,
    elementMargin,
    svgPadding,
    svgWidth,
    svgHeight,
    getElementX,
    getElementHeight,
    getElementY
  };
}
