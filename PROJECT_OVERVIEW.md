# ReferralHub - Complete Project Overview

## What Is This Project?

ReferralHub is a staff referral bonus management system with two portals:
- **Admin Portal** - For managers/admins to manage users, approve referrals, process withdrawals, configure points
- **Staff Portal** - For employees to track their referrals, view points, request withdrawals

Built with React 18 + TypeScript + Tailwind CSS + shadcn/ui components.

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | 5.8.3 | Type safety |
| Vite | 5.4.19 | Build tool |
| Tailwind CSS | 3.4.17 | Styling |
| React Router | 6.30.1 | Routing |
| React Query | 5.83.0 | Server state |
| React Hook Form | 7.61.1 | Form handling |
| Zod | 3.25.76 | Validation |
| Recharts | 2.15.4 | Charts |
| React Icons | 5.5.0 | Icons (Font Awesome) |
| Radix UI | Various | Accessible UI primitives |
| date-fns | 3.6.0 | Date formatting |

---

## Folder Structure

```
src/
├── App.tsx                          # Root component, all routes, route protection
├── main.tsx                         # Entry point, renders App into DOM
├── index.css                        # Tailwind directives, custom CSS variables, themes
├── App.css                          # Minimal legacy styles
│
├── contexts/                        # React Context providers (global state)
│   ├── AuthContext.tsx               # Admin authentication (login, logout, role switching)
│   └── StaffAuthContext.tsx          # Staff authentication (login, logout)
│
├── hooks/                           # Custom React hooks
│   ├── useApi.js                    # Wraps all 48 mock API functions
│   ├── use-mobile.tsx               # Detects mobile viewport (<768px)
│   └── use-toast.ts                 # Toast notification state management
│
├── services/                        # API layer
│   └── mockApi.js                   # All 48 mock API endpoint functions
│
├── data/                            # Static/mock data
│   └── mockData.js                  # 50 staff users, 3 admins, referrals, transactions, etc.
│
├── lib/                             # Utilities
│   └── utils.ts                     # cn() function for Tailwind class merging
│
├── pages/                           # Page components (one per route)
│   ├── Index.tsx                    # Landing redirector
│   ├── Login.tsx                    # Admin login page
│   ├── SuperAdminLogin.tsx          # Super Admin restricted login
│   ├── Dashboard.tsx                # Admin dashboard with KPIs and charts
│   ├── Users.tsx                    # User management table
│   ├── UserDetail.tsx               # Individual user profile/detail
│   ├── Referrals.tsx                # Referral management table
│   ├── Withdrawals.tsx              # Withdrawal processing
│   ├── PointsConfiguration.tsx      # Points-to-currency rate management
│   ├── AuditLogs.tsx                # System audit log viewer
│   ├── Reports.tsx                  # Report builder and scheduler
│   ├── Settings.tsx                 # System configuration
│   ├── SuperAdminOverride.tsx       # Break-glass emergency controls
│   ├── NotFound.tsx                 # 404 page
│   └── staff/                       # Staff portal pages
│       ├── StaffLogin.tsx           # Staff login page
│       ├── StaffHome.tsx            # Staff dashboard (points, referral code)
│       ├── StaffReferrals.tsx       # Staff referral tracking
│       ├── StaffPoints.tsx          # Points balance and history
│       ├── StaffWithdrawals.tsx     # Withdrawal requests
│       ├── StaffHours.tsx           # Work hours tracking
│       ├── StaffNotifications.tsx   # Notification center
│       └── StaffProfile.tsx         # Profile, FAQ, support
│
├── components/
│   ├── layout/                      # Admin layout components
│   │   ├── AdminLayout.tsx          # Sidebar + content wrapper, hamburger menu
│   │   ├── AdminSidebar.tsx         # Navigation sidebar with role-based links
│   │   └── AdminHeader.tsx          # Page header with search, notifications
│   │
│   ├── staff/                       # Staff layout and shared components
│   │   ├── StaffLayout.tsx          # Header + bottom nav + content wrapper
│   │   ├── StaffHeader.tsx          # Top bar with notifications
│   │   ├── StaffBottomNav.tsx       # Mobile bottom navigation (7 items)
│   │   ├── ProgressRing.tsx         # Circular SVG progress indicator
│   │   ├── ReferralProgress.tsx     # 4-step referral lifecycle visualization
│   │   └── ReferralStatusBadge.tsx  # Color-coded status badge
│   │
│   ├── dashboard/                   # Admin dashboard sub-components
│   │   ├── ReferralChart.tsx        # Monthly referral trends (Recharts)
│   │   ├── PointsChart.tsx          # Points distribution chart
│   │   └── RecentActivity.tsx       # Activity feed
│   │
│   ├── admin/                       # Admin-specific components
│   │   └── PointsAdjustmentModal.tsx # Manual point adjustment form
│   │
│   ├── NavLink.tsx                  # Styled navigation link with active state
│   │
│   └── ui/                          # shadcn/ui component library (~60 components)
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── sheet.tsx
│       ├── tabs.tsx
│       ├── data-table.tsx
│       ├── dropdown-menu.tsx
│       ├── toast.tsx / toaster.tsx
│       ├── confirmation-modal.tsx
│       ├── kpi-card.tsx
│       ├── status-badge.tsx
│       ├── filter-bar.tsx
│       ├── audit-info.tsx
│       └── ... (50+ more Radix UI wrappers)
```

---

## Authentication System

### Three Separate Login Flows

| Login | Route | Who Can Log In | Redirects To |
|-------|-------|---------------|-------------|
| Admin Login | `/login` | All admin users (any role) | `/dashboard` |
| Super Admin Login | `/superadmin/login` | Only `super_admin` role | `/dashboard` |
| Staff Login | `/staff/login` | All 50 staff users | `/staff` |

### How Auth Works

**Admin Auth** (`src/contexts/AuthContext.tsx`):
- Calls `adminLogin()` from mockApi which validates email + password against `adminUsers` in mockData
- On success: stores user object and JWT token in `localStorage`
- Persists across page refreshes
- Supports role switching (demo mode) via `setUserRole()`
- `logout()` clears localStorage

**Staff Auth** (`src/contexts/StaffAuthContext.tsx`):
- Simulates login with 800ms delay
- Stores user in React state only (no localStorage)
- Lost on page refresh (by design for demo)

### Route Protection

Three wrapper components in `App.tsx`:

```
AdminProtectedRoute     - Checks isAuthenticated, redirects to /login
SuperAdminProtectedRoute - Checks isAuthenticated AND role === 'super_admin'
StaffProtectedRoute     - Checks staff isAuthenticated, redirects to /staff/login
```

### Test Credentials

**Super Admin** (use at `/superadmin/login`):
- admin@company.com / admin123

**Regular Admin** (use at `/login`):
- admin@company.com / admin123 (super_admin role)
- manager@company.com / manager123 (manager role)
- analyst@company.com / analyst123 (analyst role)

**Staff** (use at `/staff/login`):
- Any of 50 users, all with password: password123
- adewale.johnson@company.com / password123
- chioma.okafor@company.com / password123

### Admin Roles & Permissions

| Role | Can Access |
|------|-----------|
| super_admin | Everything + Override page + Settings |
| finance_admin | Dashboard, Users, Referrals, Withdrawals, Points, Reports, Audit |
| operations_admin | Dashboard, Users, Referrals, Shifts, Programs, Notifications, Reports, Audit |
| manager | Dashboard, Users, Referrals, Shifts, Reports, Audit |
| read_only | Dashboard, Users, Referrals, Reports, Audit |

---

## All Routes

### Public Routes (no auth required)
```
/                    -> Index.tsx (redirects based on auth state)
/login               -> Login.tsx (admin login)
/superadmin/login    -> SuperAdminLogin.tsx (super admin only login)
/staff/login         -> StaffLogin.tsx (staff login)
```

### Admin Routes (requires AdminProtectedRoute)
```
/dashboard           -> Dashboard.tsx
/users               -> Users.tsx
/users/:id           -> UserDetail.tsx
/referrals           -> Referrals.tsx
/withdrawals         -> Withdrawals.tsx
/points-config       -> PointsConfiguration.tsx
/reports             -> Reports.tsx
/audit               -> AuditLogs.tsx
/settings            -> Settings.tsx
/override            -> SuperAdminOverride.tsx (requires SuperAdminProtectedRoute)
```

### Staff Routes (requires StaffProtectedRoute)
```
/staff               -> StaffHome.tsx
/staff/referrals     -> StaffReferrals.tsx
/staff/points        -> StaffPoints.tsx
/staff/withdrawals   -> StaffWithdrawals.tsx
/staff/hours         -> StaffHours.tsx
/staff/notifications -> StaffNotifications.tsx
/staff/profile       -> StaffProfile.tsx
```

---

## Page-by-Page Functionality

### ADMIN PAGES

#### Dashboard (`/dashboard`)
- 6 KPI cards: Total Users, Total Referrals, Points Issued, Pending Withdrawals, Approved Payouts, Active Campaigns
- Filter bar: date range, location, classification
- Export Report button
- Referral trends chart (Recharts line/bar)
- Points distribution chart
- Recent activity feed

#### Users (`/users`)
- Table of all 50 staff users
- Columns: name + avatar, classification, location, referrals made/received, points balance, status, actions
- Filters: search box, status (active/inactive/pending), location, classification
- Pagination (page size selector)
- Actions per user: View, Edit, Deactivate
- Download/Export button

#### User Detail (`/users/:id`)
- Profile header: avatar, full name, status badge, email, phone, department, location
- 4 KPI cards: Total Points, Available Points, Pending Points, Withdrawn Points
- 3 tabs: Referrals list, Points History, Withdrawal History
- Edit and Deactivate buttons
- Audit footer: last updated date and admin who updated

#### Referrals (`/referrals`)
- Desktop: data table with columns
- Mobile: card view
- Columns: referee name, referrer, email, phone, status, points awarded, dates, notes
- Status filter: pending, approved, completed, rejected
- Search by name or email
- Detail sheet (slide-out) for individual referral
- Approve/Reject/Complete actions

#### Withdrawals (`/withdrawals`)
- 3 tabs: Request builder, History, Pending
- Summary stats: pending count, approved, processing, paid, rejected
- Withdrawal list with: user name, email, points used, conversion amount, status, dates
- Actions: Approve, Reject (with reason), Process, Complete
- Detail sheet for individual withdrawal

#### Points Configuration (`/points-config`)
- 3 tabs: Current Rate, Scheduled Changes, History
- Current active conversion rate display
- Create new rate form: currency, points per unit, effective date
- Rate history table with status indicators
- Deactivation with confirmation modal

#### Audit Logs (`/audit`)
- Data table of all system actions
- Columns: action type, resource affected, admin who did it, role, timestamp, IP address
- Filters: action type, admin name
- Search across logs
- Detail sheet showing before/after changes

#### Reports (`/reports`)
- 3 tabs: Report Builder, Saved Reports, Scheduled Reports
- 6 report templates: Referrals, Points, Payouts, Users, Campaigns, Audit
- Config options after template selection
- Saved reports list with schedule, last run, download
- Schedule/Run/Edit/Delete actions

#### Settings (`/settings`)
- 4 tabs: General, Currency & Rates, Feature Toggles, Data Retention
- General: timezone, date format, fiscal year start, week start
- Currency: conversion rate configuration
- Features: toggle switches for referral system, withdrawals, etc.
- Data Retention: set how long logs are kept
- Save/Reset buttons with unsaved changes detection

#### Super Admin Override (`/override`)
- Warning banner about audit trail and compliance
- 6 override types:
  1. Force Approve/Reject Withdrawal
  2. Manual Points Adjustment
  3. User Status Override
  4. Campaign Force Activation
  5. Restore Deleted Resource
  6. Bypass Eligibility Rules
- Resource ID input
- Justification textarea (minimum 20 characters)
- Confirmation modal before execution
- Recent overrides history (collapsible on mobile)

### STAFF PAGES

#### Staff Home (`/staff`)
- Welcome message with user name
- Points overview: circular progress ring showing percentage
- Points breakdown: available, pending, withdrawn
- Withdraw button
- Referral code card: code display, copy button, share button
- Recent referrals list (3 latest with status badges)

#### Staff Referrals (`/staff/referrals`)
- Summary cards: Total Referrals count, Points Earned total
- Status tabs: All, Invited, Working, Eligible, Completed
- Referral list: name, email, status, hours completed/required, points
- 4-step progress visualization (Invited -> Working -> Eligible -> Completed)
- Detail sheet for individual referral

#### Staff Points (`/staff/points`)
- Gradient balance card showing total balance
- Breakdown: Total Earned, Pending, Withdrawn
- Transaction tabs: All, Earned, Pending, Withdrawn, Adjusted
- Transaction list: type icon, amount (+/-), description, date, referral name

#### Staff Withdrawals (`/staff/withdrawals`)
- 2 tabs: New Request, History
- Request form: enter points amount, see conversion to cash
- Available balance and min/max limits display
- Confirmation modal before submission
- Success confirmation after submission
- History: withdrawal ID, points, cash amount, status, dates

#### Staff Hours (`/staff/hours`)
- Summary cards: Hours This Month, Average Per Week
- View toggle: Weekly / Monthly
- Weekly: week number, date range, hours worked, status
- Monthly: month name, total hours, trend indicator (up/down)

#### Staff Notifications (`/staff/notifications`)
- Unread count badge
- Mark All as Read button
- Notification list with type-specific icons and colors:
  - Referral notifications (purple)
  - Withdrawal notifications (blue)
  - Points notifications (green)
  - System notifications (orange)
- Mark individual as read on click
- Delete individual notifications
- Relative timestamps ("2 hours ago")

#### Staff Profile (`/staff/profile`)
- Profile card: avatar, name, classification
- Details: email, location, joined date, referral code
- FAQ accordion (6 questions about referrals, points, withdrawals)
- Referral rules list (5 rules)
- Logout button
- Help/Support links

---

## Mock Data Summary

All mock data lives in `src/data/mockData.js`:

| Data | Count | Key Fields |
|------|-------|------------|
| Staff Users | 50 | id, name, email, password, department, position, location, points, referralCode |
| Admin Users | 3 | id, name, email, password, role, permissions |
| Referrals | ~250 | id, userId, referrerName, refereeName, status, points, dates |
| Point Transactions | ~500 | id, userId, type (earned/bonus/deduction/withdrawal), amount, balance |
| Withdrawals | ~120 | id, userId, amount, points, status, bankName, accountNumber |
| Audit Logs | 215 | id, action, resource, adminId, adminName, role, ip, timestamp |
| Notifications | ~150 | id, userId, type, title, message, isRead, timestamp |
| Conversion Rates | 2 | id, rate, effectiveFrom, effectiveTo |
| System Settings | 1 | timezone, currency, features, retentionDays, min/max withdrawal |
| Reports | 3 | id, title, type, schedule, lastRun |
| FAQ | 10 | question, answer |
| Dashboard Stats | 1 | totalUsers, activeUsers, totalReferrals, pendingWithdrawals, etc. |
| Chart Data | 1 | referralsByMonth, withdrawalsByMonth, topPerformers, departmentBreakdown |
| Recent Activity | 10 | type, message, status, timestamp |
| Alerts | 3 | type, title, message, count |

### Staff User Distribution

- **Departments**: Sales (20), Marketing (12), IT (8), HR (5), Operations (5)
- **Locations**: Lagos, Abuja, Port Harcourt
- **Positions**: Junior, Mid-Level, Senior, Lead
- **All passwords**: password123

---

## Mock API - All 48 Endpoints

All functions are in `src/services/mockApi.js`. Each simulates a 100-500ms delay.

### Authentication (7)
| Function | What It Does |
|----------|-------------|
| `adminLogin(email, password)` | Validates against adminUsers, returns user + JWT token |
| `staffLogin(email, password)` | Validates against staffUsers, checks if active |
| `logout(token)` | Removes token from session store |
| `getMe(token)` | Returns user associated with token |
| `refreshToken(oldRefreshToken)` | Generates new token pair |
| `forgotPassword(email)` | Checks if email exists in system |
| `resetPassword(token, newPassword)` | Confirms password reset |

### Admin Dashboard (4)
| Function | What It Does |
|----------|-------------|
| `getAdminDashboardStats()` | Returns KPI numbers (users, referrals, points, etc.) |
| `getAdminDashboardCharts()` | Returns chart data (monthly trends, top performers) |
| `getAdminDashboardRecent()` | Returns latest 10 activity items |
| `getAdminDashboardAlerts()` | Returns 3 system alerts |

### Admin Users (8)
| Function | What It Does |
|----------|-------------|
| `getAdminUsers(filters, pagination)` | List users with search, filter, sort, paginate |
| `getAdminUserById(id)` | Get single user by ID |
| `getAdminUserReferrals(id)` | Get all referrals for a user |
| `getAdminUserPoints(id)` | Get all point transactions for a user |
| `updateAdminUser(id, data)` | Update user fields |
| `deactivateUser(id)` | Set user isActive to false |
| `activateUser(id)` | Set user isActive to true |
| `deleteUser(id)` | Remove user from array |

### Admin Referrals (4)
| Function | What It Does |
|----------|-------------|
| `getAdminReferrals(filters, pagination)` | List referrals with status/search filter |
| `getAdminReferralById(id)` | Get single referral |
| `updateReferralStatus(id, status)` | Change referral status (approve/reject/complete) |
| `getReferralStats()` | Count referrals by status |

### Admin Withdrawals (7)
| Function | What It Does |
|----------|-------------|
| `getAdminWithdrawals(filters, pagination)` | List withdrawals with filters |
| `getAdminWithdrawalById(id)` | Get single withdrawal |
| `approveWithdrawal(id)` | Set status to approved |
| `rejectWithdrawal(id, reason)` | Set status to rejected with reason |
| `processWithdrawal(id)` | Set status to processing |
| `completeWithdrawal(id)` | Set status to completed |
| `getPendingWithdrawalsCount()` | Count pending withdrawals |

### Admin Points (7)
| Function | What It Does |
|----------|-------------|
| `getPointsConfig()` | Get current rate, min/max withdrawal, rate history |
| `updateConversionRate(rate)` | Create new conversion rate |
| `adjustUserPoints(userId, points, reason)` | Add/subtract points with audit trail |
| `getPointsHistory(filters)` | Get point transactions with filters |
| `getPointsTransactions(filters, pagination)` | Paginated point transactions |
| `scheduleRateChange(rate, effectiveDate)` | Schedule future rate change |
| `deleteScheduledRate(id)` | Cancel scheduled rate |

### Admin Audit & Reports (8)
| Function | What It Does |
|----------|-------------|
| `getAuditLogs(filters, pagination)` | List audit logs with filters |
| `getAuditLogById(id)` | Get single audit log entry |
| `createAuditLog(data)` | Create new audit entry |
| `getReports(filters)` | List saved reports |
| `createReport(data)` | Create new report |
| `getReportById(id)` | Get single report |
| `scheduleReport(id, schedule)` | Set report schedule |
| `deleteReport(id)` | Delete a report |

### Admin Settings (6)
| Function | What It Does |
|----------|-------------|
| `getSettings()` | Get all system settings |
| `updateTimezone(timezone)` | Change system timezone |
| `updateCurrency(currency)` | Change system currency |
| `updateFeatures(features)` | Toggle feature flags |
| `updateRetention(days)` | Set data retention period |
| `performOverrideAction(action, data)` | Execute super admin override |

### Staff Dashboard (3)
| Function | What It Does |
|----------|-------------|
| `getStaffDashboard(userId)` | Get user stats, recent referrals, recent transactions |
| `getStaffReferralCode(userId)` | Get user's referral code |
| `regenerateReferralCode(userId)` | Generate new referral code |

### Staff Referrals (4)
| Function | What It Does |
|----------|-------------|
| `getStaffReferrals(userId, filters)` | Get user's referrals with status filter |
| `getStaffReferralById(userId, referralId)` | Get single referral |
| `sendReferralInvite(userId, email)` | Send referral invitation email |
| `getStaffReferralStats(userId)` | Count user's referrals by status |

### Staff Points (3)
| Function | What It Does |
|----------|-------------|
| `getStaffPointsBalance(userId)` | Get points balance and cash value |
| `getStaffPointsHistory(userId, filters)` | Get point transactions |
| `getConversionRate()` | Get current points-to-cash rate |

### Staff Withdrawals (5)
| Function | What It Does |
|----------|-------------|
| `getStaffWithdrawals(userId, filters)` | Get user's withdrawals |
| `createWithdrawal(userId, amount, bankDetails)` | Submit new withdrawal request |
| `getStaffWithdrawalById(userId, withdrawalId)` | Get single withdrawal |
| `cancelWithdrawal(userId, withdrawalId)` | Cancel pending withdrawal |
| `getWithdrawalLimits()` | Get min/max withdrawal amounts |

### Staff Miscellaneous (12)
| Function | What It Does |
|----------|-------------|
| `getStaffHoursSummary(userId)` | Get hours: current month, last month, YTD |
| `getStaffHoursSyncStatus(userId)` | Get last sync timestamp |
| `getStaffNotifications(userId)` | Get notifications and unread count |
| `markNotificationAsRead(userId, notificationId)` | Mark single notification read |
| `markAllNotificationsAsRead(userId)` | Mark all notifications read |
| `getStaffProfile(userId)` | Get full user profile |
| `updateStaffProfile(userId, data)` | Update profile fields |
| `updateStaffPassword(userId, oldPassword, newPassword)` | Change password |
| `uploadStaffAvatar(userId, file)` | Upload profile picture |
| `getFAQ()` | Get all FAQ items |
| `submitSupportRequest(userId, data)` | Submit help ticket |

---

## Custom Hooks

### useApi() - `src/hooks/useApi.js`
Returns an object with all 48 mock API functions. When switching to a real backend, only the imports in this file need to change.

### useAuth() - `src/contexts/AuthContext.tsx`
Returns: `{ user, isAuthenticated, login, logout, setUserRole, token }`

### useStaffAuth() - `src/contexts/StaffAuthContext.tsx`
Returns: `{ user, isAuthenticated, login, logout }`

### useIsMobile() - `src/hooks/use-mobile.tsx`
Returns: `boolean` (true if viewport < 768px)

### useToast() - `src/hooks/use-toast.ts`
Returns: `{ toasts, toast, dismiss }`

---

## UI Component Library

60+ shadcn/ui components in `src/components/ui/`:

**Form Elements**: button, input, label, checkbox, switch, textarea, radio-group, select, slider, toggle, toggle-group, input-otp

**Containers**: card, alert, popover, tooltip, hover-card, dialog, alert-dialog, sheet, drawer

**Navigation**: tabs, breadcrumb, menubar, navigation-menu, command, dropdown-menu, context-menu

**Display**: badge, avatar, progress, skeleton, carousel, calendar, accordion, collapsible, resizable

**Data**: data-table (custom), pagination, scroll-area, table

**Custom**: kpi-card, status-badge, filter-bar, confirmation-modal, audit-info

**Notifications**: toast, toaster, sonner

---

## Responsive Design

### Breakpoints (Tailwind defaults)
- `sm`: 640px (small phones landscape)
- `md`: 768px (tablets)
- `lg`: 1024px (sidebar visible/hidden threshold)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

### Admin Portal
- **< 1024px**: Hamburger menu, sidebar hidden, Sheet drawer slides from left
- **>= 1024px**: Sidebar always visible, no hamburger
- Tables switch to card layouts on mobile
- Header search becomes icon-only on mobile
- Stats grids: 2 columns on mobile, 4 on desktop

### Staff Portal
- Mobile-first design (bottom navigation)
- Bottom nav with 7 items always visible
- Cards stack vertically on mobile
- Full-width on mobile, max-width on desktop

---

## How to Switch to a Real Backend

The entire app is designed so you only change ONE file: `src/services/mockApi.js`.

Replace each mock function with a real fetch call. Example:

```javascript
// BEFORE (mock):
export const adminLogin = async (email, password) => {
  await delay();
  const admin = adminUsers.find(a => a.email === email);
  // ... mock logic
  return { success: true, data: { user, token, refreshToken } };
};

// AFTER (real API):
export const adminLogin = async (email, password) => {
  const response = await fetch('/api/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
```

The response shapes stay identical. No component changes needed.

---

## Key Design Patterns

1. **Mock-first development** - All data flows through mockApi.js, making backend swap seamless
2. **Role-based access** - Sidebar links and routes filtered by user role
3. **localStorage persistence** - Admin auth survives page refresh
4. **Token-based sessions** - Base64 JWT-like tokens stored in memory Map
5. **Responsive-first** - All pages work on mobile, tablet, and desktop
6. **Component composition** - shadcn/ui primitives composed into page-specific layouts
7. **Context separation** - Admin and Staff auth are completely separate contexts
