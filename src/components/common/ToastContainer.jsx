import Toast from './Toast'
import { useJob } from '../../context/JobContext'

function ToastContainer() {
  const { toasts } = useJob()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default ToastContainer
