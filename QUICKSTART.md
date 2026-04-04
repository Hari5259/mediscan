# Quick Start Guide - MediCare Frontend

## 🚀 5-Minute Setup

### 1. Start the server
```bash
npm run dev
```
Visit: **http://localhost:5173**

### 2. Test the Platform

#### Login Page (`/login`)
- Select user type (Patient or Doctor)
- Try email: `test@example.com`
- Password: `password123`

#### Signup Page (`/signup`)
- Fill all fields with valid info
- Email: `user@example.com`
- Phone: `+1 (555) 123-4567`
- Password: minimum 8 characters
- Check Terms & Privacy
- Submit to go to verification

#### Verification Page (`/verify`)
- Enter any 6-digit code
- Click "Verify Code"
- See success confirmation

#### Terms & Privacy
- Click links in signup to view full T&C and Privacy Policy
- Read comprehensive healthcare compliance information

#### Dashboard
- After login, access main dashboard
- See quick action cards
- Preview upcoming features

---

## 📂 File Organization

### Components (`/src/components/`)
```
Login.jsx           → /login route
Signup.jsx          → /signup route
Verification.jsx    → /verify route
Terms.jsx           → /terms route
Privacy.jsx         → /privacy route
Dashboard.jsx       → /dashboard route
```

### Styles
```
src/index.css       → Global + Tailwind styles
src/App.css         → Component-specific styles
tailwind.config.js  → Tailwind configuration
postcss.config.js   → PostCSS configuration
```

### Configuration
```
vite.config.js      → Vite build configuration
package.json        → Dependencies & scripts
```

---

## 🎯 Common Tasks

### Add a New Page
1. Create component in `src/components/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Import in App.jsx
4. Link from other pages

Example:
```jsx
// src/App.jsx
import NewPage from './components/NewPage';

// Inside Routes
<Route path="/newpage" element={<NewPage />} />
```

### Modify Colors
Edit in `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: "#YourColor",
    }
  }
}
```

### Add Form Field
In signup form, add to formData state:
```jsx
const [formData, setFormData] = useState({
  // existing fields...
  newField: ''
});

// In form JSX
<input
  type="text"
  name="newField"
  value={formData.newField}
  onChange={handleChange}
/>
```

### Connect to Backend
1. Install axios: `npm install axios`
2. Create API file: `src/api/client.js`
3. Replace fetch calls with API calls

---

## 🔍 Testing Pages

### Manual Testing Flow

1. **Fresh Start**
   - Go to `/login`
   - Check layout and styling
   - Click "Sign up here"

2. **Signup Flow**
   - Fill all fields correctly
   - Try invalid inputs (test validation)
   - Check Terms & Privacy links
   - Submit form
   - Go to verification

3. **Verification**
   - Try both Email and Phone tabs
   - Wait for timer
   - Click resend
   - Submit verification

4. **Login**
   - Return to login
   - Try signing in
   - Go to dashboard

5. **Dashboard**
   - View all elements
   - Click logout
   - Return to login

---

## 🛠️ Development Tips

### Hot Module Replacement
- Change any component file
- Browser auto-updates without refresh
- State is preserved

### Console Debugging
```bash
# In browser console (F12)
localStorage.getItem('key')  # Check stored data
sessionStorage.getItem('pendingVerification')  # Check verification data
```

### Form Validation Testing
```jsx
// Valid email: user@example.com
// Invalid email: userexample.com

// Valid phone: +1 (555) 123-4567
// Invalid phone: 123

// Valid password: MyPass123
// Too short: Pass1
```

### Responsive Testing
- Press F12 → Device Toolbar → Toggle device type
- Test mobile, tablet, desktop views
- Check overlay and positioning

---

## 📦 Building & Deployment

### Build for Production
```bash
npm run build
```
Creates optimized `dist/` folder

### Preview Build Locally
```bash
npm run preview
```
Serves production build locally

### Deploy to Vercel (1 minute)
```bash
npm install -g vercel
vercel
```

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Styles not working | Clear cache: `rm -rf node_modules/.vite` |
| Port 5173 in use | Use different port: `npm run dev -- --port 3000` |
| Build fails | Reinstall: `rm -rf node_modules && npm install` |
| Hot reload not working | Restart server: Stop and `npm run dev` |
| Icons not showing | Check Lucide React import: `import { IconName } from 'lucide-react'` |

---

## 💡 Next Steps

1. **Setup Backend**
   - Create Node.js/Python API
   - Connect to database
   - Implement real authentication

2. **Add Modules**
   - Appointment scheduling
   - Medical records
   - Mental health resources

3. **Enhance Security**
   - Implement JWT tokens
   - Add HTTPS
   - Setup email verification

4. **Deploy**
   - Choose hosting (Vercel/Netlify)
   - Setup CI/CD
   - Monitor errors

---

## 📚 Useful Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Guide](https://reactrouter.com)
- [Vite Official Guide](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

## 🎓 Learning Path

### Week 1: Explore
- Understand component structure
- Learn React Router basics
- Explore Tailwind utilities

### Week 2: Customize
- Modify colors and styles
- Add new pages
- Change form fields

### Week 3: Connect Backend
- Learn about API calls
- Setup axios client
- Implement real authentication

### Week 4: Deploy
- Build for production
- Deploy to Vercel/Netlify
- Setup custom domain

---

## 🚀 Pro Tips

✅ Use browser DevTools (F12) to inspect elements
✅ Check console for errors
✅ Use `console.log()` for debugging
✅ Keep components small and focused
✅ Use meaningful variable names
✅ Test on real mobile devices
✅ Read error messages carefully

---

**Ready to build?** 🎉

Start with: `npm run dev`

Questions? Check React docs or React Router guide!

Happy coding! 💻
