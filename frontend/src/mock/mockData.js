// Mock data for MLM system
export const mockUsers = [
  {
    id: 'user1',
    fullName: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    sponsorId: null,
    joinDate: '2024-01-15',
    isActive: true,
    rank: 'Silver',
    totalEarnings: 2580.50,
    currentBalance: 1250.75,
    totalWithdrawn: 1329.75,
    directReferrals: 8,
    totalTeamSize: 45,
    referralLink: 'https://mlm-system.com/ref/johndoe',
    walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    bankDetails: {
      accountNumber: '****6789',
      bankName: 'Chase Bank',
      routingNumber: '021000021'
    }
  }
];

export const mockDownline = [
  {
    id: 'ref1',
    username: 'alice_smith',
    fullName: 'Alice Smith',
    joinDate: '2024-02-01',
    isActive: true,
    level: 1,
    earnings: 450.00,
    directReferrals: 3,
    email: 'alice@example.com'
  },
  {
    id: 'ref2',
    username: 'bob_wilson',
    fullName: 'Bob Wilson',
    joinDate: '2024-02-15',
    isActive: true,
    level: 1,
    earnings: 320.75,
    directReferrals: 2,
    email: 'bob@example.com'
  },
  {
    id: 'ref3',
    username: 'carol_davis',
    fullName: 'Carol Davis',
    joinDate: '2024-03-01',
    isActive: false,
    level: 1,
    earnings: 180.25,
    directReferrals: 1,
    email: 'carol@example.com'
  },
  {
    id: 'ref4',
    username: 'dave_jones',
    fullName: 'Dave Jones',
    joinDate: '2024-02-20',
    isActive: true,
    level: 2,
    earnings: 125.50,
    directReferrals: 0,
    email: 'dave@example.com',
    sponsor: 'alice_smith'
  },
  {
    id: 'ref5',
    username: 'eve_brown',
    fullName: 'Eve Brown',
    joinDate: '2024-03-15',
    isActive: true,
    level: 2,
    earnings: 95.25,
    directReferrals: 1,
    email: 'eve@example.com',
    sponsor: 'bob_wilson'
  }
];

export const mockEarnings = [
  {
    id: 'earn1',
    source: 'Direct Referral Bonus',
    amount: 50.00,
    date: '2024-07-15',
    from: 'alice_smith',
    level: 1,
    type: 'referral'
  },
  {
    id: 'earn2',
    source: 'Level 2 Commission',
    amount: 25.00,
    date: '2024-07-14',
    from: 'dave_jones',
    level: 2,
    type: 'commission'
  },
  {
    id: 'earn3',
    source: 'Direct Referral Bonus',
    amount: 50.00,
    date: '2024-07-12',
    from: 'bob_wilson',
    level: 1,
    type: 'referral'
  },
  {
    id: 'earn4',
    source: 'Level 3 Commission',
    amount: 15.00,
    date: '2024-07-10',
    from: 'eve_brown',
    level: 3,
    type: 'commission'
  },
  {
    id: 'earn5',
    source: 'Direct Referral Bonus',
    amount: 50.00,
    date: '2024-07-08',
    from: 'carol_davis',
    level: 1,
    type: 'referral'
  }
];

export const mockWithdrawals = [
  {
    id: 'withdraw1',
    amount: 250.00,
    method: 'Bank Transfer',
    status: 'Completed',
    date: '2024-07-01',
    processedDate: '2024-07-03',
    fee: 2.50,
    details: 'Chase Bank ****6789'
  },
  {
    id: 'withdraw2',
    amount: 150.00,
    method: 'PayPal',
    status: 'Pending',
    date: '2024-07-10',
    fee: 1.50,
    details: 'john@example.com'
  },
  {
    id: 'withdraw3',
    amount: 500.00,
    method: 'Cryptocurrency',
    status: 'Completed',
    date: '2024-06-15',
    processedDate: '2024-06-16',
    fee: 5.00,
    details: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
  }
];

export const mockNotifications = [
  {
    id: 'notif1',
    title: 'New Referral!',
    message: 'Alice Smith joined your team',
    date: '2024-07-15',
    type: 'referral',
    read: false
  },
  {
    id: 'notif2',
    title: 'Commission Earned',
    message: 'You earned $25 from level 2 commission',
    date: '2024-07-14',
    type: 'earning',
    read: false
  },
  {
    id: 'notif3',
    title: 'Withdrawal Processed',
    message: 'Your withdrawal of $250 has been completed',
    date: '2024-07-03',
    type: 'withdrawal',
    read: true
  }
];

export const mockAdminStats = {
  totalUsers: 1247,
  activeUsers: 987,
  totalEarnings: 125840.50,
  totalWithdrawals: 89650.25,
  pendingWithdrawals: 12450.75,
  todayJoins: 15,
  todayEarnings: 3245.80
};

export const mockAdminUsers = [
  {
    id: 'admin_user1',
    username: 'alice_smith',
    fullName: 'Alice Smith',
    email: 'alice@example.com',
    joinDate: '2024-02-01',
    isActive: true,
    totalEarnings: 1250.75,
    currentBalance: 850.25,
    directReferrals: 8,
    totalTeamSize: 25,
    rank: 'Gold',
    status: 'Active'
  },
  {
    id: 'admin_user2',
    username: 'bob_wilson',
    fullName: 'Bob Wilson',
    email: 'bob@example.com',
    joinDate: '2024-02-15',
    isActive: true,
    totalEarnings: 890.50,
    currentBalance: 640.75,
    directReferrals: 5,
    totalTeamSize: 15,
    rank: 'Silver',
    status: 'Active'
  },
  {
    id: 'admin_user3',
    username: 'carol_davis',
    fullName: 'Carol Davis',
    email: 'carol@example.com',
    joinDate: '2024-03-01',
    isActive: false,
    totalEarnings: 320.25,
    currentBalance: 180.00,
    directReferrals: 2,
    totalTeamSize: 5,
    rank: 'Bronze',
    status: 'Inactive'
  }
];

// Commission rates for different levels
export const commissionRates = {
  level1: 0.10, // 10%
  level2: 0.05, // 5%
  level3: 0.03, // 3%
  level4: 0.02, // 2%
  level5: 0.01  // 1%
};

// System settings
export const systemSettings = {
  joiningFee: 25.00,
  minimumWithdrawal: 50.00,
  withdrawalFee: {
    bank: 2.50,
    paypal: 1.50,
    crypto: 5.00
  },
  maxWithdrawalPerDay: 1000.00
};
