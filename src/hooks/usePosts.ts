// Custom hook pour gérer les posts - démontre les bonnes pratiques React
// Encapsule la logique de fetching et l'état dans un hook réutilisable

import { useState, useEffect } from 'react'
import { Post, PostsState } from '../types/post'
import { PostsService } from '../services/postsService'

// Hook personnalisé pour récupérer et gérer tous les posts
// Retourne l'état + une fonction refetch pour recharger les données
export function usePosts() {
  // État local du hook - utilise l'interface PostsState pour le typage
  const [state, setState] = useState<PostsState>({
    posts: [],
    loading: true,    // Commence en loading car on va fetch au mount
    error: null
  })

  // useEffect pour charger les posts au mount du composant
  // Le tableau de dépendances vide [] signifie "exécuter une seule fois au mount"
  useEffect(() => {
    let isCancelled = false  // Flag pour éviter les race conditions

    const fetchPosts = async () => {
      try {
        // Reset loading et error avant le fetch
        setState(prev => ({ ...prev, loading: true, error: null }))
        const posts = await PostsService.getAllPosts()
        
        // Vérifier si le composant est encore monté avant de set l'état
        if (!isCancelled) {
          setState({ posts, loading: false, error: null })
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            posts: [],
            loading: false,
            error: error instanceof Error ? error.message : 'Une erreur est survenue'
          })
        }
      }
    }

    fetchPosts()

    // Cleanup function - appelée quand le composant se démonte
    // Évite les memory leaks et les setState sur composant démonté
    return () => {
      isCancelled = true
    }
  }, [])  // Dépendances vides = exécution une seule fois

  // Fonction pour recharger manuellement les posts
  // Utile pour les boutons "Actualiser" ou retry après erreur
  const refetch = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const posts = await PostsService.getAllPosts()
      setState({ posts, loading: false, error: null })
    } catch (error) {
      setState({
        posts: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      })
    }
  }

  // Retourne l'état déstructuré + la fonction refetch
  // Le spread operator (...state) "éclate" posts, loading, error
  return {
    ...state,    // Équivaut à: posts: state.posts, loading: state.loading, error: state.error
    refetch
  }
}

// Hook pour récupérer un post spécifique par son ID
// Exemple d'hook paramétré - l'ID change, le hook se re-exécute
export function usePost(id: number) {
  const [post, setPost] = useState<Post | null>(null)    // null initial car pas encore chargé
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect qui se re-exécute quand l'ID change (voir dépendance [id])
  useEffect(() => {
    let isCancelled = false  // Protection contre les race conditions

    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)
        const postData = await PostsService.getPost(id)
        
        if (!isCancelled) {
          setPost(postData)
          setLoading(false)
        }
      } catch (error) {
        if (!isCancelled) {
          setPost(null)
          setLoading(false)
          setError(error instanceof Error ? error.message : 'Une erreur est survenue')
        }
      }
    }

    // Vérification que l'ID est valide avant de fetch
    if (id) {
      fetchPost()
    }

    return () => {
      isCancelled = true
    }
  }, [id])  // Dépendance [id] = re-exécution quand id change

  return { post, loading, error }
}