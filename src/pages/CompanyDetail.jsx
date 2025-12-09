import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiGlobe,
  FiBriefcase,
  FiStar,
  FiArrowLeft,
  FiExternalLink
} from 'react-icons/fi'
import { useJob } from '../context/JobContext'
import JobCard from '../components/job/JobCard'

function CompanyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCompanyById, getJobsByCompany } = useJob()
  const [activeTab, setActiveTab] = useState('about')

  const company = getCompanyById(id)
  const companyJobs = getJobsByCompany(id)

  if (!company) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h2>Company not found</h2>
            <p>The company you're looking for doesn't exist.</p>
            <Link to="/companies" className="btn btn-primary">
              Browse Companies
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="company-detail-page">
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

          {/* Company Header */}
          <div className="company-detail-header">
            <div className="company-detail-top">
              <div className="company-detail-logo">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} />
                ) : (
                  <span>{company.name.charAt(0)}</span>
                )}
              </div>
              <div className="company-detail-info">
                <h1 className="company-detail-name">{company.name}</h1>
                <p className="company-detail-tagline">{company.description}</p>
                <div className="company-detail-meta">
                  <span className="company-detail-meta-item">
                    <FiMapPin /> {company.location}
                  </span>
                  <span className="company-detail-meta-item">
                    <FiUsers /> {company.size} employees
                  </span>
                  <span className="company-detail-meta-item">
                    <FiCalendar /> Founded {company.founded}
                  </span>
                  <span className="company-detail-meta-item">
                    <FiStar /> {company.rating} ({company.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="company-stats-grid">
            <div className="company-stat-card">
              <div className="company-stat-value">{company.openPositions}</div>
              <div className="company-stat-label">Open Positions</div>
            </div>
            <div className="company-stat-card">
              <div className="company-stat-value">{company.size}</div>
              <div className="company-stat-label">Employees</div>
            </div>
            <div className="company-stat-card">
              <div className="company-stat-value">{company.rating}</div>
              <div className="company-stat-label">Rating</div>
            </div>
            <div className="company-stat-card">
              <div className="company-stat-value">{company.reviews}</div>
              <div className="company-stat-label">Reviews</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="company-tabs">
            <button
              className={`company-tab ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button
              className={`company-tab ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              Jobs ({companyJobs.length})
            </button>
            <button
              className={`company-tab ${activeTab === 'benefits' ? 'active' : ''}`}
              onClick={() => setActiveTab('benefits')}
            >
              Benefits
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <motion.div
              className="company-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>About {company.name}</h2>
              <p>{company.about}</p>

              <h2 style={{ marginTop: '2rem' }}>Our Culture</h2>
              <p>{company.culture}</p>

              <div style={{ marginTop: '2rem' }}>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <FiGlobe /> Visit Website <FiExternalLink />
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === 'jobs' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {companyJobs.length > 0 ? (
                <div className="jobs-list">
                  {companyJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <FiBriefcase />
                  </div>
                  <h2>No open positions</h2>
                  <p>This company doesn't have any open positions at the moment.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'benefits' && (
            <motion.div
              className="company-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Employee Benefits</h2>
              <div className="grid grid-3" style={{ marginTop: '1.5rem' }}>
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="card">
                    <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CompanyDetail
