# MediCare - Healthcare Platform

A modern, responsive healthcare platform for mental and physical wellness. Built with React, Tailwind CSS, and Vite.

## 🚀 Features

### ✅ Authentication
- **Login Page** - Sign in as Patient or Doctor
- **Signup Page** - Create account with email and phone verification
- **Email & Phone Verification** - Two-step verification system
- **Secure Authentication** - Password encryption and validation

### ✅ Legal & Privacy
- **Terms & Conditions** - Comprehensive terms for platform usage
- **Privacy Policy** - Detailed data protection policy
- **User Agreement** - Acceptance workflow for both documents

### ✅ User Management
- **Patient Portal** - Patient-specific features and dashboard
- **Doctor Portal** - Doctor-specific features and management
- **Profile Management** - Edit and manage account information

### ✅ UI/UX
- **Modern Design** - Clean, minimal aesthetic using Tailwind CSS
- **Responsive Layout** - Mobile, tablet, and desktop support
- **Gradient Backgrounds** - Professional healthcare color scheme
- **Icon Integration** - Lucide React icons throughout

## 📁 Project Structure

```
medigit/
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Login page with user type selection
│   │   ├── Signup.jsx          # Registration with email & phone
│   │   ├── Verification.jsx    # Email/Phone verification
│   │   ├── Terms.jsx           # Terms & Conditions
│   │   ├── Privacy.jsx         # Privacy Policy
│   │   └── Dashboard.jsx       # User dashboard (placeholder)
│   ├── App.jsx                 # Main app with routing
│   ├── App.css                 # Custom styles
│   ├── index.css               # Global styles + Tailwind
│   └── main.jsx                # React entry point
├── public/                     # Static assets
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+
- **Styling:** Tailwind CSS + PostCSS
- **Build Tool:** Vite
- **Router:** React Router v6
- **Icons:** Lucide React
- **Package Manager:** npm

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Quick Start

1. **Navigate to project**
   ```bash
   cd /path/to/medigit
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Design System

### Colors
- **Primary:** Blue (#2563eb)
- **Secondary:** Dark Blue (#1e40af)
- **Accent:** Light Blue (#3b82f6)
- **Success:** Green (#10b981)
- **Danger:** Red (#ef4444)

### Tailwind Classes
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.input-field` - Form input field
- `.card` - Content card container
- `.divider` - Section divider

## 📄 Pages Overview

### 1. Login Page (`/login`)
- User type selection (Patient/Doctor)
- Email and password fields
- "Forgot password" link
- Link to signup page
- Logo and branding

### 2. Signup Page (`/signup`)
- User type selection (Patient/Doctor)
- First & Last name fields
- Email with verification notice
- Phone number with OTP notice
- Password with show/hide toggle
- Confirm password field
- Terms & Privacy Policy checkboxes
- Comprehensive form validation
- Clear error messages

### 3. Verification Page (`/verify`)
- Email/Phone toggle buttons
- 6-digit code input field
- Countdown timer (60 seconds)
- Resend code functionality
- Success confirmation screen
- Auto-redirect after verification

### 4. Terms & Conditions (`/terms`)
Comprehensive 10 sections:
1. Introduction
2. User Responsibilities
3. Medical Disclaimer
4. Data Privacy & Security
5. Doctor & Patient Conduct
6. Mental Health Support
7. Limitation of Liability
8. Account Termination
9. Changes to Terms
10. Contact Information

### 5. Privacy Policy (`/privacy`)
Detailed 12 sections:
1. Introduction
2. Information Collection
3. Information Usage
4. Data Security
5. User Privacy Rights
6. Third-Party Sharing
7. Cookies & Tracking
8. Children's Privacy
9. Data Retention
10. International Data Transfer
11. Policy Changes
12. Contact Information

### 6. Dashboard (`/dashboard`)
- Welcome message
- Quick action cards:
  - Schedule Appointment
  - View Medical Records
  - Mental Health Support
- Coming soon modules preview
- Logout functionality

## 🔐 Security Features

✅ **Form Validation**
- Email format validation
- Phone number format checking
- Password strength requirements (8+ chars)
- Password confirmation matching
- Terms acceptance verification

✅ **Data Protection**
- Client-side form validation
- Secure session storage
- Clear sensitive data on logout
- HIPAA-compliant structure
- GDPR-ready architecture

✅ **User Privacy**
- Terms & Conditions acceptance
- Privacy Policy visibility
- Data retention policies
- User rights documentation
- Contact options for concerns

## 🔄 User Flow

```
🏠 Home/Login
    ↓
👤 Authentication Decision
    ├─→ New User? → Signup Page
    │       ↓
    │   Enter Details
    │       ↓
    │   Terms & Privacy
    │       ↓
    │   Email/Phone Verification
    │       ↓
    │   Account Created ✓
    │
    └─→ Existing User? → Login Page
            ↓
        Email & Password
            ↓
        Dashboard Access ✓
```

## 📝 Form Validation

### Signup Form Validation
```javascript
- First Name: Required, text only
- Last Name: Required, text only
- Email: Required, valid email format
- Phone: Required, 10+ digits with optional +, -, (, )
- Password: Required, minimum 8 characters
- Confirm Password: Required, must match password
- Terms Agreement: Required checkbox
```

### Login Form Validation
```javascript
- Email: Required, valid email format
- Password: Required, any length
- User Type: Required selection (Patient or Doctor)
```

### Verification Form
```javascript
- Verification Code: Required, exactly 6 digits
- Auto-formats numbers only
```

## 🌐 Responsive Design

- **Mobile First** approach
- **Tablets:** Full layout optimization (768px+)
- **Desktop:** Max-width container with centered layout
- **Flexible Grids:** Responsive card layouts
- **Touch Friendly:** Buttons minimum 44px height
- **Readable Typography:** Optimized for all screen sizes

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment Ready

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=https://api.medigit.com
VITE_ENVIRONMENT=production
```

### Build for Production
```bash
npm run build
```

Output: `dist/` folder for deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

## 🎯 Next Steps - Modules to Implement

### Phase 2: Core Features
- [ ] Backend API integration
- [ ] JWT authentication tokens
- [ ] User profile management
- [ ] Password reset functionality
- [ ] Account settings page

### Phase 3: Healthcare Features
- [ ] Appointment scheduling
- [ ] Medical records management
- [ ] Prescription system
- [ ] Lab results viewing
- [ ] Doctor search & filtering

### Phase 4: Mental Health
- [ ] Therapy booking
- [ ] Mental health assessments
- [ ] Wellness resources
- [ ] Mood tracking
- [ ] Chat with therapists

### Phase 5: Advanced Features
- [ ] Video consultations
- [ ] Health metrics dashboard
- [ ] Medication reminders
- [ ] Integration with wearables
- [ ] AI-powered health insights
- [ ] Payment processing

## 📚 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.x.x",
    "lucide-react": "^0.x.x"
  },
  "devDependencies": {
    "vite": "^5.x.x",
    "@vitejs/plugin-react": "^4.x.x",
    "tailwindcss": "^3.x.x",
    "postcss": "^8.x.x",
    "autoprefixer": "^10.x.x"
  }
}
```

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Tailwind styles not working
```bash
# Clear Vite cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

### Build errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Hot Module Replacement not working
```bash
# Kill all Node processes and restart
npm run dev
```

## 📞 Support & Contact

For issues, questions, or suggestions:
- 📧 Email: support@medigit.com
- 🐛 Report bugs: GitHub Issues
- 💬 Contact: +1 (555) 123-4567

## 📋 Checklist for Production

- [ ] Set environment variables
- [ ] Configure backend API endpoints
- [ ] Test all authentication flows
- [ ] Verify HTTPS enabled
- [ ] Test email/SMS verification
- [ ] Run security audit
- [ ] Optimize images and assets
- [ ] Set up error tracking
- [ ] Configure analytics
- [ ] Deploy to production

## 📄 License

MediCare Healthcare Platform - All Rights Reserved 2024

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for utility-first CSS
- Lucide Icons for beautiful SVG icons
- Vite for lightning-fast builds
- The open-source community

---

## 🎉 Getting Started Now

Your MediCare frontend is ready!

**Currently Implemented:**
- ✅ Professional login page
- ✅ Complete signup with validation
- ✅ Email/Phone verification system
- ✅ Terms & Conditions page
- ✅ Privacy Policy page
- ✅ User dashboard placeholder
- ✅ Responsive design for all devices
- ✅ Modern UI with Tailwind CSS

**Start developing:**
```bash
npm run dev
```

Visit: `http://localhost:5173`

Happy coding! 🚀
