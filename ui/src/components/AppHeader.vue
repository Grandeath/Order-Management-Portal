<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const auth = useAuthStore()
const initials = computed(() => auth.user?.initials ?? 'JK')

withDefaults(
  defineProps<{
    searchPlaceholder?: string
    mobileTitle?: string
  }>(),
  {
    searchPlaceholder: 'Szukaj zamówień...',
    mobileTitle: 'OMS Professional',
  },
)
</script>

<template>
  <header
    class="bg-surface flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 sticky top-0 z-30 shadow-sm font-body-lg text-body-lg"
  >
    <div class="flex items-center md:hidden">
      <span class="font-headline-md-mobile text-headline-md-mobile font-bold text-primary">
        {{ mobileTitle }}
      </span>
    </div>

    <div
      class="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant w-96 focus-within:border-primary focus-within:shadow-[0_0_0_2px_rgba(0,61,155,0.2)] transition-all"
    >
      <span class="material-symbols-outlined text-on-surface-variant mr-2">search</span>
      <input
        :placeholder="searchPlaceholder"
        type="text"
        class="bg-transparent border-none outline-none text-body-md font-body-md w-full placeholder:text-on-surface-variant focus:ring-0"
      />
    </div>

    <div class="flex items-center gap-4">
      <button
        type="button"
        class="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full"
      >
        <span class="material-symbols-outlined">notifications</span>
      </button>
      <button
        type="button"
        class="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full hidden sm:block"
      >
        <span class="material-symbols-outlined">settings</span>
      </button>
      <div class="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
      <button
        type="button"
        class="text-primary font-label-md text-label-md font-bold hidden sm:block"
      >
        Admin Mode
      </button>
      <div
        class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs border border-outline-variant"
      >
        {{ initials }}
      </div>
    </div>
  </header>
</template>
