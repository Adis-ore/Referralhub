import { useState } from 'react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuditInfo } from '@/components/ui/audit-info';
import { StatusBadge } from '@/components/ui/status-badge';
import { DataTable } from '@/components/ui/data-table';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import {
  FaDollarSign,
  FaChartLine,
  FaPlus,
  FaCalendar,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaInfoCircle,
  FaArrowRight
} from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { cn } from '@/lib/utils';

interface ConversionRate {
  id: string;
  pointsPerUnit: number;
  currencyCode: string;
  currencySymbol: string;
  effectiveFrom: string;
  effectiveTo?: string;
  status: 'active' | 'scheduled' | 'expired';
  createdBy: string;
  createdAt: string;
}

const mockRates: ConversionRate[] = [
  { 
    id: 'CR-001', 
    pointsPerUnit: 2, 
    currencyCode: 'AUD', 
    currencySymbol: '$',
    effectiveFrom: '2024-01-01', 
    status: 'active',
    createdBy: 'Sarah Chen',
    createdAt: '2023-12-15 09:00'
  },
  { 
    id: 'CR-002', 
    pointsPerUnit: 1.5, 
    currencyCode: 'AUD', 
    currencySymbol: '$',
    effectiveFrom: '2024-07-01', 
    status: 'scheduled',
    createdBy: 'Michael Torres',
    createdAt: '2024-06-10 14:30'
  },
  { 
    id: 'CR-003', 
    pointsPerUnit: 2.5, 
    currencyCode: 'AUD', 
    currencySymbol: '$',
    effectiveFrom: '2023-06-01', 
    effectiveTo: '2023-12-31',
    status: 'expired',
    createdBy: 'Sarah Chen',
    createdAt: '2023-05-20 11:00'
  },
];

const currencies = [
  { code: 'AUD', name: 'Australian Dollar', symbol: '$' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: '$' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
];

export default function PointsConfiguration() {
  const [activeTab, setActiveTab] = useState('current');
  const [showNewRate, setShowNewRate] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);
  
  // New rate form
  const [newCurrency, setNewCurrency] = useState('AUD');
  const [newPointsPerUnit, setNewPointsPerUnit] = useState('2');
  const [newEffectiveDate, setNewEffectiveDate] = useState('');

  const activeRate = mockRates.find(r => r.status === 'active');
  const scheduledRate = mockRates.find(r => r.status === 'scheduled');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <FaCheck className="w-4 h-4" />;
      case 'scheduled': return <FaClock className="w-4 h-4" />;
      default: return <FaHistory className="w-4 h-4" />;
    }
  };

  const historyColumns = [
    {
      key: 'id',
      header: 'Rate ID',
      render: (r: ConversionRate) => <span className="font-mono text-sm">{r.id}</span>,
    },
    {
      key: 'rate',
      header: 'Conversion Rate',
      render: (r: ConversionRate) => (
        <span className="font-medium">{r.pointsPerUnit} pts = {r.currencySymbol}1.00</span>
      ),
    },
    {
      key: 'currency',
      header: 'Currency',
      render: (r: ConversionRate) => r.currencyCode,
    },
    {
      key: 'effectiveFrom',
      header: 'Effective From',
    },
    {
      key: 'effectiveTo',
      header: 'Effective To',
      render: (r: ConversionRate) => r.effectiveTo || '—',
    },
    {
      key: 'status',
      header: 'Status',
      render: (r: ConversionRate) => <StatusBadge status={r.status} />,
    },
    {
      key: 'createdBy',
      header: 'Created By',
    },
  ];

  const selectedCurrency = currencies.find(c => c.code === newCurrency);
  const previewValue = parseFloat(newPointsPerUnit) || 0;

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Points & Currency Configuration"
        subtitle="Manage conversion rates and currency settings"
      />

      <div className="p-6 space-y-6">
        {/* Current Rate Overview */}
        <div className="grid grid-cols-3 gap-6">
          {/* Active Rate Card */}
          <div className="audit-card">
            <div className="audit-card-header">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <FaCheck className="w-4 h-4 text-success" />
                </div>
                <h3 className="font-semibold">Active Rate</h3>
              </div>
              <StatusBadge status="active" />
            </div>
            <div className="audit-card-body">
              {activeRate ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-foreground">
                      {activeRate.pointsPerUnit}
                    </div>
                    <div className="text-muted-foreground">
                      <div className="text-sm">points per</div>
                      <div className="text-lg font-medium">{activeRate.currencySymbol}1.00 {activeRate.currencyCode}</div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GiTwoCoins className="w-4 h-4" />
                      <span>1 point = {activeRate.currencySymbol}{(1 / activeRate.pointsPerUnit).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <span>Effective since </span>
                    <span className="font-medium text-foreground">{activeRate.effectiveFrom}</span>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No active rate configured</p>
              )}
            </div>
            {activeRate && (
              <div className="audit-card-footer">
                <AuditInfo
                  updatedAt={activeRate.createdAt}
                  updatedBy={activeRate.createdBy}
                  onViewHistory={() => setActiveTab('history')}
                />
              </div>
            )}
          </div>

          {/* Scheduled Rate Card */}
          <div className="audit-card">
            <div className="audit-card-header">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
                  <FaClock className="w-4 h-4 text-info" />
                </div>
                <h3 className="font-semibold">Scheduled Rate</h3>
              </div>
              {scheduledRate && <StatusBadge status="scheduled" />}
            </div>
            <div className="audit-card-body">
              {scheduledRate ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-foreground">
                      {scheduledRate.pointsPerUnit}
                    </div>
                    <div className="text-muted-foreground">
                      <div className="text-sm">points per</div>
                      <div className="text-lg font-medium">{scheduledRate.currencySymbol}1.00 {scheduledRate.currencyCode}</div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-info/5 border border-info/20">
                    <div className="flex items-center gap-2 text-sm text-info">
                      <FaCalendar className="w-4 h-4" />
                      <span>Activates on {scheduledRate.effectiveFrom}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setShowDeactivate(true)}
                  >
                    Cancel Scheduled Rate
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No scheduled rate</p>
                  <Button variant="outline" size="sm" onClick={() => setShowNewRate(true)}>
                    <FaPlus className="w-4 h-4 mr-2" />
                    Schedule New Rate
                  </Button>
                </div>
              )}
            </div>
            {scheduledRate && (
              <div className="audit-card-footer">
                <AuditInfo
                  updatedAt={scheduledRate.createdAt}
                  updatedBy={scheduledRate.createdBy}
                  onViewHistory={() => setActiveTab('history')}
                />
              </div>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="audit-card">
            <div className="audit-card-header">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FaChartLine className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-semibold">Rate Impact</h3>
              </div>
            </div>
            <div className="audit-card-body space-y-4">
              {activeRate && scheduledRate && (
                <>
                  <div className="p-3 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Value Change</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium">{activeRate.currencySymbol}{(1 / activeRate.pointsPerUnit).toFixed(2)}</span>
                      <FaArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className={cn(
                        "text-lg font-medium",
                        scheduledRate.pointsPerUnit < activeRate.pointsPerUnit ? "text-success" : "text-destructive"
                      )}>
                        {scheduledRate.currencySymbol}{(1 / scheduledRate.pointsPerUnit).toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">per point</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="flex gap-2">
                      <FaExclamationTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Staff withdrawals will use the rate active at the time of request. 
                        Pending withdrawals are not affected by rate changes.
                      </p>
                    </div>
                  </div>
                </>
              )}

              <Button className="w-full" onClick={() => setShowNewRate(true)}>
                <FaPlus className="w-4 h-4 mr-2" />
                Create New Rate
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs for History */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="current">
              <FaDollarSign className="w-4 h-4 mr-2" />
              Currency Settings
            </TabsTrigger>
            <TabsTrigger value="history">
              <FaHistory className="w-4 h-4 mr-2" />
              Rate History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-6">
            <div className="audit-card">
              <div className="audit-card-header">
                <h3 className="font-semibold">Currency Configuration</h3>
              </div>
              <div className="audit-card-body">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Base Currency</Label>
                    <Select defaultValue="AUD">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      All point values and payouts use this currency
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Minimum Withdrawal (Points)</Label>
                    <Input type="number" defaultValue="100" />
                    <p className="text-xs text-muted-foreground">
                      Staff must have at least this many points to withdraw
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Rounding Rule</Label>
                    <Select defaultValue="down">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="up">Round Up</SelectItem>
                        <SelectItem value="down">Round Down</SelectItem>
                        <SelectItem value="nearest">Round to Nearest</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Applied when converting points to currency
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Decimal Places</Label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 (Whole numbers)</SelectItem>
                        <SelectItem value="2">2 (Standard)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="audit-card-footer">
                <AuditInfo
                  updatedAt="2024-06-10 09:15"
                  updatedBy="Sarah Chen"
                  onViewHistory={() => setActiveTab('history')}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="audit-card">
              <div className="audit-card-header">
                <h3 className="font-semibold">Conversion Rate History</h3>
                <p className="text-sm text-muted-foreground">
                  Historical record of all conversion rates (read-only)
                </p>
              </div>
              <div className="audit-card-body p-0">
                <DataTable
                  columns={historyColumns}
                  data={mockRates}
                  keyExtractor={(r) => r.id}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Rate Modal */}
      <ConfirmationModal
        open={showNewRate}
        onOpenChange={setShowNewRate}
        title="Create New Conversion Rate"
        description=""
        confirmText="Schedule Rate"
        variant="success"
        onConfirm={() => setShowNewRate(false)}
      >
        <div className="space-y-6 py-4">
          <div className="p-4 rounded-lg bg-info/5 border border-info/20">
            <div className="flex gap-2">
              <FaInfoCircle className="w-4 h-4 text-info shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                New rates will apply to all withdrawals requested after the effective date. 
                Existing pending withdrawals will use their original locked rate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={newCurrency} onValueChange={setNewCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Effective Date</Label>
              <Input 
                type="date" 
                value={newEffectiveDate}
                onChange={(e) => setNewEffectiveDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Conversion Rate</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={newPointsPerUnit}
                onChange={(e) => setNewPointsPerUnit(e.target.value)}
                className="w-24"
                min="0.1"
                step="0.1"
              />
              <span className="text-muted-foreground">points = {selectedCurrency?.symbol}1.00</span>
            </div>
          </div>

          {previewValue > 0 && (
            <div className="p-4 rounded-lg bg-muted/30 space-y-2">
              <p className="text-sm font-medium">Preview</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">1 point = </span>
                  <span className="font-medium">{selectedCurrency?.symbol}{(1 / previewValue).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">100 points = </span>
                  <span className="font-medium">{selectedCurrency?.symbol}{(100 / previewValue).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">500 points = </span>
                  <span className="font-medium">{selectedCurrency?.symbol}{(500 / previewValue).toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">1000 points = </span>
                  <span className="font-medium">{selectedCurrency?.symbol}{(1000 / previewValue).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ConfirmationModal>

      {/* Deactivate Modal */}
      <ConfirmationModal
        open={showDeactivate}
        onOpenChange={setShowDeactivate}
        title="Cancel Scheduled Rate"
        description="Are you sure you want to cancel the scheduled rate change? The current active rate will remain in effect."
        confirmText="Cancel Rate"
        variant="destructive"
        onConfirm={() => setShowDeactivate(false)}
      />
    </div>
  );
}
