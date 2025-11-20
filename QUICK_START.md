# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Key Features Implemented

✅ **Home Page**
- Animated hero section with gradient text
- Stats section with animated counters
- About preview
- Featured projects grid

✅ **Projects Page**
- Filter by category (Web, Robotics, Research, Low-Level)
- Search functionality
- Interactive project cards with hover effects
- Responsive grid layout

✅ **Individual Project Pages**
- Detailed project information
- Technology stack display
- Key features and achievements
- Project-specific deep dives

✅ **About Page**
- Education timeline
- Skills with animated progress bars
- Leadership positions
- Languages section

✅ **Contact Page**
- Contact form with validation
- API endpoint for form submission
- Success/error messaging
- Contact information display

✅ **Design Features**
- Dark/Light mode toggle
- Smooth animations (Framer Motion)
- Responsive design (mobile-first)
- Modern UI with Tailwind CSS
- Custom scrollbar styling

## Next Steps

1. **Add Images/Videos**: Add project screenshots and videos to `public/` directory
2. **Configure Email**: Set up email service for contact form (see README.md)
3. **Custom Domain**: Configure custom domain when deploying
4. **Analytics**: Add Google Analytics or similar (optional)
5. **SEO**: Add sitemap.xml and robots.txt (optional)

## Project Data

All project information is stored in `lib/projects.ts`. To add or modify projects, edit this file.

## Customization

- **Colors**: Edit `tailwind.config.ts`
- **Fonts**: Update `app/globals.css` and `app/layout.tsx`
- **Content**: Update respective page components
- **Styling**: Modify Tailwind classes in components

## Deployment

The easiest way to deploy is using Vercel:

1. Push code to GitHub
2. Import repository on Vercel
3. Deploy automatically

For other options, see README.md.

