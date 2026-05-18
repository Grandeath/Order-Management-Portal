<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import AppShell from '@/components/AppShell.vue'
import { formatPln } from '@/utils/format'

const route = useRoute()
const router = useRouter()

const orderId = (route.params.id as string) || 'ORD-2023-10-15-001'

interface LineItem {
  name: string
  sku: string
  qty: number
  unitPrice: number
}

const items: LineItem[] = [
  { name: 'Moduł Sterujący X-200', sku: 'MD-X200-11', qty: 5, unitPrice: 1200 },
  { name: 'Zasilacz Przemysłowy 24V', sku: 'ZS-24V-IND', qty: 10, unitPrice: 350 },
  {
    name: 'Kabel Sygnałowy Ekranowany (Rolka 50m)',
    sku: 'CB-SIG-50M',
    qty: 2,
    unitPrice: 800,
  },
]

const productsNet = items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0)
const shippingNet = 150
const totalNet = productsNet + shippingNet
const vat = totalNet * 0.23
const totalGross = totalNet + vat

const steps = [
  { key: 'NEW', icon: 'check', state: 'done' },
  { key: 'VALIDATED', icon: 'check', state: 'done' },
  { key: 'PAYMENT_PENDING', icon: 'schedule', state: 'active' },
  { key: 'PAID', icon: 'payments', state: 'pending' },
  { key: 'PROCESSING', icon: 'inventory_2', state: 'pending' },
  { key: 'SHIPPED', icon: 'local_shipping', state: 'pending' },
] as const
</script>

<template>
  <AppShell mobile-title="Moje Zamówienia">
    <main class="flex-1 overflow-y-auto">
      <div class="p-margin-mobile md:p-margin-desktop max-w-[1440px] mx-auto space-y-8">
        <RouterLink
          to="/orders"
          class="inline-flex items-center gap-1 text-primary font-label-md text-label-md hover:underline"
        >
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          Wróć do listy
        </RouterLink>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="font-headline-md text-headline-md text-on-surface">
              Zamówienie #{{ orderId }}
            </h1>
            <p class="text-on-surface-variant font-body-md text-body-md mt-1">
              Data złożenia: 15 Października 2023, 14:30
            </p>
          </div>
          <button
            type="button"
            @click="router.push('/payment')"
            class="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-md font-label-md text-label-md shadow-sm transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <span class="material-symbols-outlined text-[16px]">payment</span> Opłać zamówienie
          </button>
        </div>

        <div
          class="bg-surface-container-lowest rounded-md shadow-sm p-6 overflow-x-auto"
        >
          <h2 class="font-headline-sm text-headline-sm text-on-surface mb-6">Status Zamówienia</h2>
          <div class="flex items-center justify-between min-w-[600px] relative">
            <div
              class="absolute top-4 left-0 right-0 h-1 bg-surface-variant -z-10"
            ></div>
            <div class="absolute top-4 left-0 w-2/5 h-1 bg-primary -z-10"></div>
            <div
              v-for="step in steps"
              :key="step.key"
              class="flex flex-col items-center gap-2"
            >
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center border-4 border-surface-container-lowest',
                  step.state === 'done' || step.state === 'active'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-variant text-on-surface-variant',
                  step.state === 'active' &&
                    'ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest',
                ]"
              >
                <span class="material-symbols-outlined text-[16px]">{{ step.icon }}</span>
              </div>
              <span
                class="font-label-md text-label-md"
                :class="
                  step.state === 'active'
                    ? 'text-primary font-bold'
                    : step.state === 'done'
                      ? 'text-on-surface'
                      : 'text-on-surface-variant'
                "
                >{{ step.key }}</span
              >
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            class="lg:col-span-2 bg-surface-container-lowest rounded-md shadow-sm p-6 overflow-hidden"
          >
            <h2 class="font-headline-sm text-headline-sm text-on-surface mb-6">
              Zamówione Produkty
            </h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr
                    class="border-b border-surface-variant text-on-surface-variant font-label-md text-label-md"
                  >
                    <th class="py-3 px-4 w-16">Lp.</th>
                    <th class="py-3 px-4">Produkt</th>
                    <th class="py-3 px-4 text-right">Ilość</th>
                    <th class="py-3 px-4 text-right">Cena Netto</th>
                    <th class="py-3 px-4 text-right">Wartość Netto</th>
                  </tr>
                </thead>
                <tbody class="font-body-md text-body-md text-on-surface">
                  <tr
                    v-for="(item, idx) in items"
                    :key="item.sku"
                    class="border-b border-surface-variant last:border-b-0 hover:bg-surface-container-low transition-colors"
                  >
                    <td class="py-4 px-4 text-on-surface-variant">{{ idx + 1 }}</td>
                    <td class="py-4 px-4">
                      <div class="font-bold">{{ item.name }}</div>
                      <div class="text-label-md text-on-surface-variant">SKU: {{ item.sku }}</div>
                    </td>
                    <td class="py-4 px-4 text-right">{{ item.qty }} szt.</td>
                    <td class="py-4 px-4 text-right">{{ formatPln(item.unitPrice) }}</td>
                    <td class="py-4 px-4 text-right font-bold">
                      {{ formatPln(item.qty * item.unitPrice) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-8">
            <div class="bg-surface-container-lowest rounded-md shadow-sm p-6">
              <h2 class="font-headline-sm text-headline-sm text-on-surface mb-6">Podsumowanie</h2>
              <div class="space-y-3 font-body-md text-body-md text-on-surface">
                <div class="flex justify-between">
                  <span class="text-on-surface-variant">Wartość produktów netto:</span>
                  <span>{{ formatPln(productsNet) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-on-surface-variant">Koszty dostawy netto:</span>
                  <span>{{ formatPln(shippingNet) }}</span>
                </div>
                <div class="w-full h-px bg-surface-variant my-2"></div>
                <div class="flex justify-between font-bold">
                  <span>Razem netto:</span>
                  <span>{{ formatPln(totalNet) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-on-surface-variant">VAT (23%):</span>
                  <span>{{ formatPln(vat) }}</span>
                </div>
                <div class="w-full h-px bg-surface-variant my-2"></div>
                <div class="flex justify-between font-headline-sm text-headline-sm text-primary">
                  <span>Do zapłaty:</span>
                  <span>{{ formatPln(totalGross) }}</span>
                </div>
              </div>
            </div>

            <div class="bg-surface-container-lowest rounded-md shadow-sm p-6">
              <h2 class="font-headline-sm text-headline-sm text-on-surface mb-6">Dane Dostawy</h2>
              <div class="space-y-4 font-body-md text-body-md text-on-surface">
                <div>
                  <div
                    class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1"
                  >
                    Adres Dostawy
                  </div>
                  <div class="font-bold">Magazyn Główny - TechCorp Sp. z o.o.</div>
                  <div>ul. Przemysłowa 15, Hala B</div>
                  <div>02-234 Warszawa, Polska</div>
                </div>
                <div>
                  <div
                    class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1"
                  >
                    Metoda Wysyłki
                  </div>
                  <div>Kurier DPD - Przesyłka Paletowa</div>
                </div>
                <div>
                  <div
                    class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1"
                  >
                    Osoba Kontaktowa
                  </div>
                  <div>Jan Kowalski</div>
                  <div class="text-primary">+48 500 600 700</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </AppShell>
</template>
