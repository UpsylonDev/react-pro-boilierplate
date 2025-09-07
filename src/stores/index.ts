// Point d'entrée centralisé pour tous les stores
// Permet d'importer facilement depuis n'importe quel composant avec :
// import { TodoProvider, useTodos } from '../stores'

// Export de tout ce qui concerne les todos
export { TodoProvider } from './todo'
export { useTodos } from '../hooks/useTodos'

// Ici on pourra ajouter d'autres stores à l'avenir :
// export { UserProvider, useUser } from './user'
// export { SettingsProvider, useSettings } from './settings'