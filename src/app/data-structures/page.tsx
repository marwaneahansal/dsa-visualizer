import DSSection from "@/components/features/ds-section";

export default function DataStructuresPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-1">
        <DSSection />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Data Structures",
  description: "Explore various data structures and their visual representations.",
};