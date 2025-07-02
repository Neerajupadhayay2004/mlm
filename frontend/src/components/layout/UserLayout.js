"use client"

import { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { LayoutDashboard, Users, CreditCard, Share2, User, Bell, LogOut, Menu, X, TrendingUp } from "lucide-react"

const UserLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Downline", href: "/downline", icon: Users },
    { name: "Earnings", href: "/earnings", icon: TrendingUp },
    { name: "Withdrawals", href: "/withdrawals", icon: CreditCard },
    { name: "Referrals", href: "/referrals", icon: Share2 },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (href) => {
    return location.pathname === href
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MLM</span>
              </div>
              <span className="text-xl font-bold text-gray-800">MLM System</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user.fullName}</p>
                <p className="text-sm text-gray-600 truncate">@{user.username}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs px-2 py-1">
                {user.rank}
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">${user.currentBalance.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Balance</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.href)
                        setIsSidebarOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${isActive(item.href)
                          ? "bg-purple-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm">
                    {user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-gray-600">{user.rank} Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default UserLayout
