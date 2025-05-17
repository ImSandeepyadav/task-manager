"use client"

import type { Task } from "@/lib/types"
import { TaskCard } from "@/components/tasks/task-card"

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return null
  }

  return (
    <div className="dashboard-grid animate-in">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
