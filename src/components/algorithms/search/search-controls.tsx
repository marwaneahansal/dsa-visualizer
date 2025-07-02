"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Square, 
  Search, 
  Pause,
  Shuffle
} from "lucide-react";
import { SearchAlgorithm, SEARCH_ALGORITHM_CONFIGS } from "@/lib/types/algorithms";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,  } from "@/components/ui/select";

interface SearchControlsProps {
  algorithm: SearchAlgorithm;
  setAlgorithm: (algorithm: SearchAlgorithm) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  delay: number;
  setDelay: (delay: number) => void;
  targetValue: number;
  setTargetValue: (value: number) => void;
  isSearching: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  startSearch: () => void;
  resetArray: () => void;
  nextStep: () => void;
  prevStep: () => void;
  pauseSearch: () => void;
  resumeSearch: () => void;
  stopSearch: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function SearchControls({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  delay,
  setDelay,
  targetValue,
  setTargetValue,
  isSearching,
  isPaused,
  isCompleted,
  startSearch,
  resetArray,
  nextStep,
  prevStep,
  pauseSearch,
  resumeSearch,
  stopSearch,
  currentStep,
  totalSteps,
}: SearchControlsProps) {
  return (
    <div className="mb-8">
      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="info">Algorithm Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="controls">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Settings</CardTitle>
                <CardDescription>
                  Configure the search algorithm and array.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Algorithm selection */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Algorithm
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={isSearching}>
                      <Button variant="outline" className="w-full justify-between">
                        {SEARCH_ALGORITHM_CONFIGS[algorithm].algorithmName}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Algorithm</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {Object.entries(SEARCH_ALGORITHM_CONFIGS).map(([key, config]) => (
                        <DropdownMenuItem 
                          key={key}
                          onClick={() => setAlgorithm(key as SearchAlgorithm)}
                          className={cn(
                            "cursor-pointer",
                            algorithm === key && "bg-primary/10"
                          )}
                        >
                          {config.algorithmName}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Array size */}
                <div>
                  <label htmlFor="array-size" className="block text-sm font-medium mb-1">
                    Array Size: {arraySize}
                  </label>
                  <Input
                    id="array-size"
                    type="number"
                    min={5}
                    max={15}
                    value={arraySize}
                    onChange={(e) => setArraySize(parseInt(e.target.value))}
                    disabled={isSearching}
                    className="w-full"
                  />
                </div>

                {/* Target value */}
                <div>
                  <label htmlFor="target-value" className="block text-sm font-medium mb-1">
                    Target Value: {targetValue}
                  </label>
                  <Input
                    id="target-value"
                    type="number"
                    min={1}
                    max={100}
                    value={targetValue}
                    onChange={(e) => setTargetValue(parseInt(e.target.value))}
                    disabled={isSearching}
                    className="w-full"
                  />
                </div>
                
                {/* Animation speed */}
                <div>
                  <label htmlFor="animation-speed" className="block text-sm font-medium mb-1">
                    Animation Speed: {Math.round(1000 / delay)} steps/sec
                  </label>
                  <Select 
                    value={delay.toString()} 
                    onValueChange={(value) => setDelay(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000">Slowest (1 step/sec)</SelectItem>
                      <SelectItem value="500">Slow (2 steps/sec)</SelectItem>
                      <SelectItem value="250">Medium (4 steps/sec)</SelectItem>
                      <SelectItem value="100">Fast (10 steps/sec)</SelectItem>
                      <SelectItem value="50">Fastest (20 steps/sec)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Array reset */}
                <Button 
                  onClick={resetArray} 
                  variant="outline" 
                  className="w-full"
                  disabled={isSearching && !isCompleted}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate New Array
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Search Controls</CardTitle>
                <CardDescription>
                  Start and control the search process.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Main control buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {!isSearching ? (
                    <Button 
                      onClick={startSearch} 
                      variant="default" 
                      className="w-full"
                      disabled={isCompleted}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Start Search
                    </Button>
                  ) : (
                    <>
                      {isPaused ? (
                        <Button 
                          onClick={resumeSearch} 
                          variant="default" 
                          className="w-full"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </Button>
                      ) : (
                        <Button 
                          onClick={pauseSearch} 
                          variant="outline" 
                          className="w-full"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                    </>
                  )}
                  
                  <Button 
                    onClick={stopSearch} 
                    variant="destructive" 
                    className="w-full"
                    disabled={!isSearching && !isCompleted}
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
                
                {/* Step controls */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={prevStep} 
                    variant="outline" 
                    className="w-full"
                    disabled={currentStep <= 0 || (!isPaused && isSearching)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button 
                    onClick={nextStep} 
                    variant="outline" 
                    className="w-full"
                    disabled={currentStep >= totalSteps - 1 || (!isPaused && isSearching)}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Next
                  </Button>
                </div>
                
                {/* Progress info */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    Step {currentStep >= 0 ? currentStep + 1 : 0} of {totalSteps}
                  </p>
                  {isCompleted && (
                    <p className="text-success mt-2">Search Complete!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="info">
          <AlgorithmInfo algorithm={algorithm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AlgorithmInfo({ algorithm }: { algorithm: SearchAlgorithm }) {
  const config = SEARCH_ALGORITHM_CONFIGS[algorithm];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold flex items-center">
          <Search className="w-4 h-4 mr-2" />
          {config.algorithmName}
        </CardTitle>
        <CardDescription>
          Learn about {config.algorithmName} algorithm characteristics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{config.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Time Complexity</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Best case:</span> 
                <span className="font-mono">{config.complexity.time.best}</span>
              </li>
              <li className="flex justify-between">
                <span>Average case:</span> 
                <span className="font-mono">{config.complexity.time.average}</span>
              </li>
              <li className="flex justify-between">
                <span>Worst case:</span> 
                <span className="font-mono">{config.complexity.time.worst}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Characteristics</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Space complexity:</span> 
                <span className="font-mono">{config.complexity.space}</span>
              </li>
              <li className="flex justify-between">
                <span>Requires sorted array:</span> 
                <span>{config.requiresSortedArray ? "Yes" : "No"}</span>
              </li>
              <li className="flex justify-between">
                <span>Type:</span> 
                <span>{getAlgorithmType(algorithm)}</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to get algorithm type
function getAlgorithmType(algorithm: SearchAlgorithm): string {
  switch (algorithm) {
    case "linear":
      return "Sequential Search";
    case "binary":
      return "Divide and Conquer";
    case "jump":
      return "Block-based Search";
    default:
      return "Unknown";
  }
}
