import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import ToastContainer from './components/common/ToastContainer'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import SavedJobs from './pages/SavedJobs'
import Applications from './pages/Applications'
import Companies from './pages/Companies'
import CompanyDetail from './pages/CompanyDetail'
import Resume from './pages/Resume'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
