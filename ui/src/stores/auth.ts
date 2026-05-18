import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'klient' | 'administrator'

export interface SessionUser {
  fullName: string
  email: string
  role: UserRole
  initials: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<SessionUser | null>({
    fullName: 'Jan Kowalski',
    email: 'jan.kowalski@firma.pl',
    role: 'klient',
    initials: 'JK',
  })

  const isAuthenticated = computed(() => user.value !== null)

  function signIn(payload: { email: string; role: UserRole }) {
    user.value = {
      fullName: 'Jan Kowalski',
      email: payload.email,
      role: payload.role,
      initials: 'JK',
    }
  }

  function signOut() {
    user.value = null
  }

  return { user, isAuthenticated, signIn, signOut }
})
