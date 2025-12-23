import { 
  IconUsers, 
  IconServer, 
  IconBrandReact,
  IconPalette,
  IconCheck 
} from '@tabler/icons-react'
import { Card } from '@/components/Card'

export const Dashboard = () => {
  const features = [
    {
      icon: IconBrandReact,
      title: 'React + Vite',
      description: 'Modern frontend with fast refresh and optimized builds',
      status: 'Active',
    },
    {
      icon: IconPalette,
      title: 'Tailwind CSS',
      description: 'Utility-first CSS with custom theme support',
      status: 'Active',
    },
    {
      icon: IconServer,
      title: 'FastAPI Backend',
      description: 'Python backend with REST API',
      status: 'Active',
    },
    {
      icon: IconUsers,
      title: 'User Management',
      description: 'Complete CRUD operations for users',
      status: 'Active',
    },
  ]

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-900 mb-2">
            Welcome to Inorta CMS
          </h1>
          <p className="text-gray-600 dark:text-dark-600">
            React frontend with Tailwind CSS and theme switching
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <feature.icon 
                    size={32} 
                    className="text-primary-600 dark:text-primary-500" 
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-dark-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-dark-600">
                    {feature.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-500">
                    <IconCheck size={14} className="mr-1" />
                    {feature.status}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Quick Start">
            <div className="space-y-3 text-sm text-gray-600 dark:text-dark-600">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-medium mr-3">
                  1
                </span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-dark-900">Navigate to Users</p>
                  <p className="text-xs">Manage users with full CRUD operations</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-medium mr-3">
                  2
                </span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-dark-900">Toggle Theme</p>
                  <p className="text-xs">Switch between light and dark modes</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-medium mr-3">
                  3
                </span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-dark-900">Explore API</p>
                  <p className="text-xs">Visit http://localhost:8000/docs for API documentation</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Technologies">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-dark-900 mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Vite', 'Tailwind CSS', 'Tabler Icons', 'React Router'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-dark-900 mb-2">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'SQLAlchemy', 'MySQL', 'Alembic'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
