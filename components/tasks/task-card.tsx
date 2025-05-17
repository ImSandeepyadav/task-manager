"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useTask } from "@/lib/context/task-context"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash, Eye, Calendar, Flag } from "lucide-react"
import { useState } from "react"
import { TaskEditDialog } from "@/components/tasks/task-edit-dialog"
import { useToast } from "@/components/ui/use-toast"
import type { Task } from "@/lib/types"
import { timeAgo } from "@/lib/utils/date-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter()
  const { toggleTaskStatus, deleteTask } = useTask()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleTaskStatus(task.id)
    toast({
      title: "Task updated",
      description: `Task marked as ${task.completed ? "incomplete" : "complete"}`,
    })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteTask(task.id)
    toast({
      title: "Task deleted",
      description: "Task has been removed successfully",
    })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditDialogOpen(true)
  }

  const handleViewDetails = () => {
    router.push(`/dashboard/tasks/${task.id}`)
  }

  const getPriorityColor = (priority?: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <>
      <Card className="task-card flex h-full flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-start gap-3">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskStatus(task.id)} className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`line-clamp-2 font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}
                  onClick={handleViewDetails}
                >
                  {task.title}
                </h3>
                <Badge variant={task.completed ? "success" : "default"} className="shrink-0">
                  {task.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
              {task.description && <p className="line-clamp-2 text-sm text-muted-foreground">{task.description}</p>}
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {task.createdAt ? timeAgo(task.createdAt) : "Just now"}
            </div>
            {task.priority && (
              <div className="flex items-center">
                <Flag className={`mr-1 h-3 w-3 ${getPriorityColor(task.priority)}`} />
                <span className="capitalize">{task.priority}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/20 p-2">
          <Button variant="ghost" size="sm" onClick={handleViewDetails}>
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>
          <div className="flex">
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                  Confirm Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>

      {isEditDialogOpen && <TaskEditDialog task={task} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />}
    </>
  )
}
