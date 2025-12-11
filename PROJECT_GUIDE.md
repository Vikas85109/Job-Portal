# JobHunt - Complete Project Guide

---

# TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Project Setup](#2-project-setup)
3. [Architecture Overview](#3-architecture-overview)
4. [File Structure](#4-file-structure)
5. [Application Entry Point](#5-application-entry-point)
6. [State Management - JobContext](#6-state-management---jobcontext)
7. [Routing Configuration](#7-routing-configuration)
8. [Pages Deep Dive](#8-pages-deep-dive)
9. [Components Deep Dive](#9-components-deep-dive)
10. [Data Layer](#10-data-layer)
11. [User Flow Diagrams](#11-user-flow-diagrams)
12. [Styling System](#12-styling-system)
13. [Code Examples](#13-code-examples)
14. [API Reference](#14-api-reference)

---

# 1. EXECUTIVE SUMMARY

## Project Name: JobHunt

## Description
JobHunt is a modern, feature-rich job portal web application built with React. It enables job seekers to search for jobs, explore companies, build resumes, apply for positions, and track their applications.

## Key Statistics

| Metric | Value |
|--------|-------|
| Total Files | 24 source files |
| Pages | 10 |
| Components | 7 |
| Lines of Code | ~4,500+ |
| Mock Jobs | 16 |
| Mock Companies | 16 |

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  React 18.3.1        │  UI Framework                        │
│  React Router 7.1.0  │  Client-side Routing                 │
│  Framer Motion 11.15 │  Animations                          │
│  React Icons 5.4.0   │  Icon Library                        │
├─────────────────────────────────────────────────────────────┤
│                    BUILD TOOLS                               │
├─────────────────────────────────────────────────────────────┤
│  Vite 6.0.5          │  Build Tool & Dev Server             │
│  ESLint 9.17.0       │  Code Linting                        │
├─────────────────────────────────────────────────────────────┤
│                    STATE & STORAGE                           │
├─────────────────────────────────────────────────────────────┤
│  Context API         │  Global State Management             │
│  useReducer          │  State Updates                       │
│  localStorage        │  Data Persistence                    │
└─────────────────────────────────────────────────────────────┘
```

---

# 2. PROJECT SETUP

## Installation Steps

```bash
# Step 1: Clone or create project directory
mkdir job-portal
cd job-portal

# Step 2: Initialize with Vite
npm create vite@latest . -- --template react

# Step 3: Install dependencies
npm install react-router-dom@7 framer-motion react-icons

# Step 4: Start development server
npm run dev
```

## Package.json Configuration

```json
{
  "name": "job-portal",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.15.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "vite": "^6.0.5"
  }
}
```

## Available Commands

| Command | Description | Output |
|---------|-------------|--------|
| `npm run dev` | Start dev server | localhost:5173 |
| `npm run build` | Production build | /dist folder |
| `npm run preview` | Preview build | localhost:4173 |
| `npm run lint` | Run linter | Console output |

---

# 3. ARCHITECTURE OVERVIEW

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    index.html                              │  │
│  │                        │                                   │  │
│  │                        ▼                                   │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                   main.jsx                           │  │  │
│  │  │              (Application Entry)                     │  │  │
│  │  └─────────────────────┬───────────────────────────────┘  │  │
│  │                        │                                   │  │
│  │                        ▼                                   │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              React.StrictMode                        │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │              BrowserRouter                     │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐  │  │  │  │
│  │  │  │  │            JobProvider                   │  │  │  │  │
│  │  │  │  │         (Context + Reducer)              │  │  │  │  │
│  │  │  │  │  ┌───────────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │              App                   │  │  │  │  │  │
│  │  │  │  │  │  ┌─────────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │  Navbar                     │  │  │  │  │  │  │
│  │  │  │  │  │  │  Routes (10 pages)          │  │  │  │  │  │  │
│  │  │  │  │  │  │  Footer                     │  │  │  │  │  │  │
│  │  │  │  │  │  │  ToastContainer             │  │  │  │  │  │  │
│  │  │  │  │  │  └─────────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  └───────────────────────────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                       localStorage                               │
│  ┌──────────────┬──────────────┬────────────┬────────────────┐  │
│  │  savedJobs   │ applications │    user    │     resume     │  │
│  └──────────────┴──────────────┴────────────┴────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── ScrollToTop
├── Navbar
│   ├── Logo
│   ├── SearchBar
│   ├── NavLinks
│   └── UserActions
├── Routes
│   ├── Home
│   │   ├── HeroSection
│   │   ├── FeaturesSection
│   │   ├── CategoriesSection
│   │   ├── FeaturedJobsSection
│   │   └── CTASection
│   ├── Jobs
│   │   ├── SearchBar
│   │   ├── JobFilters
│   │   └── JobCard[]
│   ├── JobDetail
│   │   ├── JobHeader
│   │   ├── JobContent
│   │   ├── ApplySidebar
│   │   └── ApplyModal
│   ├── Companies
│   │   ├── SearchBar
│   │   ├── FilterChips
│   │   └── CompanyCard[]
│   ├── CompanyDetail
│   │   ├── CompanyHeader
│   │   ├── TabNavigation
│   │   └── TabContent
│   ├── SavedJobs
│   │   └── JobCard[]
│   ├── Applications
│   │   ├── StatsCards
│   │   └── ApplicationCard[]
│   ├── Resume
│   │   ├── SectionTabs
│   │   ├── FormSections
│   │   └── ResumePreview
│   ├── Auth
│   │   ├── LoginForm
│   │   ├── RegisterForm
│   │   └── SocialAuth
│   └── Profile
│       ├── Sidebar
│       └── TabContent
├── Footer
└── ToastContainer
    └── Toast[]
```

---

# 4. FILE STRUCTURE

## Complete Project Tree

```
job-portal/
│
├── 📁 public/
│   ├── favicon.svg              # Custom briefcase favicon
│   └── vite.svg                 # Default Vite icon
│
├── 📁 src/
│   │
│   ├── 📁 components/
│   │   │
│   │   ├── 📁 common/
│   │   │   ├── Navbar.jsx       # [105 lines] Navigation + Search
│   │   │   ├── Footer.jsx       # [77 lines]  Site footer
│   │   │   ├── ScrollToTop.jsx  # [15 lines]  Scroll restoration
│   │   │   ├── Toast.jsx        # [35 lines]  Single notification
│   │   │   └── ToastContainer.jsx # [20 lines] Toast manager
│   │   │
│   │   └── 📁 job/
│   │       ├── JobCard.jsx      # [105 lines] Job listing card
│   │       └── JobFilters.jsx   # [138 lines] Filter sidebar
│   │
│   ├── 📁 context/
│   │   └── JobContext.jsx       # [368 lines] Global state
│   │
│   ├── 📁 data/
│   │   ├── jobs.js              # [659 lines] 16 job listings
│   │   └── companies.js         # [387 lines] 16 companies
│   │
│   ├── 📁 pages/
│   │   ├── Home.jsx             # [282 lines] Landing page
│   │   ├── Jobs.jsx             # [139 lines] Job listings
│   │   ├── JobDetail.jsx        # [424 lines] Single job
│   │   ├── Companies.jsx        # [357 lines] Company directory
│   │   ├── CompanyDetail.jsx    # [208 lines] Single company
│   │   ├── SavedJobs.jsx        # [67 lines]  Bookmarks
│   │   ├── Applications.jsx     # [191 lines] Applications
│   │   ├── Resume.jsx           # [964 lines] Resume builder
│   │   ├── Auth.jsx             # [245 lines] Login/Register
│   │   └── Profile.jsx          # [355 lines] User profile
│   │
│   ├── App.jsx                  # [44 lines]  Root component
│   ├── App.css                  # [2000+ lines] All styles
│   ├── index.css                # [100 lines] Base styles
│   └── main.jsx                 # [17 lines]  Entry point
│
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js               # Vite config
├── eslint.config.js             # ESLint config
├── README.md                    # Project readme
├── DOCUMENTATION.md             # Technical docs
└── PROJECT_GUIDE.md             # This file
```

## File Size Summary

| Category | Files | Lines |
|----------|-------|-------|
| Pages | 10 | ~3,232 |
| Components | 7 | ~495 |
| Context | 1 | ~368 |
| Data | 2 | ~1,046 |
| Styles | 2 | ~2,100 |
| Config | 4 | ~100 |
| **Total** | **26** | **~7,341** |

---

# 5. APPLICATION ENTRY POINT

## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JobHunt - Find Your Dream Job</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## main.jsx (Entry Point)

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { JobProvider } from './context/JobContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JobProvider>
        <App />
      </JobProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
```

### Entry Point Flow

```
1. Browser loads index.html
        │
        ▼
2. Script tag loads main.jsx
        │
        ▼
3. ReactDOM.createRoot() creates React root
        │
        ▼
4. Render tree:
   React.StrictMode
        │
        └── BrowserRouter (enables routing)
                │
                └── JobProvider (provides global state)
                        │
                        └── App (main application)
```

## App.jsx (Root Component)

```jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import ToastContainer from './components/common/ToastContainer'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import SavedJobs from './pages/SavedJobs'
import Applications from './pages/Applications'
import Companies from './pages/Companies'
import CompanyDetail from './pages/CompanyDetail'
import Resume from './pages/Resume'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
```

---

# 6. STATE MANAGEMENT - JOBCONTEXT

## Overview

The application uses React Context API combined with useReducer for centralized state management. This pattern provides:

- Single source of truth for application state
- Predictable state updates via reducer
- Easy access to state from any component
- Automatic re-renders on state changes

## Initial State Structure

```javascript
const initialState = {
  // Data from mock files
  jobs: initialJobs,           // Array of 16 job objects
  companies: initialCompanies, // Array of 16 company objects

  // User-specific data (persisted)
  savedJobs: JSON.parse(localStorage.getItem('savedJobs')) || [],
  applications: JSON.parse(localStorage.getItem('applications')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,

  // Resume data (persisted)
  resume: JSON.parse(localStorage.getItem('resume')) || {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  },

  // Filter state
  filters: {
    search: '',
    location: '',
    jobType: [],
    experienceLevel: [],
    salaryRange: [0, 300000],
    category: ''
  },

  // UI state
  toasts: []
}
```

## Reducer Actions

### Filter Actions

```javascript
case 'SET_FILTERS':
  return { ...state, filters: { ...state.filters, ...action.payload } }

case 'RESET_FILTERS':
  return {
    ...state,
    filters: {
      search: '',
      location: '',
      jobType: [],
      experienceLevel: [],
      salaryRange: [0, 300000],
      category: ''
    }
  }
```

### Job Actions

```javascript
case 'TOGGLE_SAVE_JOB': {
  const jobId = action.payload
  const isSaved = state.savedJobs.includes(jobId)
  const newSavedJobs = isSaved
    ? state.savedJobs.filter(id => id !== jobId)
    : [...state.savedJobs, jobId]
  return { ...state, savedJobs: newSavedJobs }
}
```

### Application Actions

```javascript
case 'APPLY_TO_JOB': {
  const application = {
    id: Date.now(),
    jobId: action.payload.jobId,
    appliedAt: new Date().toISOString(),
    status: 'pending',
    coverLetter: action.payload.coverLetter || '',
    resume: action.payload.resume || state.resume
  }
  return { ...state, applications: [...state.applications, application] }
}

case 'UPDATE_APPLICATION_STATUS': {
  const updatedApplications = state.applications.map(app =>
    app.id === action.payload.id
      ? { ...app, status: action.payload.status }
      : app
  )
  return { ...state, applications: updatedApplications }
}
```

### Auth Actions

```javascript
case 'LOGIN':
  return { ...state, user: action.payload }

case 'LOGOUT':
  return { ...state, user: null }
```

### Resume Actions

```javascript
case 'UPDATE_RESUME':
  return { ...state, resume: { ...state.resume, ...action.payload } }

case 'UPDATE_PERSONAL_INFO':
  return {
    ...state,
    resume: {
      ...state.resume,
      personalInfo: { ...state.resume.personalInfo, ...action.payload }
    }
  }

case 'ADD_EXPERIENCE':
  return {
    ...state,
    resume: {
      ...state.resume,
      experience: [...state.resume.experience, action.payload]
    }
  }

case 'UPDATE_EXPERIENCE':
  return {
    ...state,
    resume: {
      ...state.resume,
      experience: state.resume.experience.map(exp =>
        exp.id === action.payload.id ? action.payload : exp
      )
    }
  }

case 'DELETE_EXPERIENCE':
  return {
    ...state,
    resume: {
      ...state.resume,
      experience: state.resume.experience.filter(exp => exp.id !== action.payload)
    }
  }

// Similar patterns for EDUCATION, SKILLS, PROJECTS...
```

### Toast Actions

```javascript
case 'ADD_TOAST':
  return { ...state, toasts: [...state.toasts, action.payload] }

case 'REMOVE_TOAST':
  return { ...state, toasts: state.toasts.filter(toast => toast.id !== action.payload) }
```

## Helper Functions

```javascript
// Filter jobs based on current filters
const getFilteredJobs = () => {
  let filtered = [...state.jobs]

  if (state.filters.search) {
    const searchLower = state.filters.search.toLowerCase()
    filtered = filtered.filter(
      job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
    )
  }

  if (state.filters.location) {
    filtered = filtered.filter(job =>
      job.location.toLowerCase().includes(state.filters.location.toLowerCase())
    )
  }

  if (state.filters.jobType.length > 0) {
    filtered = filtered.filter(job =>
      state.filters.jobType.includes(job.type)
    )
  }

  if (state.filters.experienceLevel.length > 0) {
    filtered = filtered.filter(job =>
      state.filters.experienceLevel.includes(job.experienceLevel)
    )
  }

  if (state.filters.category) {
    filtered = filtered.filter(job =>
      job.category === state.filters.category
    )
  }

  if (state.filters.salaryRange) {
    filtered = filtered.filter(
      job =>
        job.salaryMin >= state.filters.salaryRange[0] &&
        job.salaryMax <= state.filters.salaryRange[1]
    )
  }

  return filtered
}

// Get saved job objects
const getSavedJobs = () => {
  return state.jobs.filter(job => state.savedJobs.includes(job.id))
}

// Check if job is saved
const isJobSaved = (jobId) => {
  return state.savedJobs.includes(jobId)
}

// Check if already applied
const hasApplied = (jobId) => {
  return state.applications.some(app => app.jobId === jobId)
}

// Get job by ID
const getJobById = (id) => {
  return state.jobs.find(job => job.id === parseInt(id))
}

// Get company by ID
const getCompanyById = (id) => {
  return state.companies.find(company => company.id === parseInt(id))
}

// Get jobs by company
const getJobsByCompany = (companyId) => {
  return state.jobs.filter(job => job.companyId === parseInt(companyId))
}

// Get application statistics
const getApplicationStats = () => {
  const total = state.applications.length
  const pending = state.applications.filter(app => app.status === 'pending').length
  const reviewing = state.applications.filter(app => app.status === 'reviewing').length
  const interview = state.applications.filter(app => app.status === 'interview').length
  const rejected = state.applications.filter(app => app.status === 'rejected').length
  const accepted = state.applications.filter(app => app.status === 'accepted').length

  return { total, pending, reviewing, interview, rejected, accepted }
}

// Toast helper
const addToast = (toast) => {
  const id = Date.now()
  dispatch({ type: 'ADD_TOAST', payload: { ...toast, id } })
  setTimeout(() => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }, 4000)
}
```

## Context Provider

```javascript
export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(jobReducer, initialState)

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(state.savedJobs))
  }, [state.savedJobs])

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(state.applications))
  }, [state.applications])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  useEffect(() => {
    localStorage.setItem('resume', JSON.stringify(state.resume))
  }, [state.resume])

  const value = {
    ...state,
    dispatch,
    getFilteredJobs,
    getSavedJobs,
    isJobSaved,
    hasApplied,
    getJobById,
    getCompanyById,
    getJobsByCompany,
    getApplicationStats,
    addToast
  }

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}
```

## Using Context in Components

```javascript
import { useJob } from '../context/JobContext'

function MyComponent() {
  // Destructure what you need
  const {
    jobs,
    filters,
    dispatch,
    getFilteredJobs,
    addToast
  } = useJob()

  // Use in component
  const handleSearch = (query) => {
    dispatch({ type: 'SET_FILTERS', payload: { search: query } })
  }

  const filteredJobs = getFilteredJobs()

  return (...)
}
```

---

# 7. ROUTING CONFIGURATION

## Route Map

```
┌─────────────────────────────────────────────────────────────┐
│                      ROUTE STRUCTURE                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  /                    →  Home.jsx                           │
│  │                                                          │
│  ├── /jobs            →  Jobs.jsx (job listings)            │
│  │   └── /job/:id     →  JobDetail.jsx (single job)         │
│  │                                                          │
│  ├── /companies       →  Companies.jsx (company directory)  │
│  │   └── /company/:id →  CompanyDetail.jsx (single company) │
│  │                                                          │
│  ├── /saved           →  SavedJobs.jsx (bookmarked jobs)    │
│  │                                                          │
│  ├── /applications    →  Applications.jsx (user apps)       │
│  │                                                          │
│  ├── /resume          →  Resume.jsx (resume builder)        │
│  │                                                          │
│  ├── /auth            →  Auth.jsx (login/register)          │
│  │   └── ?mode=signup →  Pre-select signup tab              │
│  │                                                          │
│  └── /profile         →  Profile.jsx (user settings)        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Route Details

| Path | Component | Params | Description |
|------|-----------|--------|-------------|
| `/` | Home | - | Landing page with hero, categories, featured jobs |
| `/jobs` | Jobs | - | Job listings with search and filters |
| `/job/:id` | JobDetail | id: number | Single job details with apply |
| `/companies` | Companies | - | Company directory with filters |
| `/company/:id` | CompanyDetail | id: number | Company profile and jobs |
| `/saved` | SavedJobs | - | User's bookmarked jobs |
| `/applications` | Applications | - | User's job applications |
| `/resume` | Resume | - | Resume builder tool |
| `/auth` | Auth | mode?: string | Login/Register forms |
| `/profile` | Profile | - | User profile and settings |

## Navigation Links

### Navbar Links
- Jobs (`/jobs`)
- Companies (`/companies`)
- Saved (`/saved`) - with badge counter
- Resume (`/resume`)

### Footer Links
- Browse Jobs (`/jobs`)
- Companies (`/companies`)
- Build Resume (`/resume`)
- Saved Jobs (`/saved`)
- Applications (`/applications`)

---

# 8. PAGES DEEP DIVE

## 8.1 Home Page (`/`)

### Purpose
Landing page with hero section, job search, categories, and featured jobs.

### Sections
1. **Hero Section**
   - Headline and tagline
   - Search form (job + location)
   - Statistics (jobs, companies, candidates)

2. **Features Section**
   - Easy Job Search
   - Quick Apply
   - Career Growth
   - Top Companies

3. **Categories Section**
   - Engineering, Design, Data Science
   - Marketing, Product, HR
   - Security, Finance

4. **Featured Jobs Section**
   - 4 featured job cards
   - "View All Jobs" link

5. **CTA Section**
   - Resume builder promotion

### Code Flow
```
Home Component
      │
      ├── useState (searchQuery, locationQuery)
      │
      ├── useJob() → { jobs, companies, dispatch }
      │
      ├── useNavigate() for programmatic navigation
      │
      ├── featuredJobs = jobs.filter(job => job.featured).slice(0, 4)
      │
      ├── categories = calculated from jobs
      │
      ├── handleSearch() → dispatch SET_FILTERS → navigate('/jobs')
      │
      └── handleCategoryClick() → dispatch SET_FILTERS → navigate('/jobs')
```

## 8.2 Jobs Page (`/jobs`)

### Purpose
Display all job listings with search, filters, and sorting.

### Features
- Real-time search input
- Sidebar filters (location, type, experience, salary)
- Sort options (recent, salary high/low, popular)
- Job cards with save functionality
- Empty state for no results

### Code Flow
```
Jobs Component
      │
      ├── useState (filtersOpen, sortBy)
      │
      ├── useJob() → { filters, dispatch, getFilteredJobs }
      │
      ├── useMemo → filteredJobs (sorted)
      │       │
      │       ├── getFilteredJobs()
      │       │
      │       └── sort by: recent | salary-high | salary-low | applicants
      │
      ├── handleSearchChange() → dispatch SET_FILTERS
      │
      └── Render:
          ├── Search input
          ├── JobFilters sidebar
          ├── Sort dropdown
          └── JobCard[] or EmptyState
```

## 8.3 Job Detail Page (`/job/:id`)

### Purpose
Display complete job information with apply functionality.

### Sections
1. **Header**
   - Company logo
   - Job title and company
   - Meta info (location, type, experience, date)
   - Action buttons (Apply, Save, Share)

2. **Content**
   - About the Role
   - Responsibilities
   - Requirements
   - Benefits
   - Skills tags

3. **Sidebar**
   - Job Overview card
   - Salary range
   - Company mini-card

4. **Apply Modal**
   - Job confirmation
   - Cover letter textarea
   - Resume attachment info
   - Submit button

### Code Flow
```
JobDetail Component
      │
      ├── useParams() → { id }
      │
      ├── useJob() → { getJobById, getCompanyById, isJobSaved, hasApplied, ... }
      │
      ├── useState (showApplyModal, coverLetter)
      │
      ├── job = getJobById(id)
      ├── company = getCompanyById(job.companyId)
      │
      ├── handleSave() → dispatch TOGGLE_SAVE_JOB → addToast
      │
      ├── handleApply()
      │       │
      │       ├── if (!user) → addToast warning → navigate('/auth')
      │       │
      │       └── setShowApplyModal(true)
      │
      ├── submitApplication() → dispatch APPLY_TO_JOB → addToast
      │
      └── handleShare() → navigator.clipboard → addToast
```

## 8.4 Companies Page (`/companies`)

### Purpose
Company directory with search, filters, and grid/list views.

### Features
- Hero section with stats
- Search by name/industry
- Industry filter chips
- Sort options (featured, rating, jobs, name, newest)
- Grid/List view toggle
- Company cards with ratings
- Browse by industry section

### Code Flow
```
Companies Component
      │
      ├── useState (searchQuery, industryFilter, sizeFilter, viewMode, sortBy)
      │
      ├── useJob() → { companies, jobs }
      │
      ├── filteredCompanies = companies
      │       │
      │       ├── .filter(matchesSearch && matchesIndustry && matchesSize)
      │       │
      │       └── .sort(by sortBy criteria)
      │
      └── Render:
          ├── Hero with search
          ├── Filter chips
          ├── Company cards (grid or list)
          └── Browse by industry
```

## 8.5 Company Detail Page (`/company/:id`)

### Purpose
Display company profile with tabs for about, jobs, and benefits.

### Tabs
1. **About** - Description, culture, website link
2. **Jobs** - Open positions (JobCard[])
3. **Benefits** - Employee benefits list

### Code Flow
```
CompanyDetail Component
      │
      ├── useParams() → { id }
      │
      ├── useJob() → { getCompanyById, getJobsByCompany }
      │
      ├── useState (activeTab)
      │
      ├── company = getCompanyById(id)
      ├── companyJobs = getJobsByCompany(id)
      │
      └── Render:
          ├── Company header
          ├── Stats grid
          ├── Tab navigation
          └── Tab content (About | Jobs | Benefits)
```

## 8.6 Saved Jobs Page (`/saved`)

### Purpose
Display user's bookmarked jobs.

### Code Flow
```
SavedJobs Component
      │
      ├── useJob() → { getSavedJobs }
      │
      ├── savedJobs = getSavedJobs()
      │
      └── Render:
          ├── Page header
          └── JobCard[] or EmptyState
```

## 8.7 Applications Page (`/applications`)

### Purpose
Display user's job applications with status tracking.

### Features
- Stats cards (total, in progress, positive, rejected)
- Application cards with status badges
- Status icons and labels

### Code Flow
```
Applications Component
      │
      ├── useJob() → { applications, getJobById, getApplicationStats }
      │
      ├── stats = getApplicationStats()
      │
      └── Render:
          ├── Page header
          ├── Stats cards (4)
          └── Application cards or EmptyState
```

## 8.8 Resume Page (`/resume`)

### Purpose
Build and manage professional resume with live preview.

### Sections (Tabs)
1. **Personal Info** - Name, title, email, phone, location, summary
2. **Experience** - Add/edit/delete work history
3. **Education** - Add/edit/delete education
4. **Skills** - Add/remove skill tags
5. **Projects** - Add/edit/delete projects

### Features
- Tab navigation
- Live preview panel
- Download as text file
- Auto-save to localStorage

### Code Flow
```
Resume Component
      │
      ├── useJob() → { resume, dispatch, addToast }
      │
      ├── useState:
      │   ├── activeSection
      │   ├── editingItem
      │   ├── newSkill
      │   ├── experienceForm
      │   ├── educationForm
      │   └── projectForm
      │
      ├── Personal Info Handlers
      │   └── handlePersonalInfoChange() → dispatch UPDATE_PERSONAL_INFO
      │
      ├── Experience Handlers
      │   ├── handleExperienceSubmit() → dispatch ADD/UPDATE_EXPERIENCE
      │   ├── editExperience()
      │   └── deleteExperience() → dispatch DELETE_EXPERIENCE
      │
      ├── Education Handlers
      │   ├── handleEducationSubmit() → dispatch ADD/UPDATE_EDUCATION
      │   ├── editEducation()
      │   └── deleteEducation() → dispatch DELETE_EDUCATION
      │
      ├── Skills Handlers
      │   ├── handleAddSkill() → dispatch ADD_SKILL
      │   └── handleRemoveSkill() → dispatch REMOVE_SKILL
      │
      ├── Project Handlers
      │   ├── handleProjectSubmit() → dispatch ADD/UPDATE_PROJECT
      │   ├── editProject()
      │   └── deleteProject() → dispatch DELETE_PROJECT
      │
      ├── downloadResume() → create Blob → trigger download
      │
      └── Render:
          ├── Section navigation tabs
          ├── Active section form
          └── Live preview panel
```

## 8.9 Auth Page (`/auth`)

### Purpose
User authentication (login and registration).

### Features
- Toggle between login/signup
- Form validation
- Password visibility toggle
- Social auth buttons (simulated)
- Remember me checkbox
- Forgot password link

### Code Flow
```
Auth Component
      │
      ├── useSearchParams() → check for ?mode=signup
      │
      ├── useState:
      │   ├── isLogin
      │   ├── showPassword
      │   ├── formData (name, email, password)
      │   └── errors
      │
      ├── useEffect → redirect if already logged in
      │
      ├── validateForm() → returns boolean, sets errors
      │
      ├── handleSubmit()
      │       │
      │       ├── validateForm()
      │       │
      │       ├── Create user object
      │       │
      │       ├── dispatch LOGIN
      │       │
      │       ├── addToast success
      │       │
      │       └── navigate('/')
      │
      ├── handleSocialAuth() → dispatch LOGIN → navigate('/')
      │
      └── Render:
          ├── Logo
          ├── Title (Welcome Back / Create Account)
          ├── Form fields
          ├── Social auth buttons
          └── Toggle link
```

## 8.10 Profile Page (`/profile`)

### Purpose
User profile management and settings.

### Tabs
1. **Overview** - Personal info (editable), quick stats
2. **Applications** - Link to applications page
3. **Saved Jobs** - Link to saved page
4. **Resume** - Link to resume builder
5. **Settings** - Email notifications, delete account

### Code Flow
```
Profile Component
      │
      ├── useJob() → { user, resume, applications, savedJobs, dispatch, addToast }
      │
      ├── useState:
      │   ├── activeTab
      │   ├── isEditing
      │   └── profileData
      │
      ├── handleLogout() → dispatch LOGOUT → navigate('/')
      │
      ├── handleSaveProfile() → dispatch LOGIN + UPDATE_PERSONAL_INFO
      │
      └── Render:
          ├── Sidebar (avatar, name, nav)
          └── Tab content
```

---

# 9. COMPONENTS DEEP DIVE

## 9.1 Navbar Component

### Location
`src/components/common/Navbar.jsx`

### Features
- Logo with home link
- Global search bar
- Navigation links
- User actions (auth or profile)
- Mobile menu toggle
- Saved jobs badge

### Props
None (uses context)

### Code
```jsx
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { savedJobs, user, dispatch } = useJob()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_FILTERS', payload: { search: searchQuery.trim() } })
    navigate('/jobs')
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    if (!value.trim()) {
      dispatch({ type: 'SET_FILTERS', payload: { search: '' } })
    }
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <header className="navbar">
      {/* Logo */}
      {/* Search form */}
      {/* Nav links */}
      {/* User actions */}
      {/* Mobile toggle */}
    </header>
  )
}
```

## 9.2 JobCard Component

### Location
`src/components/job/JobCard.jsx`

### Features
- Company logo/initial
- Job title and company
- Meta info (location, type, experience)
- Skills tags (max 4)
- Salary range
- Save button with toggle state
- Time since posted
- Links to job detail

### Props
| Prop | Type | Description |
|------|------|-------------|
| job | Object | Job data object |

### Code
```jsx
function JobCard({ job }) {
  const { isJobSaved, dispatch, addToast } = useJob()
  const saved = isJobSaved(job.id)

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_SAVE_JOB', payload: job.id })
    addToast({
      type: saved ? 'info' : 'success',
      message: saved ? 'Removed from saved jobs' : 'Job saved successfully'
    })
  }

  const formatSalary = (min, max) => { /* ... */ }
  const getTimeAgo = (date) => { /* ... */ }

  return (
    <Link to={`/job/${job.id}`} className="job-card">
      {/* Logo */}
      {/* Content */}
      {/* Actions */}
    </Link>
  )
}
```

## 9.3 JobFilters Component

### Location
`src/components/job/JobFilters.jsx`

### Features
- Location dropdown
- Job type checkboxes
- Experience level checkboxes
- Salary range slider
- Clear all button
- Mobile responsive

### Props
| Prop | Type | Description |
|------|------|-------------|
| isOpen | boolean | Mobile open state |
| onClose | function | Close handler |

### Filter Options
```javascript
const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
const experienceLevels = ['Entry-Level', 'Mid-Level', 'Senior', 'Lead', 'Executive']
const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', ...]
```

## 9.4 Footer Component

### Location
`src/components/common/Footer.jsx`

### Sections
1. **Brand** - Logo, description, social links
2. **For Job Seekers** - Browse Jobs, Companies, Build Resume, Saved, Applications
3. **Resources** - Career Advice, Salary Guide, Interview Tips, Resume Templates, Blog
4. **Company** - About Us, Contact, Privacy Policy, Terms, Help Center

## 9.5 Toast Component

### Location
`src/components/common/Toast.jsx`

### Types
- success (green)
- error (red)
- warning (yellow)
- info (blue)

### Props
| Prop | Type | Description |
|------|------|-------------|
| toast | Object | { id, type, title?, message } |

## 9.6 ScrollToTop Component

### Location
`src/components/common/ScrollToTop.jsx`

### Purpose
Scroll to top on route change

### Code
```jsx
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
```

---

# 10. DATA LAYER

## 10.1 Job Data Model

### Location
`src/data/jobs.js`

### Structure
```javascript
{
  id: 1,                              // Unique identifier
  title: 'Senior Frontend Developer', // Job title
  company: 'TechCorp Inc.',          // Company name
  companyId: 1,                      // Reference to company
  location: 'San Francisco, CA',     // Job location
  type: 'Full-time',                 // Job type
  experienceLevel: 'Senior',         // Experience required
  category: 'Engineering',           // Job category
  salaryMin: 150000,                 // Minimum salary
  salaryMax: 200000,                 // Maximum salary
  description: '...',                // Job description
  requirements: ['...'],             // Array of requirements
  responsibilities: ['...'],         // Array of responsibilities
  benefits: ['...'],                 // Array of benefits
  skills: ['React', 'TypeScript'],   // Required skills
  postedAt: '2024-12-01',           // Post date (ISO)
  applicants: 45,                    // Number of applicants
  featured: true                     // Featured flag
}
```

### Available Jobs (16)

| ID | Title | Company | Category | Level |
|----|-------|---------|----------|-------|
| 1 | Senior Frontend Developer | TechCorp Inc. | Engineering | Senior |
| 2 | Product Designer | DesignHub | Design | Mid-Level |
| 3 | Backend Engineer | CloudScale | Engineering | Senior |
| 4 | Data Scientist | DataViz Analytics | Data Science | Mid-Level |
| 5 | DevOps Engineer | InfraScale | Engineering | Senior |
| 6 | Mobile Developer (iOS) | AppWorks | Engineering | Mid-Level |
| 7 | Marketing Manager | GrowthLab | Marketing | Senior |
| 8 | Full Stack Developer | WebStack Solutions | Engineering | Mid-Level |
| 9 | UX Researcher | UserFirst | Design | Mid-Level |
| 10 | Junior Software Engineer | TechStart | Engineering | Entry-Level |
| 11 | Product Manager | ProductLab | Product | Senior |
| 12 | Security Engineer | SecureNet | Engineering | Senior |
| 13 | Technical Writer | DocuTech | Content | Mid-Level |
| 14 | QA Engineer | QualityFirst | Engineering | Mid-Level |
| 15 | Data Engineer | DataPipeline | Data Science | Senior |
| 16 | HR Coordinator | PeopleOps | Human Resources | Entry-Level |

## 10.2 Company Data Model

### Location
`src/data/companies.js`

### Structure
```javascript
{
  id: 1,                            // Unique identifier
  name: 'TechCorp Inc.',            // Company name
  logo: null,                       // Logo URL (null = initial)
  industry: 'Technology',           // Industry category
  size: '1000-5000',               // Employee count range
  founded: 2010,                    // Year founded
  location: 'San Francisco, CA',    // HQ location
  website: 'https://...',           // Company website
  description: '...',               // Short description
  about: '...',                     // Detailed about text
  culture: '...',                   // Culture description
  benefits: ['...'],                // Array of benefits
  openPositions: 12,                // Number of open jobs
  rating: 4.5,                      // Company rating (1-5)
  reviews: 234                      // Number of reviews
}
```

### Available Companies (16)

| ID | Name | Industry | Size | Rating |
|----|------|----------|------|--------|
| 1 | TechCorp Inc. | Technology | 1000-5000 | 4.5 |
| 2 | DesignHub | Design | 100-500 | 4.7 |
| 3 | CloudScale | Cloud Computing | 500-1000 | 4.4 |
| 4 | DataViz Analytics | Data & Analytics | 200-500 | 4.6 |
| 5 | InfraScale | Infrastructure | 100-300 | 4.8 |
| 6 | AppWorks | Mobile Development | 50-200 | 4.5 |
| 7 | GrowthLab | Marketing | 50-150 | 4.3 |
| 8 | WebStack Solutions | Software Development | 100-300 | 4.4 |
| 9 | UserFirst | UX Research | 30-100 | 4.7 |
| 10 | TechStart | Technology | 20-50 | 4.6 |
| 11 | ProductLab | Product Development | 200-500 | 4.5 |
| 12 | SecureNet | Cybersecurity | 300-700 | 4.3 |
| 13 | DocuTech | Documentation | 20-50 | 4.8 |
| 14 | QualityFirst | Quality Assurance | 50-150 | 4.4 |
| 15 | DataPipeline | Data Engineering | 100-300 | 4.6 |
| 16 | PeopleOps | Human Resources | 30-80 | 4.5 |

## 10.3 Application Data Model

### Created at Runtime

```javascript
{
  id: 1702234567890,              // Timestamp ID
  jobId: 1,                       // Reference to job
  appliedAt: '2024-12-10T...',    // Application date (ISO)
  status: 'pending',              // Application status
  coverLetter: '...',             // Cover letter text
  resume: { ... }                 // Copy of resume at time of application
}
```

### Status Values
- `pending` - Just submitted
- `reviewing` - Under review
- `interview` - Interview scheduled
- `accepted` - Offer made
- `rejected` - Application rejected

## 10.4 User Data Model

### Created at Login

```javascript
{
  id: 1702234567890,             // Timestamp ID
  name: 'John Doe',              // User's name
  email: 'john@example.com',     // Email address
  avatar: null                   // Avatar URL
}
```

## 10.5 Resume Data Model

### Persisted Structure

```javascript
{
  personalInfo: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Software Engineer',
    summary: 'Experienced developer with...'
  },
  experience: [
    {
      id: 1702234567890,
      title: 'Software Engineer',
      company: 'Tech Company',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '2024-01',
      current: false,
      description: 'Developed...'
    }
  ],
  education: [
    {
      id: 1702234567891,
      degree: 'Bachelor of Science in CS',
      school: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2012-09',
      endDate: '2016-06',
      description: 'GPA: 3.8'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  projects: [
    {
      id: 1702234567892,
      name: 'E-commerce Platform',
      description: 'Built a full-stack...',
      link: 'https://github.com/...',
      technologies: 'React, Node.js, MongoDB'
    }
  ]
}
```

---

# 11. USER FLOW DIAGRAMS

## 11.1 Job Search & Apply Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                     JOB SEARCH & APPLY FLOW                       │
└──────────────────────────────────────────────────────────────────┘

User enters site
      │
      ▼
┌─────────────┐
│  Home Page  │
└──────┬──────┘
       │
       ├──────────────────┬─────────────────┐
       │                  │                 │
       ▼                  ▼                 ▼
┌──────────────┐   ┌────────────┐   ┌──────────────┐
│ Hero Search  │   │ Category   │   │ Featured Job │
│    Form      │   │   Click    │   │    Click     │
└──────┬───────┘   └─────┬──────┘   └──────┬───────┘
       │                 │                 │
       │    SET_FILTERS  │   SET_FILTERS   │
       │                 │                 │
       └────────┬────────┴─────────────────┘
                │
                ▼
       ┌────────────────┐
       │   Jobs Page    │
       │  (Filtered)    │
       └───────┬────────┘
               │
               ├─────────────────┐
               │                 │
               ▼                 ▼
        ┌────────────┐    ┌────────────┐
        │  Refine    │    │  Click     │
        │  Filters   │    │  Job Card  │
        └─────┬──────┘    └─────┬──────┘
              │                 │
              │  SET_FILTERS    │
              │                 │
              └────────┬────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Job Detail    │
              │     Page       │
              └───────┬────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
         ▼            ▼            ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │  Save    │ │  Apply   │ │  Share   │
   │   Job    │ │  Button  │ │  Button  │
   └────┬─────┘ └────┬─────┘ └────┬─────┘
        │            │            │
        │            │            │
        ▼            ▼            ▼
  TOGGLE_SAVE   ┌─────────┐   Clipboard
      JOB       │ Logged  │     Copy
        │       │   In?   │       │
        │       └────┬────┘       │
        │            │            │
        ▼       ┌────┴────┐       ▼
   Toast:      │         │    Toast:
   "Saved"    Yes        No   "Copied"
              │          │
              ▼          ▼
        ┌──────────┐  ┌──────────┐
        │  Apply   │  │  Auth    │
        │  Modal   │  │  Page    │
        └────┬─────┘  └──────────┘
             │
             ▼
        ┌──────────┐
        │ Submit   │
        │ Button   │
        └────┬─────┘
             │
             ▼
       APPLY_TO_JOB
             │
             ▼
        ┌──────────┐
        │  Toast:  │
        │ Applied! │
        └──────────┘
```

## 11.2 Resume Builder Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                      RESUME BUILDER FLOW                          │
└──────────────────────────────────────────────────────────────────┘

       ┌────────────────┐
       │  Resume Page   │
       └───────┬────────┘
               │
               ▼
       ┌────────────────┐
       │ Section Tabs   │
       │ [1][2][3][4][5]│
       └───────┬────────┘
               │
    ┌──────────┼──────────┬──────────┬──────────┐
    │          │          │          │          │
    ▼          ▼          ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Personal│ │  Exp   │ │  Edu   │ │ Skills │ │Projects│
│  Info  │ │        │ │        │ │        │ │        │
└───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
    │          │          │          │          │
    ▼          ▼          ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  Form  │ │  List  │ │  List  │ │  Tags  │ │  List  │
│ Fields │ │ + Add  │ │ + Add  │ │ + Add  │ │ + Add  │
└───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
    │          │          │          │          │
    │          │          │          │          │
    ▼          ▼          ▼          ▼          ▼
UPDATE_    ADD/UPDATE/  ADD/UPDATE/  ADD/REMOVE  ADD/UPDATE/
PERSONAL   DELETE_      DELETE_      _SKILL      DELETE_
_INFO      EXPERIENCE   EDUCATION               PROJECT
    │          │          │          │          │
    └──────────┴──────────┴──────────┴──────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  Auto-Save    │
                  │ localStorage  │
                  └───────┬───────┘
                          │
                          ▼
                  ┌───────────────┐
                  │ Live Preview  │
                  │    Panel      │
                  └───────┬───────┘
                          │
                          ▼
                  ┌───────────────┐
                  │   Download    │
                  │   as .txt     │
                  └───────────────┘
```

## 11.3 Authentication Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                           │
└──────────────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │  Auth Page  │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
             ┌──────────┐  ┌──────────┐
             │  Login   │  │  Signup  │
             │   Tab    │  │   Tab    │
             └────┬─────┘  └────┬─────┘
                  │             │
                  └──────┬──────┘
                         │
                         ▼
                  ┌────────────┐
                  │ Form Input │
                  │ Validation │
                  └─────┬──────┘
                        │
              ┌─────────┼─────────┐
              │         │         │
              ▼         ▼         ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Email   │ │ Password │ │  Social  │
        │  Submit  │ │  Submit  │ │  Button  │
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             │            │            │
             └─────┬──────┴────────────┘
                   │
                   ▼
            ┌────────────┐
            │  Validate  │
            │   Form     │
            └─────┬──────┘
                  │
           ┌──────┴──────┐
           │             │
           ▼             ▼
      ┌─────────┐   ┌─────────┐
      │ Errors  │   │ Create  │
      │ Display │   │  User   │
      └─────────┘   └────┬────┘
                         │
                         ▼
                  ┌────────────┐
                  │  dispatch  │
                  │   LOGIN    │
                  └─────┬──────┘
                        │
                        ▼
                  ┌────────────┐
                  │  addToast  │
                  │ "Welcome!" │
                  └─────┬──────┘
                        │
                        ▼
                  ┌────────────┐
                  │ navigate   │
                  │   ('/')    │
                  └────────────┘
```

## 11.4 Company Exploration Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    COMPANY EXPLORATION FLOW                       │
└──────────────────────────────────────────────────────────────────┘

       ┌────────────────┐
       │ Companies Page │
       └───────┬────────┘
               │
    ┌──────────┼──────────────────────┐
    │          │                      │
    ▼          ▼                      ▼
┌────────┐  ┌────────┐          ┌──────────┐
│ Search │  │Industry│          │  Browse  │
│  Bar   │  │ Chips  │          │ Industry │
└───┬────┘  └───┬────┘          └────┬─────┘
    │           │                    │
    │   Filter companies             │
    │           │                    │
    └─────┬─────┴────────────────────┘
          │
          ▼
    ┌───────────────┐
    │   Filtered    │
    │  Company List │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ Click Company │
    │     Card      │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │Company Detail │
    │     Page      │
    └───────┬───────┘
            │
    ┌───────┼───────┐
    │       │       │
    ▼       ▼       ▼
┌───────┐ ┌───────┐ ┌───────┐
│ About │ │ Jobs  │ │Benefit│
│  Tab  │ │  Tab  │ │  Tab  │
└───────┘ └───┬───┘ └───────┘
              │
              ▼
        ┌───────────┐
        │  JobCard  │
        │   Click   │
        └─────┬─────┘
              │
              ▼
        ┌───────────┐
        │Job Detail │
        │   Page    │
        └───────────┘
```

---

# 12. STYLING SYSTEM

## 12.1 CSS Architecture

The project uses vanilla CSS with:
- CSS Custom Properties (variables)
- BEM-inspired naming
- Mobile-first approach
- Component-scoped styles

## 12.2 CSS Variables

```css
:root {
  /* Primary Colors */
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --primary-light: #e0e7ff;

  /* Semantic Colors */
  --success: #10b981;
  --warning: #eab308;
  --error: #ef4444;
  --info: #3b82f6;

  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;

  /* Text Colors */
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;

  /* Border Colors */
  --border: #e2e8f0;
  --border-light: #f1f5f9;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);

  /* Transitions */
  --transition: all 0.2s ease;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

## 12.3 Responsive Breakpoints

```css
/* Mobile First */
/* Default styles for mobile */

/* Tablet */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* Large screen styles */
}
```

## 12.4 Common Component Styles

### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 500;
  transition: var(--transition);
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
```

### Cards
```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}
```

### Forms
```css
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}
```

---

# 13. CODE EXAMPLES

## 13.1 Using Context

```jsx
import { useJob } from '../context/JobContext'

function MyComponent() {
  const { jobs, dispatch, addToast } = useJob()

  const handleAction = () => {
    dispatch({ type: 'ACTION_TYPE', payload: data })
    addToast({ type: 'success', message: 'Done!' })
  }

  return <div>{/* ... */}</div>
}
```

## 13.2 Creating a New Page

```jsx
// src/pages/NewPage.jsx
import { motion } from 'framer-motion'
import { useJob } from '../context/JobContext'

function NewPage() {
  const { /* context values */ } = useJob()

  return (
    <div className="new-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Page content */}
        </motion.div>
      </div>
    </div>
  )
}

export default NewPage
```

Then add route in App.jsx:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

## 13.3 Creating a New Component

```jsx
// src/components/common/NewComponent.jsx
import { FiIcon } from 'react-icons/fi'

function NewComponent({ prop1, prop2 }) {
  return (
    <div className="new-component">
      <FiIcon />
      <span>{prop1}</span>
    </div>
  )
}

export default NewComponent
```

## 13.4 Adding New State

In JobContext.jsx:

```javascript
// 1. Add to initialState
const initialState = {
  // ...existing state
  newFeature: []
}

// 2. Add reducer case
case 'ADD_NEW_FEATURE':
  return { ...state, newFeature: [...state.newFeature, action.payload] }

// 3. Add helper function if needed
const getNewFeature = () => state.newFeature

// 4. Add to context value
const value = {
  // ...existing values
  newFeature: state.newFeature,
  getNewFeature
}
```

---

# 14. API REFERENCE

## 14.1 Context Values

### State Values

| Name | Type | Description |
|------|------|-------------|
| `jobs` | Array | All job listings |
| `companies` | Array | All companies |
| `savedJobs` | Array | Saved job IDs |
| `applications` | Array | User applications |
| `user` | Object/null | Current user |
| `resume` | Object | Resume data |
| `filters` | Object | Active filters |
| `toasts` | Array | Active toasts |

### Functions

| Name | Params | Returns | Description |
|------|--------|---------|-------------|
| `dispatch` | action | void | Dispatch reducer action |
| `getFilteredJobs` | - | Array | Get filtered jobs |
| `getSavedJobs` | - | Array | Get saved job objects |
| `isJobSaved` | jobId | boolean | Check if saved |
| `hasApplied` | jobId | boolean | Check if applied |
| `getJobById` | id | Object | Get single job |
| `getCompanyById` | id | Object | Get single company |
| `getJobsByCompany` | companyId | Array | Get company jobs |
| `getApplicationStats` | - | Object | Get app stats |
| `addToast` | toast | void | Show notification |

## 14.2 Action Types

### Filter Actions
- `SET_FILTERS` - payload: { [filterKey]: value }
- `RESET_FILTERS` - payload: none

### Job Actions
- `TOGGLE_SAVE_JOB` - payload: jobId

### Application Actions
- `APPLY_TO_JOB` - payload: { jobId, coverLetter, resume }
- `UPDATE_APPLICATION_STATUS` - payload: { id, status }

### Auth Actions
- `LOGIN` - payload: userObject
- `LOGOUT` - payload: none

### Resume Actions
- `UPDATE_RESUME` - payload: { [section]: value }
- `UPDATE_PERSONAL_INFO` - payload: { [field]: value }
- `ADD_EXPERIENCE` - payload: experienceObject
- `UPDATE_EXPERIENCE` - payload: experienceObject
- `DELETE_EXPERIENCE` - payload: experienceId
- `ADD_EDUCATION` - payload: educationObject
- `UPDATE_EDUCATION` - payload: educationObject
- `DELETE_EDUCATION` - payload: educationId
- `ADD_SKILL` - payload: skillString
- `REMOVE_SKILL` - payload: skillString
- `ADD_PROJECT` - payload: projectObject
- `UPDATE_PROJECT` - payload: projectObject
- `DELETE_PROJECT` - payload: projectId

### Toast Actions
- `ADD_TOAST` - payload: { id, type, title?, message }
- `REMOVE_TOAST` - payload: toastId

---

# END OF DOCUMENT

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Total Pages**: ~50 pages when rendered
**Project**: JobHunt - Job Portal Application

---

*This document is auto-generated and maintained with the project. For the latest version, please refer to the repository.*
