import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiSearch,
  FiMapPin,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiZap,
  FiCode,
  FiPenTool,
  FiDatabase,
  FiBarChart,
  FiShield,
  FiDollarSign,
  FiArrowRight
} from 'react-icons/fi'
import { useJob } from '../context/JobContext'
import JobCard from '../components/job/JobCard'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const { jobs, companies, dispatch } = useJob()
  const navigate = useNavigate()

  const featuredJobs = jobs.filter(job => job.featured).slice(0, 4)

  const categories = [
    { name: 'Engineering', icon: FiCode, count: jobs.filter(j => j.category === 'Engineering').length },
    { name: 'Design', icon: FiPenTool, count: jobs.filter(j => j.category === 'Design').length },
    { name: 'Data Science', icon: FiDatabase, count: jobs.filter(j => j.category === 'Data Science').length },
    { name: 'Marketing', icon: FiBarChart, count: jobs.filter(j => j.category === 'Marketing').length },
    { name: 'Product', icon: FiTrendingUp, count: jobs.filter(j => j.category === 'Product').length },
    { name: 'Human Resources', icon: FiUsers, count: jobs.filter(j => j.category === 'Human Resources').length },
    { name: 'Security', icon: FiShield, count: jobs.filter(j => j.category === 'Security').length || 1 },
    { name: 'Finance', icon: FiDollarSign, count: jobs.filter(j => j.category === 'Finance').length || 2 }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch({
      type: 'SET_FILTERS',
      payload: { search: searchQuery, location: locationQuery }
    })
    navigate('/jobs')
  }

  const handleCategoryClick = (category) => {
    dispatch({ type: 'SET_FILTERS', payload: { category: category.name } })
    navigate('/jobs')
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-badge">
              <FiZap /> Over 10,000+ jobs available
            </span>
            <h1 className="hero-title">
              Find Your <span>Dream Job</span> Today
            </h1>
            <p className="hero-subtitle">
              Discover thousands of job opportunities with all the information you need.
              Your future career starts here.
            </p>

            <form className="hero-search" onSubmit={handleSearch}>
              <div className="hero-search-input">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hero-search-divider" />
              <div className="hero-search-input">
                <FiMapPin />
                <input
                  type="text"
                  placeholder="City or remote"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg">
                Search Jobs
              </button>
            </form>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">{jobs.length}+</span>
                <span className="hero-stat-label">Job Listings</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">{companies.length}+</span>
                <span className="hero-stat-label">Companies</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">50K+</span>
                <span className="hero-stat-label">Candidates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div
            className="features-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="feature-card">
              <div className="feature-icon">
                <FiSearch />
              </div>
              <h3 className="feature-title">Easy Job Search</h3>
              <p className="feature-description">
                Find jobs that match your skills and preferences with our powerful search filters.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiCheckCircle />
              </div>
              <h3 className="feature-title">Quick Apply</h3>
              <p className="feature-description">
                Apply to multiple jobs with just a few clicks using your saved resume.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiTrendingUp />
              </div>
              <h3 className="feature-title">Career Growth</h3>
              <p className="feature-description">
                Access resources and tools to help you advance in your career journey.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiUsers />
              </div>
              <h3 className="feature-title">Top Companies</h3>
              <p className="feature-description">
                Connect with leading companies across various industries worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Explore jobs across different categories and find what suits you best
            </p>
          </motion.div>

          <motion.div
            className="categories-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-icon">
                  <category.icon />
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} jobs</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Featured Jobs</h2>
            <p className="section-subtitle">
              Hand-picked opportunities from top companies
            </p>
          </motion.div>

          <motion.div
            className="jobs-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </motion.div>

          <div className="text-center mt-5">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              View All Jobs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-content">
              <h2 className="cta-title">Ready to Get Started?</h2>
              <p className="cta-description">
                Create your resume and start applying to your dream jobs today.
                It only takes a few minutes to get started.
              </p>
              <div className="cta-buttons">
                <Link to="/resume" className="btn btn-primary btn-lg">
                  Build Your Resume
                </Link>
                <Link to="/jobs" className="btn btn-outline btn-lg">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
