<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

defineProps<{
  searchPlaceholder?: string
  mobileTitle?: string
}>()
</script>

<template>
  <div class="bg-background text-on-surface font-body-md min-h-screen flex">
    <AppSidebar />
    <div class="flex-1 flex flex-col md:ml-64 w-full min-h-screen">
      <AppHeader :search-placeholder="searchPlaceholder" :mobile-title="mobileTitle" />
      <slot />
    </div>
  </div>
</template>
