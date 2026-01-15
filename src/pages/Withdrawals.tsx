import { useState } from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { DataTable } from '@/components/ui/data-table';
import { FilterBar } from '@/components/ui/filter-bar';
import { StatusBadge } from '@/components/ui/status-badge';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  FaDownload as Download,
  FaCheck as Check,
  FaTimes as X,
  FaEye as Eye,
  FaFileAlt as FileText,
  FaDollarSign as DollarSign,
  FaCoins as Coins,
  FaArrowRight as ArrowRight,
  FaLock as Lock,
  FaChartLine as TrendingUp,
  FaChartLine as TrendingDown,
  FaExclamationTriangle as AlertTriangle,
  FaInfoCircle as Info
} from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  pointsWithdrawn: number;
  conversionRate: number;
  currencySymbol: string;
  currencyCode: string;
  finalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'processing';
  requestedDate: string;
  processedDate?: string;
  processedBy?: string;
  note?: string;
}

// Current active rate for comparison
const currentActiveRate = {
  pointsPerUnit: 2,
  currencySymbol: '$',
  currencyCode: 'AUD'
};

const mockWithdrawals: Withdrawal[] = [
  { 
    id: 'WR-2001', 
    userId: '1', 
    userName: 'Sarah Johnson', 
    userEmail: 'sarah.j@email.com', 
    pointsWithdrawn: 500, 
    conversionRate: 2, 
    currencySymbol: '$',
    currencyCode: 'AUD',
    finalAmount: 250, 
    status: 'pending', 
    requestedDate: '2024-06-15' 
  },
  { 
    id: 'WR-2002', 
    userId: '2', 
    userName: 'Michael Chen', 
    userEmail: 'michael.c@email.com', 
    pointsWithdrawn: 1000, 
    conversionRate: 2, 
    currencySymbol: '$',
    currencyCode: 'AUD',
    finalAmount: 500, 
    status: 'pending', 
    requestedDate: '2024-06-14' 
  },
  { 
    id: 'WR-2003', 
    userId: '3', 
    userName: 'Emma Williams', 
    userEmail: 'emma.w@email.com', 
    pointsWithdrawn: 750, 
    conversionRate: 2, 
    currencySymbol: '$',
    currencyCode: 'AUD',
    finalAmount: 375, 
    status: 'approved', 
    requestedDate: '2024-06-12', 
    processedDate: '2024-06-13', 
    processedBy: 'Finance Admin' 
  },
  { 
    id: 'WR-2004', 
    userId: '4', 
    userName: 'James Park', 
    userEmail: 'james.p@email.com', 
    pointsWithdrawn: 250, 
    conversionRate: 2, 
    currencySymbol: '$',
    currencyCode: 'AUD',
    finalAmount: 125, 
    status: 'processing', 
    requestedDate: '2024-06-10', 
    processedDate: '2024-06-11', 
    processedBy: 'Finance Admin' 
  },
  { 
    id: 'WR-2005', 
    userId: '5', 
    userName: 'Lisa Garcia', 
    userEmail: 'lisa.g@email.com', 
    pointsWithdrawn: 1500, 
    conversionRate: 2, 
    currencySymbol: '$',
    currencyCode: 'AUD',
    finalAmount: 750, 
    status: 'paid', 
    requestedDate: '2024-06-05', 
    processedDate: '2024-06-08', 
    processedBy: 'Finance Admin' 
  },
  { 
    id: 'WR-2006', 
    userId: '6', 
    userName: 'David Kim', 
    userEmail: 'david.k@email.com', 
    pointsWithdrawn: 250, 
    conversionRate: 2.5, // Historical rate - different from current
    currencySymbol: '$',
    currencyCode: 'AUD',
    finalAmount: 100, 
    status: 'rejected', 
    requestedDate: '2024-06-01', 
    processedDate: '2024-06-02', 
    processedBy: 'Finance Admin', 
    note: 'Insufficient hours worked' 
  },
];

export default function Withdrawals() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('pending');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [modalType, setModalType] = useState<'approve' | 'reject' | 'pay' | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const canManage = user?.role === 'super_admin' || user?.role === 'finance_admin';

  const getFilteredWithdrawals = () => {
    return mockWithdrawals.filter(w => {
      const matchesSearch = w.userName.toLowerCase().includes(search.toLowerCase()) ||
        w.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
      const matchesTab = activeTab === 'all' ||
        (activeTab === 'pending' && w.status === 'pending') ||
        (activeTab === 'processing' && (w.status === 'approved' || w.status === 'processing')) ||
        (activeTab === 'completed' && (w.status === 'paid' || w.status === 'rejected'));
      return matchesSearch && matchesStatus && matchesTab;
    });
  };

  const pendingCount = mockWithdrawals.filter(w => w.status === 'pending').length;
  const processingCount = mockWithdrawals.filter(w => w.status === 'approved' || w.status === 'processing').length;
  const completedCount = mockWithdrawals.filter(w => w.status === 'paid' || w.status === 'rejected').length;
  
  // Calculate totals
  const pendingAmount = mockWithdrawals.filter(w => w.status === 'pending').reduce((a, b) => a + b.finalAmount, 0);
  const processingAmount = mockWithdrawals.filter(w => w.status === 'approved' || w.status === 'processing').reduce((a, b) => a + b.finalAmount, 0);
  const paidAmount = mockWithdrawals.filter(w => w.status === 'paid').reduce((a, b) => a + b.finalAmount, 0);

  // Check if rate differs from current
  const getRateDifference = (w: Withdrawal) => {
    if (w.conversionRate === currentActiveRate.pointsPerUnit) return null;
    const currentValue = w.pointsWithdrawn / currentActiveRate.pointsPerUnit;
    const lockedValue = w.finalAmount;
    return currentValue - lockedValue;
  };

  const columns = [
    {
      key: 'id',
      header: 'Request ID',
      render: (w: Withdrawal) => (
        <span className="font-mono text-sm">{w.id}</span>
      ),
    },
    {
      key: 'user',
      header: 'User',
      render: (w: Withdrawal) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {w.userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{w.userName}</p>
            <p className="text-xs text-muted-foreground">{w.userEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'points',
      header: 'Points',
      render: (w: Withdrawal) => (
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{w.pointsWithdrawn.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'rate',
      header: 'Rate Used',
      render: (w: Withdrawal) => {
        const diff = getRateDifference(w);
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <Lock className="w-3 h-3 text-muted-foreground" />
              <span>{w.conversionRate} pts = {w.currencySymbol}1</span>
            </div>
            {diff !== null && (
              <div className={cn(
                "flex items-center gap-1 text-xs",
                diff > 0 ? "text-destructive" : "text-success"
              )}>
                {diff > 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                <span>
                  {diff > 0 ? '+' : ''}{w.currencySymbol}{Math.abs(diff).toFixed(2)} vs current
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'amount',
      header: 'Final Amount',
      render: (w: Withdrawal) => (
        <div>
          <span className="font-semibold text-primary">{w.currencySymbol}{w.finalAmount.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground ml-1">{w.currencyCode}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (w: Withdrawal) => <StatusBadge status={w.status} />,
    },
    {
      key: 'requestedDate',
      header: 'Requested',
    },
    {
      key: 'actions',
      header: '',
      render: (w: Withdrawal) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedWithdrawal(w);
              setShowDetails(true);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {canManage && w.status === 'pending' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-success hover:text-success"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWithdrawal(w);
                  setModalType('approve');
                }}
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWithdrawal(w);
                  setModalType('reject');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
          {canManage && w.status === 'approved' && (
            <Button
              variant="ghost"
              size="sm"
              className="text-accent hover:text-accent"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWithdrawal(w);
                setModalType('pay');
              }}
            >
              <DollarSign className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Withdrawals & Payouts"
        subtitle="Process and track withdrawal requests"
      />

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-5 gap-4">
          <div className="kpi-card before:bg-warning">
            <p className="text-sm text-muted-foreground">Pending Requests</p>
            <p className="text-2xl font-semibold mt-1">{pendingCount}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {currentActiveRate.currencySymbol}{pendingAmount.toLocaleString()} {currentActiveRate.currencyCode}
            </p>
          </div>
          <div className="kpi-card before:bg-info">
            <p className="text-sm text-muted-foreground">Processing</p>
            <p className="text-2xl font-semibold mt-1">{processingCount}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {currentActiveRate.currencySymbol}{processingAmount.toLocaleString()} {currentActiveRate.currencyCode}
            </p>
          </div>
          <div className="kpi-card before:bg-success">
            <p className="text-sm text-muted-foreground">Paid This Month</p>
            <p className="text-2xl font-semibold mt-1">
              {currentActiveRate.currencySymbol}{paidAmount.toLocaleString()}
            </p>
          </div>
          <div className="kpi-card before:bg-accent">
            <p className="text-sm text-muted-foreground">Total Processed</p>
            <p className="text-2xl font-semibold mt-1">{completedCount}</p>
          </div>
          <div className="kpi-card before:bg-primary">
            <p className="text-sm text-muted-foreground">Current Rate</p>
            <p className="text-2xl font-semibold mt-1">{currentActiveRate.pointsPerUnit} pts</p>
            <p className="text-sm text-muted-foreground mt-1">
              = {currentActiveRate.currencySymbol}1.00 {currentActiveRate.currencyCode}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({pendingCount})
              </TabsTrigger>
              <TabsTrigger value="processing">
                Processing ({processingCount})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedCount})
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            {/* Filters */}
            <FilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search by ID or user..."
              onClearFilters={() => {
                setSearch('');
                setStatusFilter('all');
              }}
            >
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </FilterBar>

            {/* Table */}
            <DataTable
              columns={columns}
              data={getFilteredWithdrawals()}
              keyExtractor={(w) => w.id}
              pagination={{
                page,
                pageSize,
                total: getFilteredWithdrawals().length,
                onPageChange: setPage,
                onPageSizeChange: setPageSize,
              }}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Details Sheet */}
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Withdrawal Details</SheetTitle>
            <SheetDescription>
              Request {selectedWithdrawal?.id}
            </SheetDescription>
          </SheetHeader>
          
          {selectedWithdrawal && (
            <div className="mt-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedWithdrawal.userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedWithdrawal.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.userEmail}</p>
                </div>
                <StatusBadge status={selectedWithdrawal.status} className="ml-auto" />
              </div>

              {/* Conversion Details */}
              <div className="p-4 rounded-xl bg-muted/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Points Withdrawn</span>
                  </div>
                  <span className="text-xl font-bold">{selectedWithdrawal.pointsWithdrawn.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-center gap-3 py-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Final Amount</span>
                  </div>
                  <span className="text-xl font-bold text-primary">
                    {selectedWithdrawal.currencySymbol}{selectedWithdrawal.finalAmount.toFixed(2)} {selectedWithdrawal.currencyCode}
                  </span>
                </div>
              </div>

              {/* Rate Information */}
              <div className="p-4 rounded-xl border border-border space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  <span>Locked Conversion Rate</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rate at Request</span>
                  <span className="font-medium">
                    {selectedWithdrawal.conversionRate} pts = {selectedWithdrawal.currencySymbol}1.00
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Active Rate</span>
                  <span className="font-medium">
                    {currentActiveRate.pointsPerUnit} pts = {currentActiveRate.currencySymbol}1.00
                  </span>
                </div>
                
                {getRateDifference(selectedWithdrawal) !== null && (
                  <div className={cn(
                    "p-3 rounded-lg flex items-start gap-2",
                    getRateDifference(selectedWithdrawal)! > 0 
                      ? "bg-destructive/5 border border-destructive/20" 
                      : "bg-success/5 border border-success/20"
                  )}>
                    {getRateDifference(selectedWithdrawal)! > 0 ? (
                      <TrendingDown className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    )}
                    <div className="text-sm">
                      <p className={cn(
                        "font-medium",
                        getRateDifference(selectedWithdrawal)! > 0 ? "text-destructive" : "text-success"
                      )}>
                        {getRateDifference(selectedWithdrawal)! > 0 
                          ? `User received ${selectedWithdrawal.currencySymbol}${Math.abs(getRateDifference(selectedWithdrawal)!).toFixed(2)} more than current rate`
                          : `User received ${selectedWithdrawal.currencySymbol}${Math.abs(getRateDifference(selectedWithdrawal)!).toFixed(2)} less than current rate`
                        }
                      </p>
                      <p className="text-muted-foreground mt-1">
                        Rate was locked at time of request
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Timeline</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Requested</span>
                    <span>{selectedWithdrawal.requestedDate}</span>
                  </div>
                  {selectedWithdrawal.processedDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processed</span>
                      <span>{selectedWithdrawal.processedDate}</span>
                    </div>
                  )}
                  {selectedWithdrawal.processedBy && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processed By</span>
                      <span>{selectedWithdrawal.processedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedWithdrawal.note && (
                <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <p className="text-sm font-medium mb-1">Note</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.note}</p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Approval Modal */}
      <ConfirmationModal
        open={modalType === 'approve'}
        onOpenChange={(open) => !open && setModalType(null)}
        title="Approve Withdrawal"
        description=""
        confirmText="Approve"
        variant="success"
        onConfirm={() => setModalType(null)}
      >
        {selectedWithdrawal && (
          <div className="py-4 space-y-4">
            <p className="text-muted-foreground">
              Are you sure you want to approve this withdrawal request?
            </p>
            <div className="p-4 rounded-lg bg-muted/30 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Request ID</span>
                <span className="font-mono">{selectedWithdrawal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Points</span>
                <span>{selectedWithdrawal.pointsWithdrawn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Locked Rate</span>
                <span>{selectedWithdrawal.conversionRate} pts = {selectedWithdrawal.currencySymbol}1.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Amount to Pay</span>
                <span className="text-primary">{selectedWithdrawal.currencySymbol}{selectedWithdrawal.finalAmount.toFixed(2)} {selectedWithdrawal.currencyCode}</span>
              </div>
            </div>
          </div>
        )}
      </ConfirmationModal>

      {/* Rejection Modal */}
      <ConfirmationModal
        open={modalType === 'reject'}
        onOpenChange={(open) => !open && setModalType(null)}
        title="Reject Withdrawal"
        description={`Are you sure you want to reject the withdrawal request ${selectedWithdrawal?.id}? Points will be returned to the user's balance. You must provide a reason.`}
        confirmText="Reject"
        variant="destructive"
        onConfirm={() => setModalType(null)}
      />

      {/* Pay Modal */}
      <ConfirmationModal
        open={modalType === 'pay'}
        onOpenChange={(open) => !open && setModalType(null)}
        title="Confirm Payment"
        description=""
        confirmText="Confirm Payment"
        variant="success"
        onConfirm={() => setModalType(null)}
      >
        {selectedWithdrawal && (
          <div className="py-4 space-y-4">
            <div className="p-3 rounded-lg bg-warning/5 border border-warning/20 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Confirm that payment has been made. This action cannot be undone.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Request ID</span>
                <span className="font-mono">{selectedWithdrawal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User</span>
                <span>{selectedWithdrawal.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate Used</span>
                <span>{selectedWithdrawal.conversionRate} pts = {selectedWithdrawal.currencySymbol}1.00</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t">
                <span>Amount Paid</span>
                <span className="text-success">{selectedWithdrawal.currencySymbol}{selectedWithdrawal.finalAmount.toFixed(2)} {selectedWithdrawal.currencyCode}</span>
              </div>
            </div>
          </div>
        )}
      </ConfirmationModal>
    </div>
  );
}
