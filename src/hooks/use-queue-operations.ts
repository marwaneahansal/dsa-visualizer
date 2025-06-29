"use client";

import { useState, useCallback } from "react";
import { QueueElement } from "@/lib/types/data-structures";

export default function useQueueOperations(
  setIsAnimating: (value: boolean) => void
) {
  const [elements, setElements] = useState<QueueElement[]>(() => {
    const initialElements: QueueElement[] = [
      { id: "1", value: 10, position: 0, isFront: true },
      { id: "2", value: 20, position: 1 },
      { id: "3", value: 30, position: 2 },
      { id: "4", value: 40, position: 3, isRear: true },
    ];
    return initialElements;
  });

  const [enqueueValue, setEnqueueValue] = useState("");
  const maxSize = 10; // Maximum queue size

  // Helper function to update positions and front/rear status
  const updatePositionsAndStatus = useCallback((elementsList: QueueElement[]): QueueElement[] => {
    return elementsList.map((element, index) => ({
      ...element,
      position: index,
      isFront: index === 0,
      isRear: index === elementsList.length - 1,
    }));
  }, []);

  // Add element to the rear of the queue (enqueue)
  const handleEnqueue = useCallback(async () => {
    if (enqueueValue === "") return;
    if (elements.length >= maxSize) return; // Queue is full

    const value = Number.parseInt(enqueueValue);
    if (isNaN(value)) return;

    setIsAnimating(true);

    const newElement: QueueElement = {
      id: Date.now().toString(),
      value,
      position: elements.length,
      isRear: true
    };

    setElements((prevElements) => {
      // Remove the rear flag from the current rear element
      const updatedElements = prevElements.map(el => ({
        ...el,
        isRear: false
      }));
      
      // Add the new element to the rear
      return updatePositionsAndStatus([...updatedElements, newElement]);
    });

    setEnqueueValue("");

    setTimeout(() => setIsAnimating(false), 800);
  }, [enqueueValue, elements.length, maxSize, setIsAnimating, updatePositionsAndStatus]);

  // Remove element from the front of the queue (dequeue)
  const handleDequeue = useCallback(async () => {
    if (elements.length === 0) return; // Queue is empty

    setIsAnimating(true);

    setElements((prevElements) => {
      // Remove the front element
      const newElements = prevElements.slice(1);
      return updatePositionsAndStatus(newElements);
    });

    setTimeout(() => setIsAnimating(false), 800);
  }, [elements.length, setIsAnimating, updatePositionsAndStatus]);

  // Reset the queue to its initial state
  const resetQueue = useCallback(() => {
    setElements([
      { id: "1", value: 10, position: 0, isFront: true },
      { id: "2", value: 20, position: 1 },
      { id: "3", value: 30, position: 2 },
      { id: "4", value: 40, position: 3, isRear: true },
    ]);
    setEnqueueValue("");
  }, []);

  // Clear the queue (empty it)
  const clearQueue = useCallback(() => {
    setElements([]);
    setEnqueueValue("");
  }, []);

  return {
    elements,
    enqueueValue,
    setEnqueueValue,
    handleEnqueue,
    handleDequeue,
    resetQueue,
    clearQueue,
    isEmpty: elements.length === 0,
    isFull: elements.length >= maxSize
  };
}
