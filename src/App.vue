<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout === 'dashboard' ? DashboardLayout : AuthLayout
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
