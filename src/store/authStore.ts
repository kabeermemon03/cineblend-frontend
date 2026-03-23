import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  onboardingCompleted?: boolean
  role?: 'admin' | 'client'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setOnboardingStatus: (completed: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setAuth: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      setOnboardingStatus: (completed) => set((state) => ({
        user: state.user ? { ...state.user, onboardingCompleted: completed } : null
      })),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: 'cineblend-auth',
    }
  )
)
