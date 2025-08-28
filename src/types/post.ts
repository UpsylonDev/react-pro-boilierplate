// Interface représentant un Post de l'API JSONPlaceholder
// Structure typique d'un post de blog avec utilisateur associé
export interface Post {
  id: number        // Identifiant unique du post
  userId: number    // ID de l'utilisateur qui a créé le post
  title: string     // Titre du post
  body: string      // Contenu/corps du post
}

// Interface pour gérer l'état des posts dans les composants
// Pattern courant pour gérer les états de chargement asynchrone
export interface PostsState {
  posts: Post[]             // Tableau des posts chargés
  loading: boolean          // Indicateur de chargement en cours
  error: string | null      // Message d'erreur (null si pas d'erreur)
}

// Interface générique pour les réponses d'API
// Permet de standardiser la gestion des états loading/error pour tous les appels API
export interface ApiResponse<T> {
  data: T | null            // Données de retour (null si erreur ou pas encore chargé)
  loading: boolean          // État de chargement
  error: string | null      // Message d'erreur éventuel
}