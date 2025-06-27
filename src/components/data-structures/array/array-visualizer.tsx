"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

interface ArrayElement {
  id: string;
  value: number;
  index: number;
}

export default function ArrayVisualizer() {
  const [arrayElements, setArrayElements] = useState<ArrayElement[]>([
    { id: "1", value: 10, index: 0 },
    { id: "2", value: 20, index: 1 },
    { id: "3", value: 30, index: 2 },
    { id: "4", value: 40, index: 3 },
  ]);
  const [insertValue, setInsertValue] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [removeIndex, setRemoveIndex] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const elementWidth = 80;
  const elementHeight = 60;
  const elementSpacing = 10;
  const startX = 50;

  const insertElement = useCallback(async () => {
    if (isAnimating || insertValue === "" || insertIndex === "") return;

    const value = Number.parseInt(insertValue);
    const index = Number.parseInt(insertIndex);

    if (isNaN(value) || isNaN(index) || index < 0 || index > arrayElements.length) return;

    setIsAnimating(true);

    const newElement: ArrayElement = {
      id: Date.now().toString(),
      value,
      index,
    };

    // Update indices for elements that will shift
    const updatedElements = arrayElements.map((el) => ({
      ...el,
      index: el.index >= index ? el.index + 1 : el.index,
    }));

    // Insert the new element
    const newArray = [...updatedElements];
    newArray.splice(index, 0, newElement);

    setArrayElements(newArray);
    setInsertValue("");
    setInsertIndex("");

    // Allow animation to complete
    setTimeout(() => setIsAnimating(false), 800);
  }, [arrayElements, insertValue, insertIndex, isAnimating]);

  const removeElement = useCallback(async () => {
    if (isAnimating || removeIndex === "" || arrayElements.length === 0) return;

    const index = Number.parseInt(removeIndex);

    if (isNaN(index) || index < 0 || index >= arrayElements.length) return;

    setIsAnimating(true);

    // Remove element and update indices
    const newArray = arrayElements
      .filter((_, i) => i !== index)
      .map((el, i) => ({ ...el, index: i }));

    setArrayElements(newArray);
    setRemoveIndex("");

    // Allow animation to complete
    setTimeout(() => setIsAnimating(false), 800);
  }, [arrayElements, removeIndex, isAnimating]);

  const resetArray = useCallback(() => {
    if (isAnimating) return;

    setArrayElements([
      { id: "1", value: 10, index: 0 },
      { id: "2", value: 20, index: 1 },
      { id: "3", value: 30, index: 2 },
      { id: "4", value: 40, index: 3 },
    ]);
    setInsertValue("");
    setInsertIndex("");
    setRemoveIndex("");
  }, [isAnimating]);

  const getElementX = (index: number) => startX + index * (elementWidth + elementSpacing);

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Insert Element
            </h3>
            <div className="space-y-2">
              <Input
                placeholder="Value"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
                type="number"
              />
              <Input
                placeholder="Index"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
                type="number"
                min="0"
                max={arrayElements.length}
              />
              <Button
                onClick={insertElement}
                disabled={isAnimating || !insertValue || !insertIndex}
                className="w-full"
              >
                Insert
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Minus className="w-4 h-4 mr-2" />
              Remove Element
            </h3>
            <div className="space-y-2">
              <Input
                placeholder="Index to remove"
                value={removeIndex}
                onChange={(e) => setRemoveIndex(e.target.value)}
                type="number"
                min="0"
                max={Math.max(0, arrayElements.length - 1)}
              />
              <Button
                onClick={removeElement}
                disabled={isAnimating || !removeIndex || arrayElements.length === 0}
                className="w-full"
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-2">Reset to initial state</p>
              <Button
                onClick={resetArray}
                disabled={isAnimating}
                className="w-full bg-transparent"
                variant="outline"
              >
                Reset Array
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Array Visualization */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <svg
              width={Math.max(
                600,
                startX * 2 + arrayElements.length * (elementWidth + elementSpacing)
              )}
              height={200}
              className="mx-auto"
            >
              {/* Index labels */}
              {arrayElements.map((_, index) => (
                <text
                  key={`index-${index}`}
                  x={getElementX(index) + elementWidth / 2}
                  y={55}
                  textAnchor="middle"
                  className="text-sm fill-muted-foreground"
                >
                  [{index}]
                </text>
              ))}

              {/* Array elements */}
              <AnimatePresence mode="popLayout">
                {arrayElements.map((element) => (
                  <motion.g
                    key={element.id}
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      x: getElementX(element.index),
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      duration: 0.6,
                    }}
                    layout
                  >
                    {/* Element box */}
                    <motion.rect
                      x={0}
                      y={70}
                      width={elementWidth}
                      height={elementHeight}
                      rx={8}
                      className="fill-primary/70 stroke-primary stroke-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />

                    {/* Element value */}
                    <motion.text
                      x={elementWidth / 2}
                      y={105}
                      textAnchor="middle"
                      className="text-lg font-bold fill-white"
                    >
                      {element.value}
                    </motion.text>
                  </motion.g>
                ))}
              </AnimatePresence>
            </svg>
          </div>

          {/* Array info */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-6 text-sm">
              <span>Length: {arrayElements.length}</span>
              <span>•</span>
              <span>Values: [{arrayElements.map((el) => el.value).join(", ")}]</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
