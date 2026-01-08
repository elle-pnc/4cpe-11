import { useNavigate, useLocation } from 'react-router-dom'
import { MdPerson, MdLogout } from 'react-icons/md'
import './Sidebar.css'

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path) => {
    navigate(path)
    onClose()
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/Logo.png" alt="CPE11-AFCS Logo" className="sidebar-logo-image" />
          </div>
          <div className="sidebar-divider"></div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
            onClick={() => handleNavigation('/profile')}
          >
            <MdPerson className="nav-icon" />
            <span className="nav-text">User Profile</span>
          </button>

          <button
            className="nav-item"
            onClick={handleLogout}
          >
            <MdLogout className="nav-icon" />
            <span className="nav-text">Logout</span>
          </button>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
