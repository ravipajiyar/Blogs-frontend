"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Blog<span className="text-blue-600">App</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Login
            </Link>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}