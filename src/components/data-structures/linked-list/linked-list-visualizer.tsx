"use client";

import { useState } from "react";
import LinkedListControls from "./linked-list-controls";
import LinkedListVisualization from "./linked-list-visualization";
import useLinkedListOperations from "@/hooks/use-linked-list-operations";

export default function LinkedListVisualizer() {
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    nodes,
    insertValue,
    insertPosition,
    insertIndex,
    removePosition,
    removeIndex,
    setInsertValue,
    setInsertPosition,
    setInsertIndex,
    setRemovePosition,
    setRemoveIndex,
    handleInsert,
    handleRemove,
    resetList,
    clearList,
    isEmpty
  } = useLinkedListOperations(setIsAnimating);

  return (
    <div className="max-w-screen-xl mx-auto">
      <LinkedListControls 
        isAnimating={isAnimating}
        nodes={nodes}
        insertValue={insertValue}
        insertPosition={insertPosition}
        insertIndex={insertIndex}
        removePosition={removePosition}
        removeIndex={removeIndex}
        setInsertValue={setInsertValue}
        setInsertPosition={setInsertPosition}
        setInsertIndex={setInsertIndex}
        setRemovePosition={setRemovePosition}
        setRemoveIndex={setRemoveIndex}
        handleInsert={handleInsert}
        handleRemove={handleRemove}
        resetList={resetList}
        clearList={clearList}
        isEmpty={isEmpty}
      />
      
      <LinkedListVisualization 
        nodes={nodes}
        isAnimating={isAnimating}
      />
    </div>
  );
}
