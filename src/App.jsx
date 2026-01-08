import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import TwoStepVerificationPage from './pages/TwoStepVerificationPage'
import CommuterDashboard from './pages/CommuterDashboard'
import ChooseDestinationPage from './pages/ChooseDestinationPage'
import SelectOriginPage from './pages/SelectOriginPage'
import UserProfilePage from './pages/UserProfilePage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }
  
  const [userData, setUserData] = useState({ 
    currentTerminal: 1, 
    balance: 250.00, 
    currentRoute: null,
    transactions: [], // Array to store all transactions (top-ups, trips, etc.)
    language: 'English', // Default language
    theme: getInitialTheme() // Theme preference
  })
  
  // Apply theme to document root when theme changes
  useEffect(() => {
    const theme = userData?.theme || 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [userData?.theme])

  const handleLogout = () => {
    setIsAuthenticated(false)
    const currentTheme = userData?.theme || getInitialTheme()
    setUserData({ currentTerminal: 1, balance: 250.00, currentRoute: null, transactions: [], language: 'English', theme: currentTheme })
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <LoginPage onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/verify" 
            element={
              <TwoStepVerificationPage 
                onVerify={() => {
                  setIsAuthenticated(true)
                  const currentTheme = userData?.theme || getInitialTheme()
                  setUserData({ currentTerminal: 1, balance: 250.00, currentRoute: null, transactions: [], language: 'English', theme: currentTheme })
                }} 
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <CommuterDashboard 
                  userData={userData}
                  setUserData={setUserData}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? (
                <UserProfilePage 
                  userData={userData}
                  setUserData={setUserData}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/choose-destination" 
            element={
              isAuthenticated ? (
                <ChooseDestinationPage 
                  userData={userData}
                  setUserData={setUserData}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/select-origin" 
            element={
              isAuthenticated ? (
                <SelectOriginPage 
                  userData={userData}
                  setUserData={setUserData}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/history" 
            element={
              isAuthenticated ? (
                <HistoryPage 
                  userData={userData}
                  setUserData={setUserData}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? (
                <SettingsPage 
                  userData={userData}
                  setUserData={setUserData}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
