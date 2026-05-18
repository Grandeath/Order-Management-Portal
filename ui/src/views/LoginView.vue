<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const role = ref<UserRole>('klient')
const email = ref('jan.kowalski@firma.pl')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)

function submit() {
  auth.signIn({ email: email.value, role: role.value })
  router.push('/')
}
</script>

<template>
  <div
    class="bg-background min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
  >
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        class="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-primary-fixed opacity-20 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-[20%] -left-[10%] w-[50%] h-[70%] rounded-full bg-secondary-fixed opacity-30 blur-3xl"
      ></div>
    </div>

    <main
      class="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0px_8px_16px_rgba(0,0,0,0.1)] p-8 relative z-10"
    >
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary mb-4 shadow-sm"
        >
          <span class="material-symbols-outlined fill text-on-primary text-2xl">inventory_2</span>
        </div>
        <h1 class="font-headline-md text-headline-md text-on-surface mb-2">Zaloguj się do OMS</h1>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Wybierz swoją rolę i wprowadź dane dostępowe.
        </p>
      </div>

      <div class="mb-8">
        <p class="font-label-md text-label-md text-on-surface-variant mb-3 uppercase tracking-wider">
          Wybierz profil
        </p>
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            @click="role = 'klient'"
            :class="[
              'flex flex-col items-center justify-center p-4 rounded-md border-2 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              role === 'klient'
                ? 'border-primary bg-surface-container-low'
                : 'border-outline-variant bg-surface hover:bg-surface-container-high',
            ]"
          >
            <span
              class="material-symbols-outlined mb-2 text-3xl transition-transform group-hover:scale-110"
              :class="[role === 'klient' ? 'text-primary fill' : 'text-on-surface-variant']"
              >person</span
            >
            <span
              class="font-label-md text-label-md"
              :class="role === 'klient' ? 'text-primary font-bold' : 'text-on-surface-variant'"
              >Klient</span
            >
          </button>

          <button
            type="button"
            @click="role = 'administrator'"
            :class="[
              'flex flex-col items-center justify-center p-4 rounded-md border-2 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              role === 'administrator'
                ? 'border-primary bg-surface-container-low'
                : 'border-outline-variant bg-surface hover:bg-surface-container-high',
            ]"
          >
            <span
              class="material-symbols-outlined mb-2 text-3xl transition-transform group-hover:scale-110"
              :class="[
                role === 'administrator' ? 'text-primary fill' : 'text-on-surface-variant',
              ]"
              >admin_panel_settings</span
            >
            <span
              class="font-label-md text-label-md"
              :class="
                role === 'administrator' ? 'text-primary font-bold' : 'text-on-surface-variant'
              "
              >Administrator</span
            >
          </button>
        </div>
      </div>

      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label class="block font-label-md text-label-md text-on-surface mb-1" for="email">
            Adres e-mail
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-on-surface-variant text-lg">mail</span>
            </div>
            <input
              id="email"
              v-model="email"
              required
              type="email"
              placeholder="jan.kowalski@firma.pl"
              class="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="block font-label-md text-label-md text-on-surface" for="password">
              Hasło
            </label>
            <a
              href="#"
              class="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
              >Zapomniałeś hasła?</a
            >
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-on-surface-variant text-lg">lock</span>
            </div>
            <input
              id="password"
              v-model="password"
              required
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="block w-full pl-10 pr-10 py-3 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
            >
              <span class="material-symbols-outlined text-lg">{{
                showPassword ? 'visibility' : 'visibility_off'
              }}</span>
            </button>
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="remember-me"
            v-model="remember"
            type="checkbox"
            class="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded bg-surface-container-lowest cursor-pointer"
          />
          <label
            for="remember-me"
            class="ml-2 block font-body-md text-body-md text-on-surface-variant cursor-pointer"
            >Zapamiętaj mnie</label
          >
        </div>

        <button
          type="submit"
          class="w-full flex justify-center items-center py-3 px-4 rounded-md font-label-md text-label-md text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm"
        >
          Zaloguj się
          <span class="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="font-body-md text-body-md text-on-surface-variant">
          Potrzebujesz pomocy?
          <a
            href="#"
            class="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
            >Skontaktuj się z supportem</a
          >
        </p>
      </div>
    </main>
  </div>
</template>
