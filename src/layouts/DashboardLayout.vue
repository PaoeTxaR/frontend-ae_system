<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <div class="dashboard-shell">
    <Sidebar />
    <main class="dashboard-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.dashboard-shell {
  display: flex;
  min-height: 100vh;
}

.dashboard-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: 32px 40px;
  max-width: 100%;
}

@media (max-width: 768px) {
  .dashboard-main {
    margin-left: 0;
    padding: 20px;
  }
}
</style>
