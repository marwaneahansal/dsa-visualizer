"use client";

import { useState, useCallback } from "react";
import { LinkedListNode } from "@/lib/types/data-structures";

export default function useLinkedListOperations(
  setIsAnimating: (value: boolean) => void
) {
  const [nodes, setNodes] = useState<LinkedListNode[]>(() => {
    const initialNodes: LinkedListNode[] = [
      { id: "1", value: 10, position: 0, isHead: true },
      { id: "2", value: 20, position: 1 },
      { id: "3", value: 30, position: 2 },
      { id: "4", value: 40, position: 3, isTail: true },
    ];
    return initialNodes;
  });

  const [insertValue, setInsertValue] = useState("");
  const [insertPosition, setInsertPosition] = useState("head"); // "head", "tail", or index
  const [insertIndex, setInsertIndex] = useState("");
  const [removePosition, setRemovePosition] = useState("head"); // "head", "tail", or index
  const [removeIndex, setRemoveIndex] = useState("");

  // Helper function to update positions and head/tail status
  const updatePositionsAndStatus = useCallback((nodesList: LinkedListNode[]): LinkedListNode[] => {
    return nodesList.map((node, index) => ({
      ...node,
      position: index,
      isHead: index === 0,
      isTail: index === nodesList.length - 1,
    }));
  }, []);

  // Insert a new node
  const handleInsert = useCallback(async () => {
    if (insertValue === "") return;
    if (insertPosition === "index" && insertIndex === "") return;

    const value = Number.parseInt(insertValue);
    if (isNaN(value)) return;

    setIsAnimating(true);

    const newNode: LinkedListNode = {
      id: Date.now().toString(),
      value,
      position: 0, // Will be updated by updatePositionsAndStatus
    };

    setNodes((prevNodes) => {
      const newNodes = [...prevNodes];
      
      if (insertPosition === "head") {
        // Insert at the beginning
        newNodes.unshift(newNode);
      } else if (insertPosition === "tail") {
        // Insert at the end
        newNodes.push(newNode);
      } else {
        // Insert at a specific index
        const index = Number.parseInt(insertIndex);
        if (isNaN(index) || index < 0 || index > newNodes.length) {
          return prevNodes;
        }
        newNodes.splice(index, 0, newNode);
      }
      
      return updatePositionsAndStatus(newNodes);
    });

    setInsertValue("");
    setInsertIndex("");

    setTimeout(() => setIsAnimating(false), 800);
  }, [
    insertValue, 
    insertPosition, 
    insertIndex, 
    setIsAnimating, 
    updatePositionsAndStatus
  ]);

  // Remove a node
  const handleRemove = useCallback(async () => {
    if (nodes.length === 0) return;
    if (removePosition === "index" && removeIndex === "") return;

    setIsAnimating(true);

    setNodes((prevNodes) => {
      const newNodes = [...prevNodes];

      if (removePosition === "head") {
        // Remove the first node
        newNodes.shift();
      } else if (removePosition === "tail") {
        // Remove the last node
        newNodes.pop();
      } else {
        // Remove at a specific index
        const index = Number.parseInt(removeIndex);
        if (isNaN(index) || index < 0 || index >= newNodes.length) {
          return prevNodes;
        }
        newNodes.splice(index, 1);
      }
      
      return updatePositionsAndStatus(newNodes);
    });

    setRemoveIndex("");

    setTimeout(() => setIsAnimating(false), 800);
  }, [
    nodes.length,
    removePosition, 
    removeIndex, 
    setIsAnimating, 
    updatePositionsAndStatus
  ]);

  // Reset the linked list to its initial state
  const resetList = useCallback(() => {
    setNodes([
      { id: "1", value: 10, position: 0, isHead: true },
      { id: "2", value: 20, position: 1 },
      { id: "3", value: 30, position: 2 },
      { id: "4", value: 40, position: 3, isTail: true },
    ]);
    setInsertValue("");
    setInsertPosition("head");
    setInsertIndex("");
    setRemovePosition("head");
    setRemoveIndex("");
  }, []);

  // Clear the linked list (empty it)
  const clearList = useCallback(() => {
    setNodes([]);
    setInsertValue("");
    setInsertIndex("");
    setRemoveIndex("");
  }, []);

  return {
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
    isEmpty: nodes.length === 0
  };
}
