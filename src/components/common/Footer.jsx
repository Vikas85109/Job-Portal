import { Link } from 'react-router-dom'
import { FiBriefcase, FiTwitter, FiLinkedin, FiGithub, FiFacebook } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FiBriefcase />
              <span>JobHunt</span>
            </Link>
            <p className="footer-description">
              Find your dream job with JobHunt. We connect talented professionals with amazing companies worldwide.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="#" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="#" aria-label="Facebook">
                <FiFacebook />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>For Job Seekers</h4>
            <div className="footer-links">
              <Link to="/jobs">Browse Jobs</Link>
              <Link to="/companies">Companies</Link>
              <Link to="/resume">Build Resume</Link>
              <Link to="/saved">Saved Jobs</Link>
              <Link to="/applications">Applications</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <div className="footer-links">
              <a href="#">Career Advice</a>
              <a href="#">Salary Guide</a>
              <a href="#">Interview Tips</a>
              <a href="#">Resume Templates</a>
              <a href="#">Blog</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <div className="footer-links">
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Help Center</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} JobHunt. All rights reserved.</p>
          <p>Made with passion for job seekers</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
