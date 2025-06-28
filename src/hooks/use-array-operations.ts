import { useState, useCallback } from "react";
import { ArrayElement } from "@/lib/types/data-structures";

export default function useArrayOperations(
  setIsAnimating: (value: boolean) => void
) {
  const [arrayElements, setArrayElements] = useState<ArrayElement[]>([
    { id: "1", value: 10, index: 0 },
    { id: "2", value: 20, index: 1 },
    { id: "3", value: 30, index: 2 },
    { id: "4", value: 40, index: 3 },
  ]);
  const [insertValue, setInsertValue] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [removeIndex, setRemoveIndex] = useState("");

  const handleInsert = useCallback(async () => {
    if (insertValue === "" || insertIndex === "") return;

    const value = Number.parseInt(insertValue);
    const index = Number.parseInt(insertIndex);

    if (isNaN(value) || isNaN(index) || index < 0 || index > arrayElements.length) return;

    setIsAnimating(true);

    const newElement: ArrayElement = {
      id: Date.now().toString(),
      value,
      index,
    };

    const updatedElements = arrayElements.map((el) => ({
      ...el,
      index: el.index >= index ? el.index + 1 : el.index,
    }));

    const newArray = [...updatedElements];
    newArray.splice(index, 0, newElement);

    setArrayElements(newArray);
    setInsertValue("");
    setInsertIndex("");

    setTimeout(() => setIsAnimating(false), 800);
  }, [arrayElements, insertValue, insertIndex, setIsAnimating]);

  const handleRemove = useCallback(async () => {
    if (removeIndex === "" || arrayElements.length === 0) return;

    const index = Number.parseInt(removeIndex);

    if (isNaN(index) || index < 0 || index >= arrayElements.length) return;

    setIsAnimating(true);

    const newArray = arrayElements
      .filter((_, i) => i !== index)
      .map((el, i) => ({ ...el, index: i }));

    setArrayElements(newArray);
    setRemoveIndex("");

    setTimeout(() => setIsAnimating(false), 800);
  }, [arrayElements, removeIndex, setIsAnimating]);

  const resetArray = useCallback(() => {
    setArrayElements([
      { id: "1", value: 10, index: 0 },
      { id: "2", value: 20, index: 1 },
      { id: "3", value: 30, index: 2 },
      { id: "4", value: 40, index: 3 },
    ]);
    setInsertValue("");
    setInsertIndex("");
    setRemoveIndex("");
  }, []);

  return {
    arrayElements,
    insertValue,
    insertIndex,
    removeIndex,
    setInsertValue,
    setInsertIndex,
    setRemoveIndex,
    handleInsert,
    handleRemove,
    resetArray
  };
}