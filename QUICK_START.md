# ExamHub Quick Start Guide

## 🚀 Quick Setup

### On Your Main Laptop (Server)

1. **Start the development server:**
   ```bash
   pnpm dev
   ```
   Server runs on port 8080

2. **Find your IP address:**
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```
   Look for: `192.168.x.x` or `10.0.x.x`

### On Another Laptop (Client)

1. **Open your browser and go to:**
   ```
   http://YOUR_SERVER_IP:8080
   ```
   Example: `http://192.168.1.100:8080`

2. **Login with demo credentials:**
   - Email: `student@example.com`
   - Password: `demo123`
   
   Or click "Try Demo Account" button

3. **Start taking exams!**

---

## 📝 Demo Accounts

| Email | Password |
|-------|----------|
| student@example.com | demo123 |
| john@example.com | password123 |
| jane@example.com | password456 |

---

## 🌐 Network Requirements

✅ Both laptops on same WiFi/LAN
✅ Port 8080 not blocked by firewall
✅ Server laptop running `pnpm dev`

---

## 🔑 Key Features

- **Secure Login** - Email/password authentication
- **Exam Browser** - Search, filter by category
- **Timed Exams** - Real-time countdown timer
- **Instant Results** - See score immediately
- **Review Answers** - Learn from explanations
- **Multi-User** - Multiple people can log in

---

## 📱 Page Routes

| Route | Purpose | Requires Login |
|-------|---------|----------------|
| `/` | Home page | No |
| `/login` | Login page | No |
| `/exams` | Browse exams | Yes |
| `/exam/:id` | Take exam | Yes |

---

## ❌ Troubleshooting

**Can't access from other laptop?**
- Verify server is running: `pnpm dev`
- Check firewall allows port 8080
- Confirm both devices on same network
- Use correct IP address (not 127.0.0.1)

**Login not working?**
- Use demo credentials exactly as shown
- Clear browser cache: Ctrl+Shift+Delete
- Ensure cookies/localStorage enabled

**Page keeps redirecting to login?**
- Verify localStorage isn't disabled
- Check browser console for errors
- Try incognito/private window

---

## 🛠️ Development

**Available Commands:**
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm typecheck    # TypeScript check
pnpm test         # Run tests
pnpm start        # Run production build
```

---

## 📚 Full Documentation

See `SETUP.md` for detailed setup, customization, and deployment instructions.

---

**Ready to use!** 🎉 Start the server and share the IP with classmates.
