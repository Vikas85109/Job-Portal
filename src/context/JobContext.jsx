import { createContext, useContext, useReducer, useEffect } from 'react'
import { jobs as initialJobs } from '../data/jobs'
import { companies as initialCompanies } from '../data/companies'

const JobContext = createContext()

const initialState = {
  jobs: initialJobs,
  companies: initialCompanies,
  savedJobs: JSON.parse(localStorage.getItem('savedJobs')) || [],
  applications: JSON.parse(localStorage.getItem('applications')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
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
  filters: {
    search: '',
    location: '',
    jobType: [],
    experienceLevel: [],
    salaryRange: [0, 300000],
    category: ''
  },
  toasts: []
}

function jobReducer(state, action) {
  switch (action.type) {
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

    case 'TOGGLE_SAVE_JOB': {
      const jobId = action.payload
      const isSaved = state.savedJobs.includes(jobId)
      const newSavedJobs = isSaved
        ? state.savedJobs.filter(id => id !== jobId)
        : [...state.savedJobs, jobId]
      return { ...state, savedJobs: newSavedJobs }
    }

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

    case 'LOGIN':
      return { ...state, user: action.payload }

    case 'LOGOUT':
      return { ...state, user: null }

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

    case 'ADD_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: [...state.resume.education, action.payload]
        }
      }

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.map(edu =>
            edu.id === action.payload.id ? action.payload : edu
          )
        }
      }

    case 'DELETE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.filter(edu => edu.id !== action.payload)
        }
      }

    case 'ADD_SKILL':
      if (state.resume.skills.includes(action.payload)) {
        return state
      }
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: [...state.resume.skills, action.payload]
        }
      }

    case 'REMOVE_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: state.resume.skills.filter(skill => skill !== action.payload)
        }
      }

    case 'ADD_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: [...state.resume.projects, action.payload]
        }
      }

    case 'UPDATE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.map(proj =>
            proj.id === action.payload.id ? action.payload : proj
          )
        }
      }

    case 'DELETE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter(proj => proj.id !== action.payload)
        }
      }

    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] }

    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(toast => toast.id !== action.payload) }

    default:
      return state
  }
}

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

  // Filter jobs
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

  // Get saved jobs
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

  // Get application stats
  const getApplicationStats = () => {
    const total = state.applications.length
    const pending = state.applications.filter(app => app.status === 'pending').length
    const reviewing = state.applications.filter(app => app.status === 'reviewing').length
    const interview = state.applications.filter(app => app.status === 'interview').length
    const rejected = state.applications.filter(app => app.status === 'rejected').length
    const accepted = state.applications.filter(app => app.status === 'accepted').length

    return { total, pending, reviewing, interview, rejected, accepted }
  }

  // Toast helpers
  const addToast = (toast) => {
    const id = Date.now()
    dispatch({ type: 'ADD_TOAST', payload: { ...toast, id } })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id })
    }, 4000)
  }

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

export function useJob() {
  const context = useContext(JobContext)
  if (!context) {
    throw new Error('useJob must be used within a JobProvider')
  }
  return context
}
