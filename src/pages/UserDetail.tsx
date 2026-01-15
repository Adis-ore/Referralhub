import { useParams, useNavigate } from 'react-router-dom';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { AuditInfo } from '@/components/ui/audit-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaArrowLeft as ArrowLeft, FaEnvelope as Mail, FaMapMarkerAlt as MapPin, FaBriefcase as Briefcase, FaCalendar as Calendar, FaGift as Gift, FaCoins as Coins, FaClock as Clock, FaEdit as Edit, FaBan as Ban } from 'react-icons/fa';

const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  phone: '+61 412 345 678',
  classification: 'Registered Nurse',
  location: 'Sydney',
  department: 'Aged Care',
  employeeId: 'EMP-2847',
  joinedDate: '2024-01-15',
  status: 'active' as const,
  referrer: { name: 'Michael Chen', id: '2' },
  referralsMade: 8,
  totalPoints: 4000,
  availablePoints: 2500,
  pendingPoints: 500,
  withdrawnPoints: 1000,
  lastUpdated: '2024-06-15 14:30',
  updatedBy: 'System Sync',
};

const referrals = [
  { id: '1', name: 'Emma Williams', date: '2024-05-20', status: 'completed', points: 500 },
  { id: '2', name: 'James Park', date: '2024-04-15', status: 'completed', points: 500 },
  { id: '3', name: 'Alex Thompson', date: '2024-06-01', status: 'pending', points: 0 },
];

const pointsHistory = [
  { id: '1', type: 'earned', amount: 500, description: 'Referral bonus - Emma Williams', date: '2024-05-25' },
  { id: '2', type: 'earned', amount: 500, description: 'Referral bonus - James Park', date: '2024-04-20' },
  { id: '3', type: 'withdrawn', amount: -1000, description: 'Withdrawal request #WR-1234', date: '2024-04-01' },
  { id: '4', type: 'pending', amount: 500, description: 'Pending - Alex Thompson (probation)', date: '2024-06-01' },
];

const withdrawalHistory = [
  { id: 'WR-1234', amount: 1000, status: 'paid', requestedDate: '2024-03-28', paidDate: '2024-04-01' },
  { id: 'WR-1189', amount: 500, status: 'paid', requestedDate: '2024-02-15', paidDate: '2024-02-20' },
];

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <AdminHeader title="User Details" subtitle={`User ID: ${mockUser.employeeId}`} />

      <div className="p-6 space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/users')} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Button>

        {/* Profile Header */}
        <div className="audit-card">
          <div className="audit-card-body">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold">{mockUser.name}</h2>
                    <StatusBadge status={mockUser.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {mockUser.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {mockUser.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      {mockUser.classification}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Joined {mockUser.joinedDate}
                    </div>
                  </div>
                  {mockUser.referrer && (
                    <div className="mt-3 flex items-center gap-2">
                      <Gift className="w-4 h-4 text-accent" />
                      <span className="text-sm">
                        Referred by{' '}
                        <button className="text-accent hover:underline">
                          {mockUser.referrer.name}
                        </button>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  <Ban className="w-4 h-4 mr-2" />
                  Deactivate
                </Button>
              </div>
            </div>
          </div>
          <div className="audit-card-footer">
            <AuditInfo
              updatedAt={mockUser.lastUpdated}
              updatedBy={mockUser.updatedBy}
              onViewHistory={() => {}}
            />
          </div>
        </div>

        {/* Points Summary */}
        <div className="grid grid-cols-4 gap-4">
          <div className="kpi-card before:bg-accent">
            <p className="text-sm text-muted-foreground">Total Points</p>
            <p className="text-2xl font-semibold mt-1">{mockUser.totalPoints.toLocaleString()}</p>
          </div>
          <div className="kpi-card before:bg-success">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-2xl font-semibold mt-1">{mockUser.availablePoints.toLocaleString()}</p>
          </div>
          <div className="kpi-card before:bg-warning">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-semibold mt-1">{mockUser.pendingPoints.toLocaleString()}</p>
          </div>
          <div className="kpi-card before:bg-info">
            <p className="text-sm text-muted-foreground">Withdrawn</p>
            <p className="text-2xl font-semibold mt-1">{mockUser.withdrawnPoints.toLocaleString()}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="referrals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="referrals">Referrals ({referrals.length})</TabsTrigger>
            <TabsTrigger value="points">Points History</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="referrals">
            <div className="audit-card">
              <div className="audit-card-header">
                <h3 className="font-semibold">Referrals Made</h3>
              </div>
              <div className="divide-y divide-border">
                {referrals.map((ref) => (
                  <div key={ref.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-accent/10 text-accent">
                          {ref.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{ref.name}</p>
                        <p className="text-sm text-muted-foreground">Referred on {ref.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={ref.status === 'completed' ? 'approved' : 'pending'} label={ref.status} />
                      {ref.points > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Coins className="w-4 h-4 text-warning" />
                          <span className="font-medium">+{ref.points}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="points">
            <div className="audit-card">
              <div className="audit-card-header">
                <h3 className="font-semibold">Points History</h3>
              </div>
              <div className="divide-y divide-border">
                {pointsHistory.map((item) => (
                  <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'earned' ? 'bg-success/10 text-success' :
                        item.type === 'withdrawn' ? 'bg-info/10 text-info' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {item.type === 'earned' ? <Coins className="w-4 h-4" /> :
                         item.type === 'withdrawn' ? <Clock className="w-4 h-4" /> :
                         <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      item.amount > 0 ? 'text-success' : item.amount < 0 ? 'text-foreground' : 'text-warning'
                    }`}>
                      {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="withdrawals">
            <div className="audit-card">
              <div className="audit-card-header">
                <h3 className="font-semibold">Withdrawal History</h3>
              </div>
              <div className="divide-y divide-border">
                {withdrawalHistory.map((item) => (
                  <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Withdrawal #{item.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Requested: {item.requestedDate} • Paid: {item.paidDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={item.status as any} />
                      <span className="font-semibold">${item.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
