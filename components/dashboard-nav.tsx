"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CheckSquare, ListTodo, Settings } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Tasks",
    href: "/dashboard?filter=all",
    icon: ListTodo,
  },
  {
    title: "Completed",
    href: "/dashboard?filter=completed",
    icon: CheckSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const searchParams =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()

  const currentFilter = searchParams.get("filter")

  const isActive = (href: string) => {
    if (href.includes("?filter=")) {
      const hrefFilter = href.split("?filter=")[1]
      return pathname === "/dashboard" && currentFilter === hrefFilter
    }

    if (href === "/dashboard" && !currentFilter) {
      return pathname === "/dashboard"
    }

    return pathname === href
  }

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={isActive(item.href) ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              isActive(item.href) ? "bg-secondary" : "hover:bg-transparent hover:underline",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
