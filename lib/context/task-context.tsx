"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { Task } from "@/lib/types"

type TaskContextType = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  updateTask: (id: number, updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) => void
  deleteTask: (id: number) => void
  toggleTaskStatus: (id: number) => void
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  isLoading: false,
  error: null,
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  toggleTaskStatus: () => {},
})

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)

        // Check if we have stored tasks in localStorage
        const storedTasks = localStorage.getItem("tasks")
        if (storedTasks) {
          try {
            const parsedTasks = JSON.parse(storedTasks)
            setTasks(parsedTasks)
            setIsLoading(false)
            return
          } catch (error) {
            console.error("Failed to parse stored tasks:", error)
            // Continue to fetch from API if parsing fails
          }
        }

        // Fetch tasks from JSONPlaceholder API
        const response = await fetch("https://jsonplaceholder.typicode.com/todos")

        if (!response.ok) {
          throw new Error("Failed to fetch tasks")
        }

        const data = await response.json()

        // Transform the data to match our Task type and add descriptions
        const now = new Date().toISOString()
        const transformedData: Task[] = data.slice(0, 20).map((task: any, index: number) => ({
          id: task.id,
          title: task.title,
          description: `This is a sample description for task ${task.id}. In a real application, this would contain detailed information about the task.`,
          completed: task.completed,
          userId: task.userId,
          priority: ["low", "medium", "high"][index % 3] as "low" | "medium" | "high",
          createdAt: now,
          updatedAt: now,
        }))

        setTasks(transformedData)

        // Store the fetched tasks in localStorage
        localStorage.setItem("tasks", JSON.stringify(transformedData))
      } catch (error) {
        console.error("Error fetching tasks:", error)
        setError("Failed to fetch tasks. Please try again later.")
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch tasks. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [toast])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  // Add a new task
  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString()
    const newTask: Task = {
      ...task,
      id: Date.now(),
      createdAt: now,
      updatedAt: now,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  // Update an existing task
  const updateTask = (id: number, updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    )
  }

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  // Toggle task completion status
  const toggleTaskStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => useContext(TaskContext)
