import React from 'react'
import { Card } from '@/components/Card'

export const Settings: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Card>
          <div className="text-sm text-gray-500">General settings will appear here.</div>
        </Card>
      </div>
    </div>
  )
}
