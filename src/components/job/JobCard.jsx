import { Link } from 'react-router-dom'
import { FiMapPin, FiClock, FiBriefcase, FiBookmark, FiDollarSign } from 'react-icons/fi'
import { useJob } from '../../context/JobContext'

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

  const formatSalary = (min, max) => {
    const formatNum = (num) => {
      if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}k`
      }
      return `$${num}`
    }
    return `${formatNum(min)} - ${formatNum(max)}`
  }

  const getTimeAgo = (date) => {
    const now = new Date()
    const posted = new Date(date)
    const diffTime = Math.abs(now - posted)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <Link to={`/job/${job.id}`} className="job-card">
      <div className="job-card-logo">
        {job.logo ? (
          <img src={job.logo} alt={job.company} />
        ) : (
          <span>{job.company.charAt(0)}</span>
        )}
      </div>

      <div className="job-card-content">
        <div className="job-card-header">
          <h3 className="job-card-title">{job.title}</h3>
        </div>

        <p className="job-card-company">{job.company}</p>

        <div className="job-card-meta">
          <span className="job-card-meta-item">
            <FiMapPin />
            {job.location}
          </span>
          <span className="job-card-meta-item">
            <FiBriefcase />
            {job.type}
          </span>
          <span className="job-card-meta-item">
            <FiClock />
            {job.experienceLevel}
          </span>
        </div>

        <div className="job-card-tags">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="job-card-tag">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="job-card-tag">+{job.skills.length - 4}</span>
          )}
        </div>
      </div>

      <div className="job-card-actions">
        <div className="job-card-salary">
          <FiDollarSign />
          {formatSalary(job.salaryMin, job.salaryMax)}
        </div>
        <button
          className={`job-card-save ${saved ? 'saved' : ''}`}
          onClick={handleSave}
          aria-label={saved ? 'Remove from saved' : 'Save job'}
        >
          <FiBookmark fill={saved ? 'currentColor' : 'none'} />
        </button>
        <span className="job-card-time">{getTimeAgo(job.postedAt)}</span>
      </div>
    </Link>
  )
}

export default JobCard
