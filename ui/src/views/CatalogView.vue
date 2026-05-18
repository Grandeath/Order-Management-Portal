<script setup lang="ts">
import { ref } from 'vue'
import AppShell from '@/components/AppShell.vue'
import { formatPln } from '@/utils/format'

interface Product {
  sku: string
  name: string
  price: number
  stock: number
  badge?: { label: string; tone: 'warning' | 'error' }
  image: string
}

const categories = [
  { label: 'Elektronika Przemysłowa', count: 142, checked: true },
  { label: 'Materiały Eksploatacyjne', count: 89, checked: false },
  { label: 'Narzędzia Precyzyjne', count: 56, checked: false },
  { label: 'Oprogramowanie OEM', count: 24, checked: false },
]

const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
const onlyAvailable = ref(true)
const sort = ref('Domyślnie')

const products: Product[] = [
  {
    sku: 'IND-PLC-8092',
    name: 'Zaawansowany Sterownik Przemysłowy PLC Moduł Główny',
    price: 3450,
    stock: 3,
    badge: { label: 'Ostatnie 3 szt.', tone: 'error' },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_yYtFFT7e6qyDC_2h9OMHMpH9I_9UCDLvsmmEcW1U86zGHTA8bxLCJOqGr4XYWccxcxU58PMkeS7x-ET-RtSoiW5EvP1NBGU3r2JOxgNkopSzZsTlm8GIg1nvkv6DZH135Qa9QuGm1KRxVwtnzOKEdE8NCyOvJXglqGyiO6p9I9CMLUE1QdEN5lWdl-85sCMu6gemx4cpHM5O9YwmlrVUYhXcuUxfOyMwM81Jj3R25QCSusJI5_A84I-QCo9hj021s5LyTf97x3lv',
  },
  {
    sku: 'PWR-UPS-2000',
    name: 'Zasilacz Awaryjny UPS Rackmount 2000VA / 1800W',
    price: 1890.5,
    stock: 50,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxjPjmVmJb7a3z_uve0NvtbYXbSy0z0I-_UMwUG9ZmkIMZtjH4agROYN0hS0ScmwhZFjtgcHHC-GDbccwKhTGUIfWBtoA1I_dO6QA-6PB16uQRWIyNDOnC4v22asEEWWLKejf3VO00DcgiBe4yLihnwPp4UIogcC7dgWQiC1aDsVArd8AQk7CxDcYpKgHkIM7KIg8gEdfeSknGSNXSoTAY2PPdtWnq4jx5wV_jbqsU0IDcglQlKVrVKWGgIYeukExCIEqQMaOkQ8zF',
  },
  {
    sku: 'CPU-IND-X99',
    name: 'Moduł Obliczeniowy ARM v8 Cortex do zastosowań IoT',
    price: 850,
    stock: 0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdhj7wr83yeFCpDb9e5ka88_a_HCxX3ZqPDbrY_IVzSHpDMv8bjjIUqRKVkKQfK_dyvUu3eu3kk9pEY19OmzZH6s2dkf_7YRIDkN2pXUh1aJCOwhEDzx8i9vPHUBX7CZ5a90emxNC99DSiDt5HA06OdbglpctuwoUKBR_EzEEGaLqXoXn4ktYb4zdU8b_U35j4dQ6fU49qVnN5Q211_gOnkEshY-3b0hBrr0Jb6TQaYVwgSKvj_Z44qaoqj1f7klZVJMYOHw29ARiC',
  },
  {
    sku: 'CBL-CAT8-50M',
    name: 'Kabel Sieciowy CAT8 Ekranowany S/FTP 50m Czarny Zbrojony',
    price: 420,
    stock: 12,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8Dc_Xni9U2_T1mR5w8mM8OX4KVlXXmCbDkqeSrrSTmrJGnvWoIhUGRgNH9R1kpFu5ENMiZGw3f2aNYL-GZO6RAu76KCm0fpJ6lVQDOezYPVlVF_KUqxAfvCVdWzw86KwG_5VZ-wli6qlC_13Mf5sOdE4i9sWMA3ASzI5I7lJ1WZy9tURBXqtw5uZfI4OcVfMuJlpE2JV4cIjyZGvPXOIMJcG_giPsAOFfIpQckPQexRIw9UydsBZXjNO9nmWEY2tsexeRlaiQIc5v',
  },
]

function stockLabel(p: Product) {
  if (p.stock === 0) return 'Brak w magazynie'
  if (p.stock <= 3) return `W magazynie (${p.stock} szt.)`
  if (p.stock > 50) return 'W magazynie (>50 szt.)'
  return `W magazynie (${p.stock} szt.)`
}
</script>

<template>
  <AppShell search-placeholder="Szukaj produktów po nazwie, SKU..." mobile-title="Katalog">
    <div
      class="p-margin-mobile md:p-margin-desktop flex-1 flex flex-col xl:flex-row gap-6 max-w-[1440px] mx-auto w-full"
    >
      <aside
        class="w-full xl:w-64 flex-shrink-0 bg-surface-container-lowest rounded-md shadow-sm border border-outline-variant p-5 h-fit"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-headline-sm text-headline-sm text-on-surface">Filtry</h2>
          <button type="button" class="text-primary font-label-md text-label-md hover:underline">
            Wyczyść
          </button>
        </div>

        <div class="mb-6">
          <h3 class="font-label-md text-label-md text-on-surface mb-3 uppercase tracking-wider">
            Kategorie
          </h3>
          <div class="space-y-2 font-body-md text-body-md text-on-surface-variant">
            <label
              v-for="cat in categories"
              :key="cat.label"
              class="flex items-center gap-2 cursor-pointer hover:bg-surface-container-low p-1 -ml-1 rounded transition-colors"
            >
              <input
                type="checkbox"
                :checked="cat.checked"
                class="rounded border-outline text-primary focus:ring-primary h-4 w-4"
              />
              <span>{{ cat.label }}</span>
              <span class="ml-auto text-outline-variant text-xs">{{ cat.count }}</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="font-label-md text-label-md text-on-surface mb-3 uppercase tracking-wider">
            Zakres Ceny (PLN)
          </h3>
          <div class="flex items-center gap-2">
            <input
              v-model.number="priceMin"
              placeholder="Min"
              type="number"
              class="w-full px-2 py-1 border border-[#DFE1E6] rounded bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none font-body-md text-body-md"
            />
            <span class="text-outline-variant">-</span>
            <input
              v-model.number="priceMax"
              placeholder="Max"
              type="number"
              class="w-full px-2 py-1 border border-[#DFE1E6] rounded bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none font-body-md text-body-md"
            />
          </div>
        </div>

        <div>
          <h3 class="font-label-md text-label-md text-on-surface mb-3 uppercase tracking-wider">
            Dostępność
          </h3>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="onlyAvailable"
              type="checkbox"
              class="rounded border-outline text-primary focus:ring-primary h-4 w-4"
            />
            <span class="font-body-md text-body-md text-on-surface-variant"
              >Tylko dostępne w magazynie</span
            >
          </label>
        </div>
      </aside>

      <section class="flex-1 flex flex-col">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 class="font-headline-md text-headline-md text-on-surface">
            Elektronika Przemysłowa
            <span class="text-outline-variant font-body-md text-body-md font-normal ml-2"
              >142 produkty</span
            >
          </h2>
          <div class="flex items-center gap-3">
            <label class="font-label-md text-label-md text-on-surface-variant whitespace-nowrap"
              >Sortuj według:</label
            >
            <select
              v-model="sort"
              class="border border-[#DFE1E6] rounded bg-surface-container-lowest text-on-surface px-3 py-1.5 focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none font-body-md text-body-md"
            >
              <option>Domyślnie</option>
              <option>Cena: Od najniższej</option>
              <option>Cena: Od najwyższej</option>
              <option>Nazwa: A-Z</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="p in products"
            :key="p.sku"
            class="bg-surface-container-lowest rounded-md border border-[#DFE1E6] shadow-sm flex flex-col overflow-hidden transition-colors duration-200"
            :class="
              p.stock === 0 ? 'opacity-75' : 'hover:bg-surface-container-low'
            "
          >
            <div
              class="h-48 w-full bg-surface-container flex items-center justify-center border-b border-[#DFE1E6] relative p-4"
              :class="{ grayscale: p.stock === 0 }"
            >
              <span
                v-if="p.badge"
                class="absolute top-2 left-2 font-label-md text-label-md px-2 py-0.5 rounded-full border"
                :class="
                  p.badge.tone === 'error'
                    ? 'bg-[rgba(255,218,214,0.15)] text-error border-error-container'
                    : 'bg-status-pending-bg text-status-pending-fg border-amber-200'
                "
                >{{ p.badge.label }}</span
              >
              <img
                :alt="p.name"
                :src="p.image"
                class="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
            <div class="p-4 flex-1 flex flex-col">
              <p class="font-label-md text-label-md text-outline-variant mb-1 uppercase">
                SKU: {{ p.sku }}
              </p>
              <h3
                class="font-body-lg text-body-lg font-bold text-on-surface leading-tight mb-2 line-clamp-2"
              >
                {{ p.name }}
              </h3>
              <div class="mt-auto pt-4 flex items-end justify-between">
                <div>
                  <p
                    class="font-label-md text-label-md px-2 py-0.5 rounded-full inline-block mb-1 border"
                    :class="
                      p.stock === 0
                        ? 'text-amber-700 bg-[rgba(255,218,214,0.15)] border-amber-200'
                        : 'text-green-700 bg-green-50 border-green-200'
                    "
                  >
                    {{ stockLabel(p) }}
                  </p>
                  <p class="font-headline-sm text-headline-sm text-on-surface">
                    {{ formatPln(p.price) }}
                    <span class="text-xs font-normal text-outline-variant">netto</span>
                  </p>
                </div>
              </div>
              <button
                v-if="p.stock > 0"
                type="button"
                class="mt-4 w-full bg-primary text-on-primary py-2 px-4 rounded-md font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-sm">add_shopping_cart</span> Dodaj do
                koszyka
              </button>
              <button
                v-else
                type="button"
                disabled
                class="mt-4 w-full bg-surface-dim text-outline py-2 px-4 rounded-md font-label-md text-label-md cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-sm">event_busy</span> Sprawdź
                dostępność
              </button>
            </div>
          </article>
        </div>

        <div class="mt-8 flex justify-center items-center gap-2">
          <button
            type="button"
            disabled
            class="p-2 border border-[#DFE1E6] rounded bg-surface-container-lowest text-outline-variant hover:bg-surface-container-low disabled:opacity-50 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            class="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-md text-label-md"
          >
            1
          </button>
          <button
            class="w-8 h-8 flex items-center justify-center rounded border border-[#DFE1E6] bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-label-md text-label-md"
          >
            2
          </button>
          <button
            class="w-8 h-8 flex items-center justify-center rounded border border-[#DFE1E6] bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-label-md text-label-md"
          >
            3
          </button>
          <span class="text-outline-variant">...</span>
          <button
            class="w-8 h-8 flex items-center justify-center rounded border border-[#DFE1E6] bg-surface-container-lowest text-on-surface hover:bg-surface-container-low font-label-md text-label-md"
          >
            12
          </button>
          <button
            type="button"
            class="p-2 border border-[#DFE1E6] rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-low flex items-center justify-center"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  </AppShell>
</template>
