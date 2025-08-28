// Import des hooks React nécessaires pour la gestion d'état
// createContext : pour créer un contexte global (équivalent à provide/inject Vue)
// useContext : pour consommer le contexte (équivalent à inject Vue)
// useReducer : pour la gestion d'état complexe (équivalent à Vuex/Pinia)
import { createContext, useContext, useReducer } from 'react'

// Création du contexte Todo - équivalent à createApp().provide() en Vue
// Permet de partager des données entre tous les composants enfants
const TodoContext = createContext()

// Reducer : fonction pure qui définit comment l'état change selon les actions
// Équivalent aux mutations/actions dans Vuex ou Pinia
// state : état actuel, action : objet décrivant le changement à effectuer
const todoReducer = (state, action) => {
  // Switch sur le type d'action - équivalent aux mutations Vuex
  switch (action.type) {
    case 'ADD_TODO':
      // Retourne un nouvel état (immutabilité obligatoire en React)
      // Spread operator (...) pour créer un nouveau tableau + nouvel item
      return [...state, { 
        id: Date.now(), // ID unique basé sur timestamp
        text: action.text, // Texte passé dans l'action
        completed: false // Nouveau todo non complété par défaut
      }]
    
    case 'TOGGLE_TODO':
      // Map sur tous les todos pour modifier celui qui correspond à l'id
      // Équivalent à state.todos.forEach() mais en immutable
      return state.map(todo => 
        todo.id === action.id 
          ? { ...todo, completed: !todo.completed } // Spread + modification du completed
          : todo // Retour du todo inchangé
      )
    
    case 'DELETE_TODO':
      // Filter pour garder tous les todos sauf celui avec l'id donné
      return state.filter(todo => todo.id !== action.id)
    
    default:
      // Toujours retourner l'état actuel si l'action n'est pas reconnue
      return state
  }
}

// Composant Provider : équivalent à createApp().provide() en Vue
// Encapsule la logique du store et fournit les données/méthodes aux enfants
export const TodoProvider = ({ children }) => {
  // useReducer : hook pour la gestion d'état complexe avec reducer
  // [state, dispatch] : état actuel + fonction pour déclencher des actions
  // todoReducer : fonction reducer définie plus haut
  // [] : état initial (tableau vide de todos)
  const [todos, dispatch] = useReducer(todoReducer, [])

  // Fonctions helper pour dispatcher des actions spécifiques
  // Équivalent aux actions Pinia - encapsulent la logique métier
  
  // Ajouter un todo : dispatch l'action ADD_TODO avec le texte
  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', text })
  }

  // Basculer l'état complété d'un todo : dispatch TOGGLE_TODO avec l'id
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', id })
  }

  // Supprimer un todo : dispatch DELETE_TODO avec l'id
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id })
  }

  // Rendu du Provider avec la valeur du contexte
  // value : objet contenant l'état et les méthodes accessibles aux enfants
  // children : tous les composants enfants qui pourront accéder au contexte
  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte Todo
// Équivalent à inject() en Vue mais avec vérification d'erreur
export const useTodos = () => {
  // useContext récupère la valeur du contexte TodoContext
  const context = useContext(TodoContext)
  
  // Vérification que le hook est utilisé dans un composant enfant du Provider
  // Équivalent à vérifier qu'on a bien fait provide() en Vue
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  
  // Retourne l'objet contexte (todos, addTodo, toggleTodo, deleteTodo)
  return context
}