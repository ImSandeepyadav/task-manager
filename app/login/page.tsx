import { LoginForm } from "@/components/auth/login-form"
import { Logo } from "@/components/common/logo"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted/50">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Logo className="h-12 w-12" />
            <h1 className="text-3xl font-bold">TaskFlow</h1>
            <p className="text-muted-foreground">Sign in to manage your tasks efficiently</p>
          </div>
          <LoginForm />
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  )
}
