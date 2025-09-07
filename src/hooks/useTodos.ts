import { useContext } from 'react'
import { TodoContext } from '../stores/todo'
import { TodoContextType } from '../types/todo'

// Hook personnalisé pour utiliser le contexte Todo
// Équivalent à useStore() en Pinia - permet d'accéder au store depuis n'importe quel composant
export const useTodos = (): TodoContextType => {
  // useContext récupère la valeur du contexte le plus proche dans l'arbre des composants
  const context = useContext(TodoContext)
  
  // Vérification de sécurité : le hook ne peut être utilisé que dans un composant
  // encapsulé par TodoProvider (équivalent à la vérification d'injection en Vue)
  if (context === undefined) {
    throw new Error('useTodos doit être utilisé à l\'intérieur d\'un TodoProvider')
  }
  
  // Retourne l'objet contenant l'état et les méthodes du store
  return context
}