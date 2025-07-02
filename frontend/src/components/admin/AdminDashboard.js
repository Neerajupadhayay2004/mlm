import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  UserCheck,
  UserX,
  Calendar,
  Target,
  Trophy,
  AlertTriangle
} from 'lucide-react';
import { mockAdminStats, mockAdminUsers } from '../../mock/mockData';

const AdminDashboard = () => {
  const [stats] = useState(mockAdminStats);
  const [recentUsers] = useState(mockAdminUsers.slice(0, 5));

  const getGrowthPercentage = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage your MLM system
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-blue-100 text-xs mt-1">
                    +{getGrowthPercentage(stats.totalUsers, 1180)}% this month
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Users</p>
                  <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-green-100 text-xs mt-1">
                    {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
                  <p className="text-purple-100 text-xs mt-1">
                    ${stats.todayEarnings.toFixed(2)} today
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Pending Withdrawals</p>
                  <p className="text-2xl font-bold">${stats.pendingWithdrawals.toLocaleString()}</p>
                  <p className="text-orange-100 text-xs mt-1">
                    Needs attention
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{stats.todayJoins}</div>
              <div className="text-sm text-gray-600">New Joins Today</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                ${stats.totalWithdrawals.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Withdrawals</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <UserX className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {stats.totalUsers - stats.activeUsers}
              </div>
              <div className="text-sm text-gray-600">Inactive Users</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Recent Users</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>User Growth Trend</span>
                  </CardTitle>
                  <CardDescription>
                    User registration over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Chart Placeholder</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600">156</div>
                        <div className="text-xs text-gray-600">This Week</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">634</div>
                        <div className="text-xs text-gray-600">This Month</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">7,241</div>
                        <div className="text-xs text-gray-600">This Year</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Top Performers</span>
                  </CardTitle>
                  <CardDescription>
                    Users with highest earnings this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.fullName}</p>
                            <p className="text-sm text-gray-600">{user.rank}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ${user.totalEarnings.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.totalTeamSize} team
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Recent Users</span>
                </CardTitle>
                <CardDescription>
                  Latest user registrations and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAdminUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                            <Badge variant={user.isActive ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                            <span>{user.directReferrals} referrals</span>
                            <span>{user.rank}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${user.totalEarnings.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Balance: ${user.currentBalance.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Team: {user.totalTeamSize}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Earnings Overview</span>
                </CardTitle>
                <CardDescription>
                  System-wide earnings and commission distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">
                      ${stats.totalEarnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total System Earnings</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">
                      ${stats.todayEarnings.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Today's Earnings</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-purple-600">
                      ${(stats.totalEarnings / stats.activeUsers).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Average per User</div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Commission Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { level: 'Level 1', rate: '10%', amount: stats.totalEarnings * 0.4 },
                      { level: 'Level 2', rate: '5%', amount: stats.totalEarnings * 0.25 },
                      { level: 'Level 3', rate: '3%', amount: stats.totalEarnings * 0.18 },
                      { level: 'Level 4', rate: '2%', amount: stats.totalEarnings * 0.12 },
                      { level: 'Level 5', rate: '1%', amount: stats.totalEarnings * 0.05 },
                    ].map((level) => (
                      <div key={level.level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">{level.level}</span>
                          <Badge variant="outline">{level.rate}</Badge>
                        </div>
                        <span className="font-semibold">${level.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Withdrawal Management</span>
                </CardTitle>
                <CardDescription>
                  Monitor and process user withdrawal requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-orange-600">
                      ${stats.pendingWithdrawals.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Pending Withdrawals</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">
                      ${stats.totalWithdrawals.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Processed</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600">Pending Requests</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Recent Withdrawal Requests</h3>
                  <div className="space-y-3">
                    {[
                      { user: 'Alice Smith', amount: 250, method: 'Bank Transfer', status: 'Pending', date: '2024-07-15' },
                      { user: 'Bob Wilson', amount: 150, method: 'PayPal', status: 'Processing', date: '2024-07-14' },
                      { user: 'Carol Davis', amount: 300, method: 'Cryptocurrency', status: 'Completed', date: '2024-07-13' },
                      { user: 'Dave Jones', amount: 100, method: 'Bank Transfer', status: 'Pending', date: '2024-07-12' },
                    ].map((withdrawal, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {withdrawal.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{withdrawal.user}</h4>
                            <p className="text-sm text-gray-600">{withdrawal.method}</p>
                            <p className="text-xs text-gray-500">{new Date(withdrawal.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${withdrawal.amount.toFixed(2)}
                          </div>
                          <Badge 
                            variant={
                              withdrawal.status === 'Completed' ? 'default' :
                              withdrawal.status === 'Processing' ? 'secondary' : 'outline'
                            }
                            className={
                              withdrawal.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              withdrawal.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {withdrawal.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
