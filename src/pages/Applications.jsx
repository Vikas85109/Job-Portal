import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiSend,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiFileText
} from 'react-icons/fi'
import { useJob } from '../context/JobContext'

function Applications() {
  const { applications, getJobById, getApplicationStats } = useJob()
  const stats = getApplicationStats()

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock />
      case 'reviewing':
        return <FiFileText />
      case 'interview':
        return <FiCheckCircle />
      case 'accepted':
        return <FiCheckCircle />
      case 'rejected':
        return <FiXCircle />
      default:
        return <FiClock />
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'reviewing':
        return 'Under Review'
      case 'interview':
        return 'Interview'
      case 'accepted':
        return 'Accepted'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Pending'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="applications-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title">My Applications</h1>
          <p className="page-subtitle">
            Track the status of your job applications
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="applications-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="application-stat-card">
            <div className="application-stat-icon">
              <FiSend />
            </div>
            <div className="application-stat-value">{stats.total}</div>
            <div className="application-stat-label">Total Applied</div>
          </div>

          <div className="application-stat-card">
            <div className="application-stat-icon">
              <FiClock />
            </div>
            <div className="application-stat-value">{stats.pending + stats.reviewing}</div>
            <div className="application-stat-label">In Progress</div>
          </div>

          <div className="application-stat-card">
            <div className="application-stat-icon">
              <FiCheckCircle />
            </div>
            <div className="application-stat-value">{stats.interview + stats.accepted}</div>
            <div className="application-stat-label">Positive Response</div>
          </div>

          <div className="application-stat-card">
            <div className="application-stat-icon">
              <FiXCircle />
            </div>
            <div className="application-stat-value">{stats.rejected}</div>
            <div className="application-stat-label">Rejected</div>
          </div>
        </motion.div>

        {/* Applications List */}
        {applications.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {applications.map((application, index) => {
              const job = getJobById(application.jobId)
              if (!job) return null

              return (
                <motion.div
                  key={application.id}
                  className="application-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="application-logo">
                    <span>{job.company.charAt(0)}</span>
                  </div>

                  <div className="application-content">
                    <div className="application-header">
                      <Link to={`/job/${job.id}`} className="application-title">
                        {job.title}
                      </Link>
                      <span className={`application-status ${application.status}`}>
                        {getStatusIcon(application.status)}
                        {getStatusLabel(application.status)}
                      </span>
                    </div>

                    <p className="application-company">{job.company}</p>

                    <div className="application-meta">
                      <span className="application-meta-item">
                        <FiMapPin /> {job.location}
                      </span>
                      <span className="application-meta-item">
                        <FiBriefcase /> {job.type}
                      </span>
                      <span className="application-meta-item">
                        <FiCalendar /> Applied {formatDate(application.appliedAt)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="empty-state-icon">
              <FiSend />
            </div>
            <h2>No applications yet</h2>
            <p>Start applying to jobs to track your applications here!</p>
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Applications
