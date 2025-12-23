import React from 'react'

type PageHeaderProps = {
  title: string
  actions?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-900">{title}</h1>
      </div>
      <div>{actions}</div>
    </div>
  )
}
