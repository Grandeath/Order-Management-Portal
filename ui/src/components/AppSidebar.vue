<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NavItem {
  to: string
  icon: string
  label: string
}

const primary: NavItem[] = [
  { to: '/', icon: 'dashboard', label: 'Dashboard' },
  { to: '/catalog', icon: 'inventory_2', label: 'Katalog Produktów' },
  { to: '/orders', icon: 'shopping_bag', label: 'Moje Zamówienia' },
  { to: '/cart', icon: 'shopping_cart', label: 'Koszyk' },
]

const secondary: NavItem[] = [
  { to: '/help', icon: 'help', label: 'Pomoc' },
  { to: '/logout', icon: 'logout', label: 'Wyloguj' },
]
</script>

<template>
  <nav
    class="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-outline-variant bg-surface-container-low p-4 z-40"
  >
    <div class="mb-8 px-4 pt-4">
      <div class="flex items-center gap-3 mb-1">
        <div
          class="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-on-primary font-bold text-sm"
        >
          OMS
        </div>
        <div>
          <h1 class="font-headline-sm text-headline-sm font-black text-on-surface leading-tight">
            System OMS
          </h1>
          <p class="font-label-md text-label-md text-on-surface-variant">Panel Klienta</p>
        </div>
      </div>
    </div>

    <RouterLink
      to="/cart"
      class="w-full mb-8 bg-primary text-on-primary py-3 px-4 rounded-md font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-[#003380] transition-colors shadow-sm"
    >
      <span class="material-symbols-outlined">add</span>
      Nowe Zamówienie
    </RouterLink>

    <ul class="flex flex-col gap-2 flex-grow">
      <li v-for="item in primary" :key="item.to">
        <RouterLink
          :to="item.to"
          v-slot="{ isActive }"
          custom
        >
          <a
            :href="item.to"
            @click.prevent="$router.push(item.to)"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-md font-label-md text-label-md transition-all duration-200',
              isActive
                ? 'bg-secondary-container text-on-secondary-container font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-high',
            ]"
          >
            <span
              class="material-symbols-outlined"
              :class="{ fill: isActive }"
            >{{ item.icon }}</span>
            {{ item.label }}
          </a>
        </RouterLink>
      </li>
    </ul>

    <ul class="flex flex-col gap-2 mt-auto pt-4 border-t border-outline-variant">
      <li v-for="item in secondary" :key="item.to">
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-md font-label-md text-label-md transition-all duration-200"
        >
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
