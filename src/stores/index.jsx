// Point d'entrée centralisé pour tous les stores
// Permet d'importer facilement depuis n'importe quel composant avec :
// import { TodoProvider, useTodos } from '../stores'

// Export de tout ce qui concerne les todos
export { TodoProvider, useTodos } from './todo'

// Ici on pourra ajouter d'autres stores à l'avenir :
// export { UserProvider, useUser } from './user'
// export { SettingsProvider, useSettings } from './settings'