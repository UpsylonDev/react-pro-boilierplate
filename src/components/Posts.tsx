// Composant Posts - démontre l'utilisation d'API externes en React
// Utilise le hook personnalisé usePosts pour la logique de données

import { usePosts } from '../hooks/usePosts'
import { Button } from '../ui/Button/Button'
import './Posts.css'

// Composant principal pour afficher la liste des posts
// Gère 3 états : loading, error, et success avec données
export default function Posts() {
  // Destructuration du hook - récupère posts, loading, error et refetch
  const { posts, loading, error, refetch } = usePosts()

  // Early return pattern - gestion des états loading et error en premier
  // Améliore la lisibilité en évitant l'imbrication excessive
  if (loading) {
    return (
      <div className="posts-container">
        <div className="posts-header">
          <h2>Posts from API</h2>
        </div>
        <div className="posts-loading">
          <div className="spinner"></div>
          <p>Chargement des posts...</p>
        </div>
      </div>
    )
  }

  // État d'erreur - propose un bouton retry pour une bonne UX
  if (error) {
    return (
      <div className="posts-container">
        <div className="posts-header">
          <h2>Posts from API</h2>
          <Button onClick={refetch} variant="secondary" size="sm">
            Réessayer
          </Button>
        </div>
        <div className="posts-error">
          <p className="error-message">{error}</p>
          <p className="error-description">
            Impossible de charger les posts. Vérifiez votre connexion internet.
          </p>
        </div>
      </div>
    )
  }

  // État de succès - affichage des posts en grille
  // Limitation à 12 posts pour éviter de surcharger l'interface
  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts from API</h2>
        <div className="posts-actions">
          <Button onClick={refetch} variant="secondary" size="sm">
            Actualiser
          </Button>
          <span className="posts-count">{posts.length} posts</span>
        </div>
      </div>
      
      {/* Grille responsive des posts - CSS Grid pour l'adaptabilité */}
      <div className="posts-grid">
        {/* slice(0, 12) limite l'affichage pour la performance */}
        {/* map() transforme chaque post en JSX - équivalent à v-for en Vue */}
        {posts.slice(0, 12).map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-id">#{post.id}</span>
              <span className="post-user">User {post.userId}</span>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">
              {/* Troncature conditionnelle - ternaire pour limiter le texte */}
              {post.body.length > 100 
                ? `${post.body.substring(0, 100)}...` 
                : post.body
              }
            </p>
          </article>
        ))}
      </div>
      
      {/* Affichage conditionnel - && operator pour le rendu conditionnel */}
      {posts.length > 12 && (
        <div className="posts-footer">
          <p className="posts-info">
            Affichage des 12 premiers posts sur {posts.length} au total
          </p>
        </div>
      )}
    </div>
  )
}