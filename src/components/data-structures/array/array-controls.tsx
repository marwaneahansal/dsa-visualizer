import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bolt, Minus, Plus, RotateCcw } from "lucide-react";
import { ArrayElement } from "@/lib/types/data-structures";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ArrayControlsProps {
  isAnimating: boolean;
  arrayElements: ArrayElement[];
  insertValue: string;
  insertIndex: string;
  removeIndex: string;
  setInsertValue: (value: string) => void;
  setInsertIndex: (value: string) => void;
  setRemoveIndex: (value: string) => void;
  handleInsert: () => void;
  handleRemove: () => void;
  resetArray: () => void;
}

export default function ArrayControls({
  isAnimating,
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
}: ArrayControlsProps) {
  const tabs = [
    {
      name: "Insert",
      value: "insert",
      icon: Plus,
    },
    {
      name: "Remove",
      value: "remove",
      icon: Minus,
    },
    {
      name: "Reset",
      value: "reset",
      icon: RotateCcw,
    },
  ] as const;

  type TabValue = typeof tabs[number]["value"];

  const [activeTab, setActiveTab] = useState<TabValue>("insert");

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="font-semibold flex items-center">
            <Bolt className="w-4 h-4 mr-2" />
            Array Controls
          </CardTitle>
          <CardDescription>
            Manage your array with insert, remove, and reset operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 bg-muted p-2 rounded-lg">
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? "outline" : "ghost"}
                className={cn(
                  "font-semibold w-full justify-start border-0",
                  activeTab === tab.value && "shadow-sm dark:border-1"
                )}
                onClick={() => setActiveTab(tab.value as TabValue)}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name} Element
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="col-span-1 md:col-span-2">
        {activeTab === "insert" && (
          <InsertControl
            isAnimating={isAnimating}
            insertValue={insertValue}
            insertIndex={insertIndex}
            setInsertValue={setInsertValue}
            setInsertIndex={setInsertIndex}
            handleInsert={handleInsert}
            arrayLength={arrayElements.length}
          />
        )}
        {activeTab === "remove" && (
          <RemoveControl
            isAnimating={isAnimating}
            removeIndex={removeIndex}
            setRemoveIndex={setRemoveIndex}
            handleRemove={handleRemove}
            arrayLength={arrayElements.length}
          />
        )}
        {activeTab === "reset" && (
          <ResetControl isAnimating={isAnimating} resetArray={resetArray} />
        )}
      </div>
    </div>
  );
}

// Sub-components for each control group
interface InsertControlProps {
  isAnimating: boolean;
  insertValue: string;
  insertIndex: string;
  setInsertValue: (value: string) => void;
  setInsertIndex: (value: string) => void;
  handleInsert: () => void;
  arrayLength: number;
}

function InsertControl({
  isAnimating,
  insertValue,
  insertIndex,
  setInsertValue,
  setInsertIndex,
  handleInsert,
  arrayLength,
}: InsertControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Insert Element
        </CardTitle>
        <CardDescription>
          Add a new element at a specific index in the array.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center h-full">
        <div className="space-y-2 w-full">
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
            max={arrayLength}
          />
          <Button
            onClick={handleInsert}
            disabled={isAnimating || !insertValue || !insertIndex}
            className="w-full"
          >
            Insert
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface RemoveControlProps {
  isAnimating: boolean;
  removeIndex: string;
  setRemoveIndex: (value: string) => void;
  handleRemove: () => void;
  arrayLength: number;
}

function RemoveControl({
  isAnimating,
  removeIndex,
  setRemoveIndex,
  handleRemove,
  arrayLength,
}: RemoveControlProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <Minus className="w-4 h-4 mr-2" />
          Remove Element
        </CardTitle>
        <CardDescription>
          Remove an element from the array by index.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center h-full">
        <div className="space-y-2 w-full">
          <Input
            placeholder="Index"
            value={removeIndex}
            onChange={(e) => setRemoveIndex(e.target.value)}
            type="number"
            min="0"
            max={arrayLength - 1}
          />
          <Button
            onClick={handleRemove}
            disabled={isAnimating || removeIndex === ""}
            className="w-full"
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ResetControl({
  isAnimating,
  resetArray,
}: {
  isAnimating: boolean;
  resetArray: () => void;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Array
        </CardTitle>
        <CardDescription>
          Reset the array to its initial state.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex space-x-4 items-center h-full">
        <Button onClick={resetArray} disabled={isAnimating}>
          Reset
        </Button>
        <Button disabled={isAnimating}>
          Empty Array
        </Button>
      </CardContent>
    </Card>
  );
}
