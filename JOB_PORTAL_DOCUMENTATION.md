# Job Portal - Project Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Pages & Components](#pages--components)
7. [State Management](#state-management)
8. [Data Models](#data-models)
9. [Styling Architecture](#styling-architecture)
10. [Screenshots](#screenshots)
11. [Future Enhancements](#future-enhancements)

---

## Project Overview

**Job Portal** is a modern, feature-rich job search platform built with React.js. It provides job seekers with tools to search jobs, save favorites, build resumes, and track applications - all in a beautiful dark-themed UI.

### Key Highlights

- **Frontend-Only**: No backend required, uses localStorage for persistence
- **Modern UI/UX**: Dark theme with purple accents, smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Complete Feature Set**: Search, filters, applications, resume builder

---

## Features

### 1. Job Search & Discovery
- Full-text search by job title, company, skills
- Advanced filters:
  - Location (city-based)
  - Job Type (Full-time, Part-time, Contract, Remote)
  - Experience Level (Entry, Mid, Senior, Lead)
  - Salary Range (slider filter)
  - Category (Engineering, Design, Marketing, etc.)
- Sort options (Recent, Salary High/Low, Popular)

### 2. Job Details & Application
- Comprehensive job information display
- Salary range visualization
- Requirements & responsibilities lists
- Benefits section
- Skills tags
- Company quick-view card
- One-click apply with cover letter
- Save/bookmark jobs

### 3. Saved Jobs
- Bookmark favorite jobs
- Persistent storage (localStorage)
- Quick access from navigation
- Remove with single click

### 4. Resume Builder
- **Personal Information**
  - Full name, email, phone
  - Location, professional title
  - Professional summary
- **Work Experience**
  - Multiple entries support
  - Job title, company, dates
  - Current job toggle
  - Description field
- **Education**
  - Degree, school, location
  - Date range
  - Optional description
- **Skills**
  - Tag-based input
  - Add/remove functionality
- **Projects**
  - Project name & description
  - Technologies used
  - Project links
- **Live Preview**: Real-time resume preview
- **Download**: Export as text file

### 5. Application Tracking
- Track all submitted applications
- Status indicators:
  - Pending
  - Under Review
  - Interview
  - Accepted
  - Rejected
- Application statistics dashboard
- Applied date tracking

### 6. Company Pages
- Company directory with search
- Industry filtering
- Company profiles with:
  - About section
  - Culture description
  - Benefits list
  - Open positions
  - Ratings & reviews
- Professional card design with:
  - Top Rated badges
  - Hiring indicators
  - Grid/List view toggle

### 7. User Authentication (Mock)
- Sign In / Sign Up forms
- Social auth buttons (UI only)
- Form validation
- Password visibility toggle
- Remember me option

### 8. User Profile
- Personal information management
- Quick stats (applications, saved jobs, skills)
- Navigation to all features
- Settings section
- Sign out functionality

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **React Router DOM 7** | Client-side routing |
| **Framer Motion** | Animations |
| **React Icons** | Icon library (Feather Icons) |
| **Context API + useReducer** | State management |
| **localStorage** | Data persistence |
| **CSS3** | Styling (custom, no framework) |

---

## Project Structure

```
Job-Portal/
├── public/
│   └── vite.svg                 # Favicon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Footer.jsx       # Site footer
│   │   │   ├── ScrollToTop.jsx  # Auto-scroll on route change
│   │   │   ├── Toast.jsx        # Notification component
│   │   │   └── ToastContainer.jsx
│   │   └── job/
│   │       ├── JobCard.jsx      # Job listing card
│   │       └── JobFilters.jsx   # Filter sidebar
│   ├── context/
│   │   └── JobContext.jsx       # Global state management
│   ├── data/
│   │   ├── jobs.js              # Mock job data (16 jobs)
│   │   └── companies.js         # Mock company data (16 companies)
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Jobs.jsx             # Job listings
│   │   ├── JobDetail.jsx        # Single job view
│   │   ├── SavedJobs.jsx        # Bookmarked jobs
│   │   ├── Applications.jsx     # Application tracker
│   │   ├── Companies.jsx        # Company directory
│   │   ├── CompanyDetail.jsx    # Company profile
│   │   ├── Resume.jsx           # Resume builder
│   │   ├── Auth.jsx             # Login/Signup
│   │   └── Profile.jsx          # User profile
│   ├── App.jsx                  # Root component with routes
│   ├── App.css                  # Component styles (~2500 lines)
│   ├── index.css                # Global styles & variables
│   └── main.jsx                 # Entry point
├── .gitignore                   # Git ignore rules
├── index.html                   # HTML template
├── package.json                 # Dependencies & scripts
└── vite.config.js               # Vite configuration
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Job-Portal.git
   cd Job-Portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## Pages & Components

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, categories |
| Jobs | `/jobs` | Job listings with filters |
| Job Detail | `/job/:id` | Single job with apply option |
| Saved Jobs | `/saved` | Bookmarked jobs list |
| Applications | `/applications` | Application tracker |
| Companies | `/companies` | Company directory |
| Company Detail | `/company/:id` | Company profile |
| Resume | `/resume` | Resume builder |
| Auth | `/auth` | Login/Signup |
| Profile | `/profile` | User dashboard |

### Key Components

**Navbar**
- Logo with home link
- Search bar (desktop)
- Navigation links
- Saved jobs badge counter
- Auth buttons / User menu
- Mobile hamburger menu

**JobCard**
- Company logo/initial
- Job title & company
- Location, type, experience
- Skills tags (max 4)
- Salary range
- Save button
- Posted date

**JobFilters**
- Location dropdown
- Job type checkboxes
- Experience level checkboxes
- Salary range slider
- Clear all button
- Mobile drawer mode

**Toast Notifications**
- Success (green)
- Error (red)
- Warning (yellow)
- Info (blue)
- Auto-dismiss after 4 seconds

---

## State Management

### JobContext

The application uses React Context API with useReducer for global state.

**State Structure:**
```javascript
{
  jobs: [],              // All job listings
  companies: [],         // All companies
  savedJobs: [],         // Array of saved job IDs
  applications: [],      // User's applications
  user: null,            // Current user object
  resume: {              // User's resume data
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
    projects: []
  },
  filters: {             // Active search filters
    search: '',
    location: '',
    jobType: [],
    experienceLevel: [],
    salaryRange: [0, 300000],
    category: ''
  },
  toasts: []             // Active notifications
}
```

**Actions:**
- `SET_FILTERS` / `RESET_FILTERS`
- `TOGGLE_SAVE_JOB`
- `APPLY_TO_JOB`
- `UPDATE_APPLICATION_STATUS`
- `LOGIN` / `LOGOUT`
- `UPDATE_RESUME` / `UPDATE_PERSONAL_INFO`
- `ADD_EXPERIENCE` / `UPDATE_EXPERIENCE` / `DELETE_EXPERIENCE`
- `ADD_EDUCATION` / `UPDATE_EDUCATION` / `DELETE_EDUCATION`
- `ADD_SKILL` / `REMOVE_SKILL`
- `ADD_PROJECT` / `UPDATE_PROJECT` / `DELETE_PROJECT`
- `ADD_TOAST` / `REMOVE_TOAST`

**Helper Functions:**
- `getFilteredJobs()` - Apply filters to job list
- `getSavedJobs()` - Get bookmarked jobs
- `isJobSaved(id)` - Check if job is saved
- `hasApplied(id)` - Check if already applied
- `getJobById(id)` - Get single job
- `getCompanyById(id)` - Get single company
- `getJobsByCompany(id)` - Get company's jobs
- `getApplicationStats()` - Application statistics
- `addToast(toast)` - Show notification

---

## Data Models

### Job Object
```javascript
{
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  companyId: 1,
  location: "San Francisco, CA",
  type: "Full-time",           // Full-time|Part-time|Contract|Remote
  experienceLevel: "Senior",   // Entry-Level|Mid-Level|Senior|Lead
  category: "Engineering",
  salaryMin: 150000,
  salaryMax: 200000,
  description: "...",
  requirements: ["..."],
  responsibilities: ["..."],
  benefits: ["..."],
  skills: ["React", "TypeScript"],
  postedAt: "2024-12-01",
  applicants: 45,
  featured: true
}
```

### Company Object
```javascript
{
  id: 1,
  name: "TechCorp Inc.",
  logo: null,
  industry: "Technology",
  size: "1000-5000",
  founded: 2010,
  location: "San Francisco, CA",
  website: "https://...",
  description: "...",
  about: "...",
  culture: "...",
  benefits: ["..."],
  openPositions: 12,
  rating: 4.5,
  reviews: 234
}
```

### Application Object
```javascript
{
  id: 1234567890,
  jobId: 1,
  appliedAt: "2024-12-09T10:30:00.000Z",
  status: "pending",    // pending|reviewing|interview|accepted|rejected
  coverLetter: "...",
  resume: {...}
}
```

### Resume Object
```javascript
{
  personalInfo: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 555-123-4567",
    location: "San Francisco, CA",
    title: "Software Engineer",
    summary: "..."
  },
  experience: [{
    id: 1,
    title: "Senior Developer",
    company: "Tech Co",
    location: "NYC",
    startDate: "2020-01",
    endDate: "2024-01",
    current: false,
    description: "..."
  }],
  education: [{
    id: 1,
    degree: "B.S. Computer Science",
    school: "MIT",
    location: "Cambridge, MA",
    startDate: "2016-09",
    endDate: "2020-05",
    description: "..."
  }],
  skills: ["JavaScript", "React", "Node.js"],
  projects: [{
    id: 1,
    name: "E-commerce App",
    description: "...",
    technologies: "React, Node.js",
    link: "https://github.com/..."
  }]
}
```

---

## Styling Architecture

### CSS Variables (Theme)
```css
:root {
  /* Primary Colors */
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;

  /* Background */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #16161f;

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;

  /* Status */
  --success: #22c55e;
  --warning: #eab308;
  --error: #ef4444;
}
```

### Design Principles
- **Dark Theme**: Easy on eyes, modern look
- **Purple Accents**: Primary brand color
- **Gradient Effects**: Hero sections, badges
- **Subtle Animations**: Hover states, page transitions
- **Card-Based Layout**: Consistent content containers
- **Responsive Grid**: CSS Grid with breakpoints

### Breakpoints
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

---

## Screenshots

### Home Page
- Hero section with search
- Feature cards
- Category grid
- Featured jobs
- CTA section

### Jobs Page
- Filter sidebar
- Job cards grid
- Sort dropdown
- Pagination (UI ready)

### Job Detail
- Company header
- Job description
- Requirements list
- Apply modal
- Company sidebar

### Companies Page
- Hero with stats
- Filter chips
- Professional cards
- Grid/List toggle
- Industry section

### Resume Builder
- Section tabs
- Form inputs
- Live preview
- Download button

---

## Future Enhancements

### Planned Features
1. **Backend Integration**
   - Node.js/Express API
   - MongoDB database
   - User authentication (JWT)

2. **Advanced Search**
   - Elasticsearch integration
   - Auto-suggestions
   - Recent searches

3. **Real-time Features**
   - Job alerts
   - Application status notifications
   - Chat with recruiters

4. **Enhanced Resume**
   - Multiple templates
   - PDF export
   - AI-powered suggestions

5. **Social Features**
   - Company reviews
   - Salary insights
   - Employee referrals

6. **Employer Portal**
   - Post jobs
   - Manage applications
   - Analytics dashboard

---

## Author

**Job Portal** - A modern job search platform

Built with React.js

---

*Last Updated: December 2024*
