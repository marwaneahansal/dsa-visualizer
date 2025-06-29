export interface SortingElement {
  id: string;
  value: number;
  index: number;
  isComparing?: boolean;
  isSwapping?: boolean;
  isSorted?: boolean;
  isCurrent?: boolean;
  isPivot?: boolean;
}

export type SortingAlgorithm = 
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick";

export interface SearchElement {
  id: string;
  value: number;
  index: number;
  isComparing?: boolean;
  isFound?: boolean;
  isChecked?: boolean;
  isCurrent?: boolean;
}

export type SearchAlgorithm =
  | "linear"
  | "binary"
  | "jump";

export interface SearchStep {
  elements: SearchElement[];
  description: string;
  stepIndex: number;
}

export interface SortingStep {
  elements: SortingElement[];
  description: string;
  stepIndex: number;
}

export interface SortingConfig {
  algorithmName: string;
  algorithmKey: SortingAlgorithm;
  complexity: {
    time: {
      best: string;
      average: string;
      worst: string;
    };
    space: string;
  };
  stable: boolean;
  description: string;
}

export const ALGORITHM_CONFIGS: Record<SortingAlgorithm, SortingConfig> = {
  bubble: {
    algorithmName: "Bubble Sort",
    algorithmKey: "bubble",
    complexity: {
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    stable: true,
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  },
  selection: {
    algorithmName: "Selection Sort",
    algorithmKey: "selection",
    complexity: {
      time: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    stable: false,
    description: "Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.",
  },
  insertion: {
    algorithmName: "Insertion Sort",
    algorithmKey: "insertion",
    complexity: {
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    stable: true,
    description: "Builds the sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position.",
  },
  merge: {
    algorithmName: "Merge Sort",
    algorithmKey: "merge",
    complexity: {
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      space: "O(n)",
    },
    stable: true,
    description: "Divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
  },
  quick: {
    algorithmName: "Quick Sort",
    algorithmKey: "quick",
    complexity: {
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      space: "O(log n)",
    },
    stable: false,
    description: "Selects a 'pivot' element and partitions the array around it, recursively sorting the sub-arrays.",
  },
};

export interface SearchConfig {
  algorithmName: string;
  algorithmKey: SearchAlgorithm;
  complexity: {
    time: {
      best: string;
      average: string;
      worst: string;
    };
    space: string;
  };
  description: string;
  requiresSortedArray: boolean;
}

export const SEARCH_ALGORITHM_CONFIGS: Record<SearchAlgorithm, SearchConfig> = {
  linear: {
    algorithmName: "Linear Search",
    algorithmKey: "linear",
    complexity: {
      time: {
        best: "O(1)",
        average: "O(n)",
        worst: "O(n)",
      },
      space: "O(1)",
    },
    description: "Sequentially checks each element until a match is found or the whole array is searched.",
    requiresSortedArray: false,
  },
  binary: {
    algorithmName: "Binary Search",
    algorithmKey: "binary",
    complexity: {
      time: {
        best: "O(1)",
        average: "O(log n)",
        worst: "O(log n)",
      },
      space: "O(1)",
    },
    description: "Divides the search interval in half repeatedly until the target value is found or the interval is empty.",
    requiresSortedArray: true,
  },
  jump: {
    algorithmName: "Jump Search",
    algorithmKey: "jump",
    complexity: {
      time: {
        best: "O(1)",
        average: "O(√n)",
        worst: "O(√n)",
      },
      space: "O(1)",
    },
    description: "Jumps ahead by fixed steps and then uses linear search to find the element.",
    requiresSortedArray: true,
  },
};
