import { ClipboardCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn("flex items-center justify-center rounded-lg bg-primary p-2 text-primary-foreground", className)}
    >
      <ClipboardCheck className="h-6 w-6" />
    </div>
  )
}
