"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Users, Search, TrendingUp, Calendar, Mail, Star, Eye, ChevronDown, ChevronRight, Bell } from "lucide-react"
import { mockDownline } from "../../mock/mockData"

const Downline = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [expandedMembers, setExpandedMembers] = useState({})

  const filteredDownline = mockDownline.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || member.level.toString() === selectedLevel
    return matchesSearch && matchesLevel
  })

  const toggleMemberExpansion = (memberId) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }))
  }

  const getLevelColor = (level) => {
    const colors = {
      1: "bg-green-500",
      2: "bg-blue-500",
      3: "bg-purple-500",
      4: "bg-orange-500",
      5: "bg-red-500",
    }
    return colors[level] || "bg-gray-500"
  }

  const getTotalByLevel = (level) => {
    return mockDownline.filter((member) => member.level === level).length
  }

  const getTotalEarningsFromLevel = (level) => {
    return mockDownline.filter((member) => member.level === level).reduce((sum, member) => sum + member.earnings, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Downline</h1>
          <p className="text-gray-600 mt-1">Manage and view your team members across all levels</p>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
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

      {/* My Network Downline Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Network Downline
        </h2>
        <p className="text-gray-600 mt-2">Manage and view your team members across all levels</p>
      </div>

      {/* Level Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((level) => (
          <Card key={level} className="text-center">
            <CardContent className="p-4">
              <div
                className={`w-8 h-8 ${getLevelColor(level)} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm`}
              >
                {level}
              </div>
              <p className="text-sm text-gray-600">Level {level}</p>
              <p className="text-xl font-bold">{getTotalByLevel(level)}</p>
              <p className="text-xs text-gray-500">${getTotalEarningsFromLevel(level).toFixed(2)} earned</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Levels</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Downline Tree */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Team Members ({filteredDownline.length})</span>
          </CardTitle>
          <CardDescription>Your downline network in single leg structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDownline.map((member, index) => (
              <div key={member.id} className="relative">
                {/* Connection Line */}
                {index > 0 && <div className="absolute -top-4 left-6 w-px h-4 bg-gray-300"></div>}

                <div
                  className={`flex items-center space-x-4 p-4 rounded-lg border-l-4 ${member.isActive
                      ? "bg-gradient-to-r from-green-50 to-white border-l-green-500"
                      : "bg-gradient-to-r from-red-50 to-white border-l-red-500"
                    } hover:shadow-md transition-all duration-300`}
                >
                  {/* Level Indicator */}
                  <div
                    className={`w-8 h-8 ${getLevelColor(member.level)} rounded-full flex items-center justify-center text-white font-bold text-xs`}
                  >
                    L{member.level}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                      {member.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Member Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{member.fullName}</h3>
                      <Badge variant={member.isActive ? "default" : "secondary"} className="text-xs">
                        {member.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">@{member.username}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{member.directReferrals} referrals</span>
                      </span>
                      {member.sponsor && (
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Sponsored by {member.sponsor}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Earnings */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">${member.earnings.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Total Earnings</div>
                  </div>

                  {/* Expand Button */}
                  <Button variant="ghost" size="sm" onClick={() => toggleMemberExpansion(member.id)} className="p-1">
                    {expandedMembers[member.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Expanded Details */}
                {expandedMembers[member.id] && (
                  <div className="ml-12 mt-2 p-4 bg-gray-50 rounded-lg border-l-2 border-l-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Contact Info</p>
                        <div className="flex items-center space-x-1 text-gray-600 mt-1">
                          <Mail className="w-3 h-3" />
                          <span>{member.email}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Performance</p>
                        <div className="space-y-1 mt-1">
                          <p className="text-gray-600">Level: {member.level}</p>
                          <p className="text-gray-600">Status: {member.isActive ? "Active" : "Inactive"}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Team Stats</p>
                        <div className="space-y-1 mt-1">
                          <p className="text-gray-600">Direct Referrals: {member.directReferrals}</p>
                          <p className="text-gray-600">Total Earnings: ${member.earnings.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-3 h-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredDownline.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedLevel !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start building your network by sharing your referral link"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Network Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Network Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{user.totalTeamSize}</div>
              <div className="text-sm text-gray-600">Total Team Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{user.directReferrals}</div>
              <div className="text-sm text-gray-600">Direct Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{mockDownline.filter((m) => m.isActive).length}</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${mockDownline.reduce((sum, m) => sum + m.earnings, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Team Earnings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Downline
