import { useNavigate, useLocation } from 'react-router-dom'
import { MdHome, MdHistory, MdSettings } from 'react-icons/md'
import { getTranslations } from '../translations'
import './FooterNav.css'

const FooterNav = ({ language = 'English' }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const t = getTranslations(language)

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: '/dashboard', icon: MdHome, label: t.home },
    { path: '/history', icon: MdHistory, label: t.history },
    { path: '/settings', icon: MdSettings, label: t.settings }
  ]

  return (
    <footer className="footer-nav">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.path)
        return (
          <button
            key={item.path}
            className={`nav-tab ${active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <Icon className="nav-tab-icon" />
            <span className="nav-tab-label">{item.label}</span>
          </button>
        )
      })}
    </footer>
  )
}

export default FooterNav

