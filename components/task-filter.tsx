"use client"

import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TaskFilterProps {
  currentFilter: string
}

export function TaskFilter({ currentFilter }: TaskFilterProps) {
  const router = useRouter()

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      router.push("/dashboard")
    } else {
      router.push(`/dashboard?filter=${value}`)
    }
  }

  return (
    <Tabs defaultValue={currentFilter} onValueChange={handleFilterChange}>
      <TabsList>
        <TabsTrigger value="all">All Tasks</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
