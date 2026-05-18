import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: string
  sku: string
  name: string
  unitPrice: number
  quantity: number
  image: string
}

const VAT_RATE = 0.23

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([
    {
      id: '1',
      sku: 'PX-W-001',
      name: 'Słuchawki ProX Wireless',
      unitPrice: 350,
      quantity: 2,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA9PTm1Q6VUwU-xGosOZpgd8zI39upvyxHqNIbF10R-kpCVcGVO2p0UbR2zpyuCYKHMHqkwBYGTdBT45FCx1CUDiZBFxjTudGEtNraEKMGwHYrcjrTgcFloy5P3tLgxsn-SSnp0CSwdPG0pq2BqjlWTLMm6WbH6jeU0THj2YUIvtfpCNUOcY5zbqY6LK5tcocdHuLv8tQPVrIP56IKid9pyVooNiyNsGtgVIAt3E3ImoQ47ckMRBWzwlXq39dFINe5BzC4zzE0nkGlm',
    },
    {
      id: '2',
      sku: 'MX-ER-02',
      name: 'Mysz Ergonomiczna MX',
      unitPrice: 120,
      quantity: 5,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAB5SRjg3XCLItxMG_n0Tu7b395GukRcwJRNLqEK2R7uHDxKZsa72zoqQpSAXBEnSBCvCHAUZjSjGeeh1qaIoZVYxwMwQ8zzKfRBiia4LH3DbvRzIQMqDqXODQ4WryHyttlscvIu_oZacNcUoSYjWAT5F_g6mWQ4lqHN5Hb34MQpTYCouKZZ-UyD64QcE0GvFBuZ6yFA3BbY6tZIXAeYZB4zKRghXOe4slZ_imoJz3i_Pzpu-YwqqHvZfMBSIYKLPG7NDeyVcG0uIoO',
    },
    {
      id: '3',
      sku: 'K8-MECH-99',
      name: 'Klawiatura Mechaniczna K8',
      unitPrice: 450,
      quantity: 1,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCYzC2KNTD1hZ5lLfpvys-tJvsmyA-qnOn2u80mE4M_hHktZcnB5QFX0rrGtVTz0UWzONq0hqoGx_fH9c2YBFLLOYD-SEHfAwWyJJo4XdNdbNmfGGQuZTBqoceUFjmjyoJgkUKqiVNkud2pn2kSvNJophLjLnrd7kUnIbcstsMYGP-nl7B7gV6OSGigSE2_cvIh8LdNA9Sd427Jg-iH11nyQvuet9ifGqjl5HedwDtRLHRd5Au8X-u68J0tacNgdrWx_TkcBPO5hAuc',
    },
  ])

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  )
  const vat = computed(() => subtotal.value * VAT_RATE)
  const total = computed(() => subtotal.value + vat.value)

  function setQuantity(id: string, qty: number) {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    item.quantity = Math.max(1, qty)
  }

  function increment(id: string) {
    const item = items.value.find((i) => i.id === id)
    if (item) item.quantity++
  }

  function decrement(id: string) {
    const item = items.value.find((i) => i.id === id)
    if (item && item.quantity > 1) item.quantity--
  }

  function remove(id: string) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, itemCount, subtotal, vat, total, setQuantity, increment, decrement, remove, clear }
})
