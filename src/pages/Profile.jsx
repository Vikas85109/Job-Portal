import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiBriefcase,
  FiFileText,
  FiBookmark,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiSave
} from 'react-icons/fi'
import { useJob } from '../context/JobContext'

function Profile() {
  const { user, resume, applications, savedJobs, dispatch, addToast } = useJob()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: resume.personalInfo?.phone || '',
    location: resume.personalInfo?.location || '',
    title: resume.personalInfo?.title || ''
  })

  if (!user) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h2>Please sign in</h2>
            <p>You need to be signed in to view your profile.</p>
            <Link to="/auth" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    addToast({ type: 'info', message: 'You have been signed out' })
    navigate('/')
  }

  const handleSaveProfile = () => {
    dispatch({
      type: 'LOGIN',
      payload: { ...user, name: profileData.name, email: profileData.email }
    })
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: {
        phone: profileData.phone,
        location: profileData.location,
        title: profileData.title
      }
    })
    setIsEditing(false)
    addToast({ type: 'success', message: 'Profile updated successfully' })
  }

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="profile-layout">
            {/* Sidebar */}
            <aside className="profile-sidebar">
              <div className="profile-avatar">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>

              <nav className="profile-nav">
                <button
                  className={`profile-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FiUser /> Overview
                </button>
                <button
                  className={`profile-nav-item ${activeTab === 'applications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  <FiBriefcase /> Applications
                </button>
                <button
                  className={`profile-nav-item ${activeTab === 'saved' ? 'active' : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
                  <FiBookmark /> Saved Jobs
                </button>
                <button
                  className={`profile-nav-item ${activeTab === 'resume' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resume')}
                >
                  <FiFileText /> Resume
                </button>
                <button
                  className={`profile-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FiSettings /> Settings
                </button>
                <button
                  className="profile-nav-item"
                  onClick={handleLogout}
                  style={{ color: 'var(--error)' }}
                >
                  <FiLogOut /> Sign Out
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="profile-content">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="profile-section">
                    <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                      <h2 className="profile-section-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
                        Personal Information
                      </h2>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      >
                        {isEditing ? <><FiSave /> Save</> : <><FiEdit2 /> Edit</>}
                      </button>
                    </div>

                    <div className="grid grid-2">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-input"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        ) : (
                          <p style={{ color: 'var(--text-primary)' }}>{profileData.name || '-'}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            className="form-input"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        ) : (
                          <p style={{ color: 'var(--text-primary)' }}>{profileData.email || '-'}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            className="form-input"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        ) : (
                          <p style={{ color: 'var(--text-primary)' }}>{profileData.phone || '-'}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Location</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-input"
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          />
                        ) : (
                          <p style={{ color: 'var(--text-primary)' }}>{profileData.location || '-'}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Job Title</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-input"
                            value={profileData.title}
                            onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                          />
                        ) : (
                          <p style={{ color: 'var(--text-primary)' }}>{profileData.title || '-'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-3">
                    <div className="card text-center">
                      <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        {applications.length}
                      </h3>
                      <p style={{ color: 'var(--text-muted)' }}>Applications</p>
                    </div>
                    <div className="card text-center">
                      <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        {savedJobs.length}
                      </h3>
                      <p style={{ color: 'var(--text-muted)' }}>Saved Jobs</p>
                    </div>
                    <div className="card text-center">
                      <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        {resume.skills.length}
                      </h3>
                      <p style={{ color: 'var(--text-muted)' }}>Skills</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'applications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="profile-section">
                    <h2 className="profile-section-title">My Applications</h2>
                    {applications.length > 0 ? (
                      <p style={{ color: 'var(--text-secondary)' }}>
                        You have {applications.length} application(s).{' '}
                        <Link to="/applications" style={{ color: 'var(--primary)' }}>View all →</Link>
                      </p>
                    ) : (
                      <p style={{ color: 'var(--text-secondary)' }}>
                        No applications yet.{' '}
                        <Link to="/jobs" style={{ color: 'var(--primary)' }}>Browse jobs →</Link>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'saved' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="profile-section">
                    <h2 className="profile-section-title">Saved Jobs</h2>
                    {savedJobs.length > 0 ? (
                      <p style={{ color: 'var(--text-secondary)' }}>
                        You have {savedJobs.length} saved job(s).{' '}
                        <Link to="/saved" style={{ color: 'var(--primary)' }}>View all →</Link>
                      </p>
                    ) : (
                      <p style={{ color: 'var(--text-secondary)' }}>
                        No saved jobs yet.{' '}
                        <Link to="/jobs" style={{ color: 'var(--primary)' }}>Browse jobs →</Link>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'resume' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="profile-section">
                    <h2 className="profile-section-title">Resume</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      {resume.personalInfo.fullName
                        ? `Your resume is set up for ${resume.personalInfo.fullName}.`
                        : 'You haven\'t created a resume yet.'}
                    </p>
                    <Link to="/resume" className="btn btn-primary">
                      {resume.personalInfo.fullName ? 'Edit Resume' : 'Create Resume'}
                    </Link>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="profile-section">
                    <h2 className="profile-section-title">Account Settings</h2>
                    <div className="form-group">
                      <label className="form-label">Email Notifications</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        <input type="checkbox" defaultChecked />
                        Job recommendations
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        <input type="checkbox" defaultChecked />
                        Application status updates
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                        <input type="checkbox" />
                        Marketing emails
                      </label>
                    </div>

                    <div className="form-group" style={{ marginTop: '2rem' }}>
                      <label className="form-label">Danger Zone</label>
                      <button className="btn btn-secondary" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
