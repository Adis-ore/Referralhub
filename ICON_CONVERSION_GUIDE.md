# Lucide React to React Icons Conversion Guide

This document provides the complete mapping for converting lucide-react icons to react-icons.

## Installation

```bash
npm install react-icons@5.5.0
```

## Import Pattern

### Before (Lucide React)
```javascript
import { Home, Users, Settings } from 'lucide-react';
```

### After (React Icons)
```javascript
import { FaHome, FaUsers } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
```

## Complete Icon Mapping

### Common Icons (from 'react-icons/fa')

| Lucide Icon | React Icon | Import |
|------------|------------|---------|
| Home | FaHome | react-icons/fa |
| Users | FaUsers | react-icons/fa |
| User | FaUser | react-icons/fa |
| UserCheck | FaUserCheck | react-icons/fa |
| UserPlus | FaUserPlus | react-icons/fa |
| UserMinus | FaUserMinus | react-icons/fa |
| Bell | FaBell | react-icons/fa |
| BellRing | FaBell | react-icons/fa |
| Calendar | FaCalendar | react-icons/fa |
| DollarSign | FaDollarSign | react-icons/fa |
| TrendingUp | FaChartLine | react-icons/fa |
| TrendingDown | FaChartLine | react-icons/fa |
| Check | FaCheck | react-icons/fa |
| CheckCircle | FaCheckCircle | react-icons/fa |
| CheckCircle2 | FaCheckCircle | react-icons/fa |
| X | FaTimes | react-icons/fa |
| XCircle | FaTimesCircle | react-icons/fa |
| Search | FaSearch | react-icons/fa |
| Filter | FaFilter | react-icons/fa |
| Download | FaDownload | react-icons/fa |
| Upload | FaUpload | react-icons/fa |
| Edit | FaEdit | react-icons/fa |
| Edit2 | FaEdit | react-icons/fa |
| Edit3 | FaEdit | react-icons/fa |
| Trash | FaTrash | react-icons/fa |
| Trash2 | FaTrashAlt | react-icons/fa |
| Eye | FaEye | react-icons/fa |
| EyeOff | FaEyeSlash | react-icons/fa |
| ChevronDown | FaChevronDown | react-icons/fa |
| ChevronUp | FaChevronUp | react-icons/fa |
| ChevronLeft | FaChevronLeft | react-icons/fa |
| ChevronRight | FaChevronRight | react-icons/fa |
| ChevronsLeft | FaAngleDoubleLeft | react-icons/fa |
| ChevronsRight | FaAngleDoubleRight | react-icons/fa |
| Plus | FaPlus | react-icons/fa |
| Minus | FaMinus | react-icons/fa |
| MoreVertical | FaEllipsisV | react-icons/fa |
| MoreHorizontal | FaEllipsisH | react-icons/fa |
| Menu | FaBars | react-icons/fa |
| LogOut | FaSignOutAlt | react-icons/fa |
| LogIn | FaSignInAlt | react-icons/fa |
| Mail | FaEnvelope | react-icons/fa |
| Phone | FaPhone | react-icons/fa |
| MapPin | FaMapMarkerAlt | react-icons/fa |
| Clock | FaClock | react-icons/fa |
| FileText | FaFileAlt | react-icons/fa |
| File | FaFile | react-icons/fa |
| Copy | FaCopy | react-icons/fa |
| Share | FaShare | react-icons/fa |
| Share2 | FaShareAlt | react-icons/fa |
| ExternalLink | FaExternalLinkAlt | react-icons/fa |
| Link | FaLink | react-icons/fa |
| Link2 | FaLink | react-icons/fa |
| AlertCircle | FaExclamationCircle | react-icons/fa |
| AlertTriangle | FaExclamationTriangle | react-icons/fa |
| Info | FaInfoCircle | react-icons/fa |
| HelpCircle | FaQuestionCircle | react-icons/fa |
| Star | FaStar | react-icons/fa |
| Heart | FaHeart | react-icons/fa |
| Award | FaAward | react-icons/fa |
| Gift | FaGift | react-icons/fa |
| CreditCard | FaCreditCard | react-icons/fa |
| Wallet | FaWallet | react-icons/fa |
| Activity | FaChartArea | react-icons/fa |
| BarChart | FaChartBar | react-icons/fa |
| BarChart2 | FaChartBar | react-icons/fa |
| BarChart3 | FaChartBar | react-icons/fa |
| PieChart | FaChartPie | react-icons/fa |
| LineChart | FaChartLine | react-icons/fa |
| RefreshCw | FaSyncAlt | react-icons/fa |
| RotateCcw | FaSyncAlt | react-icons/fa |
| Loader | FaSpinner | react-icons/fa |
| Loader2 | FaCircleNotch | react-icons/fa |
| Lock | FaLock | react-icons/fa |
| Unlock | FaUnlock | react-icons/fa |
| Shield | FaShieldAlt | react-icons/fa |
| ShieldCheck | FaShieldAlt | react-icons/fa |
| Key | FaKey | react-icons/fa |
| Tag | FaTag | react-icons/fa |
| Tags | FaTags | react-icons/fa |
| Archive | FaArchive | react-icons/fa |
| Bookmark | FaBookmark | react-icons/fa |
| Flag | FaFlag | react-icons/fa |
| Send | FaPaperPlane | react-icons/fa |
| MessageSquare | FaComment | react-icons/fa |
| MessageCircle | FaCommentDots | react-icons/fa |
| Zap | FaBolt | react-icons/fa |
| Image | FaImage | react-icons/fa |
| Video | FaVideo | react-icons/fa |
| Mic | FaMicrophone | react-icons/fa |
| Camera | FaCamera | react-icons/fa |
| Paperclip | FaPaperclip | react-icons/fa |
| List | FaList | react-icons/fa |
| Grid | FaTh | react-icons/fa |
| Columns | FaColumns | react-icons/fa |
| Layout | FaThLarge | react-icons/fa |
| Maximize | FaExpand | react-icons/fa |
| Maximize2 | FaExpand | react-icons/fa |
| Minimize | FaCompress | react-icons/fa |
| Minimize2 | FaCompress | react-icons/fa |
| ArrowUp | FaArrowUp | react-icons/fa |
| ArrowDown | FaArrowDown | react-icons/fa |
| ArrowLeft | FaArrowLeft | react-icons/fa |
| ArrowRight | FaArrowRight | react-icons/fa |
| Circle | FaCircle | react-icons/fa |
| Square | FaSquare | react-icons/fa |
| Building | FaBuilding | react-icons/fa |
| Building2 | FaBuilding | react-icons/fa |
| Briefcase | FaBriefcase | react-icons/fa |
| Package | FaBox | react-icons/fa |
| Globe | FaGlobe | react-icons/fa |
| Database | FaDatabase | react-icons/fa |
| Server | FaServer | react-icons/fa |
| Save | FaSave | react-icons/fa |
| Power | FaPowerOff | react-icons/fa |

### Special Icons (from 'react-icons/fi')

| Lucide Icon | React Icon | Import |
|------------|------------|---------|
| Settings | FiSettings | react-icons/fi |

### Special Icons (from 'react-icons/gi')

| Lucide Icon | React Icon | Import |
|------------|------------|---------|
| Coins | GiTwoCoins | react-icons/gi |

### Special Icons (from 'react-icons/bs')

| Lucide Icon | React Icon | Import |
|------------|------------|---------|
| Sparkles | FaStar | react-icons/fa |

Note: BsSparkles doesn't exist in react-icons. Use FaStar as alternative.

## Usage with Aliases

When converting, you can use aliases to keep the original name:

```javascript
import { FaHome as Home, FaUsers as Users } from 'react-icons/fa';
import { FiSettings as Settings } from 'react-icons/fi';

// Then use as before
<Home className="w-4 h-4" />
<Users className="w-4 h-4" />
<Settings className="w-4 h-4" />
```

## Files Converted (19/50)

### Staff Pages (8/8) - COMPLETE
- ✅ StaffHome.tsx
- ✅ StaffHours.tsx
- ✅ StaffLogin.tsx
- ✅ StaffNotifications.tsx
- ✅ StaffPoints.tsx
- ✅ StaffProfile.tsx
- ✅ StaffReferrals.tsx
- ✅ StaffWithdrawals.tsx

### Main Pages (6/10)
- ✅ AuditLogs.tsx
- ✅ Dashboard.tsx
- ✅ Login.tsx
- ✅ PointsConfiguration.tsx
- ✅ Reports.tsx
- ✅ Settings.tsx
- ❌ SuperAdminOverride.tsx
- ❌ UserDetail.tsx
- ❌ Users.tsx
- ❌ Withdrawals.tsx

### UI Components (0/21)
- ❌ All 21 files need conversion

### Staff Components (0/4)
- ❌ All 4 files need conversion

### Layout Components (0/2)
- ❌ All 2 files need conversion

### Dashboard Components (0/1)
- ❌ RecentActivity.tsx

### Admin Components (0/1)
- ❌ PointsAdjustmentModal.tsx

## Test Credentials

### Admin Accounts
- **Super Admin**: admin@company.com / admin123
- **Manager**: manager@company.com / manager123
- **Analyst**: analyst@company.com / analyst123

### Sample Staff Accounts (from 50 total)
- adewale.johnson@company.com / password123
- chioma.okafor@company.com / password123
- oluwaseun.adebayo@company.com / password123
- blessing.eze@company.com / password123

All 50 staff users use password: **password123**
