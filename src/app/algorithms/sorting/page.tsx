import SortingVisualizer from "@/components/algorithms/sorting/sorting-visualizer";

export default function SortingAlgorithmsPage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Sorting Algorithm Visualization</h1>
      <p className="text-muted-foreground mb-8">
        Visualize and understand various sorting algorithms and their step-by-step execution.
        Compare algorithms by their time complexity, space complexity, and visualization.
      </p>

      <SortingVisualizer />
    </div>
  );
}
