export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }

  // Format the date
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Less than a minute
  if (seconds < 60) {
    return "just now"
  }

  // Less than an hour
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  }

  // Less than a day
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`
  }

  // Less than a week
  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`
  }

  // Format the date
  return formatDate(dateString)
}
