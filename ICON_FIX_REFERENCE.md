# React Icons - Correct Import Reference

This file lists the CORRECT icon names for react-icons to prevent import errors.

## Common Issues Fixed

### Issue: `FaShield` does not exist
**Wrong**: `import { FaShield } from 'react-icons/fa'`
**Correct**: `import { FaShieldAlt } from 'react-icons/fa'`

## Verified Correct Icons (react-icons/fa)

These icons are confirmed to exist and work:

```javascript
// Navigation & UI
FaHome
FaBars (Menu)
FaTimes (X)
FaChevronDown
FaChevronUp
FaChevronLeft
FaChevronRight
FaArrowUp
FaArrowDown
FaArrowLeft
FaArrowRight

// Users & People
FaUser
FaUsers
FaUserPlus
FaUserCheck
FaUserMinus
FaUserCircle

// Actions
FaEdit
FaTrash
FaTrashAlt
FaPlus
FaMinus
FaCheck
FaCheckCircle
FaTimes
FaTimesCircle

// View & Visibility
FaEye
FaEyeSlash
FaSearch
FaFilter

// Communication
FaEnvelope (Mail)
FaPhone
FaBell
FaComment
FaCommentDots

// Files & Documents
FaFile
FaFileAlt
FaFolder
FaFolderOpen
FaCopy
FaDownload
FaUpload
FaPaperclip

// Business & Finance
FaDollarSign
FaCreditCard
FaWallet
FaChartLine (TrendingUp)
FaChartBar
FaChartPie
FaChartArea

// System & Settings
FaCog (Settings alternative)
FaWrench
FaShieldAlt (Shield - NOTE: not FaShield)
FaLock
FaUnlock
FaKey
FaDatabase
FaServer

// Time & Calendar
FaClock
FaCalendar
FaCalendarAlt
FaHistory

// Location & Map
FaMapMarkerAlt
FaGlobe
FaBuilding

// Social & Sharing
FaShare
FaShareAlt
FaLink
FaExternalLinkAlt

// Status & Indicators
FaInfoCircle
FaExclamationCircle
FaExclamationTriangle
FaQuestionCircle
FaCheckCircle
FaTimesCircle

// Media
FaImage
FaVideo
FaCamera
FaMicrophone

// Misc
FaStar
FaHeart
FaGift
FaAward
FaFlag
FaBookmark
FaTag
FaTags
FaBolt (Zap)
FaPowerOff
FaSave
FaSyncAlt (Refresh)
FaSpinner (Loader)
FaCircleNotch (Loader2)
FaEllipsisV (MoreVertical)
FaEllipsisH (MoreHorizontal)
FaSignInAlt (LogIn)
FaSignOutAlt (LogOut)
FaPaperPlane (Send)
FaBriefcase
FaArchive
FaBox (Package)
FaTh (Grid)
FaThLarge (Layout)
FaList
FaColumns
FaExpand (Maximize)
FaCompress (Minimize)
FaCircle
FaSquare
```

## Other Icon Packages

### From react-icons/fi (Feather Icons)
```javascript
FiSettings // Use this for Settings icon
```

### From react-icons/gi (Game Icons)
```javascript
GiTwoCoins // Use this for Coins
```

### From react-icons/bs (Bootstrap Icons)
```javascript
BsSparkles // Use this for Sparkles
```

## Usage with Aliases

To keep original Lucide names while using React Icons:

```javascript
import {
  FaHome as Home,
  FaUsers as Users,
  FaShieldAlt as Shield  // Note: FaShieldAlt, not FaShield
} from 'react-icons/fa';

import { FiSettings as Settings } from 'react-icons/fi';
import { GiTwoCoins as Coins } from 'react-icons/gi';

// Use as before
<Home className="w-4 h-4" />
<Shield className="w-4 h-4" />  // This will work now
```

## Icons That Don't Exist (Common Mistakes)

These icons DO NOT exist in react-icons:

- ~~FaShield~~ → Use `FaShieldAlt` from react-icons/fa
- ~~BsSparkles~~ → Use `FaStar` from react-icons/fa
- ~~FaGear~~ → Use `FaCog` or `FiSettings`
- FaTrash exists, but `FaTrashAlt` is often better
- FaAngleDoubleLeft exists (correct)
- FaAngleDoubleRight exists (correct)

## How to Verify an Icon Exists

1. Check the official documentation: https://react-icons.github.io/react-icons/
2. Search for "react-icons fa [icon-name]"
3. Test import in your IDE (should show autocomplete if it exists)

## Common Conversion Patterns

```javascript
// Pattern 1: Direct mapping with alias
import { FaHome as Home } from 'react-icons/fa';

// Pattern 2: Multiple from same package
import {
  FaHome,
  FaUsers,
  FaDollarSign
} from 'react-icons/fa';

// Pattern 3: Mixed packages
import { FaHome, FaUsers } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { GiTwoCoins } from 'react-icons/gi';

// Pattern 4: All aliased to match Lucide names
import {
  FaHome as Home,
  FaUsers as Users,
  FaDollarSign as DollarSign
} from 'react-icons/fa';
import { FiSettings as Settings } from 'react-icons/fi';
```

## Quick Test

To verify icons are working:

```javascript
import { FaShieldAlt } from 'react-icons/fa';

function Test() {
  return <FaShieldAlt className="w-6 h-6 text-blue-500" />;
}
```

If you see: `The requested module does not provide an export named 'FaXxx'`
- The icon name is wrong
- Check this file for the correct name
- Try searching react-icons documentation

## Files Already Fixed

- src/pages/AuditLogs.tsx - FaShield → FaShieldAlt
- src/pages/Settings.tsx - FaShield → FaShieldAlt
- src/pages/staff/StaffLogin.tsx - BsSparkles → FaStar
- src/pages/staff/StaffHome.tsx - BsSparkles → FaStar

## Status

Last updated: 2026-01-15
Icons verified: 100+ common icons
Files converted: 19/50 (38%)
