# Full-Stack Portfolio Website - Comprehensive Development Plan

## Executive Summary
Building a modern, professional, and eye-catching full-stack portfolio website to showcase Renan Lavirotte's projects, skills, and achievements. The website will feature original project presentations, smooth animations, and perfect functionality across all devices.

---

## 1. Technology Stack Selection

### Frontend
- **Next.js 14+ (App Router)** - React framework with SSR/SSG for optimal SEO and performance
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS for rapid, responsive design
- **Framer Motion** - Smooth, professional animations
- **React Icons** - Comprehensive icon library
- **Prism.js / Shiki** - Syntax highlighting for code snippets

### Backend
- **Next.js API Routes** - Built-in serverless functions (simplifies architecture)
- **Resend** or **Nodemailer** - Email service for contact form
- **MongoDB Atlas** (Optional) - For storing contact form submissions and analytics

### Additional Tools
- **React PDF** - For displaying research paper
- **React Player** - For video embeds (robotics project)
- **Three.js / React Three Fiber** (Optional) - 3D elements for visual appeal
- **GSAP** (Optional) - Advanced animations

### Deployment
- **Vercel** - Optimal for Next.js, automatic deployments, edge functions
- **Custom Domain** - Professional branding

---

## 2. Design Philosophy & UI/UX Principles

### Design Principles
1. **Minimalist yet Impactful** - Clean design with strategic use of whitespace
2. **Dark/Light Mode** - Modern toggle for user preference
3. **Smooth Animations** - Subtle, professional animations that enhance UX
4. **Responsive First** - Mobile-first approach, perfect on all devices
5. **Accessibility** - WCAG 2.1 AA compliance
6. **Performance** - Lighthouse score 90+ on all metrics

### Color Scheme
- **Primary**: Deep blue/purple gradient (#6366f1 to #8b5cf6)
- **Accent**: Vibrant orange/yellow (#f59e0b)
- **Background**: Dark mode (#0f172a) / Light mode (#ffffff)
- **Text**: High contrast for readability

### Typography
- **Headings**: Inter or Poppins (modern, professional)
- **Body**: Inter or System fonts (readable, fast-loading)

---

## 3. Website Structure & Pages

### 3.1 Home Page (/)
- **Hero Section**
  - Animated name/title with typing effect
  - Brief tagline: "Collaborative leader & full-stack developer"
  - CTA buttons: "View Projects" / "Contact Me"
  - Subtle animated background (particles or gradient)

- **About Preview**
  - Short bio (2-3 sentences)
  - Key stats: Education, Location, Languages
  - Animated skill badges

- **Featured Projects** (3-4 cards)
  - Hover effects with 3D transforms
  - Quick preview images
  - "View More" CTA

- **Quick Stats**
  - Projects completed
  - Technologies mastered
  - Years of experience
  - Animated counters

### 3.2 Projects Page (/projects)
- **Filter System**
  - By technology (JavaScript, Python, Assembly)
  - By type (Web, Robotics, Research, Low-level)
  - Search functionality

- **Project Cards** (Grid layout)
  - Large, interactive cards
  - Hover: Expand with more details
  - Each card shows:
    - Project image/video thumbnail
    - Title and short description
    - Tech stack badges
    - Date and duration
    - "Learn More" button

### 3.3 Individual Project Pages (/projects/[slug])

#### 3.3.1 Robotics Project
- **Hero Section**
  - Large video embed (YouTube/Vimeo) showing robot in action
  - Project title and timeline
  - Tech stack: Python, Sensors, Servo Motors

- **Project Overview**
  - Problem statement
  - Solution approach
  - Key achievements (50+ tests, 180-degree scanning)

- **Technical Deep Dive**
  - Architecture diagram (SVG/Canvas)
  - Code snippets (Python)
  - Sensor integration explanation
  - Performance optimization details

- **Results & Impact**
  - Before/after comparisons
  - Test results visualization
  - Lessons learned

- **Media Gallery**
  - Multiple videos/GIFs
  - Photos of robot
  - Test scenarios

#### 3.3.2 Track & Field Web App
- **Hero Section**
  - Screenshot carousel (mobile + desktop views)
  - Live demo link (if available)
  - Tech stack: JavaScript, REST APIs

- **Features Showcase**
  - Interactive feature cards
  - API integration explanation
  - Real-time data retrieval demo
  - Responsive design showcase

- **Technical Details**
  - API architecture diagram
  - Code snippets (GET/POST requests)
  - Testing methodology (85% bug reduction)
  - Performance metrics

- **User Experience**
  - Mobile screenshots
  - Desktop screenshots
  - User flow diagrams

#### 3.3.3 Discrete Math Research
- **Hero Section**
  - Research paper cover/preview
  - Project title and team info
  - Timeline: March 2025 - May 2025

- **Research Overview**
  - Abstract/summary
  - Key theorems proved
  - Mathematical formulas (LaTeX rendering)
  - Team collaboration details

- **Document Viewer**
  - Embedded PDF viewer
  - Download button
  - Table of contents navigation

- **Key Findings**
  - Highlighted theorems
  - Proof strategies explained
  - Visualizations (graphs, diagrams)
  - Impact and applications

#### 3.3.4 LMC Assembly Programming
- **Hero Section**
  - Code visualization
  - Project title and context
  - Tech: Assembly, Computer Architecture

- **Code Showcase**
  - Full program with syntax highlighting
  - Line-by-line explanations
  - Memory map visualization
  - Interactive memory mailbox display

- **Technical Achievements**
  - Efficiency: 27/100 mailboxes used
  - Edge case handling
  - Algorithm explanation
  - Performance analysis

- **Learning Outcomes**
  - Machine-level understanding
  - Memory management skills
  - Problem-solving approach

### 3.4 About Page (/about)
- **Personal Story**
  - Professional photo
  - Extended bio
  - Career journey timeline

- **Education Timeline**
  - University of Durham (2024-2028)
    - MEng Computer Science
    - First-class honours (79%)
    - Key modules listed
  - Louis de Broglie (2021-2024)
    - Highest honours
    - Subjects listed

- **Skills Section**
  - **Programming Languages**
    - JavaScript (with proficiency indicator)
    - Python
    - Assembly
  - **Creative Design**
    - Adobe Photoshop
    - After Effects
    - Blender
  - **Languages**
    - English (Fluent)
    - French (Fluent)
    - Japanese (Business level)

- **Leadership & Experience**
  - Track & Field Captain (Sept 2025 - present)
    - Team size: 20 athletes
    - Achievements: 20% growth
  - Durjam Executive Committee (March 2025 - present)
    - Event organization
    - 200+ participant hackathon

### 3.5 Contact Page (/contact)
- **Contact Form**
  - Name, Email, Subject, Message fields
  - Form validation
  - Success/error messages
  - Email integration (Resend/Nodemailer)

- **Contact Information**
  - Email: renan.lavirotte@gmail.com
  - Phone: 07729 446958
  - Social links (LinkedIn, GitHub, etc.)

- **Interactive Map** (Optional)
  - Location pin (Durham, UK)

---

## 4. Original Project Showcase Features

### 4.1 Interactive Elements
1. **3D Project Cards**
   - CSS 3D transforms on hover
   - Parallax scrolling effects
   - Depth and shadow animations

2. **Video Integration**
   - Lazy-loaded video embeds
   - Custom video player controls
   - Thumbnail previews

3. **Code Visualization**
   - Syntax-highlighted code blocks
   - Copy-to-clipboard functionality
   - Line-by-line explanations
   - Interactive memory visualizations (LMC)

4. **PDF Viewer**
   - In-browser PDF rendering
   - Zoom and navigation controls
   - Download functionality

5. **Timeline Components**
   - Animated vertical timeline
   - Hover interactions
   - Expandable details

6. **Skill Progress Bars**
   - Animated on scroll
   - Percentage indicators
   - Icon integration

### 4.2 Animation Strategy
- **Page Transitions**: Smooth fade/slide between pages
- **Scroll Animations**: Elements fade in as user scrolls
- **Hover Effects**: Subtle scale, shadow, and color transitions
- **Loading States**: Skeleton screens for content
- **Micro-interactions**: Button clicks, form submissions

---

## 5. Technical Implementation Plan

### Phase 1: Project Setup (Day 1)
1. Initialize Next.js project with TypeScript
2. Configure Tailwind CSS
3. Set up project structure
4. Install dependencies
5. Configure ESLint and Prettier
6. Set up Git repository

### Phase 2: Core Layout & Navigation (Day 2)
1. Create main layout component
2. Build responsive navigation bar
3. Implement dark/light mode toggle
4. Create footer component
5. Set up routing structure

### Phase 3: Home Page (Day 3-4)
1. Hero section with animations
2. About preview section
3. Featured projects grid
4. Stats section
5. Smooth scroll implementation

### Phase 4: Projects Page (Day 5-6)
1. Project grid layout
2. Filter and search functionality
3. Project card components
4. Responsive design
5. Animation integration

### Phase 5: Individual Project Pages (Day 7-10)
1. Dynamic routing setup
2. Robotics project page
3. Track & Field app page
4. Discrete math research page
5. LMC Assembly page
6. Reusable project components

### Phase 6: About Page (Day 11)
1. Personal story section
2. Education timeline
3. Skills visualization
4. Leadership section

### Phase 7: Contact Page (Day 12)
1. Contact form component
2. Form validation
3. Email integration
4. Success/error handling

### Phase 8: Polish & Optimization (Day 13-14)
1. Performance optimization
2. SEO implementation
3. Accessibility improvements
4. Cross-browser testing
5. Mobile responsiveness check
6. Animation refinements

### Phase 9: Deployment (Day 15)
1. Vercel deployment setup
2. Environment variables configuration
3. Custom domain setup (if applicable)
4. Final testing on production
5. Analytics integration (optional)

---

## 6. Content Strategy

### Project Descriptions
- **Hook**: Compelling opening sentence
- **Challenge**: What problem did it solve?
- **Solution**: How was it approached?
- **Technologies**: Detailed tech stack
- **Results**: Quantifiable achievements
- **Learning**: Key takeaways

### Visual Content
- High-quality screenshots
- Video demonstrations
- Diagrams and flowcharts
- Code snippets with context
- Before/after comparisons

---

## 7. Performance Targets

- **Lighthouse Scores**: 90+ across all categories
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Image Optimization**: WebP format, lazy loading
- **Code Splitting**: Automatic with Next.js
- **Bundle Size**: Minimize JavaScript bundles

---

## 8. SEO Strategy

- Meta tags for all pages
- Open Graph tags for social sharing
- Structured data (JSON-LD)
- Semantic HTML
- Sitemap generation
- robots.txt configuration
- Alt text for all images

---

## 9. Accessibility Features

- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus indicators
- Skip to content links

---

## 10. Future Enhancements (Post-MVP)

- Blog section
- Project filtering by tags
- Testimonials section
- Downloadable resume
- Multi-language support (English/French)
- Analytics dashboard
- Admin panel for content management

---

## 11. File Structure

```
portfolio/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx              # Home
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projects list
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual project
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectFilter.tsx
│   │   │   └── ProjectHero.tsx
│   │   ├── about/
│   │   │   ├── Timeline.tsx
│   │   │   └── Skills.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── animations.ts
│   │   └── projects.ts           # Project data
│   ├── public/
│   │   ├── images/
│   │   ├── videos/
│   │   └── documents/
│   ├── styles/
│   │   └── globals.css
│   └── layout.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 12. Success Metrics

- **User Engagement**: Time on site, pages per session
- **Performance**: Core Web Vitals scores
- **Accessibility**: WCAG compliance score
- **SEO**: Search engine rankings
- **Conversion**: Contact form submissions

---

## Conclusion

This comprehensive plan provides a structured approach to building a professional, modern, and engaging portfolio website. The focus is on showcasing projects in original ways while maintaining excellent performance, accessibility, and user experience.

**Next Steps**: Begin Phase 1 implementation.

