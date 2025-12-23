import { IconAlertCircle, IconCircleCheck, IconInfoCircle } from '@tabler/icons-react'

export const Alert = ({ type = 'info', message, onClose }) => {
  const config = {
    success: {
      className: 'alert-success',
      icon: IconCircleCheck,
    },
    error: {
      className: 'alert-error',
      icon: IconAlertCircle,
    },
    info: {
      className: 'alert-info',
      icon: IconInfoCircle,
    },
  }

  const { className, icon: Icon } = config[type]

  return (
    <div className={`alert ${className} flex items-start`}>
      <Icon size={20} className="mr-3 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{message}</div>
      {onClose && (
        <button onClick={onClose} className="ml-3 flex-shrink-0">
          <span className="text-lg">&times;</span>
        </button>
      )}
    </div>
  )
}
