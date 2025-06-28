import { useMemo } from 'react';
import { ArrayElement } from '@/lib/types/data-structures';

export function useArrayVisualization(arrayElements: ArrayElement[]) {
  const elementWidth = 80;
  const elementHeight = 60;
  const elementSpacing = 10;
  const startX = 50;

  const getElementX = (index: number) => startX + index * (elementWidth + elementSpacing);
  
  const svgWidth = useMemo(() => 
    Math.max(600, startX * 2 + arrayElements.length * (elementWidth + elementSpacing)),
    [arrayElements.length]
  );

  return {
    elementWidth,
    elementHeight,
    elementSpacing,
    startX,
    getElementX,
    svgWidth
  };
}