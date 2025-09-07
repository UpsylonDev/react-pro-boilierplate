// Import des hooks React nécessaires pour la gestion d'état
// createContext : pour créer un contexte global (équivalent à provide/inject Vue)
// useContext : pour consommer le contexte (équivalent à inject Vue)
// useReducer : pour la gestion d'état complexe (équivalent à Vuex/Pinia)
import {
  createContext,
  // useContext,
  useReducer,
  ReactNode
} from 'react'
import { Todo, TodoContextType, TodoAction } from '../types/todo'

// Création du contexte Todo - équivalent à createApp().provide() en Vue
// Permet de partager des données entre tous les composants enfants
const TodoContext = createContext<TodoContextType | undefined>(undefined)

// Reducer : fonction pure qui définit comment l'état change selon les actions
// Équivalent aux mutations/actions dans Vuex ou Pinia
// state : état actuel, action : objet décrivant le changement à effectuer
const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  // Switch sur le type d'action - équivalent aux mutations Vuex
  switch (action.type) {
    case 'ADD_TODO':
      // Retourne un nouvel état (immutabilité obligatoire en React)
      // Spread operator (...) pour créer un nouveau tableau + nouvel item
      return [...state, { 
        id: Date.now(), // ID unique basé sur timestamp
        text: action.text, // Texte passé dans l'action
        completed: false, // Nouveau todo non complété par défaut
        createdAt: new Date()
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
    
    case 'UPDATE_TODO':
      // Map sur tous les todos pour modifier le texte de celui qui correspond à l'id
      return state.map(todo => 
        todo.id === action.id 
          ? { ...todo, text: action.text, updatedAt: new Date() } // Spread + modification du texte et updatedAt
          : todo // Retour du todo inchangé
      )
    
    default:
      // Toujours retourner l'état actuel si l'action n'est pas reconnue
      return state
  }
}

// Composant Provider : équivalent à createApp().provide() en Vue
// Encapsule la logique du store et fournit les données/méthodes aux enfants
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  // useReducer : hook pour la gestion d'état complexe avec reducer
  // [state, dispatch] : état actuel + fonction pour déclencher des actions
  // todoReducer : fonction reducer définie plus haut
  // [] : état initial (tableau vide de todos)
  const [todos, dispatch] = useReducer(todoReducer, [] as Todo[])

  // Fonctions helper pour dispatcher des actions spécifiques
  // Équivalent aux actions Pinia - encapsulent la logique métier
  
  // Ajouter un todo : dispatch l'action ADD_TODO avec le texte
  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', text })
  }

  // Basculer l'état complété d'un todo : dispatch TOGGLE_TODO avec l'id
  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', id })
  }

  // Supprimer un todo : dispatch DELETE_TODO avec l'id
  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', id })
  }

  // Modifier le texte d'un todo : dispatch UPDATE_TODO avec l'id et le nouveau texte
  const updateTodo = (id: number, text: string) => {
    dispatch({ type: 'UPDATE_TODO', id, text })
  }

  // Rendu du Provider avec la valeur du contexte
  // value : objet contenant l'état et les méthodes accessibles aux enfants
  // children : tous les composants enfants qui pourront accéder au contexte
  return (
    <TodoContext.Provider value={{ todos: todos, addTodo, toggleTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

// Exportez uniquement le Provider et le contexte si besoin
export { TodoContext }