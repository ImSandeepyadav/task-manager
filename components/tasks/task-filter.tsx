"use client"

import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTask } from "@/lib/context/task-context"
import type { TaskFilter as TaskFilterType } from "@/lib/types"

interface TaskFilterProps {
  currentFilter: string
  priorityFilter?: string | null
}

export function TaskFilter({ currentFilter, priorityFilter }: TaskFilterProps) {
  const router = useRouter()
  const { tasks } = useTask()

  const handleFilterChange = (value: TaskFilterType) => {
    const url = priorityFilter ? `/dashboard?filter=${value}&priority=${priorityFilter}` : `/dashboard?filter=${value}`
    router.push(url)
  }

  // Count tasks for each filter
  const allCount = tasks.length
  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="flex items-center">
      <Tabs value={currentFilter || "all"} onValueChange={handleFilterChange as (value: string) => void}>
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Tasks
            <Badge variant="secondary" className="ml-1">
              {allCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending
            <Badge variant="secondary" className="ml-1">
              {pendingCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="ml-1">
              {completedCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
