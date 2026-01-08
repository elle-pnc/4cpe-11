import { useState } from 'react'
import { MdPerson, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import FooterNav from '../components/FooterNav'
import './UserProfilePage.css'

const UserProfilePage = ({ userData, setUserData, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [formData, setFormData] = useState({
    lastName: 'Dela Cruz',
    firstName: 'Juan',
    email: 'delacruz67@gmail.com',
    phoneNumber: '09998886767'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false)
    // In a real app, you'd update the userData or make an API call
  }

  const handleCancel = () => {
    // Reset form data (would need to fetch original data)
    setIsEditing(false)
    setShowPasswordModal(false)
    setPassword('')
    setPasswordError('')
  }

  const handleEditClick = () => {
    setShowPasswordModal(true)
    setPassword('')
    setPasswordError('')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    
    // For demo purposes, accept any password (or use a default)
    // In a real app, this would verify against the user's actual password
    if (password.trim() === '') {
      setPasswordError('Password is required')
      return
    }
    
    // Password verification (for demo, accept any non-empty password)
    // In production, this would verify against stored password hash
    setShowPasswordModal(false)
    setIsEditing(true)
    setPassword('')
    setPasswordError('')
  }

  const handlePasswordCancel = () => {
    setShowPasswordModal(false)
    setPassword('')
    setPasswordError('')
  }

  return (
    <div className="mobile-container page-with-footer">
      <div className="profile-page">
        <div className="profile-header">
          <div className="logo-text">
            <span className="logo-blue">CPE11-</span>
            <span className="logo-green">AFCS</span>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-title-section">
            <MdPerson className="profile-icon" />
            <h1 className="profile-title">User Profile</h1>
          </div>

          <div className="profile-card">
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value="0000 0000 0000"
                className="form-input card-number-input"
                disabled
                readOnly
              />
            </div>

            {isEditing ? (
              <div className="profile-actions">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="edit-button" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Password Verification Modal */}
      {showPasswordModal && (
        <div className="password-modal-overlay" onClick={handlePasswordCancel}>
          <div className="password-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="password-modal-title">Verify Password</h2>
            <p className="password-modal-subtitle">Please enter your password to edit account information</p>
            <form onSubmit={handlePasswordSubmit}>
              <div className="password-input-group">
                <MdLock className="password-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="password-modal-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError('')
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
              {passwordError && (
                <div className="password-error">{passwordError}</div>
              )}
              <div className="password-modal-actions">
                <button type="button" className="password-cancel-btn" onClick={handlePasswordCancel}>
                  Cancel
                </button>
                <button type="submit" className="password-submit-btn">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <FooterNav />
    </div>
  )
}

export default UserProfilePage
