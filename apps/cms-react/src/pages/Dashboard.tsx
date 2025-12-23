import React from 'react'
import { Card } from '@/components/Card'

export const Dashboard: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="text-sm text-gray-500">Users</div>
            <div className="text-2xl font-semibold">—</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-500">Published content</div>
            <div className="text-2xl font-semibold">—</div>
          </Card>
          <Card>
            <div className="text-sm text-gray-500">Drafts</div>
            <div className="text-2xl font-semibold">—</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
