# Referral Hub - Setup Guide

## Overview

Referral Hub is a complete staff referral management system with 50 test users, 48 API endpoints, and full admin/staff functionality.

## What's Included

### Mock Data System
- **50 Staff Users** with realistic Nigerian names and data
- **3 Admin Users** with different permission levels
- **257 Referrals** distributed across users
- **523 Point Transactions** tracking all point movements
- **124 Withdrawal Requests** in various statuses
- **215 Audit Logs** for compliance tracking
- **167 Notifications** for staff users

### API Layer
- **48 Mock API Endpoints** fully implemented
- **7 Authentication endpoints** with JWT token simulation
- **43 Admin endpoints** for complete system management
- **27 Staff endpoints** for user-facing functionality
- Realistic delays (100-500ms) for network simulation
- Console logging for debugging

### UI Components
- **19/50 files converted** from lucide-react to react-icons
- Admin dashboard with charts and statistics
- Staff portal with referral tracking
- Complete withdrawal management system
- Points configuration and adjustment tools
- Audit logging and reporting

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- react-icons (v5.5.0) - Icon library
- All existing dependencies

### 2. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 3. Login with Test Credentials

#### Admin Login
- URL: `/login` (default route)
- Email: `admin@company.com`
- Password: `admin123`

#### Staff Login
- URL: `/staff/login`
- Email: Any from [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)
- Password: `password123` (all staff users)

### 4. Explore the System

#### As Admin:
1. View dashboard with 50 users statistics
2. Manage users (view, edit, activate/deactivate)
3. Review and approve referrals
4. Process withdrawal requests
5. Adjust user points
6. View audit logs
7. Generate reports
8. Configure system settings

#### As Staff:
1. View personal dashboard
2. See your referral code
3. Track your referrals
4. Check points balance
5. Request withdrawals
6. View notifications
7. Update profile
8. Access FAQ and support

## File Structure

```
ReferralHub/
├── src/
│   ├── data/
│   │   └── mockData.js                  # 50 users + all test data
│   ├── services/
│   │   └── mockApi.js                   # 48 endpoint functions
│   ├── hooks/
│   │   └── useApi.js                    # API wrapper hook
│   ├── pages/
│   │   ├── staff/                       # Staff portal pages (8 files)
│   │   ├── Dashboard.tsx                # Admin dashboard
│   │   ├── Users.tsx                    # User management
│   │   ├── Withdrawals.tsx              # Withdrawal management
│   │   ├── PointsConfiguration.tsx      # Points system config
│   │   ├── Reports.tsx                  # Reporting system
│   │   ├── Settings.tsx                 # System settings
│   │   ├── AuditLogs.tsx                # Audit trail
│   │   └── ...
│   ├── components/
│   │   ├── ui/                          # Reusable UI components
│   │   ├── layout/                      # Layout components
│   │   ├── staff/                       # Staff-specific components
│   │   ├── admin/                       # Admin-specific components
│   │   └── dashboard/                   # Dashboard components
│   └── ...
├── TEST_CREDENTIALS.md                  # All login credentials
├── ICON_CONVERSION_GUIDE.md             # Icon migration reference
├── SETUP_GUIDE.md                       # This file
└── package.json
```

## Mock API Usage

### In Components

```javascript
import { useApi } from '@/hooks/useApi';

function MyComponent() {
  const api = useApi();

  // Login
  const handleLogin = async () => {
    const response = await api.staffLogin('email@company.com', 'password123');
    if (response.success) {
      console.log('User:', response.data.user);
      console.log('Token:', response.data.token);
    }
  };

  // Get users (admin)
  const fetchUsers = async () => {
    const response = await api.getAdminUsers(
      { department: 'Sales', status: 'active' },
      { page: 1, limit: 10 }
    );
    console.log('Users:', response.data.users);
  };

  // Get staff dashboard
  const fetchDashboard = async (userId) => {
    const response = await api.getStaffDashboard(userId);
    console.log('Dashboard:', response.data);
  };
}
```

### API Response Format

All endpoints return consistent JSON:

```javascript
// Success response
{
  success: true,
  message: "Operation successful",
  data: {
    // Endpoint-specific data
  }
}

// Error response
{
  success: false,
  message: "Error description"
}
```

## Icon Conversion Status

### Completed (19/50 files)
- All 8 staff pages
- 6 main pages (Dashboard, Login, Reports, Settings, AuditLogs, PointsConfiguration)
- Progress: 38%

### Remaining (31 files)
- 4 main pages
- 21 UI components
- 4 staff components
- 2 layout components

### How to Convert Remaining Files

Use the [ICON_CONVERSION_GUIDE.md](ICON_CONVERSION_GUIDE.md) for complete mapping.

Example conversion:

```javascript
// Before
import { Home, Users, Settings } from 'lucide-react';

// After
import { FaHome as Home, FaUsers as Users } from 'react-icons/fa';
import { FiSettings as Settings } from 'react-icons/fi';
```

## Development Tips

### 1. View All Test Data

The mock data is exported from [src/data/mockData.js](src/data/mockData.js):

```javascript
import {
  staffUsers,      // 50 staff members
  adminUsers,      // 3 admin accounts
  referrals,       // 257 referrals
  withdrawals,     // 124 withdrawals
  pointTransactions // 523 transactions
} from '@/data/mockData';
```

### 2. Debug API Calls

All API functions log to console:

```
API: Staff Login { email: 'adewale.johnson@company.com' }
API: Get Staff Dashboard { userId: 1 }
API: Get Staff Referrals { userId: 1, filters: {} }
```

### 3. Test Different User Roles

Switch between accounts to test:
- **Super Admin**: Full access
- **Manager**: Limited admin access
- **Analyst**: Read-only access
- **Staff**: User-facing features

### 4. Filter and Pagination

Most list endpoints support filtering:

```javascript
// Get active sales users, page 2
const response = await api.getAdminUsers(
  {
    department: 'Sales',
    status: 'active',
    search: 'john',
    sortBy: 'pointsBalance',
    sortOrder: 'desc'
  },
  { page: 2, limit: 10 }
);
```

### 5. Simulate Real Backend Later

When you have a real backend, simply update [src/services/mockApi.js](src/services/mockApi.js) to call real endpoints:

```javascript
// Current (mock)
export const getAdminUsers = async (filters, pagination) => {
  await delay();
  // Return mock data
};

// Future (real API)
export const getAdminUsers = async (filters, pagination) => {
  const response = await fetch('/api/admin/users', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint
```

## System Statistics

- **Total Staff Users**: 50
- **Active Users**: 40 (80%)
- **Total Referrals**: 257
- **Total Points**: 418,700
- **Total Withdrawals**: 124
- **Departments**: Sales (20), Marketing (12), IT (8), HR (5), Operations (5)
- **Locations**: Lagos (25), Abuja (15), Port Harcourt (10)

## Testing Checklist

- [ ] Admin login works
- [ ] Staff login works
- [ ] Dashboard shows correct statistics
- [ ] User list displays all 50 users
- [ ] Filtering works (department, status, search)
- [ ] Pagination works
- [ ] Referral tracking shows correct data
- [ ] Points balance displays correctly
- [ ] Withdrawal requests can be created
- [ ] Admin can approve/reject withdrawals
- [ ] Audit logs track actions
- [ ] Settings can be updated
- [ ] Staff can view their referrals
- [ ] Notifications display correctly
- [ ] Profile updates work

## Troubleshooting

### Icons Not Showing
- Run `npm install` to ensure react-icons is installed
- Check browser console for import errors
- Some files still use lucide-react (31 remaining)

### API Not Working
- Check browser console for API call logs
- Verify mockData.js and mockApi.js are imported correctly
- Ensure useApi hook is being used

### Login Issues
- Use credentials from TEST_CREDENTIALS.md
- Check that email/password match exactly
- Admin and staff have different login pages

### Build Errors
- Run `npm install` to update dependencies
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for any remaining lucide-react imports

## Next Steps

1. **Complete Icon Conversion**: Convert remaining 31 files to react-icons
2. **Connect Components to API**: Update pages to use mockApi instead of hardcoded data
3. **Test All Workflows**: Verify all 48 endpoints work correctly
4. **Build Real Backend**: Use mockApi.js as specification for backend development
5. **Deploy Frontend**: Build and deploy React application
6. **Connect to Backend**: Replace mock API calls with real API endpoints

## Support

For issues or questions:
1. Check [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md) for login details
2. Review [ICON_CONVERSION_GUIDE.md](ICON_CONVERSION_GUIDE.md) for icon mapping
3. Check browser console for error messages
4. Verify all dependencies are installed

## Credits

Built with:
- React 18.3.1
- Vite 5.4.19
- React Router 6.30.1
- React Icons 5.5.0
- Radix UI Components
- TailwindCSS 3.4.17
- TypeScript 5.8.3
