import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiFilter, FiSearch } from 'react-icons/fi'
import { useJob } from '../context/JobContext'
import JobCard from '../components/job/JobCard'
import JobFilters from '../components/job/JobFilters'

function Jobs() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const { filters, dispatch, getFilteredJobs } = useJob()

  const filteredJobs = useMemo(() => {
    let jobs = getFilteredJobs()

    // Sort jobs
    switch (sortBy) {
      case 'recent':
        jobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
        break
      case 'salary-high':
        jobs.sort((a, b) => b.salaryMax - a.salaryMax)
        break
      case 'salary-low':
        jobs.sort((a, b) => a.salaryMin - b.salaryMin)
        break
      case 'applicants':
        jobs.sort((a, b) => b.applicants - a.applicants)
        break
      default:
        break
    }

    return jobs
  }, [getFilteredJobs, sortBy])

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_FILTERS', payload: { search: e.target.value } })
  }

  return (
    <div className="jobs-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title">Find Jobs</h1>
          <p className="page-subtitle">
            Discover your next career opportunity
          </p>
        </motion.div>

        <div className="jobs-layout">
          <JobFilters isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />

          <div className="jobs-main">
            <div className="jobs-toolbar" style={{ marginBottom: '1.5rem' }}>
              <div className="navbar-search" style={{ maxWidth: '100%', marginBottom: '1rem' }}>
                <FiSearch className="navbar-search-icon" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <button
              className="btn btn-secondary mobile-filter-toggle"
              onClick={() => setFiltersOpen(true)}
            >
              <FiFilter /> Filters
            </button>

            <div className="jobs-header">
              <p className="jobs-count">
                Showing <span>{filteredJobs.length}</span> jobs
              </p>
              <div className="jobs-sort">
                <label>Sort by:</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Highest Salary</option>
                  <option value="salary-low">Lowest Salary</option>
                  <option value="applicants">Most Popular</option>
                </select>
              </div>
            </div>

            <motion.div
              className="jobs-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <FiSearch />
                  </div>
                  <h2>No jobs found</h2>
                  <p>Try adjusting your search or filters to find what you're looking for.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => dispatch({ type: 'RESET_FILTERS' })}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
