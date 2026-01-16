"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { LogOut, PenTool } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md dark:bg-zinc-950/70 dark:border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight group">
          <div className="p-2 bg-primary-600 text-white rounded-lg group-hover:bg-primary-700 transition-colors">
            <PenTool className="w-5 h-5" />
          </div>
          <span className="text-foreground">Blog<span className="text-primary-600">App</span></span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary px-4 py-2 text-sm">
              Sign In
            </Link>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}