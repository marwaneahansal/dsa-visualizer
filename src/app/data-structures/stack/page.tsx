import StackVisualizer from "@/components/data-structures/stack/stack-visualizer";

export default function StackPage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Stack Visualization</h1>
      <p className="text-muted-foreground mb-8">
        A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.
        Elements are added and removed from the same end, called the top of the stack.
      </p>

      <StackVisualizer />
    </div>
  );
}
