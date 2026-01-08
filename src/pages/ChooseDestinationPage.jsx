import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { getTranslations } from '../translations'
import './ChooseDestinationPage.css'

const ChooseDestinationPage = ({ userData, setUserData }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const mode = location.state?.mode || 'choose' // 'choose' or 'extend'
  const currentRoute = location.state?.currentRoute || null

  const currentTerminal = userData?.currentTerminal || 1
  const currentLanguage = userData?.language || 'English'
  const t = getTranslations(currentLanguage)
  const [allTerminals] = useState([1, 2, 3, 4])
  const [selectedTerminal, setSelectedTerminal] = useState(null)
  const [showWarningModal, setShowWarningModal] = useState(false)

  const [availableTerminals, setAvailableTerminals] = useState([])

  useEffect(() => {
    if (mode === 'choose') {
      // Filter out current terminal
      setAvailableTerminals(allTerminals.filter(t => t !== currentTerminal))
    } else if (mode === 'extend' && currentRoute) {
      // For extend mode, show terminals that can be extended to
      // Logic: if current route is 1->2, can extend to 3 or 4 (making it 1->3 or 1->4)
      // Extending means changing the destination to a terminal further along
      const from = currentRoute.from
      const to = currentRoute.to
      
      if (to > from) {
        // Going right (e.g., 1->2), can extend to terminals > to (3, 4)
        setAvailableTerminals(allTerminals.filter(t => t > to && t !== from))
      } else {
        // Going left (e.g., 2->1), can extend to terminals that continue the journey
        // For simplicity, allow extending to terminals > the destination terminal
        setAvailableTerminals(allTerminals.filter(t => t > to && t !== from))
      }
    }
  }, [mode, currentTerminal, currentRoute, allTerminals])

  const handleSelectTerminal = (terminal) => {
    setSelectedTerminal(terminal)
  }

  const handleConfirm = () => {
    if (!selectedTerminal) return

    if (mode === 'choose') {
      // Set new route
      const newRoute = {
        from: currentTerminal,
        to: selectedTerminal
      }
      
      // Add trip transaction to history
      const tDesc = getTranslations(userData?.language || 'English')
      const tripTransaction = {
        id: 'TRIP' + Date.now().toString().slice(-8),
        type: 'trip',
        route: newRoute,
        timestamp: new Date(),
        description: `${tDesc.yourRoute}: ${tDesc.terminal} ${newRoute.from} → ${tDesc.terminal} ${newRoute.to}`,
        fare: 25.00 // Mock fare amount
      }
      
      setUserData({
        ...userData,
        currentRoute: newRoute,
        transactions: [tripTransaction, ...(userData.transactions || [])]
      })
      navigate('/dashboard')
    } else if (mode === 'extend' && currentRoute) {
      // Extend current route - keep the same origin, change destination
      const extendedRoute = {
        from: currentRoute.from,
        to: selectedTerminal
      }
      
      // Add trip extension transaction to history
      const tDesc = getTranslations(userData?.language || 'English')
      const tripTransaction = {
        id: 'TRIP' + Date.now().toString().slice(-8),
        type: 'trip',
        route: extendedRoute,
        timestamp: new Date(),
        description: `${tDesc.yourRoute}: ${tDesc.terminal} ${extendedRoute.from} → ${tDesc.terminal} ${extendedRoute.to}`,
        fare: 25.00 // Mock fare amount
      }
      
      setUserData({
        ...userData,
        currentRoute: extendedRoute,
        transactions: [tripTransaction, ...(userData.transactions || [])]
      })
      navigate('/dashboard')
    }
  }

  const handleBack = () => {
    if (selectedTerminal) {
      setShowWarningModal(true)
    } else {
      navigate('/dashboard')
    }
  }

  const handleConfirmBack = () => {
    setShowWarningModal(false)
    setSelectedTerminal(null)
    navigate('/dashboard')
  }

  const handleCancelBack = () => {
    setShowWarningModal(false)
  }

  return (
    <div className="mobile-container">
      <div className="choose-destination-page">
        <div className="destination-page-header">
          <h1 className="destination-page-title">
            {t.chooseDestinationTerminal}
          </h1>
        </div>

        <div className="current-location-display">
          {t.currentLocation}: <span className="terminal-highlight">{t.terminal} {currentTerminal}</span>
        </div>

        <div className="terminals-container">
          <div className="current-terminal-section">
            <div className="current-terminal-label">Terminal {currentTerminal}</div>
          </div>

          <div className="action-buttons-section">
            {mode === 'choose' && (
              <button className="back-button" onClick={handleBack}>
                ← {t.back}
              </button>
            )}
            {mode === 'extend' && currentRoute && (
              <button className="extend-button" onClick={() => navigate('/dashboard')}>
                ← {t.back}
              </button>
            )}
          </div>

          <div className="available-terminals-list">
            {availableTerminals.length > 0 ? (
              availableTerminals.map((terminal) => (
                <button
                  key={terminal}
                  className={`terminal-item ${selectedTerminal === terminal ? 'selected' : ''}`}
                  onClick={() => handleSelectTerminal(terminal)}
                >
                  <div className="terminal-info">
                    <span className="terminal-name">{t.terminal} {terminal}</span>
                    <MdLocationOn className="location-pin" />
                  </div>
                </button>
              ))
            ) : (
              <div className="no-terminals">
                No available terminals to {mode === 'extend' ? 'extend to' : 'select'}
              </div>
            )}
          </div>

            {selectedTerminal && (
              <div className="confirm-section">
                <button className="confirm-button" onClick={handleConfirm}>
                  {t.confirmSelection}
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="warning-modal-overlay" onClick={handleCancelBack}>
          <div className="warning-modal" onClick={(e) => e.stopPropagation()}>
            <div className="warning-icon">⚠️</div>
            <h2 className="warning-modal-title">{t.warning}</h2>
            <p className="warning-modal-message">
              {t.warningMessage}
            </p>
            <div className="warning-modal-actions">
              <button className="warning-cancel-btn" onClick={handleCancelBack}>
                {t.cancel}
              </button>
              <button className="warning-confirm-btn" onClick={handleConfirmBack}>
                {t.goBack}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChooseDestinationPage
