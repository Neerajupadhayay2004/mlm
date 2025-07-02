import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  DollarSign, 
  CreditCard, 
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  History,
  Info,
  Building
} from 'lucide-react';
import { toast } from '../../hooks/use-toast';
import { mockWithdrawals, systemSettings } from '../../mock/mockData';

const Withdrawals = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('request');
  const [withdrawalData, setWithdrawalData] = useState({
    amount: '',
    method: 'bank',
    bankAccount: '',
    bankName: '',
    routingNumber: '',
    paypalEmail: '',
    cryptoAddress: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState(mockWithdrawals);

  const handleInputChange = (e) => {
    setWithdrawalData({
      ...withdrawalData,
      [e.target.name]: e.target.value
    });
  };

  const validateWithdrawal = () => {
    const amount = parseFloat(withdrawalData.amount);
    
    if (!amount || amount <= 0) {
      return 'Please enter a valid amount';
    }
    
    if (amount < systemSettings.minimumWithdrawal) {
      return `Minimum withdrawal amount is $${systemSettings.minimumWithdrawal}`;
    }
    
    if (amount > user.currentBalance) {
      return 'Insufficient balance';
    }
    
    if (amount > systemSettings.maxWithdrawalPerDay) {
      return `Maximum withdrawal per day is $${systemSettings.maxWithdrawalPerDay}`;
    }
    
    // Method-specific validation
    switch (withdrawalData.method) {
      case 'bank':
        if (!withdrawalData.bankAccount || !withdrawalData.bankName || !withdrawalData.routingNumber) {
          return 'Please fill in all bank details';
        }
        break;
      case 'paypal':
        if (!withdrawalData.paypalEmail) {
          return 'Please enter your PayPal email';
        }
        break;
      case 'crypto':
        if (!withdrawalData.cryptoAddress) {
          return 'Please enter your crypto wallet address';
        }
        break;
    }
    
    return null;
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationError = validateWithdrawal();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const amount = parseFloat(withdrawalData.amount);
      const fee = systemSettings.withdrawalFee[withdrawalData.method];
      
      // Create new withdrawal record
      const newWithdrawal = {
        id: `withdraw_${Date.now()}`,
        amount,
        method: withdrawalData.method === 'bank' ? 'Bank Transfer' : 
                withdrawalData.method === 'paypal' ? 'PayPal' : 'Cryptocurrency',
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        fee,
        details: withdrawalData.method === 'bank' ? 
          `${withdrawalData.bankName} ****${withdrawalData.bankAccount.slice(-4)}` :
          withdrawalData.method === 'paypal' ? withdrawalData.paypalEmail :
          withdrawalData.cryptoAddress.slice(0, 10) + '...' + withdrawalData.cryptoAddress.slice(-10)
      };
      
      // Update withdrawal history
      setWithdrawalHistory([newWithdrawal, ...withdrawalHistory]);
      
      // Update user balance
      const newBalance = user.currentBalance - amount - fee;
      updateUser({ currentBalance: newBalance });
      
      // Reset form
      setWithdrawalData({
        amount: '',
        method: 'bank',
        bankAccount: '',
        bankName: '',
        routingNumber: '',
        paypalEmail: '',
        cryptoAddress: '',
        notes: ''
      });
      
      toast({
        title: "Withdrawal Submitted",
        description: `Your withdrawal request for $${amount.toFixed(2)} has been submitted and is pending approval.`,
      });
      
      setActiveTab('history');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit withdrawal request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Bank Transfer':
        return <Building className="w-5 h-5" />;
      case 'PayPal':
        return <CreditCard className="w-5 h-5" />;
      case 'Cryptocurrency':
        return <Wallet className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  const calculateFee = () => {
    const amount = parseFloat(withdrawalData.amount) || 0;
    const fee = systemSettings.withdrawalFee[withdrawalData.method] || 0;
    return fee;
  };

  const calculateTotal = () => {
    const amount = parseFloat(withdrawalData.amount) || 0;
    const fee = calculateFee();
    return amount + fee;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Withdrawals
          </h1>
          <p className="text-gray-600">
            Manage your withdrawals and view transaction history
          </p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Available Balance</p>
                  <p className="text-2xl font-bold">${user.currentBalance.toFixed(2)}</p>
                </div>
                <Wallet className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Withdrawn</p>
                  <p className="text-2xl font-bold">${user.totalWithdrawn.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Pending Withdrawals</p>
                  <p className="text-2xl font-bold">
                    ${withdrawalHistory.filter(w => w.status === 'Pending').reduce((sum, w) => sum + w.amount, 0).toFixed(2)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="request" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Withdrawal</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="request" className="space-y-6">
            {/* Withdrawal Limits Info */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Withdrawal Limits:</strong> Minimum: ${systemSettings.minimumWithdrawal}, 
                Maximum per day: ${systemSettings.maxWithdrawalPerDay}. 
                Processing time: 1-3 business days.
              </AlertDescription>
            </Alert>

            {/* Withdrawal Form */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Request Withdrawal</span>
                </CardTitle>
                <CardDescription>
                  Fill in the details below to request a withdrawal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdrawalSubmit} className="space-y-6">
                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawalData.amount}
                      onChange={handleInputChange}
                      min={systemSettings.minimumWithdrawal}
                      max={Math.min(user.currentBalance, systemSettings.maxWithdrawalPerDay)}
                      step="0.01"
                      required
                    />
                    <p className="text-sm text-gray-600">
                      Available: ${user.currentBalance.toFixed(2)}
                    </p>
                  </div>

                  {/* Withdrawal Method */}
                  <div className="space-y-2">
                    <Label htmlFor="method">Withdrawal Method</Label>
                    <select
                      id="method"
                      name="method"
                      value={withdrawalData.method}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="bank">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="crypto">Cryptocurrency</option>
                    </select>
                  </div>

                  {/* Method-specific fields */}
                  {withdrawalData.method === 'bank' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          name="bankName"
                          placeholder="Enter bank name"
                          value={withdrawalData.bankName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bankAccount">Account Number</Label>
                        <Input
                          id="bankAccount"
                          name="bankAccount"
                          placeholder="Enter account number"
                          value={withdrawalData.bankAccount}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input
                          id="routingNumber"
                          name="routingNumber"
                          placeholder="Enter routing number"
                          value={withdrawalData.routingNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {withdrawalData.method === 'paypal' && (
                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        name="paypalEmail"
                        type="email"
                        placeholder="Enter PayPal email"
                        value={withdrawalData.paypalEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {withdrawalData.method === 'crypto' && (
                    <div className="space-y-2">
                      <Label htmlFor="cryptoAddress">Wallet Address</Label>
                      <Input
                        id="cryptoAddress"
                        name="cryptoAddress"
                        placeholder="Enter crypto wallet address"
                        value={withdrawalData.cryptoAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any additional information..."
                      value={withdrawalData.notes}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  {/* Fee Calculation */}
                  {withdrawalData.amount && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Withdrawal Amount:</span>
                        <span>${parseFloat(withdrawalData.amount || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Fee:</span>
                        <span>${calculateFee().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Deducted:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting || !withdrawalData.amount}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Withdrawal Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Withdrawal History</span>
                </CardTitle>
                <CardDescription>
                  View all your past withdrawal requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawalHistory.map((withdrawal) => (
                    <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white">
                          {getMethodIcon(withdrawal.method)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{withdrawal.method}</h3>
                            <Badge className={getStatusColor(withdrawal.status)}>
                              {withdrawal.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{withdrawal.details}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Requested: {new Date(withdrawal.date).toLocaleDateString()}</span>
                            {withdrawal.processedDate && (
                              <span>Processed: {new Date(withdrawal.processedDate).toLocaleDateString()}</span>
                            )}
                            <span>Fee: ${withdrawal.fee.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">
                          ${withdrawal.amount.toFixed(2)}
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          {getStatusIcon(withdrawal.status)}
                          <span className="text-gray-600">{withdrawal.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {withdrawalHistory.length === 0 && (
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No withdrawals yet</h3>
                    <p className="text-gray-600">
                      Your withdrawal history will appear here once you make your first request
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Withdrawals;
