<p align="center">
  <img src="https://img.icons8.com/fluency/96/briefcase.png" alt="JobHunt Logo" width="80" height="80"/>
</p>

<h1 align="center">JobHunt</h1>

<p align="center">
  <strong>A Modern Job Portal for Finding Your Dream Career</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Framer_Motion-11.15-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
</p>

---

## Overview

**JobHunt** is a feature-rich, modern job portal application built with React. It provides job seekers with an intuitive platform to discover opportunities, explore companies, build professional resumes, and track their job applications - all in one place.

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-blue?style=flat-square" alt="PRs Welcome"/>
</p>

---

## Features

### For Job Seekers

| Feature | Description |
|---------|-------------|
| **Job Search** | Search jobs by title, company, skills, or keywords |
| **Advanced Filters** | Filter by location, job type, experience level, and salary range |
| **Company Explorer** | Browse companies, read descriptions, and see open positions |
| **Save Jobs** | Bookmark interesting jobs for later review |
| **Resume Builder** | Create and download professional resumes with live preview |
| **Apply to Jobs** | One-click application with cover letter support |
| **Application Tracking** | Monitor application status and history |
| **User Profiles** | Manage personal information and preferences |

### User Experience

- Smooth animations powered by Framer Motion
- Fully responsive design (mobile, tablet, desktop)
- Toast notifications for user feedback
- Persistent data with localStorage
- Clean, modern UI with intuitive navigation

---

## Demo

### Home Page
```
┌─────────────────────────────────────────────┐
│  [Logo] JobHunt    [Search...]    [Nav]     │
├─────────────────────────────────────────────┤
│                                             │
│         Find Your Dream Job Today           │
│                                             │
│    [Job Title]  |  [Location]  [Search]     │
│                                             │
│     10,000+ Jobs    16+ Companies           │
├─────────────────────────────────────────────┤
│  Browse by Category                         │
│  [Engineering] [Design] [Data] [Marketing]  │
├─────────────────────────────────────────────┤
│  Featured Jobs                              │
│  [Job Card] [Job Card] [Job Card]           │
└─────────────────────────────────────────────┘
```

### Key Screens

- **Jobs Page**: Search, filter, and browse all job listings
- **Job Detail**: Complete job information with apply functionality
- **Companies**: Explore companies with ratings and open positions
- **Resume Builder**: 5-section resume with real-time preview
- **Applications**: Track all your job applications

---

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/job-portal.git

# Navigate to project directory
cd job-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| React Router DOM | 7.1.0 | Client-side Routing |
| Framer Motion | 11.15.0 | Animations |
| React Icons | 5.4.0 | Icon Library |

### Development

| Tool | Version | Purpose |
|------|---------|---------|
| Vite | 6.0.5 | Build Tool & Dev Server |
| ESLint | 9.17.0 | Code Linting |
| TypeScript Types | Latest | Type Definitions |

### Architecture

- **State Management**: React Context API + useReducer
- **Styling**: Vanilla CSS with CSS Variables
- **Persistence**: localStorage
- **Routing**: React Router v7 (SPA)

---

## Project Structure

```
job-portal/
│
├── public/                 # Static assets
│   └── favicon.svg        # App favicon
│
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ToastContainer.jsx
│   │   └── job/           # Job-specific components
│   │       ├── JobCard.jsx
│   │       └── JobFilters.jsx
│   │
│   ├── context/           # State management
│   │   └── JobContext.jsx # Global app state
│   │
│   ├── data/              # Mock data
│   │   ├── jobs.js        # 16 sample jobs
│   │   └── companies.js   # 16 sample companies
│   │
│   ├── pages/             # Route components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Jobs.jsx       # Job listings
│   │   ├── JobDetail.jsx  # Single job view
│   │   ├── Companies.jsx  # Company directory
│   │   ├── CompanyDetail.jsx
│   │   ├── SavedJobs.jsx  # Bookmarked jobs
│   │   ├── Applications.jsx
│   │   ├── Resume.jsx     # Resume builder
│   │   ├── Auth.jsx       # Login/Register
│   │   └── Profile.jsx    # User settings
│   │
│   ├── App.jsx            # Root component
│   ├── App.css            # Global styles
│   ├── index.css          # Base styles & variables
│   └── main.jsx           # Entry point
│
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── DOCUMENTATION.md       # Detailed docs
└── README.md              # This file
```

---

## Application Flow

```
                    ┌─────────────────┐
                    │   main.jsx      │
                    │   (Entry Point) │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  JobProvider    │
                    │ (Global State)  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │     App.jsx     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐         ┌─────▼─────┐        ┌────▼────┐
   │ Navbar  │         │  Routes   │        │ Footer  │
   └─────────┘         └─────┬─────┘        └─────────┘
                             │
     ┌───────────┬───────────┼───────────┬───────────┐
     │           │           │           │           │
  ┌──▼──┐    ┌───▼───┐   ┌───▼───┐   ┌───▼───┐   ┌──▼──┐
  │Home │    │ Jobs  │   │Resume │   │ Auth  │   │ ... │
  └─────┘    └───────┘   └───────┘   └───────┘   └─────┘
```

---

## State Management

The app uses React Context API with useReducer for centralized state management.

### State Shape

```javascript
{
  jobs: [...],           // All job listings
  companies: [...],      // All companies
  savedJobs: [...],      // Saved job IDs
  applications: [...],   // User applications
  user: {...},          // Current user
  resume: {...},        // Resume data
  filters: {...},       // Search filters
  toasts: [...]         // Notifications
}
```

### Available Actions

| Category | Actions |
|----------|---------|
| **Filters** | SET_FILTERS, RESET_FILTERS |
| **Jobs** | TOGGLE_SAVE_JOB |
| **Applications** | APPLY_TO_JOB, UPDATE_APPLICATION_STATUS |
| **Auth** | LOGIN, LOGOUT |
| **Resume** | UPDATE_PERSONAL_INFO, ADD/UPDATE/DELETE_EXPERIENCE, ADD/UPDATE/DELETE_EDUCATION, ADD/REMOVE_SKILL, ADD/UPDATE/DELETE_PROJECT |
| **UI** | ADD_TOAST, REMOVE_TOAST |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Sample Data

The app comes with mock data for immediate use:

- **16 Jobs** across various categories (Engineering, Design, Data Science, Marketing, etc.)
- **16 Companies** with ratings, descriptions, and benefits
- **8 Job Categories**: Engineering, Design, Data Science, Marketing, Product, HR, Security, Finance
- **Experience Levels**: Entry-Level, Mid-Level, Senior, Lead, Executive
- **Job Types**: Full-time, Part-time, Contract, Internship, Remote

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Roadmap

- [ ] Backend API integration
- [ ] User authentication with JWT
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Job recommendations using ML
- [ ] Company reviews system
- [ ] Interview scheduling
- [ ] Dark mode theme

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Vite](https://vitejs.dev/) for the blazing fast build tool

---

<p align="center">
  Made with ❤️ for Job Seekers
</p>

<p align="center">
  <a href="#top">Back to Top</a>
</p>
