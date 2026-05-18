<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import AppShell from '@/components/AppShell.vue'
import { useCartStore } from '@/stores/cart'
import { formatPln } from '@/utils/format'

const cart = useCartStore()
const router = useRouter()

function checkout() {
  router.push('/payment')
}
</script>

<template>
  <AppShell mobile-title="Koszyk">
    <main class="flex-1 overflow-y-auto">
      <div class="p-margin-mobile md:p-margin-desktop max-w-[1440px] mx-auto w-full flex-1">
        <div
          class="flex justify-between items-end mb-8 border-b border-outline-variant pb-4"
        >
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Koszyk</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">
              Przejrzyj swoje zamówienie przed finalizacją.
            </p>
          </div>
          <button
            type="button"
            @click="cart.clear"
            :disabled="cart.items.length === 0"
            class="text-error hover:bg-error-container/50 px-3 py-1.5 rounded flex items-center gap-1 transition-colors font-label-md text-label-md disabled:opacity-50"
          >
            <span class="material-symbols-outlined text-[18px]">delete_sweep</span>
            Wyczyść
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 flex flex-col gap-4">
            <div
              v-if="cart.items.length === 0"
              class="bg-surface rounded-md shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-12 text-center"
            >
              <span class="material-symbols-outlined text-5xl text-on-surface-variant mb-3">
                shopping_cart
              </span>
              <p class="font-headline-sm text-headline-sm text-on-surface mb-2">Koszyk jest pusty</p>
              <p class="font-body-md text-body-md text-on-surface-variant mb-6">
                Dodaj produkty z katalogu, aby kontynuować.
              </p>
              <RouterLink
                to="/catalog"
                class="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md py-2 px-4 rounded-md hover:bg-primary-container transition-colors"
              >
                Przejdź do katalogu
              </RouterLink>
            </div>

            <div
              v-else
              class="bg-surface rounded-md shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[600px]">
                  <thead class="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th
                        class="p-4 font-label-md text-label-md text-on-surface-variant font-bold w-16"
                      ></th>
                      <th class="p-4 font-label-md text-label-md text-on-surface-variant font-bold">
                        Produkt
                      </th>
                      <th
                        class="p-4 font-label-md text-label-md text-on-surface-variant font-bold text-center w-32"
                      >
                        Ilość
                      </th>
                      <th
                        class="p-4 font-label-md text-label-md text-on-surface-variant font-bold text-right w-28"
                      >
                        Cena jedn.
                      </th>
                      <th
                        class="p-4 font-label-md text-label-md text-on-surface-variant font-bold text-right w-32"
                      >
                        Suma
                      </th>
                      <th class="p-4 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in cart.items"
                      :key="item.id"
                      class="border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low/50 transition-colors group"
                    >
                      <td class="p-4">
                        <div
                          class="w-12 h-12 bg-surface-container rounded border border-outline-variant flex items-center justify-center overflow-hidden"
                        >
                          <img
                            :src="item.image"
                            :alt="item.name"
                            class="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td class="p-4">
                        <div class="font-label-md text-label-md text-on-surface font-bold">
                          {{ item.name }}
                        </div>
                        <div
                          class="font-body-md text-body-md text-on-surface-variant text-[12px] mt-0.5"
                        >
                          SKU: {{ item.sku }}
                        </div>
                      </td>
                      <td class="p-4">
                        <div
                          class="flex items-center justify-center border border-outline-variant rounded bg-surface"
                        >
                          <button
                            type="button"
                            @click="cart.decrement(item.id)"
                            class="px-2 py-1 text-on-surface-variant hover:bg-surface-container transition-colors"
                          >
                            <span class="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <input
                            type="number"
                            :value="item.quantity"
                            @input="
                              cart.setQuantity(
                                item.id,
                                Number(($event.target as HTMLInputElement).value),
                              )
                            "
                            class="w-10 text-center border-none p-1 font-body-md text-body-md text-on-surface focus:ring-0 appearance-none bg-transparent"
                          />
                          <button
                            type="button"
                            @click="cart.increment(item.id)"
                            class="px-2 py-1 text-on-surface-variant hover:bg-surface-container transition-colors"
                          >
                            <span class="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                      </td>
                      <td class="p-4 text-right font-body-md text-body-md text-on-surface">
                        {{ formatPln(item.unitPrice) }}
                      </td>
                      <td
                        class="p-4 text-right font-label-md text-label-md text-on-surface font-bold"
                      >
                        {{ formatPln(item.unitPrice * item.quantity) }}
                      </td>
                      <td class="p-4 text-center">
                        <button
                          type="button"
                          @click="cart.remove(item.id)"
                          class="text-on-surface-variant hover:text-error transition-colors p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <span class="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div
              class="bg-surface rounded-md shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-6 sticky top-24 border border-outline-variant/30"
            >
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold mb-6">
                Podsumowanie
              </h3>
              <div
                class="flex flex-col gap-3 font-body-md text-body-md border-b border-outline-variant pb-4 mb-4"
              >
                <div class="flex justify-between items-center text-on-surface-variant">
                  <span>Wartość netto</span>
                  <span class="text-on-surface">{{ formatPln(cart.subtotal) }}</span>
                </div>
                <div class="flex justify-between items-center text-on-surface-variant">
                  <span>Kwota VAT (23%)</span>
                  <span class="text-on-surface">{{ formatPln(cart.vat) }}</span>
                </div>
                <div
                  class="flex justify-between items-center text-on-surface-variant text-[12px]"
                >
                  <span>Koszty dostawy</span>
                  <span>Obliczane w następnym kroku</span>
                </div>
              </div>
              <div
                class="flex justify-between items-center font-headline-sm text-headline-sm font-bold text-primary mb-8"
              >
                <span>Suma brutto</span>
                <span>{{ formatPln(cart.total) }}</span>
              </div>
              <div class="flex flex-col gap-3">
                <button
                  type="button"
                  @click="checkout"
                  :disabled="cart.items.length === 0"
                  class="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                  Złóż zamówienie
                </button>
                <RouterLink
                  to="/catalog"
                  class="w-full bg-surface hover:bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md py-2.5 rounded-md transition-colors text-center"
                >
                  Kontynuuj zakupy
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </AppShell>
</template>
