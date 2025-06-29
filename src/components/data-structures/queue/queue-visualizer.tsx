"use client";

import { useState } from "react";
import QueueControls from "./queue-controls";
import QueueVisualization from "./queue-visualization";
import useQueueOperations from "@/hooks/use-queue-operations";

export default function QueueVisualizer() {
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    elements,
    enqueueValue,
    setEnqueueValue,
    handleEnqueue,
    handleDequeue,
    resetQueue,
    clearQueue,
    isEmpty,
    isFull
  } = useQueueOperations(setIsAnimating);

  return (
    <div className="max-w-screen-xl mx-auto">
      <QueueControls 
        isAnimating={isAnimating}
        elements={elements}
        enqueueValue={enqueueValue}
        setEnqueueValue={setEnqueueValue}
        handleEnqueue={handleEnqueue}
        handleDequeue={handleDequeue}
        resetQueue={resetQueue}
        clearQueue={clearQueue}
        isEmpty={isEmpty}
        isFull={isFull}
      />
      
      <QueueVisualization 
        elements={elements}
        isAnimating={isAnimating}
      />
    </div>
  );
}
