"use client";

import { useState, useCallback, useEffect } from 'react';
import { SearchAlgorithm, SearchElement, SearchStep, SEARCH_ALGORITHM_CONFIGS } from '@/lib/types/algorithms';

export default function useSearchOperations() {
  // Generate a sorted array of a given size
  const generateSortedArray = useCallback((size: number): SearchElement[] => {
    // Create an array with values from 1 to size*2, then take random 'size' elements
    const baseArray = Array.from({ length: size * 3 }, (_, i) => i + 1);
    const randomIndices = new Set<number>();
    
    while (randomIndices.size < size) {
      randomIndices.add(Math.floor(Math.random() * (size * 3)));
    }
    
    const values = Array.from(randomIndices).sort((a, b) => a - b).map(i => baseArray[i]);
    
    return values.map((value, index) => ({
      id: `element-${index}`,
      value,
      index,
    }));
  }, []);
  
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm>('linear');
  const [elements, setElements] = useState<SearchElement[]>(() => generateSortedArray(10));
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [arraySize, setArraySize] = useState<number>(10);
  const [delay, setDelay] = useState<number>(500); // ms between steps
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [targetValue, setTargetValue] = useState<number>(50);
  const [searchResult, setSearchResult] = useState<{ found: boolean, index: number | null }>({ 
    found: false, 
    index: null 
  });

  // Reset the array with new sorted values
  const resetArray = useCallback(() => {
    setElements(generateSortedArray(arraySize));
    setSteps([]);
    setCurrentStep(-1);
    setIsCompleted(false);
    setSearchResult({ found: false, index: null });
  }, [arraySize, generateSortedArray]);

  // Reset when array size changes
  useEffect(() => {
    resetArray();
  }, [arraySize, resetArray]);

  // Implement Linear Search algorithm with steps
  const linearSearch = useCallback((arr: SearchElement[], target: number): SearchStep[] => {
    const steps: SearchStep[] = [];
    const n = arr.length;
    const searchArray = JSON.parse(JSON.stringify(arr)); // deep clone
    
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Starting Linear Search for value ${target}`,
      stepIndex: steps.length
    });
    
    for (let i = 0; i < n; i++) {
      // Mark current element as being compared
      searchArray[i].isComparing = true;
      searchArray[i].isCurrent = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(searchArray)),
        description: `Checking element at index ${i}`,
        stepIndex: steps.length
      });
      
      if (searchArray[i].value === target) {
        // Found the target
        searchArray[i].isFound = true;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(searchArray)),
          description: `Found target ${target} at index ${i}!`,
          stepIndex: steps.length
        });
        
        // Set search result
        setSearchResult({ found: true, index: i });
        return steps;
      }
      
      // Mark as checked and move to next element
      searchArray[i].isComparing = false;
      searchArray[i].isCurrent = false;
      searchArray[i].isChecked = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(searchArray)),
        description: `Element at index ${i} does not match target. Moving to next element.`,
        stepIndex: steps.length
      });
    }
    
    // Target not found
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Target ${target} not found in the array.`,
      stepIndex: steps.length
    });
    
    setSearchResult({ found: false, index: null });
    return steps;
  }, []);

  // Implement Binary Search algorithm with steps
  const binarySearch = useCallback((arr: SearchElement[], target: number): SearchStep[] => {
    const steps: SearchStep[] = [];
    const searchArray = JSON.parse(JSON.stringify(arr)); // deep clone
    
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Starting Binary Search for value ${target}`,
      stepIndex: steps.length
    });
    
    let left = 0;
    let right = searchArray.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      // Mark current range we're searching in
      for (let i = left; i <= right; i++) {
        searchArray[i].isCurrent = true;
      }
      
      // Mark middle element as being compared
      searchArray[mid].isComparing = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(searchArray)),
        description: `Checking element at index ${mid} (middle of current range [${left}..${right}])`,
        stepIndex: steps.length
      });
      
      if (searchArray[mid].value === target) {
        // Found the target
        searchArray[mid].isFound = true;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(searchArray)),
          description: `Found target ${target} at index ${mid}!`,
          stepIndex: steps.length
        });
        
        // Set search result
        setSearchResult({ found: true, index: mid });
        return steps;
      } else if (searchArray[mid].value < target) {
        // Target is in the right half
        for (let i = left; i <= mid; i++) {
          searchArray[i].isCurrent = false;
          searchArray[i].isChecked = true;
        }
        
        searchArray[mid].isComparing = false;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(searchArray)),
          description: `${target} is greater than middle element ${searchArray[mid].value}. Moving to right half.`,
          stepIndex: steps.length
        });
        
        left = mid + 1;
      } else {
        // Target is in the left half
        for (let i = mid; i <= right; i++) {
          searchArray[i].isCurrent = false;
          searchArray[i].isChecked = true;
        }
        
        searchArray[mid].isComparing = false;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(searchArray)),
          description: `${target} is less than middle element ${searchArray[mid].value}. Moving to left half.`,
          stepIndex: steps.length
        });
        
        right = mid - 1;
      }
    }
    
    // Target not found
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Target ${target} not found in the array.`,
      stepIndex: steps.length
    });
    
    setSearchResult({ found: false, index: null });
    return steps;
  }, []);

  // Implement Jump Search algorithm with steps
  const jumpSearch = useCallback((arr: SearchElement[], target: number): SearchStep[] => {
    const steps: SearchStep[] = [];
    const searchArray = JSON.parse(JSON.stringify(arr)); // deep clone
    const n = searchArray.length;
    
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Starting Jump Search for value ${target}`,
      stepIndex: steps.length
    });
    
    // Finding block size to be jumped
    const blockSize = Math.floor(Math.sqrt(n));
    
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Jump step size is √n = ${blockSize}`,
      stepIndex: steps.length
    });
    
    let prev = 0;
    
    // Finding the block where element is present (if present)
    while (prev < n && searchArray[Math.min(prev, n - 1)].value < target) {
      searchArray[prev].isComparing = true;
      searchArray[prev].isCurrent = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(searchArray)),
        description: `Checking element at index ${prev}`,
        stepIndex: steps.length
      });
      
      searchArray[prev].isComparing = false;
      searchArray[prev].isCurrent = false;
      searchArray[prev].isChecked = true;
      
      prev += blockSize;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(searchArray)),
        description: `Jumping to index ${prev}`,
        stepIndex: steps.length
      });
    }
    
    // Linear search in the identified block
    const start = Math.max(0, prev - blockSize);
    const end = Math.min(n - 1, prev);
    
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Performing linear search from index ${start} to ${end}`,
      stepIndex: steps.length
    });
    
    for (let i = start; i <= end; i++) {
      searchArray[i].isComparing = true;
      searchArray[i].isCurrent = true;
      
      steps.push({
        elements: JSON.parse(JSON.stringify(searchArray)),
        description: `Checking element at index ${i}`,
        stepIndex: steps.length
      });
      
      if (searchArray[i].value === target) {
        // Found the target
        searchArray[i].isFound = true;
        
        steps.push({
          elements: JSON.parse(JSON.stringify(searchArray)),
          description: `Found target ${target} at index ${i}!`,
          stepIndex: steps.length
        });
        
        // Set search result
        setSearchResult({ found: true, index: i });
        return steps;
      }
      
      searchArray[i].isComparing = false;
      searchArray[i].isCurrent = false;
      searchArray[i].isChecked = true;
    }
    
    // Target not found
    steps.push({
      elements: JSON.parse(JSON.stringify(searchArray)),
      description: `Target ${target} not found in the array.`,
      stepIndex: steps.length
    });
    
    setSearchResult({ found: false, index: null });
    return steps;
  }, []);

  // Function to search the array based on the selected algorithm
  const startSearch = useCallback(() => {
    setIsSearching(true);
    setIsPaused(false);
    setIsCompleted(false);
    setCurrentStep(-1);
    
    let searchSteps: SearchStep[] = [];
    
    switch (algorithm) {
      case 'linear':
        searchSteps = linearSearch(elements, targetValue);
        break;
      case 'binary':
        searchSteps = binarySearch(elements, targetValue);
        break;
      case 'jump':
        searchSteps = jumpSearch(elements, targetValue);
        break;
      default:
        searchSteps = linearSearch(elements, targetValue);
    }
    
    setSteps(searchSteps);
    
  }, [algorithm, elements, targetValue, linearSearch, binarySearch, jumpSearch]);

  // Step through the search process
  useEffect(() => {
    if (!isSearching || isPaused || steps.length === 0 || currentStep >= steps.length - 1) {
      if (currentStep >= steps.length - 1 && steps.length > 0) {
        setIsCompleted(true);
        setIsSearching(false);
      }
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isSearching, isPaused, currentStep, steps.length, delay]);

  // Update elements when step changes
  useEffect(() => {
    if (currentStep >= 0 && steps[currentStep]) {
      setElements(steps[currentStep].elements);
    }
  }, [currentStep, steps]);

  // Controls for the search visualization
  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      setIsSearching(false);
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const pauseSearch = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSearch = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stopSearch = useCallback(() => {
    setIsSearching(false);
    setIsPaused(false);
    setCurrentStep(-1);
    resetArray();
  }, [resetArray]);

  return {
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
    currentDescription: steps[currentStep]?.description || 'Ready to search',
    algorithmConfig: SEARCH_ALGORITHM_CONFIGS[algorithm],
    startSearch,
    resetArray,
    nextStep,
    prevStep,
    pauseSearch,
    resumeSearch,
    stopSearch,
  };
}
