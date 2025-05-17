"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTask } from "@/lib/context/task-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash, ArrowLeft, CheckCircle, XCircle, Calendar } from "lucide-react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useToast } from "@/components/ui/use-toast"
import { TaskEditDialog } from "@/components/tasks/task-edit-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils/date-utils"
import type { Task } from "@/lib/types"

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { tasks, toggleTaskStatus, deleteTask, isLoading } = useTask()
  const [task, setTask] = useState<Task | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const id = typeof params.id === "string" ? params.id : params.id?.[0] || ""

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id.toString() === id)
    setTask(foundTask || null)
  }, [id, tasks])

  const handleToggleStatus = () => {
    if (task) {
      toggleTaskStatus(task.id)
      toast({
        title: "Task updated",
        description: `Task marked as ${task.completed ? "incomplete" : "complete"}`,
      })
    }
  }

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id)
      toast({
        title: "Task deleted",
        description: "Task has been removed successfully",
      })
      router.push("/dashboard")
    }
  }

  if (isLoading) {
    return (
      <AuthGuard>
        <DashboardShell>
          <DashboardHeader heading="Task Details" text="Loading task information...">
            <Button onClick={() => router.push("/dashboard")} variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </DashboardHeader>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </DashboardShell>
      </AuthGuard>
    )
  }

  if (!task) {
    return (
      <AuthGuard>
        <DashboardShell>
          <DashboardHeader heading="Task not found" text="The requested task could not be found.">
            <Button onClick={() => router.push("/dashboard")} variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </DashboardHeader>
          <Card className="flex h-[300px] items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium">Task not found</h3>
              <p className="text-muted-foreground">The task you're looking for doesn't exist or has been deleted.</p>
              <Button onClick={() => router.push("/dashboard")} className="mt-4" variant="default">
                Return to Dashboard
              </Button>
            </div>
          </Card>
        </DashboardShell>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader heading="Task Details" text="View and manage task details">
          <Button onClick={() => router.push("/dashboard")} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </DashboardHeader>

        <Card className="overflow-hidden border-2 shadow-sm">
          <CardHeader className="bg-muted/30 pb-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="line-clamp-2 text-xl">{task.title}</CardTitle>
              <Badge variant={task.completed ? "success" : "default"} className="w-fit">
                {task.completed ? "Completed" : "Pending"}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              Created {formatDate(task.createdAt || new Date().toISOString())}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {task.description ? (
                <p className="text-muted-foreground">{task.description}</p>
              ) : (
                <p className="text-muted-foreground/60 italic">No description provided.</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t bg-muted/20 p-4 sm:flex-row sm:justify-between">
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
              <Button onClick={handleToggleStatus} variant="outline" size="sm" className="w-full sm:w-auto">
                {task.completed ? (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Mark as Pending
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </>
                )}
              </Button>
              <Button
                onClick={() => setIsEditDialogOpen(true)}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
            </div>
            <Button onClick={handleDelete} variant="destructive" size="sm" className="w-full sm:w-auto">
              <Trash className="mr-2 h-4 w-4" />
              Delete Task
            </Button>
          </CardFooter>
        </Card>

        {isEditDialogOpen && <TaskEditDialog task={task} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />}
      </DashboardShell>
    </AuthGuard>
  )
}
