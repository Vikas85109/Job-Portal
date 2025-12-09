import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBookmark } from 'react-icons/fi'
import { useJob } from '../context/JobContext'
import JobCard from '../components/job/JobCard'

function SavedJobs() {
  const { getSavedJobs } = useJob()
  const savedJobs = getSavedJobs()

  return (
    <div className="saved-jobs-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title">Saved Jobs</h1>
          <p className="page-subtitle">
            Jobs you've bookmarked for later
          </p>
        </motion.div>

        {savedJobs.length > 0 ? (
          <motion.div
            className="jobs-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {savedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="empty-state-icon">
              <FiBookmark />
            </div>
            <h2>No saved jobs yet</h2>
            <p>Start browsing and save jobs that interest you!</p>
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SavedJobs
