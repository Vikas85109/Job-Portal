import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi'
import { useJob } from '../../context/JobContext'

function Toast({ toast }) {
  const { dispatch } = useJob()

  const icons = {
    success: <FiCheckCircle />,
    error: <FiAlertCircle />,
    warning: <FiAlertTriangle />,
    info: <FiInfo />
  }

  return (
    <div className={`toast toast-${toast.type}`}>
      <span className="toast-icon">{icons[toast.type]}</span>
      <div className="toast-content">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        <div className="toast-message">{toast.message}</div>
      </div>
      <button
        className="toast-close"
        onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id })}
      >
        <FiX />
      </button>
    </div>
  )
}

export default Toast
