import type { ReactNode } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ClipboardX } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Card className="flex h-[300px] flex-col items-center justify-center text-center">
      <CardContent className="pt-10">
        <div className="mb-4 flex justify-center">
          {icon || <ClipboardX className="h-12 w-12 text-muted-foreground/60" />}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
      {action && <CardFooter>{action}</CardFooter>}
    </Card>
  )
}
