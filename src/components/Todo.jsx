// Import des hooks React et du store personnalisé
// useState : hook pour la gestion d'état local (équivalent à ref() en Vue)
import { useState } from 'react'
// Import du hook personnalisé pour accéder au store des todos
import { useTodos } from '../stores'
// Import des styles CSS pour ce composant
import './Todo.css'

// Composant fonctionnel Todo - équivalent à defineComponent() en Vue
// export default : export par défaut du composant
export default function Todo() {
  // Hook useState pour gérer l'état local de l'input
  // [getter, setter] = useState(valeurInitiale)
  // Équivalent à const inputValue = ref('') en Vue
  const [inputValue, setInputValue] = useState('')
  
  // Utilisation du hook personnalisé pour accéder au store
  // Destructuration de l'objet retourné par useTodos()
  // Équivalent à const { todos, addTodo, toggleTodo, deleteTodo } = inject('todos') en Vue
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()

  // Fonction de gestion de soumission du formulaire
  // Équivalent à une méthode dans l'objet methods en Vue Options API
  const handleSubmit = (e) => {
    // Empêche le comportement par défaut du formulaire (rechargement de page)
    e.preventDefault()
    
    // Vérification que l'input n'est pas vide après trim()
    if (inputValue.trim()) {
      // Appel de la fonction addTodo du store avec la valeur nettoyée
      addTodo(inputValue.trim())
      // Reset de l'input après ajout - équivalent à inputValue.value = '' en Vue
      setInputValue('')
    }
  }

  // Rendu JSX du composant - équivalent au template en Vue
  return (
    <div className="todo-container">
      <h2>Ma Liste de Tâches</h2>
      
      {/* Formulaire avec gestionnaire d'événement onSubmit */}
      {/* Équivalent à @submit.prevent="handleSubmit" en Vue */}
      <form onSubmit={handleSubmit} className="todo-form">
        {/* Input contrôlé : value et onChange liés à l'état */}
        {/* Équivalent à v-model="inputValue" en Vue */}
        <input
          type="text"
          value={inputValue} // Valeur liée à l'état local
          onChange={(e) => setInputValue(e.target.value)} // Mise à jour de l'état lors du changement
          placeholder="Ajouter une nouvelle tâche..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Ajouter</button>
      </form>

      {/* Liste des todos - équivalent à v-for en Vue */}
      <ul className="todo-list">
        {/* Map sur le tableau todos pour générer les éléments li */}
        {/* Équivalent à v-for="todo in todos" :key="todo.id" en Vue */}
        {todos.map(todo => (
          <li 
            key={todo.id} // Clé unique requise pour les listes en React
            className={`todo-item ${todo.completed ? 'completed' : ''}`} // Classes conditionnelles
          >
            {/* Label pour associer checkbox et texte - améliore l'accessibilité */}
            <label className="todo-label">
              {/* Checkbox contrôlée avec état lié au todo.completed */}
              <input
                type="checkbox"
                checked={todo.completed} // État de la checkbox lié au todo
                onChange={() => toggleTodo(todo.id)} // Fonction appelée au changement
                className="todo-checkbox"
              />
              {/* Affichage du texte du todo */}
              <span className="todo-text">{todo.text}</span>
            </label>
            {/* Bouton de suppression avec gestionnaire d'événement */}
            {/* Équivalent à @click="deleteTodo(todo.id)" en Vue */}
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Affichage conditionnel si aucun todo - équivalent à v-if en Vue */}
      {/* Expression && : si la condition est vraie, affiche l'élément */}
      {todos.length === 0 && (
        <p className="empty-message">Aucune tâche pour le moment.</p>
      )}
    </div>
  )
}