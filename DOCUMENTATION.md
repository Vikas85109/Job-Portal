# JobHunt - Job Portal Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Folder Structure](#folder-structure)
4. [Application Flow](#application-flow)
5. [State Management](#state-management)
6. [Components Reference](#components-reference)
7. [Pages Reference](#pages-reference)
8. [Data Models](#data-models)
9. [Routing](#routing)
10. [Styling](#styling)

---

## Project Overview

**JobHunt** is a modern, full-featured job portal application built with React. It provides job seekers with a comprehensive platform to search for jobs, save favorites, build resumes, apply to positions, and track applications.

### Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router DOM 7 | Client-side Routing |
| Framer Motion | Animations |
| React Icons | Icon Library |
| Vite | Build Tool & Dev Server |
| CSS3 | Styling |

### Key Features

- Job search with advanced filters
- Company exploration and details
- Resume builder with live preview
- Job application system with tracking
- Save/bookmark favorite jobs
- User authentication (simulated)
- Responsive design
- Toast notifications
- Smooth animations

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│                     React Application                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    BrowserRouter                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                  JobProvider                     │  │  │
│  │  │         (Context API - Global State)             │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │                   App                      │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │   Navbar | Main (Routes) | Footer   │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    localStorage                              │
│         (savedJobs, applications, user, resume)              │
└─────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
job-portal/
├── public/
│   ├── favicon.svg          # App favicon
│   └── vite.svg             # Vite default icon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx       # Navigation bar with search
│   │   │   ├── Footer.jsx       # Site footer
│   │   │   ├── ScrollToTop.jsx  # Scroll restoration
│   │   │   ├── Toast.jsx        # Toast notification
│   │   │   └── ToastContainer.jsx
│   │   └── job/
│   │       ├── JobCard.jsx      # Job listing card
│   │       └── JobFilters.jsx   # Filter sidebar
│   ├── context/
│   │   └── JobContext.jsx       # Global state management
│   ├── data/
│   │   ├── jobs.js              # Mock job data
│   │   └── companies.js         # Mock company data
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Jobs.jsx             # Job listings
│   │   ├── JobDetail.jsx        # Single job view
│   │   ├── Companies.jsx        # Company listings
│   │   ├── CompanyDetail.jsx    # Single company view
│   │   ├── SavedJobs.jsx        # Bookmarked jobs
│   │   ├── Applications.jsx     # User applications
│   │   ├── Resume.jsx           # Resume builder
│   │   ├── Auth.jsx             # Login/Register
│   │   └── Profile.jsx          # User profile
│   ├── App.jsx                  # Root component
│   ├── App.css                  # Global styles
│   ├── index.css                # Base styles
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js               # Vite configuration
└── eslint.config.js             # Linting rules
```

---

## Application Flow

### 1. Application Initialization

```
main.jsx
    │
    ├── React.StrictMode
    │       │
    │       └── BrowserRouter
    │               │
    │               └── JobProvider (Context)
    │                       │
    │                       └── App
```

**File: `src/main.jsx`**
- Entry point of the application
- Wraps app with `BrowserRouter` for routing
- Provides global state via `JobProvider`

### 2. App Component Flow

```
App.jsx
    │
    ├── ScrollToTop        (Resets scroll on route change)
    ├── Navbar             (Global navigation)
    ├── <main>
    │   └── Routes         (Page routing)
    │       ├── / → Home
    │       ├── /jobs → Jobs
    │       ├── /job/:id → JobDetail
    │       ├── /companies → Companies
    │       ├── /company/:id → CompanyDetail
    │       ├── /saved → SavedJobs
    │       ├── /applications → Applications
    │       ├── /resume → Resume
    │       ├── /auth → Auth
    │       └── /profile → Profile
    ├── Footer             (Global footer)
    └── ToastContainer     (Notification system)
```

### 3. User Journey Flows

#### Job Search Flow
```
Home Page → Search Form → Jobs Page → Job Filters → Job Card → Job Detail → Apply
    │                         │                         │
    │                         │                         └── Save Job
    │                         └── Category Click
    └── Hero Search
```

#### Application Flow
```
Job Detail Page
    │
    ├── Check if logged in
    │   ├── No → Redirect to Auth
    │   └── Yes → Show Apply Modal
    │               │
    │               └── Submit Application
    │                       │
    │                       ├── Store in Context
    │                       ├── Persist to localStorage
    │                       └── Show Success Toast
```

#### Resume Builder Flow
```
Resume Page
    │
    ├── Section Navigation (Tabs)
    │   ├── Personal Info → Auto-save to Context
    │   ├── Experience → Add/Edit/Delete
    │   ├── Education → Add/Edit/Delete
    │   ├── Skills → Add/Remove Tags
    │   └── Projects → Add/Edit/Delete
    │
    └── Live Preview Panel → Download as TXT
```

---

## State Management

### JobContext (`src/context/JobContext.jsx`)

The application uses React Context API with useReducer for centralized state management.

#### State Structure

```javascript
{
  jobs: [],              // All job listings (from mock data)
  companies: [],         // All companies (from mock data)
  savedJobs: [],         // Array of saved job IDs
  applications: [],      // User's job applications
  user: null,            // Current logged-in user
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

#### Actions (Reducer Types)

| Action | Description |
|--------|-------------|
| `SET_FILTERS` | Update search filters |
| `RESET_FILTERS` | Clear all filters |
| `TOGGLE_SAVE_JOB` | Add/remove job from saved |
| `APPLY_TO_JOB` | Submit job application |
| `UPDATE_APPLICATION_STATUS` | Change application status |
| `LOGIN` | Set user data |
| `LOGOUT` | Clear user data |
| `UPDATE_RESUME` | Update resume section |
| `UPDATE_PERSONAL_INFO` | Update resume personal info |
| `ADD_EXPERIENCE` | Add work experience |
| `UPDATE_EXPERIENCE` | Edit work experience |
| `DELETE_EXPERIENCE` | Remove work experience |
| `ADD_EDUCATION` | Add education entry |
| `UPDATE_EDUCATION` | Edit education entry |
| `DELETE_EDUCATION` | Remove education entry |
| `ADD_SKILL` | Add skill tag |
| `REMOVE_SKILL` | Remove skill tag |
| `ADD_PROJECT` | Add project |
| `UPDATE_PROJECT` | Edit project |
| `DELETE_PROJECT` | Remove project |
| `ADD_TOAST` | Show notification |
| `REMOVE_TOAST` | Hide notification |

#### Helper Functions (Exposed via Context)

```javascript
getFilteredJobs()      // Returns jobs matching current filters
getSavedJobs()         // Returns saved job objects
isJobSaved(jobId)      // Check if job is saved
hasApplied(jobId)      // Check if applied to job
getJobById(id)         // Get single job
getCompanyById(id)     // Get single company
getJobsByCompany(id)   // Get all jobs from company
getApplicationStats()  // Get application statistics
addToast(toast)        // Show notification
```

#### Persistence

The following state is persisted to localStorage:
- `savedJobs` - Bookmarked job IDs
- `applications` - User's applications
- `user` - User session data
- `resume` - Resume data

---

## Components Reference

### Common Components

#### Navbar (`src/components/common/Navbar.jsx`)
- **Purpose**: Main navigation and global search
- **Features**:
  - Logo and brand link
  - Global search input (searches jobs)
  - Navigation links (Jobs, Companies, Saved, Resume)
  - User actions (Sign In/Sign Up or Profile/Logout)
  - Mobile hamburger menu
  - Saved jobs counter badge

#### Footer (`src/components/common/Footer.jsx`)
- **Purpose**: Site footer with links and social media
- **Sections**: Job Seekers, Resources, Company
- **Features**: Social media links, copyright

#### ScrollToTop (`src/components/common/ScrollToTop.jsx`)
- **Purpose**: Scroll to top on route change
- **Uses**: `useLocation` hook to detect navigation

#### Toast & ToastContainer
- **Purpose**: Display notification messages
- **Types**: success, error, warning, info
- **Auto-dismiss**: 4 seconds

### Job Components

#### JobCard (`src/components/job/JobCard.jsx`)
- **Purpose**: Display job listing preview
- **Props**: `job` object
- **Features**:
  - Company logo/initial
  - Job title and company name
  - Location, type, experience level
  - Skills tags (max 4 shown)
  - Salary range
  - Save/bookmark button
  - Time since posted
  - Links to job detail

#### JobFilters (`src/components/job/JobFilters.jsx`)
- **Purpose**: Sidebar filters for job search
- **Props**: `isOpen`, `onClose`
- **Filters**:
  - Location dropdown
  - Job type checkboxes
  - Experience level checkboxes
  - Salary range slider
- **Features**: Clear all button, mobile responsive

---

## Pages Reference

### Home (`src/pages/Home.jsx`)
- **Route**: `/`
- **Sections**:
  - Hero with search form
  - Features grid
  - Categories grid
  - Featured jobs
  - CTA section

### Jobs (`src/pages/Jobs.jsx`)
- **Route**: `/jobs`
- **Features**:
  - Search input
  - Filter sidebar
  - Sort options (recent, salary, popular)
  - Job count display
  - Job cards list
  - Empty state for no results

### JobDetail (`src/pages/JobDetail.jsx`)
- **Route**: `/job/:id`
- **Sections**:
  - Job header with company info
  - Description, responsibilities, requirements
  - Benefits and skills
  - Apply modal
  - Sidebar with job overview
  - Company mini-card

### Companies (`src/pages/Companies.jsx`)
- **Route**: `/companies`
- **Features**:
  - Search by name/industry
  - Industry filter chips
  - Sort options
  - Grid/list view toggle
  - Company cards with ratings
  - Browse by industry section

### CompanyDetail (`src/pages/CompanyDetail.jsx`)
- **Route**: `/company/:id`
- **Tabs**:
  - About (description, culture)
  - Jobs (open positions)
  - Benefits

### SavedJobs (`src/pages/SavedJobs.jsx`)
- **Route**: `/saved`
- **Features**: List of bookmarked jobs, empty state

### Applications (`src/pages/Applications.jsx`)
- **Route**: `/applications`
- **Features**:
  - Stats cards (total, in progress, positive, rejected)
  - Application cards with status
  - Status badges (pending, reviewing, interview, accepted, rejected)

### Resume (`src/pages/Resume.jsx`)
- **Route**: `/resume`
- **Sections**:
  - Personal Info form
  - Experience (add/edit/delete)
  - Education (add/edit/delete)
  - Skills (tag input)
  - Projects (add/edit/delete)
- **Features**:
  - Tab navigation
  - Live preview panel
  - Download as text file

### Auth (`src/pages/Auth.jsx`)
- **Route**: `/auth`
- **Features**:
  - Login/Register toggle
  - Email/password form
  - Social auth buttons (simulated)
  - Form validation
  - Redirect if logged in

### Profile (`src/pages/Profile.jsx`)
- **Route**: `/profile`
- **Tabs**:
  - Overview (editable info, stats)
  - Applications link
  - Saved jobs link
  - Resume link
  - Settings (notifications, delete account)

---

## Data Models

### Job Model

```javascript
{
  id: number,
  title: string,
  company: string,
  companyId: number,
  location: string,
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote',
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead' | 'Executive',
  category: string,
  salaryMin: number,
  salaryMax: number,
  description: string,
  requirements: string[],
  responsibilities: string[],
  benefits: string[],
  skills: string[],
  postedAt: string (ISO date),
  applicants: number,
  featured: boolean
}
```

### Company Model

```javascript
{
  id: number,
  name: string,
  logo: string | null,
  industry: string,
  size: string,
  founded: number,
  location: string,
  website: string,
  description: string,
  about: string,
  culture: string,
  benefits: string[],
  openPositions: number,
  rating: number,
  reviews: number
}
```

### Application Model

```javascript
{
  id: number,
  jobId: number,
  appliedAt: string (ISO date),
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected',
  coverLetter: string,
  resume: Resume object
}
```

### User Model

```javascript
{
  id: number,
  name: string,
  email: string,
  avatar: string | null
}
```

### Resume Model

```javascript
{
  personalInfo: {
    fullName: string,
    email: string,
    phone: string,
    location: string,
    title: string,
    summary: string
  },
  experience: [{
    id: number,
    title: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    current: boolean,
    description: string
  }],
  education: [{
    id: number,
    degree: string,
    school: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string
  }],
  skills: string[],
  projects: [{
    id: number,
    name: string,
    description: string,
    link: string,
    technologies: string
  }]
}
```

---

## Routing

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with hero and featured content |
| `/jobs` | Jobs | Job listings with filters |
| `/job/:id` | JobDetail | Single job page with apply |
| `/companies` | Companies | Company directory |
| `/company/:id` | CompanyDetail | Company profile and jobs |
| `/saved` | SavedJobs | User's bookmarked jobs |
| `/applications` | Applications | User's job applications |
| `/resume` | Resume | Resume builder |
| `/auth` | Auth | Login/Register page |
| `/profile` | Profile | User profile and settings |

### Route Parameters

- `/job/:id` - Job ID (integer)
- `/company/:id` - Company ID (integer)
- `/auth?mode=signup` - Query param for signup mode

---

## Styling

### CSS Architecture

The project uses vanilla CSS with:
- CSS custom properties (variables)
- BEM-like naming convention
- Mobile-first responsive design
- Dark theme support ready

### CSS Files

- `src/index.css` - CSS reset, variables, base styles
- `src/App.css` - Component and page styles

### Key CSS Variables

```css
:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --success: #10b981;
  --warning: #eab308;
  --error: #ef4444;
  --info: #3b82f6;

  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;

  --border: #e2e8f0;
  --border-light: #f1f5f9;
}
```

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Development Notes

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features

1. **New Page**: Create in `src/pages/`, add route in `App.jsx`
2. **New Component**: Create in appropriate `src/components/` folder
3. **New State**: Add to `initialState` and create reducer case in `JobContext.jsx`
4. **New Mock Data**: Add to `src/data/` files

### Best Practices Used

- Functional components with hooks
- Context for global state
- Controlled form components
- Prop destructuring
- Memoization where beneficial
- Semantic HTML
- Accessible ARIA labels
- Consistent naming conventions
