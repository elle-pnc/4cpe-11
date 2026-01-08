import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdExitToApp, MdLanguage, MdCheck, MdDarkMode, MdLightMode } from 'react-icons/md'
import FooterNav from '../components/FooterNav'
import { getTranslations } from '../translations'
import './SettingsPage.css'

const SettingsPage = ({ userData, setUserData, onLogout }) => {
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  
  const currentLanguage = userData?.language || 'English'
  const currentTheme = userData?.theme || 'light'
  const t = getTranslations(currentLanguage)
  
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'fil', name: 'Filipino', native: 'Filipino' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'zh', name: 'Chinese', native: '中文' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' }
  ]

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const handleLogoutConfirm = () => {
    onLogout()
  }

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false)
  }

  const handleLanguageClick = () => {
    setShowLanguageModal(true)
  }

  const handleLanguageSelect = (language) => {
    setUserData({
      ...userData,
      language: language.name
    })
    setShowLanguageModal(false)
  }

  const handleLanguageModalClose = () => {
    setShowLanguageModal(false)
  }

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setUserData({
      ...userData,
      theme: newTheme
    })
  }

  return (
    <div className="mobile-container page-with-footer">
      <div className="settings-page">
        <div className="settings-header">
          <div className="logo-text">
            <span className="logo-blue">CPE11-</span>
            <span className="logo-green">AFCS</span>
          </div>
        </div>

        <div className="settings-content">
          <h1 className="settings-title">{t.settings}</h1>

          <div className="settings-section">
            <h2 className="section-title">{t.account}</h2>
            <div className="settings-card">
              <button className="settings-item" onClick={() => navigate('/profile')}>
                <span className="settings-label">{t.profile}</span>
                <span className="settings-arrow">→</span>
              </button>
              <button className="settings-item">
                <span className="settings-label">{t.notifications}</span>
                <span className="settings-arrow">→</span>
              </button>
              <button className="settings-item">
                <span className="settings-label">{t.security}</span>
                <span className="settings-arrow">→</span>
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">{t.preferences}</h2>
            <div className="settings-card">
              <button className="settings-item" onClick={handleLanguageClick}>
                <div className="settings-item-left">
                  <MdLanguage className="settings-icon" />
                  <span className="settings-label">{t.language}</span>
                </div>
                <div className="settings-item-right">
                  <span className="settings-value">{currentLanguage}</span>
                  <span className="settings-arrow">→</span>
                </div>
              </button>
              <button className="settings-item" onClick={handleThemeToggle}>
                <div className="settings-item-left">
                  {currentTheme === 'dark' ? (
                    <MdDarkMode className="settings-icon" />
                  ) : (
                    <MdLightMode className="settings-icon" />
                  )}
                  <span className="settings-label">{t.theme}</span>
                </div>
                <div className="settings-item-right">
                  <span className="settings-value">{currentTheme === 'dark' ? t.dark : t.light}</span>
                  <span className="settings-arrow">→</span>
                </div>
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">{t.about}</h2>
            <div className="settings-card">
              <div className="settings-item">
                <span className="settings-label">{t.version}</span>
                <span className="settings-value">1.0.0</span>
              </div>
              <div className="settings-item">
                <span className="settings-label">{t.helpSupport}</span>
                <span className="settings-arrow">→</span>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-card">
              <button className="settings-item logout-button" onClick={handleLogoutClick}>
                <MdExitToApp className="logout-icon" />
                <span className="settings-label logout-label">{t.logout}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Language Selection Modal */}
        {showLanguageModal && (
          <div className="language-modal-overlay" onClick={handleLanguageModalClose}>
            <div className="language-modal" onClick={(e) => e.stopPropagation()}>
              <div className="language-modal-header">
                <MdLanguage className="language-modal-icon" />
                <h2 className="language-modal-title">{t.selectLanguage}</h2>
                <button className="language-modal-close" onClick={handleLanguageModalClose}>
                  ×
                </button>
              </div>
              <div className="language-list">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`language-item ${currentLanguage === language.name ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <div className="language-info">
                      <span className="language-name">{language.native}</span>
                      <span className="language-name-en">{language.name}</span>
                    </div>
                    {currentLanguage === language.name && (
                      <MdCheck className="language-check-icon" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="logout-modal-overlay" onClick={handleLogoutCancel}>
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
              <div className="logout-modal-icon">⚠️</div>
              <h2 className="logout-modal-title">{t.confirmLogout}</h2>
              <p className="logout-modal-message">
                {t.logoutMessage}
              </p>
              <div className="logout-modal-actions">
                <button className="logout-cancel-button" onClick={handleLogoutCancel}>
                  {t.cancel}
                </button>
                <button className="logout-confirm-button" onClick={handleLogoutConfirm}>
                  {t.logout}
                </button>
              </div>
            </div>
          </div>
        )}

        <FooterNav language={currentLanguage} />
      </div>
    </div>
  )
}

export default SettingsPage

