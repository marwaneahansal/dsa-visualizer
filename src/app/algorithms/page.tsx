import AlgoSections from "@/components/features/algo-section";

export default function AlgorithmsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-1">
        <AlgoSections />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Algorithms",
  description: "Explore various algorithms and their visual representations.",
};
