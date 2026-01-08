import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdArrowForward } from 'react-icons/md'
import './LoginPage.css'

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Navigate to verification page
    navigate('/verify')
  }

  return (
    <div className="mobile-container">
      <div className="login-page">
        <div className="login-header">
          <div className="logo-placeholder">
            <img src="/Logo.png" alt="CPE11-AFCS Logo" className="logo-image" />
          </div>
        </div>

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <MdEmail className="input-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="input-group">
            <MdLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          <button type="submit" className="login-button">
            <MdArrowForward />
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
