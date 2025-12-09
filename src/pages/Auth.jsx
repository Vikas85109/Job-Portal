import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiBriefcase,
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff
} from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useJob } from '../context/JobContext'

function Auth() {
  const [searchParams] = useSearchParams()
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const { dispatch, addToast, user } = useJob()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/profile')
    }
  }, [user, navigate])

  const validateForm = () => {
    const newErrors = {}

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    // Simulate authentication (frontend only)
    const userData = {
      id: Date.now(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      avatar: null
    }

    dispatch({ type: 'LOGIN', payload: userData })
    addToast({
      type: 'success',
      title: isLogin ? 'Welcome back!' : 'Account created!',
      message: `You're now signed in as ${userData.email}`
    })
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSocialAuth = (provider) => {
    // Simulate social auth
    const userData = {
      id: Date.now(),
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: null
    }

    dispatch({ type: 'LOGIN', payload: userData })
    addToast({
      type: 'success',
      title: 'Welcome!',
      message: `Signed in with ${provider}`
    })
    navigate('/')
  }

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <FiBriefcase />
              <span>JobHunt</span>
            </div>
            <h1 className="auth-title">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="auth-subtitle">
              {isLogin
                ? 'Sign in to continue your job search'
                : 'Start your journey to find your dream job'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-input-group">
                <FiUser />
                <input
                  type="text"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span style={{ color: 'var(--error)', fontSize: '0.75rem', position: 'absolute', bottom: '-20px', left: 0 }}>
                    {errors.name}
                  </span>
                )}
              </div>
            )}

            <div className="auth-input-group">
              <FiMail />
              <input
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span style={{ color: 'var(--error)', fontSize: '0.75rem', position: 'absolute', bottom: '-20px', left: 0 }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className="auth-input-group">
              <FiLock />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              {errors.password && (
                <span style={{ color: 'var(--error)', fontSize: '0.75rem', position: 'absolute', bottom: '-20px', left: 0 }}>
                  {errors.password}
                </span>
              )}
            </div>

            {isLogin && (
              <div className="auth-options">
                <label className="auth-remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="auth-forgot">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="auth-social">
              <button type="button" onClick={() => handleSocialAuth('Google')}>
                <FcGoogle />
              </button>
              <button type="button" onClick={() => handleSocialAuth('GitHub')}>
                <FaGithub />
              </button>
              <button type="button" onClick={() => handleSocialAuth('LinkedIn')}>
                <FaLinkedin color="#0077b5" />
              </button>
            </div>
          </form>

          <div className="auth-footer">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>
                  Sign up
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>
                  Sign in
                </a>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Auth
