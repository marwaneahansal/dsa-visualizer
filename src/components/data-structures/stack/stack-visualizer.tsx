"use client";

import { useState } from "react";
import StackControls from "./stack-controls";
import StackVisualization from "./stack-visualization";
import useStackOperations from "@/hooks/use-stack-operations";

export default function StackVisualizer() {
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    stackElements,
    pushValue,
    setPushValue,
    handlePush,
    handlePop,
    resetStack,
    clearStack,
    isEmpty,
    isFull
  } = useStackOperations(setIsAnimating);

  return (
    <div className="max-w-screen-xl mx-auto">
      <StackControls 
        isAnimating={isAnimating}
        stackElements={stackElements}
        pushValue={pushValue}
        setPushValue={setPushValue}
        handlePush={handlePush}
        handlePop={handlePop}
        resetStack={resetStack}
        clearStack={clearStack}
        isEmpty={isEmpty}
        isFull={isFull}
      />
      
      <StackVisualization 
        stackElements={stackElements}
        isAnimating={isAnimating}
      />
    </div>
  );
}
