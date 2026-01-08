import { MdAdd, MdDirectionsBus, MdAttachMoney } from 'react-icons/md'
import FooterNav from '../components/FooterNav'
import { getTranslations } from '../translations'
import './HistoryPage.css'

const HistoryPage = ({ userData }) => {
  const transactions = userData?.transactions || []
  const currentLanguage = userData?.language || 'English'
  const t = getTranslations(currentLanguage)

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now - d)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return d.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined })
    }
  }

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'top-up':
        return <MdAdd className="transaction-icon top-up" />
      case 'trip':
        return <MdDirectionsBus className="transaction-icon trip" />
      default:
        return <MdAttachMoney className="transaction-icon" />
    }
  }

  const getTransactionTypeLabel = (type) => {
    switch (type) {
      case 'top-up':
        return t.topUp
      case 'trip':
        return t.trip
      default:
        return 'Transaction'
    }
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.timestamp)
    const dateKey = date.toDateString()
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(transaction)
    return groups
  }, {})

  const sortedGroups = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b) - new Date(a)
  })

  return (
    <div className="mobile-container page-with-footer">
      <div className="history-page">
        <div className="history-header">
          <h1 className="history-title">{t.transactionHistory}</h1>
        </div>

        <div className="history-content">
          {transactions.length === 0 ? (
            <div className="history-empty">
              <p>{t.noTransactions}</p>
              <p className="history-subtitle">{t.transactionsSubtitle}</p>
            </div>
          ) : (
            <div className="transactions-list">
              {sortedGroups.map((dateKey) => (
                <div key={dateKey} className="transaction-group">
                  <div className="transaction-date-header">
                    {new Date(dateKey).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {groupedTransactions[dateKey].map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-icon-container">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-main">
                          <span className="transaction-type">{getTransactionTypeLabel(transaction.type)}</span>
                          <span className="transaction-amount">
                            {transaction.type === 'top-up' ? (
                              <span className="amount-positive">+₱{transaction.amount?.toLocaleString() || '0'}</span>
                            ) : (
                              <span className="amount-negative">-₱{transaction.fare?.toFixed(2) || '0.00'}</span>
                            )}
                          </span>
                        </div>
                        <div className="transaction-secondary">
                          <span className="transaction-description">{transaction.description}</span>
                          <span className="transaction-time">{formatDate(transaction.timestamp)}</span>
                        </div>
                        {transaction.id && (
                          <div className="transaction-id">
                            ID: {transaction.id}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <FooterNav language={currentLanguage} />
      </div>
    </div>
  )
}

export default HistoryPage

