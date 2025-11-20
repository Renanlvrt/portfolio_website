<<<<<<< HEAD
# portfolio_website
=======
# Renan Lavirotte - Portfolio Website

A modern, full-stack portfolio website showcasing projects, skills, and achievements. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, professional UI with dark/light mode support
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Animations**: Smooth animations using Framer Motion
- **Project Showcase**: Detailed project pages with original presentations
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Friendly**: Proper meta tags and structured data
- **Accessible**: WCAG compliant with keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Version 18+ recommended

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route pages
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── projects/      # Projects listing & detail pages
│   │   └── contact/       # Contact page
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── projects/         # Project-related components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
│   ├── projects.ts       # Project data
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment variables (optional for contact form):

```env
# Email Service (Resend example)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=portfolio@yourdomain.com
EMAIL_TO=renan.lavirotte@gmail.com
```

### Contact Form Setup

The contact form API route is set up at `/app/api/contact/route.ts`. To enable email sending:

1. Choose an email service (Resend, Nodemailer, SendGrid, etc.)
2. Install the required package
3. Update the API route with your email service configuration
4. Add environment variables

Example with Resend:
```bash
npm install resend
```

## 📝 Customization

### Update Project Data

Edit `lib/projects.ts` to add, modify, or remove projects.

### Update Personal Information

- **About Page**: Edit `app/about/page.tsx`
- **Contact Info**: Update `components/layout/Footer.tsx` and `app/contact/page.tsx`
- **Metadata**: Update `app/layout.tsx`

### Styling

- **Colors**: Modify `tailwind.config.ts` to change the color scheme
- **Fonts**: Update font imports in `app/globals.css` and `app/layout.tsx`
- **Animations**: Adjust animation settings in components using Framer Motion

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure settings
4. Add environment variables if needed
5. Deploy!

### Other Deployment Options

- **Netlify**: Similar to Vercel, supports Next.js
- **AWS Amplify**: Full-stack deployment
- **Self-hosted**: Use Docker or traditional hosting with Node.js support

## 📱 Pages

- **Home** (`/`): Hero section, stats, about preview, featured projects
- **Projects** (`/projects`): All projects with filtering and search
- **Project Detail** (`/projects/[slug]`): Individual project pages
- **About** (`/about`): Education, skills, leadership experience
- **Contact** (`/contact`): Contact form and information

## 🎨 Design Features

- **Dark/Light Mode**: Toggle between themes
- **Smooth Animations**: Scroll-triggered and hover animations
- **Interactive Cards**: 3D hover effects on project cards
- **Gradient Text**: Eye-catching gradient text effects
- **Responsive Grid**: Adaptive layouts for all screen sizes

## 🔍 SEO

- Meta tags for all pages
- Open Graph tags for social sharing
- Semantic HTML structure
- Sitemap generation (can be added)
- robots.txt configuration

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Renan Lavirotte**
- Email: renan.lavirotte@gmail.com
- Phone: 07729 446958

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

Built with ❤️ using Next.js and TypeScript

>>>>>>> 70847b4 (first test)
