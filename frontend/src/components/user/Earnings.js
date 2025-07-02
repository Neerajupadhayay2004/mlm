import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Filter,
  Download,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Users,
  Gift
} from 'lucide-react';
import { mockEarnings, commissionRates } from '../../mock/mockData';

const Earnings = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const filteredEarnings = useMemo(() => {
    return mockEarnings.filter(earning => {
      const matchesSearch = earning.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           earning.source.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const earningDate = new Date(earning.date);
        const today = new Date();
        
        switch (dateFilter) {
          case 'today':
            matchesDate = earningDate.toDateString() === today.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = earningDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = earningDate >= monthAgo;
            break;
        }
      }
      
      const matchesType = typeFilter === 'all' || earning.type === typeFilter;
      
      return matchesSearch && matchesDate && matchesType;
    });
  }, [searchTerm, dateFilter, typeFilter]);

  const earningsSummary = useMemo(() => {
    const total = filteredEarnings.reduce((sum, earning) => sum + earning.amount, 0);
    const referralEarnings = filteredEarnings
      .filter(e => e.type === 'referral')
      .reduce((sum, earning) => sum + earning.amount, 0);
    const commissionEarnings = filteredEarnings
      .filter(e => e.type === 'commission')
      .reduce((sum, earning) => sum + earning.amount, 0);
    
    return {
      total,
      referral: referralEarnings,
      commission: commissionEarnings,
      count: filteredEarnings.length
    };
  }, [filteredEarnings]);

  const getEarningsByPeriod = (period) => {
    const now = new Date();
    const earnings = mockEarnings.filter(earning => {
      const earningDate = new Date(earning.date);
      
      switch (period) {
        case 'today':
          return earningDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return earningDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return earningDate >= monthAgo;
        default:
          return true;
      }
    });
    
    return earnings.reduce((sum, earning) => sum + earning.amount, 0);
  };

  const getEarningIcon = (type) => {
    switch (type) {
      case 'referral':
        return <Users className="w-4 h-4" />;
      case 'commission':
        return <Target className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  const getEarningColor = (type) => {
    switch (type) {
      case 'referral':
        return 'bg-green-500';
      case 'commission':
        return 'bg-blue-500';
      default:
        return 'bg-purple-500';
    }
  };

  const getLevelCommissionRate = (level) => {
    return commissionRates[`level${level}`] * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Earnings Report
          </h1>
          <p className="text-gray-600">
            Track your income from referrals and commissions
          </p>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Today's Earnings</p>
                  <p className="text-2xl font-bold">${getEarningsByPeriod('today').toFixed(2)}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">This Week</p>
                  <p className="text-2xl font-bold">${getEarningsByPeriod('week').toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">This Month</p>
                  <p className="text-2xl font-bold">${getEarningsByPeriod('month').toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">All Time</p>
                  <p className="text-2xl font-bold">${user.totalEarnings.toFixed(2)}</p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commission Structure */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Commission Structure</span>
            </CardTitle>
            <CardDescription>
              Earning rates for each level in your downline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(level => (
                <div key={level} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">
                    {level}
                  </div>
                  <p className="text-sm font-medium text-gray-700">Level {level}</p>
                  <p className="text-lg font-bold text-blue-600">{getLevelCommissionRate(level)}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Earnings History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="search"
                        placeholder="Search earnings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-filter">Date Range</Label>
                    <select
                      id="date-filter"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type-filter">Type</Label>
                    <select
                      id="type-filter"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Types</option>
                      <option value="referral">Referral Bonus</option>
                      <option value="commission">Commission</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${earningsSummary.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Total Filtered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">${earningsSummary.referral.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Referral Bonus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">${earningsSummary.commission.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Commissions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{earningsSummary.count}</div>
                    <div className="text-sm text-gray-600">Total Entries</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Earnings List */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Earnings History</span>
                  </span>
                  <Badge variant="secondary">
                    {filteredEarnings.length} entries
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEarnings.map((earning) => (
                    <div key={earning.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${getEarningColor(earning.type)} rounded-full flex items-center justify-center text-white`}>
                          {getEarningIcon(earning.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{earning.source}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>From: {earning.from}</span>
                            <Badge variant="outline" className="text-xs">
                              Level {earning.level}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">{new Date(earning.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          +${earning.amount.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {earning.type === 'commission' ? `${getLevelCommissionRate(earning.level)}% rate` : 'Bonus'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredEarnings.length === 0 && (
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No earnings found</h3>
                    <p className="text-gray-600">
                      {searchTerm || dateFilter !== 'all' || typeFilter !== 'all'
                        ? 'Try adjusting your search or filter criteria'
                        : 'Start earning by referring new members to your network'
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Earnings Analytics</CardTitle>
                <CardDescription>
                  Detailed breakdown of your earning patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Earnings by Type</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Referral Bonus</span>
                        </div>
                        <span className="font-semibold">${earningsSummary.referral.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Level Commissions</span>
                        </div>
                        <span className="font-semibold">${earningsSummary.commission.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Average per earning</span>
                        <span className="font-semibold">
                          ${filteredEarnings.length > 0 ? (earningsSummary.total / filteredEarnings.length).toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Highest single earning</span>
                        <span className="font-semibold">
                          ${Math.max(...filteredEarnings.map(e => e.amount), 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total earnings count</span>
                        <span className="font-semibold">{filteredEarnings.length}</span>
                      </div>
                    </div>
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

export default Earnings;
