import { useState, useEffect } from 'react'
import { IconPlus, IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react'
import { userService } from '@/services/userService'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/Input'
import { Alert } from '@/components/Alert'
import { Loading } from '@/components/Loading'

export const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ email: '', name: '' })
  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await userService.getAll()
      setUsers(data)
    } catch (err) {
      setError('Failed to fetch users. Please try again.')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({ email: user.email, name: user.name || '' })
    } else {
      setEditingUser(null)
      setFormData({ email: '', name: '' })
    }
    setFormErrors({})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
    setFormData({ email: '', name: '' })
    setFormErrors({})
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      if (editingUser) {
        await userService.update(editingUser.id, formData)
        setSuccessMessage('User updated successfully!')
      } else {
        await userService.create(formData)
        setSuccessMessage('User created successfully!')
      }
      handleCloseModal()
      fetchUsers()
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      if (err.response?.status === 400) {
        setFormErrors({ email: 'Email already exists' })
      } else {
        setError('Failed to save user. Please try again.')
      }
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await userService.delete(id)
      setSuccessMessage('User deleted successfully!')
      fetchUsers()
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Failed to delete user. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="py-6">
        <Loading message="Loading users..." />
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-900">Users</h1>
          <Button onClick={() => handleOpenModal()}>
            <IconPlus size={20} className="mr-2" />
            Add User
          </Button>
        </div>

        {/* Alerts */}
        {successMessage && (
          <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} />
        )}
        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        {/* Users Table */}
        <Card>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <IconAlertCircle size={48} className="mx-auto text-gray-400 dark:text-dark-400 mb-4" />
              <p className="text-gray-600 dark:text-dark-600">No users found. Create your first user!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">ID</th>
                    <th className="table-header-cell">Email</th>
                    <th className="table-header-cell">Name</th>
                    <th className="table-header-cell">Created At</th>
                    <th className="table-header-cell">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="table-cell">{user.id}</td>
                      <td className="table-cell font-medium">{user.email}</td>
                      <td className="table-cell">{user.name || '-'}</td>
                      <td className="table-cell">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="table-cell">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleOpenModal(user)}
                            className="p-1.5 text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 transition-colors"
                            title="Edit user"
                          >
                            <IconEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                            title="Delete user"
                          >
                            <IconTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Add/Edit User Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingUser ? 'Edit User' : 'Add New User'}
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={formErrors.email}
              placeholder="user@example.com"
            />
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
            <div className="flex justify-end space-x-3 mt-6">
              <Button type="button" variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit">
                {editingUser ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}
