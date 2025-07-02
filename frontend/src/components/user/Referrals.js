import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Share2, 
  Copy, 
  QrCode, 
  Users, 
  Gift,
  Trophy,
  Star,
  Calendar,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Target
} from 'lucide-react';
import { toast } from '../../hooks/use-toast';
import { mockDownline } from '../../mock/mockData';

const Referrals = () => {
  const { user } = useAuth();
  const [showQRCode, setShowQRCode] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    `Join my network and start earning today! Use my referral link to get started: ${user.referralLink}`
  );

  const directReferrals = mockDownline.filter(member => member.level === 1);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const copyCustomMessage = () => {
    navigator.clipboard.writeText(customMessage);
    toast({
      title: "Copied!",
      description: "Custom message copied to clipboard",
    });
  };

  const shareToSocial = (platform) => {
    const text = encodeURIComponent(customMessage);
    const url = encodeURIComponent(user.referralLink);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=Join My MLM Network&body=${text}`,
      sms: `sms:?body=${text}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  const generateQRCode = () => {
    // In a real app, you'd use a QR code library like qrcode.js
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(user.referralLink)}`;
    return qrCodeUrl;
  };

  const getReferralStats = () => {
    const active = directReferrals.filter(r => r.isActive).length;
    const inactive = directReferrals.filter(r => r.isActive === false).length;
    const totalEarnings = directReferrals.reduce((sum, r) => sum + r.earnings, 0);
    
    return { active, inactive, totalEarnings };
  };

  const stats = getReferralStats();

  const getAchievementBadge = (referralCount) => {
    if (referralCount >= 50) return { name: 'Master Recruiter', color: 'bg-purple-500', icon: Trophy };
    if (referralCount >= 25) return { name: 'Super Recruiter', color: 'bg-yellow-500', icon: Star };
    if (referralCount >= 10) return { name: 'Pro Recruiter', color: 'bg-blue-500', icon: Target };
    if (referralCount >= 5) return { name: 'Active Recruiter', color: 'bg-green-500', icon: Users };
    return { name: 'New Recruiter', color: 'bg-gray-500', icon: Gift };
  };

  const achievement = getAchievementBadge(user.directReferrals);
  const AchievementIcon = achievement.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Referral Center
          </h1>
          <p className="text-gray-600">
            Share your referral link and grow your network
          </p>
        </div>

        {/* Achievement Badge */}
        <div className="flex justify-center">
          <div className={`${achievement.color} text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg transform hover:scale-105 transition-all duration-300`}>
            <AchievementIcon className="w-5 h-5" />
            <span className="font-semibold">{achievement.name}</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Referrals</p>
                  <p className="text-2xl font-bold">{user.directReferrals}</p>
                </div>
                <Users className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Referrals</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
                <Target className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Referral Earnings</p>
                  <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
                </div>
                <Gift className="w-8 h-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Team Size</p>
                  <p className="text-2xl font-bold">{user.totalTeamSize}</p>
                </div>
                <Trophy className="w-8 h-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="share" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="share">Share Link</TabsTrigger>
            <TabsTrigger value="referrals">My Referrals</TabsTrigger>
            <TabsTrigger value="tools">Marketing Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-6">
            {/* Referral Link */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Your Referral Link</span>
                </CardTitle>
                <CardDescription>
                  Share this link with others to earn referral bonuses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={user.referralLink}
                    readOnly
                    className="flex-1 font-mono text-sm"
                  />
                  <Button onClick={copyReferralLink} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={() => shareToSocial('facebook')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => shareToSocial('twitter')}
                    className="bg-sky-500 hover:bg-sky-600"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() => shareToSocial('linkedin')}
                    className="bg-blue-700 hover:bg-blue-800"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={() => shareToSocial('email')}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5" />
                  <span>QR Code</span>
                </CardTitle>
                <CardDescription>
                  Let others scan this QR code to join your network
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {showQRCode ? (
                  <div className="space-y-4">
                    <img
                      src={generateQRCode()}
                      alt="Referral QR Code"
                      className="mx-auto border rounded-lg"
                    />
                    <div className="flex justify-center space-x-2">
                      <Button
                        onClick={() => setShowQRCode(false)}
                        variant="outline"
                      >
                        Hide QR Code
                      </Button>
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = generateQRCode();
                          link.download = 'referral-qr-code.png';
                          link.click();
                        }}
                        variant="outline"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowQRCode(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Custom Message */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Custom Message</span>
                </CardTitle>
                <CardDescription>
                  Personalize your referral message
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                  placeholder="Enter your custom referral message..."
                />
                <div className="flex justify-between">
                  <Button
                    onClick={copyCustomMessage}
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Message
                  </Button>
                  <Button
                    onClick={() => shareToSocial('sms')}
                    variant="outline"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send SMS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Direct Referrals ({directReferrals.length})</span>
                </CardTitle>
                <CardDescription>
                  People who joined using your referral link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {directReferrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {referral.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{referral.fullName}</h3>
                            <Badge variant={referral.isActive ? "default" : "secondary"}>
                              {referral.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">@{referral.username}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Joined {new Date(referral.joinDate).toLocaleDateString()}</span>
                            </span>
                            <span>{referral.directReferrals} referrals</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${referral.earnings.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">Earnings</div>
                      </div>
                    </div>
                  ))}
                </div>

                {directReferrals.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No direct referrals yet</h3>
                    <p className="text-gray-600">
                      Start sharing your referral link to build your network
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Marketing Tools</span>
                </CardTitle>
                <CardDescription>
                  Resources to help you promote your referral link
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Referral Tips</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Share your personal success story</li>
                      <li>• Explain the earning potential clearly</li>
                      <li>• Offer to help new members get started</li>
                      <li>• Use social media to reach more people</li>
                      <li>• Follow up with interested prospects</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Commission Structure</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Level 1: 10% commission</li>
                      <li>• Level 2: 5% commission</li>
                      <li>• Level 3: 3% commission</li>
                      <li>• Level 4: 2% commission</li>
                      <li>• Level 5: 1% commission</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Next Achievement</h3>
                  {user.directReferrals < 5 && (
                    <p className="text-sm text-gray-600">
                      Refer {5 - user.directReferrals} more people to become an Active Recruiter
                    </p>
                  )}
                  {user.directReferrals >= 5 && user.directReferrals < 10 && (
                    <p className="text-sm text-gray-600">
                      Refer {10 - user.directReferrals} more people to become a Pro Recruiter
                    </p>
                  )}
                  {user.directReferrals >= 10 && user.directReferrals < 25 && (
                    <p className="text-sm text-gray-600">
                      Refer {25 - user.directReferrals} more people to become a Super Recruiter
                    </p>
                  )}
                  {user.directReferrals >= 25 && user.directReferrals < 50 && (
                    <p className="text-sm text-gray-600">
                      Refer {50 - user.directReferrals} more people to become a Master Recruiter
                    </p>
                  )}
                  {user.directReferrals >= 50 && (
                    <p className="text-sm text-gray-600">
                      Congratulations! You've achieved the highest recruiter level.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Referrals;
