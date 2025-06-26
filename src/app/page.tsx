import NavbarPage from "@/components/navbar/navbar"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <NavbarPage />
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <Button>Shadcn UI Button</Button>
      </div>
    </div>
  )
}