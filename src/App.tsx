import { BrowserRouter as Router } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AppRoutes } from './router'
import './App.css'

function App() {
  return (
    <Router>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Router>
  )
}

// Export par défaut du composant pour pouvoir l'importer ailleurs
// Équivalent à export default defineComponent() en Vue
export default App
