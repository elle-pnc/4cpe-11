import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdPerson, MdEdit, MdArrowForward, MdMap, MdAdd } from 'react-icons/md'
import FooterNav from '../components/FooterNav'
import { getTranslations } from '../translations'
import './CommuterDashboard.css'

const CommuterDashboard = ({ userData, setUserData, onLogout }) => {
  const navigate = useNavigate()
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const [topUpStep, setTopUpStep] = useState('amount') // 'amount', 'payment', 'review', 'processing', 'success'
  const [topUpAmount, setTopUpAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [transactionId, setTransactionId] = useState('')
  const [jeepneys, setJeepneys] = useState([
    { id: 1, name: 'Jeep 1', passengers: 0, maxPassengers: 2, direction: 'right', fromTerminal: 1, toTerminal: 2 },
    { id: 2, name: 'Jeep 2', passengers: 0, maxPassengers: 2, direction: 'left', fromTerminal: 2, toTerminal: 1 },
    { id: 3, name: 'Jeep 3', passengers: 0, maxPassengers: 2, direction: 'left', fromTerminal: 2, toTerminal: 1 },
    { id: 4, name: 'Jeep 4', passengers: 0, maxPassengers: 2, direction: 'right', fromTerminal: 1, toTerminal: 2 },
  ])

  const currentTerminal = userData?.currentTerminal || 1
  const balance = userData?.balance || 250.00
  const currentRoute = userData?.currentRoute || null // { from: 1, to: 2 }
  const currentLanguage = userData?.language || 'English'
  const t = getTranslations(currentLanguage)

  const getDirectionArrows = (jeepney) => {
    const fromTerminal = jeepney.fromTerminal
    const toTerminal = jeepney.toTerminal
    if (jeepney.direction === 'right') {
      return `${fromTerminal} ►►► ${toTerminal}`
    } else {
      return `${fromTerminal} ◄◄◄ ${toTerminal}`
    }
  }

  const getPassengerColor = (passengers, maxPassengers) => {
    return passengers >= maxPassengers ? '#f44336' : '#4caf50'
  }

  const handleChooseDestination = () => {
    navigate('/choose-destination', { state: { mode: 'choose' } })
  }

  const handleExtendTo = () => {
    if (!currentRoute) {
      alert(t.chooseDestination) // Using available translation key
      return
    }
    navigate('/choose-destination', { state: { mode: 'extend', currentRoute } })
  }

  const handleSelectOrigin = () => {
    navigate('/select-origin')
  }

  const handleTopUp = () => {
    setShowTopUpModal(true)
    setTopUpStep('amount')
    setTopUpAmount('')
    setSelectedPaymentMethod(null)
    setTransactionId('')
  }

  const handleAmountContinue = () => {
    const amount = parseInt(topUpAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount (whole numbers only)')
      return
    }
    if (amount > 10000) {
      alert('Maximum top-up amount is ₱10,000 per transaction')
      return
    }
    setTopUpStep('payment')
  }

  const handlePaymentContinue = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method')
      return
    }
    setTopUpStep('review')
  }

  const handleTopUpConfirm = () => {
    const amount = parseInt(topUpAmount)
    
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount (whole numbers only)')
      return
    }
    if (amount > 10000) {
      alert('Maximum top-up amount is ₱10,000 per transaction')
      return
    }
    
    // Generate transaction ID
    const txId = 'TX' + Date.now().toString().slice(-8)
    setTransactionId(txId)
    
    // Move to processing step
    setTopUpStep('processing')
    
    // Simulate payment processing (2 seconds)
    setTimeout(() => {
      // Update balance
      const newBalance = balance + amount
      
      // Add top-up transaction to history
      const newTransaction = {
        id: txId,
        type: 'top-up',
        amount: amount,
        paymentMethod: selectedPaymentMethod,
        timestamp: new Date(),
        description: `${t.topUp} via ${getPaymentMethodName(selectedPaymentMethod)}`,
        balanceAfter: newBalance
      }
      
      setUserData({
        ...userData,
        balance: newBalance,
        transactions: [newTransaction, ...(userData.transactions || [])]
      })
      setTopUpStep('success')
    }, 2000)
  }

  const handleTopUpClose = () => {
    setShowTopUpModal(false)
    setTopUpStep('amount')
    setTopUpAmount('')
    setSelectedPaymentMethod(null)
    setTransactionId('')
  }

  const handleBackStep = () => {
    if (topUpStep === 'payment') {
      setTopUpStep('amount')
    } else if (topUpStep === 'review') {
      setTopUpStep('payment')
    }
  }

  const presetAmounts = [100, 200, 500, 1000]
  
  const getPaymentMethodName = (method) => {
    const names = {
      'gcash': 'GCash',
      'paymaya': 'PayMaya',
      'bdo': 'BDO',
      'bpi': 'BPI'
    }
    return names[method] || method
  }

  return (
    <div className="mobile-container page-with-footer">
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div className="logo-text">
            <span className="logo-blue">CPE11-</span>
            <span className="logo-green">AFCS</span>
          </div>
        </div>

        <div className="card-balance-section">
          <div className="balance-card">
            <div className="balance-header">
              <span className="balance-label">{t.cardBalance}</span>
              <button 
                className="topup-button"
                onClick={handleTopUp}
                title={t.topUpBalance}
              >
                <MdAdd />
              </button>
            </div>
            <div className="balance-amount">
              <span className="currency">₱</span>
              <span className="amount">{balance.toFixed(2)}</span>
            </div>
            <div className="card-number">
              {t.cardNumber}: **** 1234
            </div>
          </div>
        </div>

        <div className="jeepneys-section">
          <div className="section-header">
            <h2 className="section-title">{t.availableModernJeepneys}</h2>
            <MdMap className="map-icon" />
          </div>
          <div className="map-background">
            <div className="jeepneys-grid">
              {jeepneys.map((jeepney) => {
                const isActive = jeepney.id === 1
                return (
                <div 
                  key={jeepney.id} 
                  className={`jeepney-card ${jeepney.passengers >= jeepney.maxPassengers ? 'full' : ''} ${!isActive ? 'inactive' : ''}`}
                >
                  <div className="jeepney-name">{jeepney.name}</div>
                  <div className="jeepney-middle-row">
                    <img src="/AvailableModernJeepneysSymbol.png" alt="Jeepney" className="jeepney-icon" />
                    <div className="passenger-count">
                      <MdPerson 
                        className="passenger-icon"
                        style={{ color: getPassengerColor(jeepney.passengers, jeepney.maxPassengers) }}
                      />
                      <span 
                        className="passenger-text"
                        style={{ color: getPassengerColor(jeepney.passengers, jeepney.maxPassengers) }}
                      >
                        {jeepney.passengers}/{jeepney.maxPassengers}
                      </span>
                    </div>
                  </div>
                  <div className="direction-arrows" style={{ minHeight: isActive ? 'auto' : '24px' }}>
                    {isActive && getDirectionArrows(jeepney)}
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="destination-section">
          <div className="destination-header">
            <h3 className="destination-title">
              {t.chooseDestinationTerminal}
            </h3>
          </div>
          <div className="current-location">
            {t.currentLocation}: <span className="terminal-highlight">{t.terminal} {currentTerminal}</span>
            <button 
              className="change-origin-button"
              onClick={handleSelectOrigin}
              title={t.changeOrigin}
            >
              <MdEdit />
            </button>
          </div>
          {currentRoute && (
            <div className="selected-route">
              <span className="route-label">{t.yourRoute}:</span>
              <span className="route-display">
                {t.terminal} {currentRoute.from} → {t.terminal} {currentRoute.to}
              </span>
            </div>
          )}
          <div className="destination-actions">
            <div className="terminal-display">
              <div className="terminal-icon-large">
                <img src="/ChooseDesinationSymbol.svg" alt="Terminal" className="terminal-icon-image" />
              </div>
              <div className="terminal-label">Terminal {currentTerminal}</div>
            </div>
            <div className="action-buttons">
              <button 
                className="action-button primary"
                onClick={handleChooseDestination}
              >
                {t.chooseDestination}
              </button>
              <button 
                className="action-button secondary"
                onClick={handleExtendTo}
                disabled={!currentRoute}
              >
                {t.extendTo} <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterNav language={currentLanguage} />

      {/* Top-Up Modal */}
      {showTopUpModal && (
        <div className="topup-modal-overlay" onClick={topUpStep === 'success' || topUpStep === 'processing' ? undefined : handleTopUpClose}>
          <div className="topup-modal" onClick={(e) => e.stopPropagation()}>
            {/* Step Indicator */}
            <div className="topup-steps">
              <div className={`step ${['amount', 'payment', 'review', 'processing', 'success'].indexOf(topUpStep) >= 0 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Amount</div>
              </div>
              <div className={`step ${['payment', 'review', 'processing', 'success'].indexOf(topUpStep) >= 0 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Payment</div>
              </div>
              <div className={`step ${['review', 'processing', 'success'].indexOf(topUpStep) >= 0 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Review</div>
              </div>
            </div>

            {/* Step 1: Amount Selection */}
            {topUpStep === 'amount' && (
              <>
                <h2 className="topup-modal-title">{t.topUpBalance}</h2>
                <div className="topup-amount-section">
                  <label className="topup-label">{t.enterAmount}</label>
                  <div className="topup-input-group">
                    <span className="topup-currency">₱</span>
                    <input
                      type="number"
                      className="topup-amount-input"
                      placeholder="0"
                      value={topUpAmount}
                      onChange={(e) => {
                        const value = e.target.value
                        // Only allow positive integers (or empty string)
                        if (value === '' || /^\d+$/.test(value)) {
                          const numValue = parseInt(value) || 0
                          // Limit to maximum of 10,000
                          if (value === '' || numValue <= 10000) {
                            setTopUpAmount(value)
                          }
                        }
                      }}
                      min="1"
                      max="10000"
                      step="1"
                      autoFocus
                    />
                  </div>
                  
                  <div className="preset-amounts">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`preset-amount-btn ${topUpAmount === amount.toString() ? 'selected' : ''}`}
                        onClick={() => setTopUpAmount(amount.toString())}
                      >
                        ₱{amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="topup-modal-actions">
                  <button className="topup-cancel-btn" onClick={handleTopUpClose}>
                    {t.cancel}
                  </button>
                  <button 
                    className="topup-continue-btn" 
                    onClick={handleAmountContinue}
                    disabled={!topUpAmount || parseInt(topUpAmount) <= 0 || parseInt(topUpAmount) > 10000 || isNaN(parseInt(topUpAmount))}
                  >
                    {t.continue} →
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Payment Method Selection */}
            {topUpStep === 'payment' && (
              <>
                <h2 className="topup-modal-title">{t.paymentMethod}</h2>
                <div className="topup-payment-section">
                  <div className="payment-methods">
                    <button
                      type="button"
                      className={`payment-method ${selectedPaymentMethod === 'gcash' ? 'selected' : ''}`}
                      onClick={() => setSelectedPaymentMethod('gcash')}
                    >
                      <span className="payment-icon">📱</span>
                      <span className="payment-name">GCash</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-method ${selectedPaymentMethod === 'paymaya' ? 'selected' : ''}`}
                      onClick={() => setSelectedPaymentMethod('paymaya')}
                    >
                      <span className="payment-icon">💳</span>
                      <span className="payment-name">PayMaya</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-method ${selectedPaymentMethod === 'bdo' ? 'selected' : ''}`}
                      onClick={() => setSelectedPaymentMethod('bdo')}
                    >
                      <span className="payment-icon">🏦</span>
                      <span className="payment-name">BDO</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-method ${selectedPaymentMethod === 'bpi' ? 'selected' : ''}`}
                      onClick={() => setSelectedPaymentMethod('bpi')}
                    >
                      <span className="payment-icon">🏦</span>
                      <span className="payment-name">BPI</span>
                    </button>
                  </div>
                </div>

                <div className="topup-modal-actions">
                  <button className="topup-back-btn" onClick={handleBackStep}>
                    ← {t.back}
                  </button>
                  <button 
                    className="topup-continue-btn" 
                    onClick={handlePaymentContinue}
                    disabled={!selectedPaymentMethod}
                  >
                    {t.continue} →
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Review & Confirm */}
            {topUpStep === 'review' && (
              <>
                <h2 className="topup-modal-title">{t.reviewPayment}</h2>
                
                <div className="review-section">
                  <div className="review-item">
                    <span className="review-label">{t.topUpAmount}</span>
                    <span className="review-value">₱{parseInt(topUpAmount || 0).toLocaleString()}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">{t.paymentMethod}</span>
                    <span className="review-value">{getPaymentMethodName(selectedPaymentMethod)}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">{t.serviceFee}</span>
                    <span className="review-value">₱0.00</span>
                  </div>
                  <div className="review-divider"></div>
                  <div className="review-item total">
                    <span className="review-label">{t.totalAmount}</span>
                    <span className="review-value">₱{parseInt(topUpAmount || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="topup-modal-actions">
                  <button className="topup-back-btn" onClick={handleBackStep}>
                    ← {t.back}
                  </button>
                  <button 
                    className="topup-confirm-btn" 
                    onClick={handleTopUpConfirm}
                  >
                    {t.confirmPayment}
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Processing */}
            {topUpStep === 'processing' && (
              <>
                <div className="processing-section">
                  <div className="processing-spinner"></div>
                  <h2 className="processing-title">{t.processingPayment}</h2>
                  <p className="processing-message">{t.processingMessage}</p>
                </div>
              </>
            )}

            {/* Step 5: Success */}
            {topUpStep === 'success' && (
              <>
                <div className="success-section">
                  <div className="success-icon">✓</div>
                  <h2 className="success-title">{t.topUpSuccessful}</h2>
                  <div className="success-details">
                    <div className="success-item">
                      <span className="success-label">{t.amountAdded}</span>
                      <span className="success-value">₱{parseInt(topUpAmount || 0).toLocaleString()}</span>
                    </div>
                    <div className="success-item">
                      <span className="success-label">{t.transactionId}</span>
                      <span className="success-value small">{transactionId}</span>
                    </div>
                    <div className="success-item">
                      <span className="success-label">{t.newBalance}</span>
                      <span className="success-value">₱{((balance || 0) + parseInt(topUpAmount || 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="topup-modal-actions">
                  <button 
                    className="topup-confirm-btn" 
                    onClick={handleTopUpClose}
                    style={{ width: '100%' }}
                  >
                    {t.done}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommuterDashboard
