import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiUser,
  FiBriefcase,
  FiBook,
  FiStar,
  FiFolder,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiEye,
  FiSave
} from 'react-icons/fi'
import { useJob } from '../context/JobContext'

function Resume() {
  const { resume, dispatch, addToast } = useJob()
  const [activeSection, setActiveSection] = useState('personal')
  const [editingItem, setEditingItem] = useState(null)
  const [newSkill, setNewSkill] = useState('')

  // Form states
  const [experienceForm, setExperienceForm] = useState({
    id: null,
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  })

  const [educationForm, setEducationForm] = useState({
    id: null,
    degree: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const [projectForm, setProjectForm] = useState({
    id: null,
    name: '',
    description: '',
    link: '',
    technologies: ''
  })

  // Personal Info handlers
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [name]: value }
    })
  }

  // Experience handlers
  const handleExperienceSubmit = (e) => {
    e.preventDefault()
    if (experienceForm.id) {
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: experienceForm })
      addToast({ type: 'success', message: 'Experience updated' })
    } else {
      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: { ...experienceForm, id: Date.now() }
      })
      addToast({ type: 'success', message: 'Experience added' })
    }
    setExperienceForm({
      id: null,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    })
    setEditingItem(null)
  }

  const editExperience = (exp) => {
    setExperienceForm(exp)
    setEditingItem('experience')
  }

  const deleteExperience = (id) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id })
    addToast({ type: 'info', message: 'Experience removed' })
  }

  // Education handlers
  const handleEducationSubmit = (e) => {
    e.preventDefault()
    if (educationForm.id) {
      dispatch({ type: 'UPDATE_EDUCATION', payload: educationForm })
      addToast({ type: 'success', message: 'Education updated' })
    } else {
      dispatch({
        type: 'ADD_EDUCATION',
        payload: { ...educationForm, id: Date.now() }
      })
      addToast({ type: 'success', message: 'Education added' })
    }
    setEducationForm({
      id: null,
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    })
    setEditingItem(null)
  }

  const editEducation = (edu) => {
    setEducationForm(edu)
    setEditingItem('education')
  }

  const deleteEducation = (id) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id })
    addToast({ type: 'info', message: 'Education removed' })
  }

  // Skills handlers
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      dispatch({ type: 'ADD_SKILL', payload: newSkill.trim() })
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill) => {
    dispatch({ type: 'REMOVE_SKILL', payload: skill })
  }

  // Project handlers
  const handleProjectSubmit = (e) => {
    e.preventDefault()
    if (projectForm.id) {
      dispatch({ type: 'UPDATE_PROJECT', payload: projectForm })
      addToast({ type: 'success', message: 'Project updated' })
    } else {
      dispatch({
        type: 'ADD_PROJECT',
        payload: { ...projectForm, id: Date.now() }
      })
      addToast({ type: 'success', message: 'Project added' })
    }
    setProjectForm({
      id: null,
      name: '',
      description: '',
      link: '',
      technologies: ''
    })
    setEditingItem(null)
  }

  const editProject = (proj) => {
    setProjectForm(proj)
    setEditingItem('project')
  }

  const deleteProject = (id) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id })
    addToast({ type: 'info', message: 'Project removed' })
  }

  // Download resume as text
  const downloadResume = () => {
    let content = `${resume.personalInfo.fullName}\n`
    content += `${resume.personalInfo.title}\n\n`
    content += `Contact: ${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}\n\n`

    if (resume.personalInfo.summary) {
      content += `SUMMARY\n${resume.personalInfo.summary}\n\n`
    }

    if (resume.experience.length > 0) {
      content += `EXPERIENCE\n`
      resume.experience.forEach(exp => {
        content += `${exp.title} at ${exp.company}\n`
        content += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate} | ${exp.location}\n`
        content += `${exp.description}\n\n`
      })
    }

    if (resume.education.length > 0) {
      content += `EDUCATION\n`
      resume.education.forEach(edu => {
        content += `${edu.degree} - ${edu.school}\n`
        content += `${edu.startDate} - ${edu.endDate} | ${edu.location}\n`
        if (edu.description) content += `${edu.description}\n`
        content += '\n'
      })
    }

    if (resume.skills.length > 0) {
      content += `SKILLS\n${resume.skills.join(', ')}\n\n`
    }

    if (resume.projects.length > 0) {
      content += `PROJECTS\n`
      resume.projects.forEach(proj => {
        content += `${proj.name}\n`
        content += `${proj.description}\n`
        if (proj.technologies) content += `Technologies: ${proj.technologies}\n`
        if (proj.link) content += `Link: ${proj.link}\n`
        content += '\n'
      })
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resume.personalInfo.fullName || 'resume'}_resume.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    addToast({ type: 'success', message: 'Resume downloaded!' })
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: FiUser },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'education', label: 'Education', icon: FiBook },
    { id: 'skills', label: 'Skills', icon: FiStar },
    { id: 'projects', label: 'Projects', icon: FiFolder }
  ]

  return (
    <div className="resume-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title">Resume Builder</h1>
          <p className="page-subtitle">
            Create a professional resume to apply for jobs
          </p>
        </motion.div>

        <div className="resume-layout">
          <div className="resume-builder">
            {/* Section Navigation */}
            <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`btn ${activeSection === section.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon /> {section.label}
                </button>
              ))}
            </div>

            {/* Personal Info Section */}
            {activeSection === 'personal' && (
              <motion.div
                className="resume-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="resume-section-header">
                  <h2 className="resume-section-title">
                    <FiUser /> Personal Information
                  </h2>
                </div>

                <div className="resume-form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      name="fullName"
                      value={resume.personalInfo.fullName}
                      onChange={handlePersonalInfoChange}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Professional Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      name="title"
                      value={resume.personalInfo.title}
                      onChange={handlePersonalInfoChange}
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                </div>

                <div className="resume-form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      name="email"
                      value={resume.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-input"
                      name="phone"
                      value={resume.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    name="location"
                    value={resume.personalInfo.location}
                    onChange={handlePersonalInfoChange}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Summary</label>
                  <textarea
                    className="form-input form-textarea"
                    name="summary"
                    value={resume.personalInfo.summary}
                    onChange={handlePersonalInfoChange}
                    placeholder="Brief summary of your professional background and career goals..."
                    rows={4}
                  />
                </div>
              </motion.div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <motion.div
                className="resume-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="resume-section-header">
                  <h2 className="resume-section-title">
                    <FiBriefcase /> Work Experience
                  </h2>
                  {editingItem !== 'experience' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setEditingItem('experience')}
                    >
                      <FiPlus /> Add
                    </button>
                  )}
                </div>

                {/* Existing Experience */}
                {resume.experience.map(exp => (
                  <div key={exp.id} className="resume-item">
                    <div className="resume-item-header">
                      <div>
                        <h3 className="resume-item-title">{exp.title}</h3>
                        <p className="resume-item-subtitle">{exp.company}</p>
                      </div>
                      <div className="resume-item-actions">
                        <button
                          className="resume-item-btn"
                          onClick={() => editExperience(exp)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="resume-item-btn delete"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="resume-item-date">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
                    </p>
                    <p className="resume-item-description">{exp.description}</p>
                  </div>
                ))}

                {/* Add/Edit Experience Form */}
                {editingItem === 'experience' && (
                  <form onSubmit={handleExperienceSubmit} className="resume-item" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="resume-form-row">
                      <div className="form-group">
                        <label className="form-label">Job Title *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={experienceForm.title}
                          onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                          placeholder="Software Engineer"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={experienceForm.company}
                          onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                          placeholder="Tech Company"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-input"
                        value={experienceForm.location}
                        onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </div>

                    <div className="resume-form-row">
                      <div className="form-group">
                        <label className="form-label">Start Date *</label>
                        <input
                          type="month"
                          className="form-input"
                          value={experienceForm.startDate}
                          onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input
                          type="month"
                          className="form-input"
                          value={experienceForm.endDate}
                          onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                          disabled={experienceForm.current}
                        />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          <input
                            type="checkbox"
                            checked={experienceForm.current}
                            onChange={(e) => setExperienceForm({ ...experienceForm, current: e.target.checked })}
                          />
                          Currently working here
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-input form-textarea"
                        value={experienceForm.description}
                        onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        <FiSave /> {experienceForm.id ? 'Update' : 'Add'} Experience
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingItem(null)
                          setExperienceForm({ id: null, title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' })
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {resume.experience.length === 0 && editingItem !== 'experience' && (
                  <button className="add-item-btn" onClick={() => setEditingItem('experience')}>
                    <FiPlus /> Add Work Experience
                  </button>
                )}
              </motion.div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <motion.div
                className="resume-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="resume-section-header">
                  <h2 className="resume-section-title">
                    <FiBook /> Education
                  </h2>
                  {editingItem !== 'education' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setEditingItem('education')}
                    >
                      <FiPlus /> Add
                    </button>
                  )}
                </div>

                {/* Existing Education */}
                {resume.education.map(edu => (
                  <div key={edu.id} className="resume-item">
                    <div className="resume-item-header">
                      <div>
                        <h3 className="resume-item-title">{edu.degree}</h3>
                        <p className="resume-item-subtitle">{edu.school}</p>
                      </div>
                      <div className="resume-item-actions">
                        <button
                          className="resume-item-btn"
                          onClick={() => editEducation(edu)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="resume-item-btn delete"
                          onClick={() => deleteEducation(edu.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="resume-item-date">
                      {edu.startDate} - {edu.endDate} | {edu.location}
                    </p>
                    {edu.description && (
                      <p className="resume-item-description">{edu.description}</p>
                    )}
                  </div>
                ))}

                {/* Add/Edit Education Form */}
                {editingItem === 'education' && (
                  <form onSubmit={handleEducationSubmit} className="resume-item" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="resume-form-row">
                      <div className="form-group">
                        <label className="form-label">Degree *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={educationForm.degree}
                          onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                          placeholder="Bachelor of Science in Computer Science"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">School *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={educationForm.school}
                          onChange={(e) => setEducationForm({ ...educationForm, school: e.target.value })}
                          placeholder="Stanford University"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-input"
                        value={educationForm.location}
                        onChange={(e) => setEducationForm({ ...educationForm, location: e.target.value })}
                        placeholder="Stanford, CA"
                      />
                    </div>

                    <div className="resume-form-row">
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input
                          type="month"
                          className="form-input"
                          value={educationForm.startDate}
                          onChange={(e) => setEducationForm({ ...educationForm, startDate: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input
                          type="month"
                          className="form-input"
                          value={educationForm.endDate}
                          onChange={(e) => setEducationForm({ ...educationForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description (Optional)</label>
                      <textarea
                        className="form-input form-textarea"
                        value={educationForm.description}
                        onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
                        placeholder="GPA, honors, relevant coursework..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        <FiSave /> {educationForm.id ? 'Update' : 'Add'} Education
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingItem(null)
                          setEducationForm({ id: null, degree: '', school: '', location: '', startDate: '', endDate: '', description: '' })
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {resume.education.length === 0 && editingItem !== 'education' && (
                  <button className="add-item-btn" onClick={() => setEditingItem('education')}>
                    <FiPlus /> Add Education
                  </button>
                )}
              </motion.div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <motion.div
                className="resume-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="resume-section-header">
                  <h2 className="resume-section-title">
                    <FiStar /> Skills
                  </h2>
                </div>

                <div className="skills-list">
                  {resume.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)}>
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="skill-input-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., JavaScript, React, Python)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  />
                  <button className="btn btn-primary" onClick={handleAddSkill}>
                    <FiPlus /> Add
                  </button>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                  Tip: Add relevant technical and soft skills that match the jobs you're applying for.
                </p>
              </motion.div>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <motion.div
                className="resume-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="resume-section-header">
                  <h2 className="resume-section-title">
                    <FiFolder /> Projects
                  </h2>
                  {editingItem !== 'project' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setEditingItem('project')}
                    >
                      <FiPlus /> Add
                    </button>
                  )}
                </div>

                {/* Existing Projects */}
                {resume.projects.map(proj => (
                  <div key={proj.id} className="resume-item">
                    <div className="resume-item-header">
                      <div>
                        <h3 className="resume-item-title">{proj.name}</h3>
                        {proj.technologies && (
                          <p className="resume-item-subtitle">{proj.technologies}</p>
                        )}
                      </div>
                      <div className="resume-item-actions">
                        <button
                          className="resume-item-btn"
                          onClick={() => editProject(proj)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="resume-item-btn delete"
                          onClick={() => deleteProject(proj.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="resume-item-description">{proj.description}</p>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>
                        View Project →
                      </a>
                    )}
                  </div>
                ))}

                {/* Add/Edit Project Form */}
                {editingItem === 'project' && (
                  <form onSubmit={handleProjectSubmit} className="resume-item" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="form-group">
                      <label className="form-label">Project Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        placeholder="E-commerce Platform"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-input form-textarea"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Describe the project and your contributions..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="resume-form-row">
                      <div className="form-group">
                        <label className="form-label">Technologies</label>
                        <input
                          type="text"
                          className="form-input"
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Project Link</label>
                        <input
                          type="url"
                          className="form-input"
                          value={projectForm.link}
                          onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        <FiSave /> {projectForm.id ? 'Update' : 'Add'} Project
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingItem(null)
                          setProjectForm({ id: null, name: '', description: '', link: '', technologies: '' })
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {resume.projects.length === 0 && editingItem !== 'project' && (
                  <button className="add-item-btn" onClick={() => setEditingItem('project')}>
                    <FiPlus /> Add Project
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Resume Preview */}
          <div className="resume-preview">
            <div className="resume-preview-card">
              <div className="resume-preview-header">
                <h1 className="resume-preview-name">
                  {resume.personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="resume-preview-title">
                  {resume.personalInfo.title || 'Professional Title'}
                </p>
                <div className="resume-preview-contact">
                  {resume.personalInfo.email && (
                    <span><FiMail size={12} /> {resume.personalInfo.email}</span>
                  )}
                  {resume.personalInfo.phone && (
                    <span><FiPhone size={12} /> {resume.personalInfo.phone}</span>
                  )}
                  {resume.personalInfo.location && (
                    <span><FiMapPin size={12} /> {resume.personalInfo.location}</span>
                  )}
                </div>
              </div>

              {resume.personalInfo.summary && (
                <div className="resume-preview-section">
                  <h3>Summary</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#4b5563', lineHeight: 1.6 }}>
                    {resume.personalInfo.summary}
                  </p>
                </div>
              )}

              {resume.experience.length > 0 && (
                <div className="resume-preview-section">
                  <h3>Experience</h3>
                  {resume.experience.map(exp => (
                    <div key={exp.id} className="resume-preview-item">
                      <div className="resume-preview-item-header">
                        <span className="resume-preview-item-title">{exp.title}</span>
                        <span className="resume-preview-item-date">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="resume-preview-item-subtitle">{exp.company}</p>
                      <p className="resume-preview-item-description">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {resume.education.length > 0 && (
                <div className="resume-preview-section">
                  <h3>Education</h3>
                  {resume.education.map(edu => (
                    <div key={edu.id} className="resume-preview-item">
                      <div className="resume-preview-item-header">
                        <span className="resume-preview-item-title">{edu.degree}</span>
                        <span className="resume-preview-item-date">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <p className="resume-preview-item-subtitle">{edu.school}</p>
                    </div>
                  ))}
                </div>
              )}

              {resume.skills.length > 0 && (
                <div className="resume-preview-section">
                  <h3>Skills</h3>
                  <div className="resume-preview-skills">
                    {resume.skills.map((skill, index) => (
                      <span key={index} className="resume-preview-skill">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {resume.projects.length > 0 && (
                <div className="resume-preview-section">
                  <h3>Projects</h3>
                  {resume.projects.map(proj => (
                    <div key={proj.id} className="resume-preview-item">
                      <span className="resume-preview-item-title">{proj.name}</span>
                      <p className="resume-preview-item-description">{proj.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="resume-actions">
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={downloadResume}>
                <FiDownload /> Download
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                <FiEye /> Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
