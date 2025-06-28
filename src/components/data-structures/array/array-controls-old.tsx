import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { ArrayElement } from "@/lib/types/data-structures";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <InsertControl
        isAnimating={isAnimating}
        insertValue={insertValue}
        insertIndex={insertIndex}
        setInsertValue={setInsertValue}
        setInsertIndex={setInsertIndex}
        handleInsert={handleInsert}
        arrayLength={arrayElements.length}
      />

      <RemoveControl
        isAnimating={isAnimating}
        removeIndex={removeIndex}
        setRemoveIndex={setRemoveIndex}
        handleRemove={handleRemove}
        arrayLength={arrayElements.length}
      />

      <ResetControl isAnimating={isAnimating} resetArray={resetArray} />
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
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <Minus className="w-4 h-4 mr-2" />
          Remove Element
        </h3>
        <div className="space-y-2">
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
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Array
        </h3>
        <Button onClick={resetArray} disabled={isAnimating} className="w-full">
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
