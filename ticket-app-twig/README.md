# TicketFlow - Twig/PHP Implementation

A modern ticket management system built with PHP, Twig templating engine, and Tailwind CSS.

## 🚀 Live Demo

**Live URL:** [https://ticket-app-twig.up.railway.app](https://ticket-app-twig.up.railway.app)

## 📦 Technologies Used

- **PHP 8.1+** - Server-side scripting language
- **Twig 3.x** - Flexible, fast, and secure template engine
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - Client-side interactions
- **PHP Sessions** - Server-side data persistence

## 🛠️ Setup Instructions

### Prerequisites
- PHP 8.1 or higher
- Composer

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/emmytronix/ticket-app-twig.git
cd ticket-app-twig
```

2. **Install dependencies:**
```bash
composer install
```

3. **Run development server:**
```bash
php -S localhost:8000 -t public
```

4. **Open browser at:**
```
http://localhost:8000
```

## 📁 Project Structure
```
ticket-app-twig/
├── public/
│   └── index.php           # Main entry point & routing
├── templates/
│   ├── layout.html.twig    # Base layout template
│   ├── landing.html.twig   # Landing page
│   ├── login.html.twig     # Login page
│   ├── signup.html.twig    # Signup page
│   ├── dashboard.html.twig # Dashboard
│   └── tickets.html.twig   # Ticket management
├── vendor/                 # Composer dependencies
├── composer.json           # PHP dependencies
├── railway.toml           # Railway deployment config
└── README.md              # Documentation
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
- Session management with PHP sessions
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
- Server-side validation
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

- Session-based authentication with PHP sessions
- Protected routes with server-side checks
- Form validation (server-side)
- CSRF protection (session-based)
- XSS protection through Twig auto-escaping

## ♿ Accessibility

- Semantic HTML elements
- Keyboard navigation support
- Focus visible states
- Sufficient color contrast
- Descriptive form labels

## 📝 Data Validation

### Required Fields:
- **Title** - Cannot be empty
- **Status** - Must be: "open", "in_progress", or "closed"

### Optional Fields:
- **Description** - Any text
- **Priority** - Low, Medium, or High

### Error Messages:
- Session-based flash messages
- Toast notifications for operations
- Clear and descriptive messages

## 🐛 Known Issues

None at this time.

## 🚀 Deployment

### Railway Deployment:

1. **Push code to GitHub**

2. **Create new project on Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure environment (optional):**
   - Railway auto-detects PHP projects
   - Uses `railway.toml` for configuration

4. **Deploy automatically:**
   - Railway builds and deploys on push
   - Access via provided URL

### Alternative: Traditional Hosting

For shared hosting or VPS:

1. **Upload files via FTP/SFTP**
2. **Run composer install** on server
3. **Configure web server** to point to `public/` directory
4. **Ensure PHP 8.1+** is available

## 📄 License

MIT License

## 👤 Author

**Your Name**
- GitHub: [@emmytronix](https://github.com/emmytronix)
- Email: your.email@example.com

## 🙏 Acknowledgments

Built as part of the HNG Stage 2 Frontend Task.

---

## 🔧 Additional Notes

### PHP Version
This project requires PHP 8.1 or higher. To check your PHP version:
```bash
php -v
```

### Composer
If you don't have Composer installed, visit [getcomposer.org](https://getcomposer.org)

### Session Storage
Tickets are stored in PHP sessions. For production use, consider:
- Database storage (MySQL, PostgreSQL)
- Redis for session management
- File-based persistence

---