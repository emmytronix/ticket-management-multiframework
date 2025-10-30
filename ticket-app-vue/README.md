# TicketFlow - Vue.js Implementation

A modern ticket management system built with Vue.js 3, Vite, and Tailwind CSS.

## 🚀 Live Demo

**Live URL:** [https://emmytronix.github.io/ticket-app-vue](https://emmytronix.github.io/ticket-app-vue)

## 📦 Technologies Used

- **Vue.js 3** - Progressive JavaScript Framework (Composition API)
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - Utility-First CSS Framework
- **Lucide Vue Next** - Beautiful & Consistent Icons
- **LocalStorage API** - Client-Side Data Persistence

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/emmytronix/ticket-app-vue.git
cd ticket-app-vue
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser at:**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 📁 Project Structure
```
src/
├── components/
│   ├── LandingPage.vue     # Hero section with wavy background
│   ├── AuthPage.vue        # Login/Signup forms
│   ├── Dashboard.vue       # Statistics dashboard
│   ├── TicketManagement.vue # CRUD operations
│   └── Toast.vue           # Notification component
├── App.vue                 # Main app with routing
├── main.js                 # Entry point
└── style.css               # Tailwind imports
```

## 🎨 Features

✅ **Landing Page**
- Wavy SVG background in hero section
- Decorative circle elements
- Responsive navigation
- Feature cards with icons

✅ **Authentication**
- Login and Signup pages
- Email and password validation
- Session management with localStorage
- Toast notifications for errors

✅ **Dashboard**
- Total tickets count
- Open tickets count
- In Progress tickets count
- Closed tickets count
- Quick action buttons

✅ **Ticket Management (CRUD)**
- **Create**: Form to create new tickets
- **Read**: Display list of tickets with cards
- **Update**: Edit existing tickets
- **Delete**: Remove tickets with confirmation
- Real-time validation
- Status badges (Open, In Progress, Closed)
- Priority labels (Low, Medium, High)

✅ **Protected Routes**
- Dashboard and Tickets require authentication
- Automatic redirect to login for unauthorized access
- Logout clears session

✅ **Design**
- Max-width: 1440px (centered)
- Fully responsive (mobile, tablet, desktop)
- Consistent footer across all pages
- Purple primary color (#7C3AED)

## 🎯 Status Colors

- **Open**: Green (#10B981)
- **In Progress**: Amber (#F59E0B)
- **Closed**: Gray (#6B7280)

## 🔐 Test Credentials

Any email and password (minimum 6 characters) will work for testing.

**Example:**
- Email: `test@example.com`
- Password: `password123`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (full grid)

## 🔒 Security Features

- Session-based authentication with localStorage
- Protected routes with automatic redirect
- Form validation (client-side)
- XSS protection through Vue.js

## ♿ Accessibility

- Semantic HTML elements
- Keyboard navigation support
- Focus visible states
- Sufficient color contrast
- ARIA labels where appropriate

## 📝 Data Validation

### Required Fields:
- **Title** - Cannot be empty
- **Status** - Must be: "open", "in_progress", or "closed"

### Optional Fields:
- **Description** - Any text
- **Priority** - Low, Medium, or High

### Error Messages:
- Inline errors beneath form fields
- Toast notifications for operations
- Clear and descriptive messages

## 🐛 Known Issues

None at this time.

## 🚀 Deployment

### GitHub Pages Setup:

1. **Update `vite.config.js`:**
```javascript
base: '/ticket-app-vue/' // Your repo name
```

2. **Update `package.json`:**
```json
"homepage": "https://emmytronix.github.io/ticket-app-vue"
```

3. **Deploy:**
```bash
npm run deploy
```

### Alternative: Railway Deployment

1. **Create `railway.json`:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npx serve dist -s -p $PORT",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

2. **Install serve:**
```bash
npm install --save-dev serve
```

3. **Push to GitHub and connect to Railway**

## 📄 License

MIT License

## 👤 Author

**Your Name**
- GitHub: [@emmytronix](https://github.com/emmytronix)
- Email: emmanueludodirim4@gmail.com

## 🙏 Acknowledgments

Built as part of the HNG Stage 2 Frontend Task.

---