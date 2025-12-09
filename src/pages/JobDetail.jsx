import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiBookmark,
  FiShare2,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiExternalLink
} from 'react-icons/fi'
import { useJob } from '../context/JobContext'

function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    getJobById,
    getCompanyById,
    isJobSaved,
    hasApplied,
    dispatch,
    addToast,
    user,
    resume
  } = useJob()
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')

  const job = getJobById(id)
  const company = job ? getCompanyById(job.companyId) : null

  if (!job) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h2>Job not found</h2>
            <p>The job you're looking for doesn't exist or has been removed.</p>
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const saved = isJobSaved(job.id)
  const applied = hasApplied(job.id)

  const formatSalary = (min, max) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  }

  const handleSave = () => {
    dispatch({ type: 'TOGGLE_SAVE_JOB', payload: job.id })
    addToast({
      type: saved ? 'info' : 'success',
      message: saved ? 'Removed from saved jobs' : 'Job saved successfully'
    })
  }

  const handleApply = () => {
    if (!user) {
      addToast({
        type: 'warning',
        title: 'Sign in required',
        message: 'Please sign in to apply for jobs'
      })
      navigate('/auth')
      return
    }
    setShowApplyModal(true)
  }

  const submitApplication = () => {
    dispatch({
      type: 'APPLY_TO_JOB',
      payload: {
        jobId: job.id,
        coverLetter,
        resume
      }
    })
    setShowApplyModal(false)
    setCoverLetter('')
    addToast({
      type: 'success',
      title: 'Application Submitted',
      message: `You've successfully applied to ${job.title} at ${job.company}`
    })
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      addToast({
        type: 'success',
        message: 'Link copied to clipboard'
      })
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Failed to copy link'
      })
    }
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="btn btn-secondary mb-4"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft /> Back
          </button>

          <div className="job-detail-layout">
            <div className="job-detail-main">
              {/* Header */}
              <div className="job-detail-header">
                <div className="job-detail-top">
                  <div className="job-detail-logo">
                    {company?.logo ? (
                      <img src={company.logo} alt={job.company} />
                    ) : (
                      <span>{job.company.charAt(0)}</span>
                    )}
                  </div>
                  <div className="job-detail-info">
                    <h1 className="job-detail-title">{job.title}</h1>
                    <p className="job-detail-company">
                      <Link to={`/company/${job.companyId}`}>
                        {job.company}
                      </Link>
                      {company && (
                        <span> • {company.industry}</span>
                      )}
                    </p>
                    <div className="job-detail-meta">
                      <span className="job-detail-meta-item">
                        <FiMapPin /> {job.location}
                      </span>
                      <span className="job-detail-meta-item">
                        <FiBriefcase /> {job.type}
                      </span>
                      <span className="job-detail-meta-item">
                        <FiClock /> {job.experienceLevel}
                      </span>
                      <span className="job-detail-meta-item">
                        <FiCalendar /> Posted {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="job-detail-actions">
                  <button
                    className={`btn ${applied ? 'btn-success' : 'btn-primary'}`}
                    onClick={handleApply}
                    disabled={applied}
                  >
                    {applied ? (
                      <>
                        <FiCheck /> Applied
                      </>
                    ) : (
                      'Apply Now'
                    )}
                  </button>
                  <button
                    className={`btn ${saved ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={handleSave}
                  >
                    <FiBookmark fill={saved ? 'currentColor' : 'none'} />
                    {saved ? 'Saved' : 'Save'}
                  </button>
                  <button className="btn btn-secondary" onClick={handleShare}>
                    <FiShare2 /> Share
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="job-detail-section">
                <h2>About the Role</h2>
                <p>{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="job-detail-section">
                <h2>Responsibilities</h2>
                <ul>
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="job-detail-section">
                <h2>Requirements</h2>
                <ul>
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="job-detail-section">
                <h2>Benefits</h2>
                <ul>
                  {job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="job-detail-section">
                <h2>Skills</h2>
                <div className="job-detail-tags">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="job-detail-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="apply-sidebar">
              <div className="apply-card">
                <h3 className="apply-card-title">Job Overview</h3>

                <div className="apply-salary">
                  <span className="apply-salary-label">Salary Range</span>
                  <span className="apply-salary-value">
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </span>
                </div>

                <div className="apply-details">
                  <div className="apply-detail">
                    <div className="apply-detail-icon">
                      <FiBriefcase />
                    </div>
                    <div className="apply-detail-content">
                      <span className="apply-detail-label">Job Type</span>
                      <span className="apply-detail-value">{job.type}</span>
                    </div>
                  </div>

                  <div className="apply-detail">
                    <div className="apply-detail-icon">
                      <FiClock />
                    </div>
                    <div className="apply-detail-content">
                      <span className="apply-detail-label">Experience</span>
                      <span className="apply-detail-value">{job.experienceLevel}</span>
                    </div>
                  </div>

                  <div className="apply-detail">
                    <div className="apply-detail-icon">
                      <FiMapPin />
                    </div>
                    <div className="apply-detail-content">
                      <span className="apply-detail-label">Location</span>
                      <span className="apply-detail-value">{job.location}</span>
                    </div>
                  </div>

                  <div className="apply-detail">
                    <div className="apply-detail-icon">
                      <FiUsers />
                    </div>
                    <div className="apply-detail-content">
                      <span className="apply-detail-label">Applicants</span>
                      <span className="apply-detail-value">{job.applicants} applied</span>
                    </div>
                  </div>
                </div>

                <div className="apply-actions">
                  <button
                    className={`btn ${applied ? 'btn-success' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                    onClick={handleApply}
                    disabled={applied}
                  >
                    {applied ? (
                      <>
                        <FiCheck /> Applied
                      </>
                    ) : (
                      'Apply Now'
                    )}
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                    onClick={handleSave}
                  >
                    <FiBookmark fill={saved ? 'currentColor' : 'none'} />
                    {saved ? 'Saved' : 'Save Job'}
                  </button>
                </div>
              </div>

              {/* Company Card */}
              {company && (
                <div className="company-mini-card">
                  <div className="company-mini-header">
                    <div className="company-mini-logo">
                      <span>{company.name.charAt(0)}</span>
                    </div>
                    <div className="company-mini-info">
                      <h3>{company.name}</h3>
                      <p>{company.industry}</p>
                    </div>
                  </div>

                  <div className="company-mini-stats">
                    <div className="company-mini-stat">
                      <span className="company-mini-stat-value">{company.openPositions}</span>
                      <span className="company-mini-stat-label">Open Jobs</span>
                    </div>
                    <div className="company-mini-stat">
                      <span className="company-mini-stat-value">{company.rating}</span>
                      <span className="company-mini-stat-label">Rating</span>
                    </div>
                  </div>

                  <Link
                    to={`/company/${company.id}`}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    View Company <FiExternalLink />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Apply to {job.title}</h2>
              <button className="modal-close" onClick={() => setShowApplyModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                You're applying to <strong>{job.title}</strong> at <strong>{job.company}</strong>.
                {resume.personalInfo?.fullName && (
                  <span> Your saved resume for <strong>{resume.personalInfo.fullName}</strong> will be attached.</span>
                )}
              </p>

              {!resume.personalInfo?.fullName && (
                <div className="card mb-4" style={{ background: 'rgba(234, 179, 8, 0.1)', borderColor: 'var(--warning)' }}>
                  <p style={{ color: 'var(--warning)', margin: 0 }}>
                    You haven't created a resume yet. <Link to="/resume" style={{ color: 'var(--primary)' }}>Build your resume</Link> to make your application stronger.
                  </p>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Cover Letter (Optional)</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell the employer why you're a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowApplyModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={submitApplication}>
                Submit Application
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default JobDetail
