"use client";

import { useState } from "react";
import ArrayControls from "./array-controls";
import ArrayVisualization from "./array-visualization";
import useArrayOperations from "@/hooks/use-array-operations";

export default function ArrayVisualizer() {
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    arrayElements,
    insertValue,
    insertIndex,
    removeIndex,
    setInsertValue,
    setInsertIndex,
    setRemoveIndex,
    handleInsert,
    handleRemove,
    resetArray,
    clearArray,
  } = useArrayOperations(setIsAnimating);

  return (
    <div className="max-w-screen-xl mx-auto">
      <ArrayControls 
        isAnimating={isAnimating}
        arrayElements={arrayElements}
        insertValue={insertValue}
        insertIndex={insertIndex}
        removeIndex={removeIndex}
        setInsertValue={setInsertValue}
        setInsertIndex={setInsertIndex}
        setRemoveIndex={setRemoveIndex}
        handleInsert={handleInsert}
        handleRemove={handleRemove}
        resetArray={resetArray}
        clearArray={clearArray}
      />
      
      <ArrayVisualization 
        arrayElements={arrayElements}
        isAnimating={isAnimating}
      />
    </div>
  );
}
