# Dark Theme Implementation Guide

The dark theme has been implemented using CSS variables. To complete the theme system, you need to update remaining color references in CSS files.

## What's Been Done

1. ✅ CSS Variables defined in `src/index.css`
2. ✅ Theme state management in `App.jsx`
3. ✅ Theme toggle in Settings page
4. ✅ SettingsPage.css updated
5. ✅ FooterNav.css updated
6. ✅ CommuterDashboard.css partially updated

## Remaining Work

Update these CSS files to use CSS variables instead of hardcoded colors:

### Common Patterns to Replace:

1. `background-color: #ffffff;` → `background-color: var(--bg-primary);`
2. `background-color: #f5f5f5;` → `background-color: var(--bg-secondary);`
3. `color: #424242;` → `color: var(--text-primary);`
4. `color: #757575;` → `color: var(--text-secondary);`
5. `border: 1px solid #e0e0e0;` → `border: 1px solid var(--border-color);`
6. `color: #1e88e5;` → `color: var(--accent-primary);`

### Files That Need Updates:

- `src/pages/CommuterDashboard.css` - Complete remaining color updates
- `src/pages/HistoryPage.css`
- `src/pages/ChooseDestinationPage.css`
- `src/pages/SelectOriginPage.css`
- `src/pages/UserProfilePage.css`
- `src/pages/LoginPage.css`
- `src/pages/TwoStepVerificationPage.css`

## CSS Variables Available:

- Background: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- Text: `--text-primary`, `--text-secondary`, `--text-tertiary`
- Borders: `--border-color`, `--border-light`
- Accents: `--accent-primary`, `--accent-success`, `--accent-error`
- Cards: `--card-bg`, `--card-shadow`
- Inputs: `--input-bg`, `--input-border`, `--input-focus-border`
- Modals: `--modal-overlay`, `--modal-bg`

## Testing

Test dark theme by:
1. Going to Settings
2. Clicking Theme toggle
3. Verifying all pages update correctly

