# ExamHub - CBT Online Exam Portal

A modern, production-ready Computer-Based Testing (CBT) platform for delivering secure online examinations across multiple devices on a local network with built-in authentication.

## Features

- **Secure Login System**: User authentication with email and password
- **Beautiful, Modern Interface**: Professional UI with gradient theming and smooth animations
- **Comprehensive Exam Portal**: Browse, search, and filter exams by category and difficulty
- **Real-time Exam Taking**: Full exam interface with question navigation, flagging, and timer
- **Instant Feedback**: Get detailed explanations after submitting exams
- **Performance Analytics**: View your scores and detailed answer review
- **Cross-Network Support**: Access the exam portal from any device on your local network
- **Multi-User Support**: Simultaneous access from multiple users
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS 3
- **Backend**: Express.js with CORS support for multi-device access
- **UI Components**: Radix UI, Lucide React icons
- **Styling**: TailwindCSS with custom theme colors

## Getting Started

### Prerequisites

- Node.js (v18+)
- PNPM package manager

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will start on `http://localhost:8080`

## Cross-Laptop Access with Login

To access the exam portal from another laptop on your network with secure authentication:

### Step 1: Find Your Machine's IP Address

**On Linux/macOS:**
```bash
# Check your local network IP
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**On Windows:**
```bash
ipconfig
```

Look for an IPv4 address like `192.168.x.x` or `10.0.x.x`

### Step 2: Start the Server

```bash
pnpm dev
```

The server will run on port 8080 by default.

### Step 3: Access from Another Laptop

On the client laptop, open your browser and navigate to:

```
http://YOUR_SERVER_IP:8080
```

Replace `YOUR_SERVER_IP` with the actual IP address from Step 1.

**Example:**
```
http://192.168.1.100:8080
```

### Step 4: Login with Your Credentials

You'll be redirected to the login page. Use one of the demo credentials:

**Demo Account:**
- **Email:** `student@example.com`
- **Password:** `demo123`

Or use the built-in demo account button for quick access.

**Other Demo Users:**
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password456`

### Network Requirements

- Both laptops must be on the **same network** (WiFi or LAN)
- Firewall must allow traffic on port 8080
- The server laptop must be running the dev server
- Each user has their own session maintained via authentication tokens

## App Structure

```
client/
├── pages/
│   ├── Index.tsx          # Homepage with features and CTA
│   ├── Exams.tsx          # Exam listing with search and filters
│   └── ExamTaking.tsx     # Full exam interface with timer
├── components/ui/         # Reusable UI components
├── App.tsx               # Main routing setup
└── global.css            # Tailwind configuration and theme

server/
├── index.ts              # Express server with CORS
└── routes/               # API endpoint handlers
```

## Authentication System

### Login Page (`/login`)
Secure user authentication with:
- Email and password input fields
- Demo account quick-access button
- Persistent session tokens
- Demo credentials display for easy access
- Error handling for invalid credentials

### Protected Routes
The following routes require authentication:
- `/exams` - Exam listing and browsing
- `/exam/:examId` - Exam taking interface

Unauthenticated users are automatically redirected to `/login`.

### Session Management
- Tokens stored in browser's localStorage
- 24-hour session validity
- Automatic logout when clearing browser data
- Sign out option in exam portal navigation

## Available Pages

### Home Page (`/`)
Landing page with features, statistics, and call-to-action to start exams.
- Accessible without login
- Sign In and Start Testing buttons

### Login Page (`/login`)
Secure user authentication with demo account options.
- Email/password authentication
- One-click demo account login
- Demo credentials displayed on page

### Exams List (`/exams`)
Browse all available exams with:
- Search functionality
- Category filtering
- Difficulty badges
- Exam metadata (duration, questions, passing score)
- User welcome message showing logged-in user
- Sign out button

### Exam Taking (`/exam/:examId`)
Full exam interface with:
- Real-time countdown timer
- Question navigation with visual indicators
- Flag important questions for review
- Radio button options for selection
- Submit exam with instant results

### Results Page
After exam submission:
- Final score and pass/fail status
- Detailed answer review
- Correct answers with explanations
- Retake exam option

## API Endpoints

### Authentication Endpoints

- `POST /api/login` - User authentication
  - Request: `{ email: string, password: string }`
  - Response: `{ token: string, user: { id, name, email } }`

- `POST /api/logout` - Logout user
  - Header: `Authorization: Bearer {token}`
  - Response: `{ message: "Logged out successfully" }`

### Exam Endpoints

- `GET /api/exams` - Get list of all available exams
- `GET /api/exam/:examId` - Get exam details
- `POST /api/exam-results` - Submit exam and save results

### Server Info

- `GET /api/server-info` - Get server IP and status (useful for cross-laptop setup)
- `GET /api/ping` - Health check endpoint

### Demo Credentials

Three demo accounts are pre-configured:

| Email | Password | Name |
|-------|----------|------|
| student@example.com | demo123 | Student Demo |
| john@example.com | password123 | John Doe |
| jane@example.com | password456 | Jane Smith |

## Customization

### Update Exam Content

Edit `client/pages/Exams.tsx` to modify exam titles, descriptions, and categories.

Edit `client/pages/ExamTaking.tsx` to add/modify exam questions and answers.

### Theme Colors

The color scheme is defined in `client/global.css`:

- **Primary**: Purple (`#7c3aed`) - Main actions and highlights
- **Secondary**: Orange-Red (`#ff3a00`) - Accents and secondary CTAs
- **Foreground**: Dark Brown (`#1a0f08`) - Text
- **Background**: White (`#ffffff`) - Main background

Customize these HSL values in the `:root` section of `global.css`.

### Styling

TailwindCSS classes are available throughout. Key utility classes:

- `bg-gradient-to-br from-primary to-secondary` - Gradient backgrounds
- `hover:opacity-90` - Hover states
- `transition-all` - Smooth transitions
- `rounded-xl` - Rounded corners

## Production Deployment

### Build

```bash
pnpm build
```

This creates optimized client and server builds in the `dist/` directory.

### Run Production Build

```bash
pnpm start
```

### Deploy to Netlify/Vercel

See the deploy-app skill documentation for step-by-step deployment instructions to make your exam portal live on the internet.

## Firewall Configuration

If the exam portal isn't accessible from other laptops, check your firewall:

**Linux (UFW):**
```bash
sudo ufw allow 8080
```

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Click "Allow another app"
4. Select Node.js or browse to it
5. Make sure both Private and Public are checked

**macOS:**
Should allow by default, but check System Preferences > Security & Privacy

## Troubleshooting

### Login Issues

**Invalid Credentials Error**
- Verify email and password match demo accounts
- Check that you're using the correct email format
- Try the demo account button for quick access
- Clear browser cache and try again

**Session Expired**
- Log back in with your credentials
- Check browser's localStorage isn't disabled
- Ensure cookies are enabled in browser settings

### Connection Refused
- Ensure the dev server is running (`pnpm dev`)
- Check that port 8080 is not in use: `lsof -i :8080`
- Verify both devices are on the same network
- Check firewall allows port 8080

### Can't Find Server IP
- Use `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Look for addresses starting with 192.168 or 10.0
- Avoid using 127.0.0.1 or localhost from other devices
- Try accessing the server info endpoint: `/api/server-info`

### Page Won't Load
- Check browser console for CORS errors
- Verify firewall allows port 8080
- Try accessing `/api/ping` to test connectivity
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Ensure you're logged in (redirected to /login if not authenticated)

### Exam Timer Issues
- Ensure system time is synchronized on all devices
- Check browser console for JavaScript errors
- Refresh the page and restart the exam
- Verify no other tabs have the same exam open

### Logout Not Working
- Clear localStorage manually: Press F12 → Application → LocalStorage → Clear
- Close and reopen the browser tab
- Try logging in from the home page

## Future Enhancements

- Authentication and user accounts
- Persistent exam results storage
- Admin dashboard for exam management
- Real-time proctoring capabilities
- Advanced reporting and analytics
- Mobile app version

## Support

For questions or issues, check the troubleshooting section or review the network setup instructions above.
