import { FiCheck, FiX } from 'react-icons/fi'
import { useJob } from '../../context/JobContext'

function JobFilters({ isOpen, onClose }) {
  const { filters, dispatch } = useJob()

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  const experienceLevels = ['Entry-Level', 'Mid-Level', 'Senior', 'Lead', 'Executive']
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Remote', 'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Boston, MA']

  const handleJobTypeToggle = (type) => {
    const current = filters.jobType || []
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type]
    dispatch({ type: 'SET_FILTERS', payload: { jobType: updated } })
  }

  const handleExperienceToggle = (level) => {
    const current = filters.experienceLevel || []
    const updated = current.includes(level)
      ? current.filter(l => l !== level)
      : [...current, level]
    dispatch({ type: 'SET_FILTERS', payload: { experienceLevel: updated } })
  }

  const handleLocationChange = (e) => {
    dispatch({ type: 'SET_FILTERS', payload: { location: e.target.value } })
  }

  const handleSalaryChange = (e) => {
    const value = parseInt(e.target.value)
    dispatch({ type: 'SET_FILTERS', payload: { salaryRange: [0, value] } })
  }

  const handleClearFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  const hasActiveFilters =
    filters.jobType?.length > 0 ||
    filters.experienceLevel?.length > 0 ||
    filters.location ||
    filters.salaryRange?.[1] !== 300000

  return (
    <aside className={`filters-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        {hasActiveFilters && (
          <button className="filters-clear" onClick={handleClearFilters}>
            Clear all
          </button>
        )}
        <button className="filters-close show-mobile" onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className="filter-group">
        <label className="filter-label">Location</label>
        <select
          className="form-input form-select"
          value={filters.location}
          onChange={handleLocationChange}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Job Type</label>
        <div className="filter-options">
          {jobTypes.map(type => (
            <div
              key={type}
              className={`filter-option ${filters.jobType?.includes(type) ? 'active' : ''}`}
              onClick={() => handleJobTypeToggle(type)}
            >
              <span className="filter-checkbox">
                <FiCheck />
              </span>
              <span className="filter-option-label">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Experience Level</label>
        <div className="filter-options">
          {experienceLevels.map(level => (
            <div
              key={level}
              className={`filter-option ${filters.experienceLevel?.includes(level) ? 'active' : ''}`}
              onClick={() => handleExperienceToggle(level)}
            >
              <span className="filter-checkbox">
                <FiCheck />
              </span>
              <span className="filter-option-label">{level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Salary Range</label>
        <div className="filter-range">
          <div className="filter-range-values">
            <span>$0</span>
            <span>${(filters.salaryRange?.[1] || 300000).toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="300000"
            step="10000"
            value={filters.salaryRange?.[1] || 300000}
            onChange={handleSalaryChange}
          />
        </div>
      </div>

      <button className="btn btn-primary show-mobile" style={{ width: '100%', marginTop: '1rem' }} onClick={onClose}>
        Apply Filters
      </button>
    </aside>
  )
}

export default JobFilters
