# Xpay IT Exams - Branding Guide

## Brand Overview

Xpay IT Exams is a professional IT certification exam platform branded with Xpay's modern, corporate identity. The platform features a sophisticated blue-cyan-green gradient design inspired by the Xpay payment gateway company.

**Website Reference:** https://www.xpaycheckout.com/

## Brand Identity

### Logo
- **Symbol:** Large "X" in gradient colors
- **Colors:** Blue → Cyan → Green gradient
- **Style:** Modern, minimalist, corporate
- **Size Variants:** 
  - Navigation: 40px × 40px
  - Hero: 80px × 80px (Larger)
  - Login: 80px × 80px with label

### Brand Name
- **Primary:** "Xpay"
- **Secondary:** "IT Exams" / "IT Professional Exams"
- **Full:** "Xpay IT Exams"

### Company Tagline
- "Professional IT Certifications for Global Careers"
- "Master Industry-Leading Certifications"
- "International IT Certification Platform"

## Color Palette

### Primary Colors
```
Primary Blue:     #295BFF (RGB: 41, 91, 255)
Secondary Cyan:   #00D4FF (RGB: 0, 212, 255)  
Accent Green:     #00E469 (RGB: 0, 228, 105)
```

### HSL Values (Used in Tailwind)
```
Primary:   228 100% 53%   (#295BFF)
Secondary: 193 100% 50%   (#00D4FF)
Accent:    145 100% 37%   (#00E469)
```

### Dark Mode
```
Background Dark:  #000000 / #000C1F
Text White:       #FFFFFF
Text Gray:        #FFFFFF with opacity
```

### Light Mode
```
Background:       #FFFFFF
Foreground:       #1A1A1A
Muted:           #F7F8F8
Border:          #E5E7EB
```

## Typography

### Fonts Used
- **Headings:** Outfit, Poppins (sans-serif)
- **Body Text:** Inter, DM Sans (sans-serif)
- **Monospace:** Monaco, Courier New (for code)

### Font Sizes
- **H1 (Hero):** 44-64px, 500-600 weight, Poppins
- **H2 (Section):** 36px, 600 weight, Outfit
- **H3 (Card):** 20px, 600 weight, Outfit
- **H4 (Small):** 16-18px, 500 weight, Outfit
- **Body:** 14-16px, 400 weight, Inter
- **Small:** 12-14px, 400 weight, DM Sans

## Design Components

### Buttons
```
Primary Button (CTA):
- Background: Gradient from-primary to-blue-600
- Padding: px-8 py-4 (larger) or px-6 py-2.5 (medium)
- Border-radius: rounded-full (200px)
- Box-shadow: shadow-lg shadow-primary/30
- Hover: opacity-90

Secondary Button:
- Background: transparent
- Border: 2px border-primary / border-white/30
- Padding: px-8 py-4
- Border-radius: rounded-full
- Hover: bg-primary/5 or bg-white/10
```

### Cards
```
Exam Card:
- Background: white / bg-white/5
- Border: 1px border-blue-100 / border-white/20
- Border-radius: rounded-2xl
- Padding: p-6 to p-8
- Box-shadow: hover:shadow-xl
- Backdrop-filter: backdrop-blur-lg (dark variant)
```

### Input Fields
```
Text Input:
- Background: bg-white/5 (dark) or bg-white (light)
- Border: 1px border-white/20 / border-border
- Border-radius: rounded-xl
- Padding: px-4 py-3
- Icon placement: pl-12 (icon on left)
- Focus: ring-2 ring-primary, bg-white/10
```

### Badges
```
Difficulty Badges:
- Easy: bg-green-100 text-green-800
- Medium: bg-amber-100 text-amber-800
- Hard: bg-red-100 text-red-800
- Rounded: rounded-full
- Padding: px-3 py-1
- Font: text-xs font-semibold
```

## Page Designs

### Homepage (`/`)
- **Hero:** Dark gradient (slate-900 to blue-900) with blue-cyan-green blob glows
- **Navigation:** White background with Xpay logo
- **Buttons:** Gradient blue with shadow
- **Sections:** 
  - Hero with diagonal split layout
  - Features (4-column cards)
  - Stats (white text on dark background)
  - Footer (dark with links)

### Login Page (`/login`)
- **Background:** Dark gradient with animated blob glows
- **Card:** Semi-transparent white with backdrop blur
- **Logo:** Centered with "Xpay IT Exams" label
- **Inputs:** Frosted glass effect (bg-white/5)
- **Button:** Gradient primary with glow shadow
- **Security Badge:** Green accent with opacity
- **Demo Section:** Semi-transparent info box

### Exams Page (`/exams`)
- **Navigation:** White with Xpay logo, user welcome
- **Header:** Light blue gradient background
- **Sidebar:** Search + category filters
- **Cards Grid:** 2-column responsive grid
- **Card Actions:** "Start Exam" gradient button
- **Logout:** Primary border button with logout icon

### Exam Taking Page (`/exam/:id`)
- **Header:** Dark sticky with timer
- **Question Navigator:** White card with numbered grid
- **Main Content:** White card with options
- **Results:** Final score in gradient text
- **Buttons:** Previous/Next navigation + Submit

## Spacing & Layout

### Container Max-Width
```
max-w-7xl = 80rem (1280px)
Padding: px-4 sm:px-6 lg:px-8
```

### Sections
```
Hero: pt-20 pb-32
Features: py-24
Stats: py-24
Cards Grid: gap-8
```

### Border Radius
```
Standard: rounded-lg (0.5rem)
Large: rounded-2xl (1rem)
Extra Large: rounded-3xl (1.5rem)
Full: rounded-full
```

## Gradient Patterns

### Hero Gradient
```
background: linear-gradient(135deg, #0093FF, #22EBBB, #00E469)
filter: blur(100px)
opacity: 0.3-0.4
```

### Button Gradient
```
background: linear-gradient(to right, rgb(41, 91, 255), rgb(0, 147, 255))
Hover: opacity-90 transition
```

### Text Gradient (Optional)
```
background: linear-gradient(to right, var(--primary), var(--secondary))
background-clip: text
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

## Interactive States

### Hover Effects
```
Buttons: opacity-90, shadow-lg
Cards: shadow-xl, border-primary/40
Links: text-primary transition-colors
Inputs: bg-white/10 focus:ring-2 focus:ring-primary
```

### Focus States
```
Inputs: ring-2 ring-primary, border-transparent
Buttons: shadow-lg, opacity-90
```

### Active States
```
Navigation: text-white font-medium
Category Filters: bg-primary text-white
Selected Options: border-primary bg-primary/5
```

## Accessibility

### Color Contrast
- White text on dark background: ✓ High contrast
- Dark text on light background: ✓ High contrast
- Use text-opacity for secondary information

### Icon Usage
- Always pair icons with text labels
- Use lucide-react icons (consistent style)
- Size: w-4 h-4 (small), w-5 h-5 (medium), w-6 h-6 (large)

### Form Labels
- Always include text labels (not placeholder-only)
- Use `font-semibold` for clarity
- Proper spacing between label and input

## Responsive Design

### Breakpoints (Tailwind)
```
sm: 640px    (small phones)
md: 768px    (tablets)
lg: 1024px   (laptops)
xl: 1280px   (desktops)
2xl: 1536px  (large monitors)
```

### Mobile-First Approach
```
Base styles apply to mobile
sm:, md:, lg: for larger screens
Use `hidden lg:block` to hide on mobile
Use `block lg:hidden` to show mobile-only
```

## Dark Mode Support

The platform uses light mode by default with dark mode support available:

```css
/* Light mode (default) */
:root {
  --background: white;
  --foreground: dark text;
}

/* Dark mode (optional future) */
.dark {
  --background: #000;
  --foreground: white;
}
```

## File References

### Theme Configuration
- **Primary File:** `client/global.css`
- **Tailwind Config:** `tailwind.config.ts`
- **Color Variables:** HSL format in `:root`

### Page Components
- **Homepage:** `client/pages/Index.tsx`
- **Login:** `client/pages/Login.tsx`
- **Exams List:** `client/pages/Exams.tsx`
- **Exam Taking:** `client/pages/ExamTaking.tsx`

## Customization Guide

### Change Primary Color
Edit `client/global.css`:
```css
--primary: 228 100% 53%;  /* Change these HSL values */
```

### Change Accent Colors
```css
--secondary: 193 100% 50%;  /* Cyan */
--accent: 145 100% 37%;     /* Green */
```

### Update Typography
Edit font-family in components or use Tailwind classes:
```html
<h1 class="font-poppins text-5xl font-bold">...</h1>
```

### Modify Border Radius
Edit `tailwind.config.ts`:
```typescript
borderRadius: {
  lg: "1rem",    // Change this
  md: "0.75rem",
  sm: "0.5rem"
}
```

## Animation & Transitions

### Fade & Scale
```
transition-all duration-300
hover:scale-105
hover:opacity-90
```

### Smooth Transforms
```
transform hover:scale-105
transition-transform duration-300
```

### Gradient Glows
```
shadow-lg shadow-primary/30
hover:shadow-xl hover:shadow-primary/50
```

## Performance Notes

- Images: Use WebP format with fallback
- Icons: Lucide React (lightweight SVG)
- Gradients: CSS gradients (no images)
- Animations: CSS transitions (minimal JS)
- Bundle Size: ~560KB gzipped (acceptable for comprehensive app)

## Future Enhancements

- [ ] Add CSS animations for loading states
- [ ] Implement dark mode toggle
- [ ] Add progress bars for exams
- [ ] Create certificate design
- [ ] Add data visualization charts
- [ ] Implement real-time notifications
- [ ] Add exam result PDF export

---

**Last Updated:** May 2024
**Version:** 1.0
**Brand Compliance:** 100% aligned with Xpay corporate identity
