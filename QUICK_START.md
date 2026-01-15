# Quick Start Guide

## Get Running in 3 Minutes

### 1. Install & Run (1 minute)

```bash
npm install
npm run dev
```

Application starts at: `http://localhost:5173`

### 2. Login as Admin (30 seconds)

- Go to `http://localhost:5173/login`
- Email: `admin@company.com`
- Password: `admin123`

You'll see:
- Dashboard with 50 users
- Statistics and charts
- Recent activity
- Pending items

### 3. Login as Staff (30 seconds)

- Go to `http://localhost:5173/staff/login`
- Email: `adewale.johnson@company.com`
- Password: `password123`

You'll see:
- Personal dashboard
- Referral code: REFAX9K01
- Points balance: 12,500
- 18 referrals

### 4. Explore Features (1 minute)

**As Admin:**
- View all 50 users
- Check pending withdrawals
- Approve/reject referrals
- Adjust user points
- View audit logs

**As Staff:**
- View your referrals
- Request withdrawal
- Check points history
- Update profile
- View notifications

## Test Credentials Cheat Sheet

### Admin Accounts
| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@company.com | admin123 |
| Manager | manager@company.com | manager123 |
| Analyst | analyst@company.com | analyst123 |

### Staff Accounts
**All use password: `password123`**

| Name | Email | Points | Referrals |
|------|-------|--------|-----------|
| Adewale Johnson | adewale.johnson@company.com | 12,500 | 18 |
| Oluwaseun Adebayo | oluwaseun.adebayo@company.com | 15,000 | 20 |
| Tunde Olatunji | tunde.olatunji@company.com | 13,400 | 19 |
| Victor Eze | victor.eze@company.com | 14,200 | 19 |
| Chukwuma Obi | chukwuma.obi@company.com | 14,500 | 19 |

Full list: [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)

## API Usage Examples

### Get Users (Admin)
```javascript
import { useApi } from '@/hooks/useApi';

const api = useApi();
const response = await api.getAdminUsers(
  { department: 'Sales' },
  { page: 1, limit: 10 }
);
console.log(response.data.users);
```

### Get Dashboard (Staff)
```javascript
const response = await api.getStaffDashboard(userId);
console.log(response.data.stats);
```

### Create Withdrawal (Staff)
```javascript
const response = await api.createWithdrawal(
  userId,
  10000,
  {
    bankName: 'GTBank',
    accountNumber: '0123456789',
    accountName: 'John Doe'
  }
);
```

## What's Available

- **50 Staff Users** with realistic data
- **48 API Endpoints** fully functional
- **257 Referrals** across all users
- **124 Withdrawals** in various statuses
- **523 Point Transactions** tracked
- **Complete Authentication** with JWT simulation

## System Stats

- Total Users: 50 (40 active, 10 inactive)
- Total Points: 418,700
- Total Referrals: 257
- Departments: Sales (20), Marketing (12), IT (8), HR (5), Operations (5)
- Locations: Lagos (25), Abuja (15), Port Harcourt (10)

## File Locations

| What | Where |
|------|-------|
| All test data | src/data/mockData.js |
| All API endpoints | src/services/mockApi.js |
| API hook | src/hooks/useApi.js |
| Login credentials | TEST_CREDENTIALS.md |
| Full setup guide | SETUP_GUIDE.md |
| Project status | PROJECT_STATUS.md |

## Common Tasks

### View All Users
1. Login as admin
2. Navigate to Users page
3. See all 50 users
4. Filter by department, location, or status

### Approve Withdrawal
1. Login as admin
2. Go to Withdrawals
3. Filter by "Pending"
4. Click approve on any request

### Check Points
1. Login as staff
2. View dashboard
3. See points balance
4. View points history

### Make Referral
1. Login as staff
2. Copy your referral code
3. Share with candidate
4. Track in Referrals page

## Troubleshooting

**Icons not showing?**
```bash
npm install react-icons@5.5.0
```

**Login not working?**
- Check credentials match exactly
- Admin and staff have different login pages

**Data not loading?**
- Check browser console for errors
- Verify mockData.js and mockApi.js exist

## Next Steps

1. Explore the system with test accounts
2. Convert remaining icons (31 files)
3. Connect components to API
4. Build real backend using mockApi.js as spec

## Quick Links

- Full Docs: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- All Credentials: [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md)
- Icon Guide: [ICON_CONVERSION_GUIDE.md](ICON_CONVERSION_GUIDE.md)
- Project Status: [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

**Ready to go!** Start with `npm run dev` and login as admin@company.com / admin123
