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
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  CreditCard,
  Shield,
  Key,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from '../../hooks/use-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    username: user.username || '',
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    country: user.country || '',
    bio: user.bio || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [paymentData, setPaymentData] = useState({
    bankName: user.bankDetails?.bankName || '',
    accountNumber: user.bankDetails?.accountNumber || '',
    routingNumber: user.bankDetails?.routingNumber || '',
    accountHolderName: user.bankDetails?.accountHolderName || '',
    paypalEmail: user.paypalEmail || '',
    cryptoAddress: user.walletAddress || ''
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = () => {
    if (!passwordData.currentPassword) {
      return 'Current password is required';
    }
    if (!passwordData.newPassword) {
      return 'New password is required';
    }
    if (passwordData.newPassword.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return 'New passwords do not match';
    }
    return null;
  };

  const handleProfileSave = async () => {
    try {
      // Update user profile
      updateUser(profileData);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validatePassword();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real app, this would be an API call
      if (passwordData.currentPassword !== 'password123') {
        toast({
          title: "Error",
          description: "Current password is incorrect",
          variant: "destructive",
        });
        return;
      }

      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update payment information
      updateUser({
        bankDetails: {
          bankName: paymentData.bankName,
          accountNumber: paymentData.accountNumber,
          routingNumber: paymentData.routingNumber,
          accountHolderName: paymentData.accountHolderName
        },
        paypalEmail: paymentData.paypalEmail,
        walletAddress: paymentData.cryptoAddress
      });

      toast({
        title: "Payment Methods Updated",
        description: "Your payment information has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment methods. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
              {user.fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {user.fullName}
            </h1>
            <p className="text-gray-600">@{user.username}</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {user.rank} Member
              </Badge>
              <Badge variant="outline">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {new Date(user.joinDate).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      if (isEditing) {
                        handleProfileSave();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    variant={isEditing ? "default" : "outline"}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={profileData.username}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={profileData.country}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="Enter country"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Enter full address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData({
                          fullName: user.fullName || '',
                          email: user.email || '',
                          username: user.username || '',
                          phone: user.phone || '',
                          address: user.address || '',
                          city: user.city || '',
                          country: user.country || '',
                          bio: user.bio || ''
                        });
                      }}
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Change Password</span>
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {passwordData.newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength(passwordData.newPassword))}`}
                              style={{ width: `${(getPasswordStrength(passwordData.newPassword) / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{getStrengthText(getPasswordStrength(passwordData.newPassword))}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle size={16} />
                        <span className="text-sm">Passwords match</span>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Account Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Email Verified</p>
                        <p className="text-sm text-green-600">Your email address is verified</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Two-Factor Authentication</p>
                        <p className="text-sm text-yellow-600">Enable 2FA for extra security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Methods</span>
                </CardTitle>
                <CardDescription>
                  Manage your payment methods for withdrawals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Bank Account</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          name="bankName"
                          value={paymentData.bankName}
                          onChange={handlePaymentChange}
                          placeholder="Enter bank name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountHolderName">Account Holder Name</Label>
                        <Input
                          id="accountHolderName"
                          name="accountHolderName"
                          value={paymentData.accountHolderName}
                          onChange={handlePaymentChange}
                          placeholder="Enter account holder name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          name="accountNumber"
                          value={paymentData.accountNumber}
                          onChange={handlePaymentChange}
                          placeholder="Enter account number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input
                          id="routingNumber"
                          name="routingNumber"
                          value={paymentData.routingNumber}
                          onChange={handlePaymentChange}
                          placeholder="Enter routing number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">PayPal</h3>
                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        name="paypalEmail"
                        type="email"
                        value={paymentData.paypalEmail}
                        onChange={handlePaymentChange}
                        placeholder="Enter PayPal email"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Cryptocurrency</h3>
                    <div className="space-y-2">
                      <Label htmlFor="cryptoAddress">Wallet Address</Label>
                      <Input
                        id="cryptoAddress"
                        name="cryptoAddress"
                        value={paymentData.cryptoAddress}
                        onChange={handlePaymentChange}
                        placeholder="Enter crypto wallet address"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Payment Methods
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Member ID</Label>
                      <Input value={user.id} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Member Since</Label>
                      <Input value={new Date(user.joinDate).toLocaleDateString()} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Current Rank</Label>
                      <Input value={user.rank} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Status</Label>
                      <Input value={user.isActive ? 'Active' : 'Inactive'} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Referral Code</Label>
                      <Input value={user.username} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Total Team Size</Label>
                      <Input value={user.totalTeamSize} disabled />
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Some account information cannot be changed. 
                      If you need to update critical details, please contact support.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
