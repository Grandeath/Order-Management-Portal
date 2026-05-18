<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppShell from '@/components/AppShell.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <AppShell>
    <main class="p-margin-mobile md:p-margin-desktop max-w-[1440px] mx-auto w-full">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="font-headline-md text-headline-md text-on-surface mb-1">
            Dzień dobry, {{ auth.user?.fullName?.split(' ')[0] ?? 'Jan' }}!
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Oto podsumowanie Twojego konta na dziś.
          </p>
        </div>
        <RouterLink
          to="/cart"
          class="md:hidden bg-primary text-on-primary py-2 px-4 rounded-md font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm"
        >
          <span class="material-symbols-outlined text-sm">add</span> Nowe
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-surface rounded-xl p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between"
        >
          <div class="flex justify-between items-start mb-4">
            <span
              class="material-symbols-outlined text-primary bg-primary-container/20 p-2 rounded-md"
              >local_shipping</span
            >
            <span
              class="bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded font-label-md text-[10px]"
              >AKTUALNE</span
            >
          </div>
          <div>
            <p
              class="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider"
            >
              Aktywne Zamówienia
            </p>
            <p class="font-display-lg text-display-lg text-on-surface">24</p>
          </div>
        </div>

        <div
          class="bg-surface rounded-xl p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between"
        >
          <div class="flex justify-between items-start mb-4">
            <span
              class="material-symbols-outlined text-secondary bg-secondary-container/30 p-2 rounded-md"
              >account_balance_wallet</span
            >
            <span
              class="bg-status-paid-bg text-status-paid-fg px-2 py-1 rounded font-label-md text-[10px]"
              >PAID</span
            >
          </div>
          <div>
            <p
              class="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider"
            >
              Ostatnia Płatność
            </p>
            <p class="font-headline-md text-headline-md text-on-surface">12 450,00 PLN</p>
            <p class="font-body-md text-[12px] text-on-surface-variant mt-1">
              Zaksięgowano: Dzisiaj, 09:15
            </p>
          </div>
        </div>

        <div
          class="bg-primary-container rounded-xl p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-primary/20 flex flex-col justify-center items-center text-center"
        >
          <div
            class="w-12 h-12 bg-surface rounded-full flex items-center justify-center mb-4 text-primary"
          >
            <span class="material-symbols-outlined">add_shopping_cart</span>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-on-primary-container mb-2">
            Potrzebujesz towaru?
          </h3>
          <RouterLink
            to="/catalog"
            class="bg-primary text-on-primary py-2 px-6 rounded-md font-label-md text-label-md shadow-sm hover:bg-[#003380] transition-colors w-full mt-2 text-center"
          >
            Utwórz nowe zamówienie
          </RouterLink>
        </div>
      </div>

      <div
        class="bg-surface rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden"
      >
        <div
          class="px-6 py-4 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-lowest"
        >
          <h3 class="font-headline-sm text-headline-sm text-on-surface">Ostatnie zamówienie</h3>
          <RouterLink
            to="/orders/ORD-2023-8942"
            class="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
          >
            Szczegóły <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </RouterLink>
        </div>
        <div class="p-6">
          <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div>
              <p
                class="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider mb-1"
              >
                Numer zamówienia
              </p>
              <p class="font-headline-md text-[20px] text-on-surface">ORD-2023-8942</p>
            </div>
            <div class="flex gap-3">
              <span
                class="bg-status-pending-bg text-status-pending-fg px-3 py-1 rounded-full font-label-md text-label-md border border-[#fbbc04]/30 flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-[14px]">pending</span> W TRAKCIE
              </span>
            </div>
          </div>
          <div class="bg-surface-container-low rounded-md p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="font-label-md text-[10px] text-on-surface-variant uppercase mb-1">
                Data złożenia
              </p>
              <p class="font-body-md text-sm text-on-surface">24 Paź 2023</p>
            </div>
            <div>
              <p class="font-label-md text-[10px] text-on-surface-variant uppercase mb-1">
                Dostawa
              </p>
              <p class="font-body-md text-sm text-on-surface">Kurier DPD</p>
            </div>
            <div>
              <p class="font-label-md text-[10px] text-on-surface-variant uppercase mb-1">
                Pozycje
              </p>
              <p class="font-body-md text-sm text-on-surface">12 szt.</p>
            </div>
            <div>
              <p class="font-label-md text-[10px] text-on-surface-variant uppercase mb-1">
                Wartość
              </p>
              <p class="font-label-md text-sm text-on-surface font-bold">4 250,00 PLN</p>
            </div>
          </div>
          <div
            class="mt-6 flex justify-end gap-3 border-t border-outline-variant/30 pt-4 flex-wrap"
          >
            <button
              type="button"
              class="bg-transparent border border-outline-variant text-on-surface py-2 px-4 rounded-md font-label-md text-label-md hover:bg-surface-container-low transition-colors"
            >
              Faktura Proforma
            </button>
            <button
              type="button"
              class="bg-surface-container-high text-on-surface py-2 px-4 rounded-md font-label-md text-label-md hover:bg-surface-dim transition-colors flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-[16px]">content_copy</span> Powtórz
            </button>
          </div>
        </div>
      </div>
    </main>
  </AppShell>
</template>
