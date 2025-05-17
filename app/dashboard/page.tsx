import { TaskDashboard } from "@/components/tasks/task-dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AuthGuard } from "@/components/auth/auth-guard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | TaskFlow",
  description: "Manage your tasks efficiently with TaskFlow",
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHeader heading="Task Dashboard" text="Manage and organize your tasks efficiently" />
        <TaskDashboard />
      </DashboardShell>
    </AuthGuard>
  )
}
