"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTask } from "@/lib/context/task-context"
import { Button } from "@/components/ui/button"
import { TaskList } from "@/components/tasks/task-list"
import { TaskFilter } from "@/components/tasks/task-filter"
import { TaskCreateDialog } from "@/components/tasks/task-create-dialog"
import { Plus, Loader2 } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { EmptyState } from "@/components/ui/empty-state"

export function TaskDashboard() {
  const { tasks, isLoading } = useTask()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") || "all"
  const priorityFilter = searchParams.get("priority")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 6

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    // First filter by status
    if (filter === "completed") {
      if (!task.completed) return false
    } else if (filter === "pending") {
      if (task.completed) return false
    }

    // Then filter by priority if specified
    if (priorityFilter && task.priority !== priorityFilter) {
      return false
    }

    return true
  })

  // Sort tasks by newest first (default)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  })

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask)
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage)

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TaskFilter currentFilter={filter} priorityFilter={priorityFilter} />
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description={`You don't have any ${filter === "all" ? "" : filter} tasks${priorityFilter ? ` with ${priorityFilter} priority` : ""}.`}
          action={
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          }
        />
      ) : (
        <>
          <TaskList tasks={currentTasks} />

          {sortedTasks.length > tasksPerPage && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}

      <TaskCreateDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
