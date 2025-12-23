import React from 'react'
import { IconLoader } from '@tabler/icons-react'

type LoadingProps = {
  message?: string
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <IconLoader size={48} className="text-primary-600 dark:text-primary-500 animate-spin" />
      <p className="mt-4 text-gray-600 dark:text-dark-600">{message}</p>
    </div>
  )
}
