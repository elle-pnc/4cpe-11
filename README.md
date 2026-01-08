# Commuter App - AFCS

A mobile-responsive commuter application for managing modern jeepney transportation in the Philippines.

## Features

- **Login Page**: Email and password authentication
- **Two-Step Verification**: 6-digit code verification
- **Commuter Dashboard**: 
  - Card balance display
  - Available modern jeepneys with passenger count (up to 2 passengers)
  - Direction indicators (right/left arrows)
  - Destination terminal selection
- **Choose Destination Terminal**: 
  - Filter terminals based on current location
  - Extend route functionality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  ├── pages/
  │   ├── LoginPage.jsx
  │   ├── TwoStepVerificationPage.jsx
  │   ├── CommuterDashboard.jsx
  │   └── ChooseDestinationPage.jsx
  ├── App.jsx
  ├── App.css
  ├── main.jsx
  └── index.css
```

## Usage

1. **Login**: Enter your email and password on the login page
2. **Verify**: Enter the 6-digit verification code
3. **Dashboard**: View your card balance and available jeepneys
4. **Choose Destination**: Select a destination terminal (excludes current terminal)
5. **Extend Route**: Extend your current route to additional terminals

## Notes

- This is a mockup application without database integration
- All logos and symbols use placeholder emojis and can be replaced with actual assets
- The app is mobile-first and responsive
- Passenger counts and jeepney data are currently hardcoded for demonstration

## Technologies Used

- React 18
- React Router DOM
- Vite
- CSS3 (Mobile-first responsive design)
