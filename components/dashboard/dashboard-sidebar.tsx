"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CheckSquare, ListTodo, Clock, Flag } from "lucide-react"

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
    title: "Pending",
    href: "/dashboard?filter=pending",
    icon: Clock,
  },
  {
    title: "Completed",
    href: "/dashboard?filter=completed",
    icon: CheckSquare,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentFilter = searchParams.get("filter")
  const priorityFilter = searchParams.get("priority")

  const isActive = (href: string) => {
    if (href.includes("?filter=")) {
      const hrefFilter = href.split("?filter=")[1]
      return pathname === "/dashboard" && (currentFilter === hrefFilter || (!currentFilter && hrefFilter === "all"))
    }

    if (href === "/dashboard" && !currentFilter) {
      return pathname === "/dashboard"
    }

    return pathname === href
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/30 lg:flex">
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="py-2">
          <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Main</h2>
          <nav className="grid gap-1 py-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={(e) => handleNavigation(e, item.href)} passHref>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive(item.href) ? "bg-secondary font-medium" : "font-normal",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="py-2">
          <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Priority</h2>
          <nav className="grid gap-1 py-2">
            <Link
              href="/dashboard?filter=all&priority=high"
              onClick={(e) => handleNavigation(e, "/dashboard?filter=all&priority=high")}
              passHref
            >
              <Button
                variant={priorityFilter === "high" ? "secondary" : "ghost"}
                className="w-full justify-start font-normal"
              >
                <Flag className="mr-2 h-4 w-4 text-destructive" />
                High Priority
              </Button>
            </Link>
            <Link
              href="/dashboard?filter=all&priority=medium"
              onClick={(e) => handleNavigation(e, "/dashboard?filter=all&priority=medium")}
              passHref
            >
              <Button
                variant={priorityFilter === "medium" ? "secondary" : "ghost"}
                className="w-full justify-start font-normal"
              >
                <Flag className="mr-2 h-4 w-4 text-amber-500" />
                Medium Priority
              </Button>
            </Link>
            <Link
              href="/dashboard?filter=all&priority=low"
              onClick={(e) => handleNavigation(e, "/dashboard?filter=all&priority=low")}
              passHref
            >
              <Button
                variant={priorityFilter === "low" ? "secondary" : "ghost"}
                className="w-full justify-start font-normal"
              >
                <Flag className="mr-2 h-4 w-4 text-green-500" />
                Low Priority
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  )
}
