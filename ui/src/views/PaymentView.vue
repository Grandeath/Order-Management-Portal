<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { formatPln } from '@/utils/format'

const router = useRouter()
const cart = useCartStore()

type Method = 'card' | 'blik' | 'transfer'
const method = ref<Method>('card')

const cardNumber = ref('**** **** **** 4242')
const expiry = ref('12/25')
const cvc = ref('***')
const holder = ref('Jan Kowalski')

const shipping = 15
const subtotal = computed(() => cart.subtotal || 1245)
const vat = computed(() => (subtotal.value + shipping) * 0.23)
const total = computed(() => subtotal.value + shipping + vat.value)

type OverlayState = 'idle' | 'processing' | 'success' | 'error'
const overlay = ref<OverlayState>('idle')

function pay() {
  overlay.value = 'processing'
  setTimeout(() => {
    overlay.value = 'success'
  }, 1500)
}

function dismissSuccess() {
  overlay.value = 'idle'
  cart.clear()
  router.push('/')
}
</script>

<template>
  <div class="bg-background text-on-surface font-body-md min-h-screen flex flex-col relative">
    <header
      class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 sticky top-0 z-30 bg-surface shadow-sm"
    >
      <div class="flex items-center gap-4">
        <button
          type="button"
          @click="router.back()"
          class="text-on-surface hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div class="font-headline-md text-headline-md font-bold text-primary">System OMS</div>
      </div>
      <div class="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
        <span class="material-symbols-outlined">lock</span>
        Bezpieczna płatność
      </div>
    </header>

    <div
      class="flex-1 flex flex-col md:flex-row items-start justify-center gap-8 p-margin-mobile md:p-margin-desktop max-w-[1440px] mx-auto w-full mt-8"
    >
      <section
        class="w-full md:w-2/3 bg-surface-container-lowest rounded-md shadow-sm flex flex-col border border-outline-variant/30"
      >
        <div class="p-6 md:p-8 border-b border-outline-variant/30">
          <h1 class="font-headline-md text-headline-md text-on-surface mb-2">
            Wybierz metodę płatności
          </h1>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Zamówienie nr: <span class="font-bold text-on-surface">ORD-2023-8472</span>
          </p>
        </div>

        <div class="p-6 md:p-8 flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              @click="method = 'card'"
              :class="[
                'relative rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all border-2',
                method === 'card'
                  ? 'bg-secondary-container/30 border-primary'
                  : 'bg-surface border-outline-variant hover:border-primary hover:bg-surface-container-low',
              ]"
            >
              <div v-if="method === 'card'" class="absolute top-3 right-3 text-primary">
                <span class="material-symbols-outlined fill">check_circle</span>
              </div>
              <span
                class="material-symbols-outlined text-[48px] mb-3"
                :class="method === 'card' ? 'text-primary' : 'text-on-surface-variant'"
                >credit_card</span
              >
              <span class="font-label-md text-label-md text-on-surface text-center"
                >Karta płatnicza</span
              >
            </button>

            <button
              type="button"
              @click="method = 'blik'"
              :class="[
                'relative rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all border-2',
                method === 'blik'
                  ? 'bg-secondary-container/30 border-primary'
                  : 'bg-surface border-outline-variant hover:border-primary hover:bg-surface-container-low',
              ]"
            >
              <div v-if="method === 'blik'" class="absolute top-3 right-3 text-primary">
                <span class="material-symbols-outlined fill">check_circle</span>
              </div>
              <div class="flex gap-1 mb-3">
                <div class="w-6 h-6 bg-on-surface rounded-sm"></div>
                <div class="w-6 h-6 bg-error rounded-sm"></div>
                <div class="w-6 h-6 bg-on-surface rounded-sm"></div>
              </div>
              <span class="font-label-md text-label-md text-on-surface text-center">BLIK</span>
            </button>

            <button
              type="button"
              @click="method = 'transfer'"
              :class="[
                'relative rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all border-2',
                method === 'transfer'
                  ? 'bg-secondary-container/30 border-primary'
                  : 'bg-surface border-outline-variant hover:border-primary hover:bg-surface-container-low',
              ]"
            >
              <div v-if="method === 'transfer'" class="absolute top-3 right-3 text-primary">
                <span class="material-symbols-outlined fill">check_circle</span>
              </div>
              <span
                class="material-symbols-outlined text-[48px] mb-3"
                :class="method === 'transfer' ? 'text-primary' : 'text-on-surface-variant'"
                >account_balance</span
              >
              <span class="font-label-md text-label-md text-on-surface text-center"
                >Przelew bankowy</span
              >
            </button>
          </div>

          <div v-if="method === 'card'" class="mt-4 flex flex-col gap-4">
            <h2 class="font-label-md text-label-md text-on-surface mb-2">Dane karty</h2>
            <div class="flex flex-col gap-1">
              <label class="font-label-md text-label-md text-on-surface-variant"
                >Numer karty</label
              >
              <div class="relative">
                <input
                  v-model="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  class="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all font-body-lg text-body-lg text-on-surface"
                />
                <span
                  class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  >credit_score</span
                >
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="font-label-md text-label-md text-on-surface-variant"
                  >Data ważności</label
                >
                <input
                  v-model="expiry"
                  type="text"
                  placeholder="MM/YY"
                  class="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all font-body-lg text-body-lg text-on-surface"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="font-label-md text-label-md text-on-surface-variant">CVC/CVV</label>
                <div class="relative">
                  <input
                    v-model="cvc"
                    type="text"
                    placeholder="123"
                    class="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all font-body-lg text-body-lg text-on-surface"
                  />
                  <span
                    class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer"
                    >info</span
                  >
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-1 mt-2">
              <label class="font-label-md text-label-md text-on-surface-variant"
                >Imię i nazwisko posiadacza</label
              >
              <input
                v-model="holder"
                type="text"
                placeholder="Jan Kowalski"
                class="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all font-body-lg text-body-lg text-on-surface"
              />
            </div>
          </div>

          <div v-else-if="method === 'blik'" class="mt-4 flex flex-col gap-2">
            <h2 class="font-label-md text-label-md text-on-surface mb-2">Kod BLIK</h2>
            <input
              type="text"
              placeholder="123 456"
              class="w-full h-12 px-4 rounded-md border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all font-body-lg text-body-lg text-on-surface text-center tracking-widest"
            />
            <p class="font-body-md text-body-md text-on-surface-variant text-center">
              Wygeneruj kod w aplikacji bankowej.
            </p>
          </div>

          <div v-else class="mt-4 bg-surface-container-low rounded-md p-4 text-body-md text-on-surface-variant">
            Po kliknięciu „Zapłać" otrzymasz dane do tradycyjnego przelewu bankowego oraz fakturę
            proformę na e-mail.
          </div>
        </div>
      </section>

      <section
        class="w-full md:w-1/3 bg-surface-container-lowest rounded-md shadow-sm flex flex-col border border-outline-variant/30 md:sticky md:top-24"
      >
        <div class="p-6 border-b border-outline-variant/30">
          <h2 class="font-headline-sm text-headline-sm text-on-surface">Podsumowanie</h2>
        </div>
        <div class="p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center py-2 border-b border-outline-variant/20">
            <span class="font-body-md text-body-md text-on-surface-variant">Suma częściowa</span>
            <span class="font-body-md text-body-md text-on-surface">{{ formatPln(subtotal) }}</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-outline-variant/20">
            <span class="font-body-md text-body-md text-on-surface-variant"
              >Dostawa (Kurier DPD)</span
            >
            <span class="font-body-md text-body-md text-on-surface">{{ formatPln(shipping) }}</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-outline-variant/20">
            <span class="font-body-md text-body-md text-on-surface-variant">Podatek VAT (23%)</span>
            <span class="font-body-md text-body-md text-on-surface">{{ formatPln(vat) }}</span>
          </div>
          <div class="flex justify-between items-center py-4 mt-2">
            <span class="font-headline-sm text-headline-sm text-on-surface">Do zapłaty</span>
            <span class="font-display-lg text-display-lg text-primary">{{ formatPln(total) }}</span>
          </div>
          <button
            type="button"
            @click="pay"
            class="w-full h-12 bg-primary text-on-primary rounded-md font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors mt-4"
          >
            <span class="material-symbols-outlined">lock</span>
            Zapłać {{ formatPln(total) }}
          </button>
          <div class="flex items-center justify-center gap-2 mt-4 text-on-surface-variant">
            <span class="material-symbols-outlined text-[16px]">verified_user</span>
            <span class="font-label-md text-label-md text-[10px]"
              >Transakcja szyfrowana 256-bit SSL</span
            >
          </div>
        </div>
      </section>
    </div>

    <Teleport to="body">
      <div
        v-if="overlay === 'processing'"
        class="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-[100] flex flex-col items-center justify-center"
      >
        <div
          class="bg-surface-container-lowest p-8 rounded-xl shadow-lg flex flex-col items-center gap-4 max-w-sm w-full mx-4"
        >
          <div
            class="w-12 h-12 border-4 border-surface-container-highest border-t-primary rounded-full animate-spin"
          ></div>
          <h3 class="font-headline-sm text-headline-sm text-on-surface">
            Przetwarzanie płatności...
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant text-center">
            Proszę nie zamykać okna przeglądarki ani nie odświeżać strony.
          </p>
        </div>
      </div>

      <div
        v-else-if="overlay === 'success'"
        class="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-[100] flex flex-col items-center justify-center"
      >
        <div
          class="bg-surface-container-lowest p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 max-w-sm w-full mx-4"
        >
          <div
            class="w-16 h-16 bg-primary-container/20 rounded-full flex items-center justify-center"
          >
            <span class="material-symbols-outlined fill text-[40px] text-primary">check_circle</span>
          </div>
          <div class="text-center">
            <h3 class="font-headline-md text-headline-md text-on-surface mb-2">
              Płatność zakończona sukcesem
            </h3>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Dziękujemy. Twoje zamówienie zostało opłacone i przekazane do realizacji.
            </p>
          </div>
          <button
            type="button"
            @click="dismissSuccess"
            class="w-full h-12 bg-primary text-on-primary rounded-md font-label-md text-label-md hover:bg-primary-container transition-colors"
          >
            Wróć do Panelu Klienta
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
