// Point d'entree de l'application React - equivalent a main.js en Vue
// Import des outils React necessaires pour le montage de l'application

// StrictMode : composant wrapper qui active des verifications supplementaires en developpement
// Equivalent au mode strict de Vue, aide a detecter les problemes potentiels
import { StrictMode } from 'react'

// createRoot : API moderne de React 18+ pour creer une racine de rendu
// Remplace ReactDOM.render() des versions precedentes
// Equivalent a createApp() en Vue 3
import { createRoot } from 'react-dom/client'

// Import des styles globaux CSS
import './index.css'

// Import des polices Google Fonts
import '@fontsource/roboto/500.css'
import '@fontsource/rubik-one'

// Import du composant racine de l'application
import App from './App'

// Creation et montage de l'application React
// 1. createRoot() trouve l'element DOM avec l'id "root" dans index.html
// 2. .render() monte l'application dans cet element
// Equivalent a createApp(App).mount('#root') en Vue
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  // StrictMode encapsule l'application pour les verifications de developpement
  // - Detecte les composants avec des effets de bord
  // - Avertit des APIs depreciees
  // - Aide a identifier les re-rendus inattendus
  <StrictMode>
    {/* Composant racine de l'application */}
    <App />
  </StrictMode>,
)
