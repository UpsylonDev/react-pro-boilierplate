// Service pour interagir avec l'API JSONPlaceholder
// Démontre les bonnes pratiques pour les appels API en TypeScript

import { Post } from '../types/post'

// URL de base de l'API JSONPlaceholder - API de test gratuite et publique
const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Classe service pour centraliser toute la logique d'API
// Pattern Service Layer - sépare la logique métier des composants
export class PostsService {
  // Méthode privée générique pour tous les appels fetch
  // Utilise les generics TypeScript pour typer la réponse
  // Gestion d'erreur centralisée pour toutes les requêtes
  private static async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`)
      
      // Vérification du status HTTP - fetch ne reject pas sur 404, 500, etc.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      // Type narrowing - vérification du type d'erreur
      if (error instanceof Error) {
        throw new Error(`Failed to fetch: ${error.message}`)
      }
      throw new Error('An unknown error occurred')
    }
  }

  // Récupère tous les posts - endpoint GET /posts
  // Retourne un tableau typé de Post[]
  static async getAllPosts(): Promise<Post[]> {
    return this.fetchApi<Post[]>('/posts')
  }

  // Récupère un post spécifique par son ID - GET /posts/:id
  // Utilisation des template literals pour construire l'URL
  static async getPost(id: number): Promise<Post> {
    return this.fetchApi<Post>(`/posts/${id}`)
  }

  // Récupère tous les posts d'un utilisateur - GET /posts?userId=:userId
  // Démontre l'utilisation des query parameters
  static async getPostsByUser(userId: number): Promise<Post[]> {
    return this.fetchApi<Post[]>(`/posts?userId=${userId}`)
  }

  // Crée un nouveau post - POST /posts
  // Utilise Omit<Post, 'id'> car l'ID sera généré par le serveur
  // Démontre les utility types TypeScript
  static async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),        // Sérialisation JSON du body
        headers: {
          'Content-type': 'application/json; charset=UTF-8',  // Headers requis pour JSON
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create post: ${error.message}`)
      }
      throw new Error('An unknown error occurred while creating post')
    }
  }

  // Met à jour un post existant - PUT /posts/:id
  // Utilise Partial<Post> pour permettre des mises à jour partielles
  // Le spread operator (...) fusionne l'id avec les données partielles
  static async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, ...post }),  // Fusion des données avec spread operator
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update post: ${error.message}`)
      }
      throw new Error('An unknown error occurred while updating post')
    }
  }

  // Supprime un post - DELETE /posts/:id
  // Retourne void car DELETE ne retourne généralement pas de données
  static async deletePost(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // Pas de return await response.json() car DELETE retourne un body vide
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete post: ${error.message}`)
      }
      throw new Error('An unknown error occurred while deleting post')
    }
  }
}