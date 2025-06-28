"use client";

import { useState, useCallback } from "react";
import { StackElement } from "@/lib/types/data-structures";

export default function useStackOperations(
  setIsAnimating: (value: boolean) => void
) {
  const [stackElements, setStackElements] = useState<StackElement[]>([
    { id: "1", value: 10, position: 0 },
    { id: "2", value: 20, position: 1 },
    { id: "3", value: 30, position: 2 },
  ]);
  const [pushValue, setPushValue] = useState("");

  // Push a new element to the top of the stack
  const handlePush = useCallback(async () => {
    if (pushValue === "") return;

    const value = Number.parseInt(pushValue);
    if (isNaN(value)) return;

    setIsAnimating(true);

    const newElement: StackElement = {
      id: Date.now().toString(),
      value,
      position: stackElements.length,
    };

    setStackElements((prev) => [...prev, newElement]);
    setPushValue("");

    setTimeout(() => setIsAnimating(false), 800);
  }, [pushValue, stackElements.length, setIsAnimating]);

  // Pop the top element from the stack
  const handlePop = useCallback(async () => {
    if (stackElements.length === 0) return;

    setIsAnimating(true);

    setStackElements((prev) => prev.slice(0, prev.length - 1));

    setTimeout(() => setIsAnimating(false), 800);
  }, [stackElements.length, setIsAnimating]);

  // Peek at the top element without removing it
  const peek = useCallback(() => {
    if (stackElements.length === 0) return null;
    return stackElements[stackElements.length - 1];
  }, [stackElements]);

  // Reset the stack to its initial state
  const resetStack = useCallback(() => {
    setStackElements([
      { id: "1", value: 10, position: 0 },
      { id: "2", value: 20, position: 1 },
      { id: "3", value: 30, position: 2 },
    ]);
    setPushValue("");
  }, []);

  // Clear the stack (empty it)
  const clearStack = useCallback(() => {
    setStackElements([]);
    setPushValue("");
  }, []);

  return {
    stackElements,
    pushValue,
    setPushValue,
    handlePush,
    handlePop,
    peek,
    resetStack,
    clearStack,
    isEmpty: stackElements.length === 0,
    isFull: stackElements.length >= 10, // Optional: set a max stack size
  };
}
