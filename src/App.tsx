// Composant racine de l'application React
// Import des hooks et composants nécessaires

// useState : hook pour la gestion d'état local (équivalent à ref() en Vue)
import { useState } from 'react'
// Import des assets (logos) - Vite gère automatiquement ces imports
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// Import des styles CSS pour ce composant
import './App.css'
// Import du Provider du store pour encapsuler l'application
import { TodoProvider } from './stores'
// Import du composant Todo que nous avons créé
import Todo from './components/Todo'
import Posts from './components/Posts'

// Composant fonctionnel App - composant racine
// Équivalent à App.vue en Vue avec <script setup>
function App() {
  // État local pour le compteur de démonstration
  // useState retourne [valeur, fonction_de_mise_à_jour]
  // Équivalent à const count = ref(0) en Vue
  const [count, setCount] = useState<number>(0)

  // Rendu JSX du composant - équivalent au template en Vue
  return (
    // TodoProvider encapsule toute l'application pour fournir le store des todos
    // Équivalent à <template> avec provide/inject en Vue
    // Tous les composants enfants peuvent accéder au store via useTodos()
    <TodoProvider>
      {/* Section des logos */}
      <div>
        {/* Liens externes avec target="_blank" pour ouvrir dans un nouvel onglet */}
        <a href="https://vite.dev" target="_blank">
          {/* Image avec src importé automatiquement par Vite */}
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      {/* Titre principal */}
      <h1>Vite + React</h1>
      
      {/* Section de démonstration avec compteur */}
      <div className="card">
        {/* Bouton avec gestionnaire d'événement onClick */}
        {/* Équivalent à @click="count++" en Vue */}
        <button onClick={() => setCount((count) => count + 1)}>
          {/* Interpolation de la valeur count dans le JSX */}
          {/* Équivalent à {{ count }} en Vue */}
          count is {count}
        </button>
        <p>
          {/* Balise <code> pour styler le nom du fichier */}
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      {/* Notre composant Todo personnalisé */}
      {/* Il aura accès au TodoProvider grâce à l'encapsulation */}
      <Todo />

      {/* Composant Posts pour afficher les données de l'API */}
      <Posts />
    </TodoProvider>
  )
}

// Export par défaut du composant pour pouvoir l'importer ailleurs
// Équivalent à export default defineComponent() en Vue
export default App
