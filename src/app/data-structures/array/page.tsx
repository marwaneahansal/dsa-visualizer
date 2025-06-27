import ArrayVisualizer from "@/components/data-structures/array/array-visualizer";

export default function ArrayPage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Array Visualization</h1>
      <p className="mb-4">Visualize how arrays work!</p>

      <ArrayVisualizer />  
    </div>
  );
}

export const metadata = {
  title: "Array Visualization",
  description: "Visualize how arrays work in data structures.",
};
