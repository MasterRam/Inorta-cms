import React from 'react'
import { IconAlertCircle, IconCircleCheck, IconInfoCircle } from '@tabler/icons-react'

type AlertType = 'success' | 'error' | 'info'

type AlertProps = {
  type?: AlertType
  message: React.ReactNode
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose }) => {
  type IconComp = React.ComponentType<{ size?: number; className?: string }>
  const config: Record<AlertType, { className: string; icon: IconComp }> = {
    success: { className: 'alert-success', icon: IconCircleCheck },
    error: { className: 'alert-error', icon: IconAlertCircle },
    info: { className: 'alert-info', icon: IconInfoCircle },
  }

  const { className, icon: Icon } = config[type]

  return (
    <div className={`alert ${className} flex items-start`} role="status">
      <Icon size={20} className="mr-3 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{message}</div>
      {onClose && (
        <button onClick={onClose} className="ml-3 flex-shrink-0" aria-label="Close alert">
          <span className="text-lg">&times;</span>
        </button>
      )}
    </div>
  )
}
