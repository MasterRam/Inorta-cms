import React, { useState } from 'react'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useAuth } from '@/context/AuthContext'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login({ email, password })
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div className="py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={submit}>
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-end mt-4">
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </div>
  )
}

