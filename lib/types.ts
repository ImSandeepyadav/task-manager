export type User = {
  id: number
  username: string
  name: string
  email?: string
  avatar?: string
}

export type Task = {
  id: number
  title: string
  description?: string
  completed: boolean
  userId: number
  priority?: "low" | "medium" | "high"
  createdAt?: string
  updatedAt?: string
}

export type TaskFilter = "all" | "completed" | "pending"

export type SortOption = "newest" | "oldest" | "alphabetical" | "priority"

export type UserSettings = {
  emailNotifications: boolean
  pushNotifications: boolean
  taskReminders: boolean
  darkMode: boolean
  compactView: boolean
  autoArchive: boolean
}
