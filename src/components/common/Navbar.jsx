import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiBriefcase, FiSearch, FiBookmark, FiFileText, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useJob } from '../../context/JobContext'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { savedJobs, user, dispatch } = useJob()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_FILTERS', payload: { search: searchQuery.trim() } })
    navigate('/jobs')
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    // Clear filter immediately when search is emptied
    if (!value.trim()) {
      dispatch({ type: 'SET_FILTERS', payload: { search: '' } })
    }
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <FiBriefcase />
          <span>JobHunt</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <FiSearch className="navbar-search-icon" />
          <input
            type="text"
            placeholder="Search jobs, companies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>

        <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/jobs" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            <FiBriefcase />
            <span>Jobs</span>
          </NavLink>

          <NavLink to="/companies" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            <FiSearch />
            <span>Companies</span>
          </NavLink>

          <NavLink to="/saved" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            <FiBookmark />
            <span>Saved</span>
            {savedJobs.length > 0 && (
              <span className="badge-count">{savedJobs.length}</span>
            )}
          </NavLink>

          <NavLink to="/resume" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            <FiFileText />
            <span>Resume</span>
          </NavLink>
        </nav>

        <div className="navbar-actions">
          {user ? (
            <>
              <NavLink to="/applications" className="btn btn-secondary btn-sm">
                Applications
              </NavLink>
              <NavLink to="/profile" className="btn btn-icon btn-secondary">
                <FiUser />
              </NavLink>
              <button onClick={handleLogout} className="btn btn-icon btn-secondary">
                <FiLogOut />
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/auth?mode=signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
