"use client";

import SearchControls from "./search-controls";
import SearchVisualization from "./search-visualization";
import useSearchOperations from "@/hooks/use-search-operations";

export default function SearchVisualizer() {
  const {
    algorithm,
    setAlgorithm,
    elements,
    steps,
    currentStep,
    arraySize,
    setArraySize,
    delay,
    setDelay,
    targetValue,
    setTargetValue,
    searchResult,
    isSearching,
    isPaused,
    isCompleted,
    currentDescription,
    startSearch,
    resetArray,
    nextStep,
    prevStep,
    pauseSearch,
    resumeSearch,
    stopSearch,
  } = useSearchOperations();

  return (
    <div className="max-w-screen-xl mx-auto">
      <SearchControls 
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        arraySize={arraySize}
        setArraySize={setArraySize}
        delay={delay}
        setDelay={setDelay}
        targetValue={targetValue}
        setTargetValue={setTargetValue}
        isSearching={isSearching}
        isPaused={isPaused}
        isCompleted={isCompleted}
        startSearch={startSearch}
        resetArray={resetArray}
        nextStep={nextStep}
        prevStep={prevStep}
        pauseSearch={pauseSearch}
        resumeSearch={resumeSearch}
        stopSearch={stopSearch}
        currentStep={currentStep}
        totalSteps={steps.length}
      />
      
      <SearchVisualization 
        elements={elements}
        description={currentDescription}
        currentStep={currentStep}
        totalSteps={steps.length}
        searchResult={searchResult}
      />
    </div>
  );
}
