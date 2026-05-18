<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppShell from '@/components/AppShell.vue'
import { formatPln } from '@/utils/format'

type OrderStatus = 'paid' | 'pending' | 'cancelled'

interface Order {
  id: string
  date: string
  amount: number
  status: OrderStatus
}

const orders: Order[] = [
  { id: 'ZAM-2023-10-045', date: '24 Paź 2023, 14:30', amount: 1245, status: 'paid' },
  { id: 'ZAM-2023-10-044', date: '22 Paź 2023, 09:15', amount: 850.5, status: 'pending' },
  { id: 'ZAM-2023-10-042', date: '20 Paź 2023, 16:45', amount: 3400, status: 'paid' },
  { id: 'ZAM-2023-10-039', date: '15 Paź 2023, 11:20', amount: 150, status: 'cancelled' },
]

const search = ref('')
const statusFilter = ref('')
const dateRange = ref('Ostatnie 30 dni')

const statusBadge: Record<OrderStatus, { label: string; classes: string }> = {
  paid: { label: 'OPŁACONE', classes: 'bg-green-100 text-green-800' },
  pending: { label: 'OCZEKUJĄCE', classes: 'bg-yellow-100 text-yellow-800' },
  cancelled: { label: 'ANULOWANE', classes: 'bg-gray-100 text-gray-800' },
}
</script>

<template>
  <AppShell mobile-title="Moje Zamówienia">
    <main
      class="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop pb-24 md:pb-margin-desktop"
    >
      <div class="max-w-[1440px] mx-auto space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 class="font-display-lg text-display-lg text-on-surface mb-1">Historia Zamówień</h2>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Przeglądaj i zarządzaj swoimi dotychczasowymi zamówieniami.
            </p>
          </div>
          <button
            type="button"
            class="bg-primary text-on-primary font-label-md text-label-md py-2 px-4 rounded-md hover:bg-primary-container transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <span class="material-symbols-outlined">download</span>
            Eksportuj Listę
          </button>
        </div>

        <div
          class="bg-surface-container-lowest rounded-md p-4 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-4 items-end"
        >
          <div class="w-full md:w-1/3 flex flex-col gap-1">
            <label class="font-label-md text-label-md text-on-surface-variant"
              >Szukaj po numerze</label
            >
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm"
                >search</span
              >
              <input
                v-model="search"
                placeholder="Np. ZAM-2023-10-001"
                type="text"
                class="w-full pl-9 pr-3 py-2 border border-outline-variant rounded focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body-md text-body-md bg-surface transition-all"
              />
            </div>
          </div>

          <div class="w-full md:w-1/4 flex flex-col gap-1">
            <label class="font-label-md text-label-md text-on-surface-variant">Status</label>
            <div class="relative">
              <select
                v-model="statusFilter"
                class="w-full pl-3 pr-8 py-2 border border-outline-variant rounded focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body-md text-body-md bg-surface appearance-none transition-all"
              >
                <option value="">Wszystkie statusy</option>
                <option value="paid">Opłacone</option>
                <option value="pending">Oczekujące</option>
                <option value="cancelled">Anulowane</option>
              </select>
              <span
                class="material-symbols-outlined absolute right-2 top-2.5 text-outline pointer-events-none"
                >expand_more</span
              >
            </div>
          </div>

          <div class="w-full md:w-1/4 flex flex-col gap-1">
            <label class="font-label-md text-label-md text-on-surface-variant">Zakres dat</label>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm"
                >calendar_today</span
              >
              <input
                v-model="dateRange"
                readonly
                type="text"
                class="w-full pl-9 pr-3 py-2 border border-outline-variant rounded focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body-md text-body-md bg-surface transition-all cursor-pointer"
              />
            </div>
          </div>

          <button
            type="button"
            class="w-full md:w-auto px-4 py-2 border border-outline-variant rounded text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined">filter_list_off</span>
            Wyczyść
          </button>
        </div>

        <div
          class="bg-surface-container-lowest rounded-md shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <div class="hidden md:block w-full overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface-container-low border-b border-outline-variant">
                  <th
                    class="py-3 px-4 font-label-md text-label-md text-on-surface-variant w-1/4"
                  >
                    Numer Zamówienia
                  </th>
                  <th
                    class="py-3 px-4 font-label-md text-label-md text-on-surface-variant w-1/4"
                  >
                    Data
                  </th>
                  <th
                    class="py-3 px-4 font-label-md text-label-md text-on-surface-variant w-1/5 text-right"
                  >
                    Kwota
                  </th>
                  <th
                    class="py-3 px-4 font-label-md text-label-md text-on-surface-variant w-1/6"
                  >
                    Status
                  </th>
                  <th
                    class="py-3 px-4 font-label-md text-label-md text-on-surface-variant w-1/12 text-right"
                  >
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in orders"
                  :key="order.id"
                  class="border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low/50 transition-colors h-12"
                >
                  <td class="py-3 px-4 font-body-md text-body-md text-on-surface font-semibold">
                    {{ order.id }}
                  </td>
                  <td class="py-3 px-4 font-body-md text-body-md text-on-surface-variant">
                    {{ order.date }}
                  </td>
                  <td class="py-3 px-4 font-body-md text-body-md text-on-surface text-right">
                    {{ formatPln(order.amount) }}
                  </td>
                  <td class="py-3 px-4">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-[11px] font-bold',
                        statusBadge[order.status].classes,
                      ]"
                    >
                      {{ statusBadge[order.status].label }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <RouterLink
                      :to="`/orders/${order.id}`"
                      class="text-primary hover:text-primary-container font-label-md text-label-md px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors"
                    >
                      Szczegóły
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="md:hidden flex flex-col divide-y divide-outline-variant">
            <div
              v-for="order in orders"
              :key="order.id"
              class="p-4 flex flex-col gap-3"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div class="font-body-md text-body-md text-on-surface font-semibold">
                    {{ order.id }}
                  </div>
                  <div class="font-label-md text-label-md text-on-surface-variant">
                    {{ order.date }}
                  </div>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-[11px] font-bold',
                    statusBadge[order.status].classes,
                  ]"
                  >{{ statusBadge[order.status].label }}</span
                >
              </div>
              <div class="flex justify-between items-end mt-2">
                <div class="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {{ formatPln(order.amount) }}
                </div>
                <RouterLink
                  :to="`/orders/${order.id}`"
                  class="text-primary font-label-md text-label-md border border-outline-variant rounded px-3 py-1 hover:bg-surface-container-low"
                  >Szczegóły</RouterLink
                >
              </div>
            </div>
          </div>

          <div
            class="bg-surface-container-low px-4 py-3 border-t border-outline-variant flex items-center justify-between"
          >
            <div class="font-body-md text-body-md text-on-surface-variant hidden sm:block">
              Pokazano 1 do {{ orders.length }} z 42 zamówień
            </div>
            <div class="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                type="button"
                disabled
                class="px-3 py-1 border border-outline-variant rounded text-on-surface-variant disabled:opacity-50 font-label-md text-label-md bg-surface"
              >
                Poprzednia
              </button>
              <button
                type="button"
                class="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md bg-surface"
              >
                Następna
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </AppShell>
</template>
