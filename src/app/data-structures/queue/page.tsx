import QueueVisualizer from "@/components/data-structures/queue/queue-visualizer";

export default function QueuePage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Queue Visualization</h1>
      <p className="text-muted-foreground mb-8">
        A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle.
        Elements are added at the rear and removed from the front of the queue.
      </p>

      <QueueVisualizer />
    </div>
  );
}
