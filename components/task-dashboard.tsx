"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTask } from "@/components/task-provider"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/task-list"
import { TaskFilter } from "@/components/task-filter"
import { TaskCreateDialog } from "@/components/task-create-dialog"
import { Plus, Loader2 } from "lucide-react"
import { Pagination } from "@/components/pagination"

export function TaskDashboard() {
  const { tasks, isLoading } = useTask()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") || "all"

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask)
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <TaskFilter currentFilter={filter} />
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <TaskList tasks={currentTasks} />

      {filteredTasks.length > tasksPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      <TaskCreateDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
