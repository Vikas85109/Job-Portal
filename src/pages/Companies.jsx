import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiSearch,
  FiMapPin,
  FiUsers,
  FiBriefcase,
  FiStar,
  FiGlobe,
  FiTrendingUp,
  FiAward,
  FiGrid,
  FiList,
  FiChevronRight,
  FiHome,
  FiCalendar,
  FiExternalLink
} from 'react-icons/fi'
import { useJob } from '../context/JobContext'

function Companies() {
  const { companies, jobs } = useJob()
  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [sizeFilter, setSizeFilter] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')

  const industries = [...new Set(companies.map(c => c.industry))]
  const sizes = ['20-50', '50-150', '50-200', '100-300', '100-500', '200-500', '300-700', '500-1000', '1000-5000']

  // Stats
  const totalJobs = jobs.length
  const totalCompanies = companies.length
  const featuredCompanies = companies.filter(c => c.rating >= 4.5).length

  const filteredCompanies = companies
    .filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesIndustry = !industryFilter || company.industry === industryFilter
      const matchesSize = !sizeFilter || company.size === sizeFilter
      return matchesSearch && matchesIndustry && matchesSize
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'jobs':
          return b.openPositions - a.openPositions
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return b.founded - a.founded
        default:
          return b.rating - a.rating
      }
    })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="companies-page">
      {/* Hero Section */}
      <div className="companies-hero">
        <div className="container">
          <motion.div
            className="companies-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="companies-hero-badge">
              <FiHome /> {totalCompanies}+ Companies Hiring
            </span>
            <h1 className="companies-hero-title">
              Find Your Next <span>Dream Company</span>
            </h1>
            <p className="companies-hero-subtitle">
              Explore top companies, read reviews, and discover your perfect workplace culture
            </p>

            {/* Search Bar */}
            <div className="companies-search-wrapper">
              <div className="companies-search">
                <FiSearch className="companies-search-icon" />
                <input
                  type="text"
                  placeholder="Search companies by name, industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="companies-stats">
              <div className="companies-stat">
                <div className="companies-stat-icon">
                  <FiHome />
                </div>
                <div className="companies-stat-content">
                  <span className="companies-stat-value">{totalCompanies}</span>
                  <span className="companies-stat-label">Companies</span>
                </div>
              </div>
              <div className="companies-stat">
                <div className="companies-stat-icon">
                  <FiBriefcase />
                </div>
                <div className="companies-stat-content">
                  <span className="companies-stat-value">{totalJobs}+</span>
                  <span className="companies-stat-label">Open Jobs</span>
                </div>
              </div>
              <div className="companies-stat">
                <div className="companies-stat-icon">
                  <FiAward />
                </div>
                <div className="companies-stat-content">
                  <span className="companies-stat-value">{featuredCompanies}</span>
                  <span className="companies-stat-label">Top Rated</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Filter Bar */}
        <motion.div
          className="companies-filter-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="companies-filters">
            <div className="filter-chip-group">
              <button
                className={`filter-chip ${!industryFilter ? 'active' : ''}`}
                onClick={() => setIndustryFilter('')}
              >
                All Industries
              </button>
              {industries.slice(0, 5).map(industry => (
                <button
                  key={industry}
                  className={`filter-chip ${industryFilter === industry ? 'active' : ''}`}
                  onClick={() => setIndustryFilter(industry)}
                >
                  {industry}
                </button>
              ))}
              {industries.length > 5 && (
                <select
                  className="filter-chip-select"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <option value="">More...</option>
                  {industries.slice(5).map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="companies-filter-actions">
              <select
                className="form-input form-select companies-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="jobs">Most Jobs</option>
                <option value="name">A-Z</option>
                <option value="newest">Newest</option>
              </select>

              <div className="view-toggle">
                <button
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          <p className="companies-results-count">
            Showing <span>{filteredCompanies.length}</span> of {companies.length} companies
          </p>
        </motion.div>

        {/* Companies Grid/List */}
        {filteredCompanies.length > 0 ? (
          <motion.div
            className={`companies-container ${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCompanies.map((company) => (
              <motion.div key={company.id} variants={itemVariants}>
                <Link
                  to={`/company/${company.id}`}
                  className={`company-card-enhanced ${viewMode}`}
                >
                  {/* Rating Badge */}
                  {company.rating >= 4.5 && (
                    <div className="company-badge">
                      <FiAward /> Top Rated
                    </div>
                  )}

                  <div className="company-card-main">
                    <div className="company-card-logo-wrapper">
                      <div className="company-card-logo-enhanced">
                        {company.logo ? (
                          <img src={company.logo} alt={company.name} />
                        ) : (
                          <span>{company.name.charAt(0)}</span>
                        )}
                      </div>
                      {company.openPositions > 0 && (
                        <span className="company-hiring-badge">
                          Hiring
                        </span>
                      )}
                    </div>

                    <div className="company-card-info-enhanced">
                      <div className="company-card-header-enhanced">
                        <h3 className="company-card-name">{company.name}</h3>
                        <div className="company-card-rating">
                          <FiStar className="star-icon" />
                          <span>{company.rating}</span>
                          <span className="rating-count">({company.reviews} reviews)</span>
                        </div>
                      </div>

                      <p className="company-card-industry">
                        <FiTrendingUp /> {company.industry}
                      </p>

                      <p className="company-card-description-enhanced">
                        {company.description}
                      </p>

                      <div className="company-card-meta-enhanced">
                        <span className="company-meta-item">
                          <FiMapPin /> {company.location}
                        </span>
                        <span className="company-meta-item">
                          <FiUsers /> {company.size} employees
                        </span>
                        <span className="company-meta-item">
                          <FiCalendar /> Est. {company.founded}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="company-card-footer-enhanced">
                    <div className="company-jobs-count">
                      <FiBriefcase />
                      <span><strong>{company.openPositions}</strong> open positions</span>
                    </div>
                    <span className="company-view-link">
                      View Details <FiChevronRight />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-state-icon">
              <FiSearch />
            </div>
            <h2>No companies found</h2>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('')
                setIndustryFilter('')
                setSizeFilter('')
              }}
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Featured Industries Section */}
        <motion.section
          className="featured-industries"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="featured-industries-title">Browse by Industry</h2>
          <div className="industries-grid">
            {industries.map((industry, index) => {
              const count = companies.filter(c => c.industry === industry).length
              return (
                <button
                  key={industry}
                  className="industry-card"
                  onClick={() => setIndustryFilter(industry)}
                >
                  <span className="industry-name">{industry}</span>
                  <span className="industry-count">{count} companies</span>
                </button>
              )
            })}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Companies
