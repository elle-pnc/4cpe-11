import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdCheck } from 'react-icons/md'
import './TwoStepVerificationPage.css'

const TwoStepVerificationPage = ({ onVerify }) => {
  const [codes, setCodes] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index, value) => {
    if (value.length > 1) return
    
    const newCodes = [...codes]
    newCodes[index] = value
    setCodes(newCodes)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all fields are filled
    if (newCodes.every(code => code !== '') && newCodes.length === 6) {
      setTimeout(() => {
        onVerify()
        navigate('/dashboard')
      }, 300)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newCodes = [...codes]
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCodes[i] = pastedData[i]
    }
    setCodes(newCodes)
    const nextEmptyIndex = newCodes.findIndex(code => code === '')
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = () => {
    if (codes.every(code => code !== '')) {
      onVerify()
      navigate('/dashboard')
    }
  }

  return (
    <div className="mobile-container">
      <div className="verification-page">
        <div className="verification-header">
          <div className="logo-placeholder-verify">
            <img src="/Logo.png" alt="CPE11-AFCS Logo" className="logo-image" />
          </div>
        </div>

        <h1 className="verification-title">Two-Step Verification</h1>
        <p className="verification-subtitle">Enter the verification code sent to your email/phone</p>

        <div className="code-inputs-container">
          <div className="code-inputs-row">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={codes[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="code-input"
              />
            ))}
          </div>
        </div>

        <button 
          onClick={handleVerify} 
          className="verify-button"
          disabled={!codes.every(code => code !== '')}
        >
          <MdCheck />
          <span>Verify</span>
        </button>
      </div>
    </div>
  )
}

export default TwoStepVerificationPage
