import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Copy, 
  Share2, 
  Gift,
  Star,
  Calendar,
  Target,
  Trophy,
  Bell
} from 'lucide-react';
import { toast } from '../../hooks/use-toast';
import { mockEarnings, mockNotifications } from '../../mock/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [weeklyEarnings, setWeeklyEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState([]);

  useEffect(() => {
    // Calculate today's earnings
    const today = new Date().toISOString().split('T')[0];
    const todayEarning = mockEarnings
      .filter(earning => earning.date === today)
      .reduce((sum, earning) => sum + earning.amount, 0);
    setTodayEarnings(todayEarning);

    // Calculate weekly earnings (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyEarning = mockEarnings
      .filter(earning => new Date(earning.date) >= weekAgo)
      .reduce((sum, earning) => sum + earning.amount, 0);
    setWeeklyEarnings(weeklyEarning);

    // Calculate monthly earnings (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthlyEarning = mockEarnings
      .filter(earning => new Date(earning.date) >= monthAgo)
      .reduce((sum, earning) => sum + earning.amount, 0);
    setMonthlyEarnings(monthlyEarning);

    // Get recent notifications
    setRecentNotifications(mockNotifications.slice(0, 3));
  }, []);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join My MLM Network',
        text: 'Join my team and start earning today!',
        url: user.referralLink,
      });
    } else {
      copyReferralLink();
    }
  };

  const getRankProgress = () => {
    const ranks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
    const currentIndex = ranks.indexOf(user.rank);
    return ((currentIndex + 1) / ranks.length) * 100;
  };

  const getNextRankTarget = () => {
    const targets = {
      'Bronze': { nextRank: 'Silver', target: 10 },
      'Silver': { nextRank: 'Gold', target: 25 },
      'Gold': { nextRank: 'Platinum', target: 50 },
      'Platinum': { nextRank: 'Diamond', target: 100 },
      'Diamond': { nextRank: 'Master', target: 200 }
    };
    return targets[user.rank] || { nextRank: 'Master', target: 200 };
  };

  const nextRank = getNextRankTarget();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back, {user.fullName}!
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <Star className="w-4 h-4 mr-1" />
              {user.rank} Member
            </Badge>
            <Badge variant="outline">
              <Calendar className="w-4 h-4 mr-1" />
              Joined {new Date(user.joinDate).toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Current Balance</p>
                  <p className="text-2xl font-bold">${user.currentBalance.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold">${user.totalEarnings.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Team Size</p>
                  <p className="text-2xl font-bold">{user.totalTeamSize}</p>
                </div>
                <Users className="w-8 h-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Direct Referrals</p>
                  <p className="text-2xl font-bold">{user.directReferrals}</p>
                </div>
                <Gift className="w-8 h-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Overview */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Earnings Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold text-green-600">${todayEarnings.toFixed(2)}</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-blue-600">${weeklyEarnings.toFixed(2)}</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">${monthlyEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rank Progress */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Rank Progress</span>
              </CardTitle>
              <CardDescription>
                Progress to {nextRank.nextRank} rank
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current: {user.rank}</span>
                <span className="text-sm text-gray-600">Target: {nextRank.target} referrals</span>
              </div>
              <Progress value={(user.directReferrals / nextRank.target) * 100} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span>{user.directReferrals} referrals</span>
                <span>{nextRank.target - user.directReferrals} more needed</span>
              </div>
            </CardContent>
          </Card>

          {/* Referral Tools */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Referral Tools</span>
              </CardTitle>
              <CardDescription>
                Share your referral link and grow your network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-3 bg-gray-100 rounded-lg text-sm font-mono truncate">
                  {user.referralLink}
                </div>
                <Button onClick={copyReferralLink} size="sm" variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={shareReferralLink} className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'referral' ? 'bg-green-500' :
                    notification.type === 'earning' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
