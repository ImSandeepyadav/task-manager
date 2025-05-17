"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { type Task, useTask } from "@/components/task-provider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash, Eye } from "lucide-react"
import { useState } from "react"
import { TaskEditDialog } from "@/components/task-edit-dialog"
import { useToast } from "@/components/ui/use-toast"

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

  return (
    <>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskStatus(task.id)} className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </h3>
                <Badge variant={task.completed ? "success" : "default"}>
                  {task.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
              {task.description && <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>

      {isEditDialogOpen && <TaskEditDialog task={task} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />}
    </>
  )
}
