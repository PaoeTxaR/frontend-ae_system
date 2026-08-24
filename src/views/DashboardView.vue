<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <header class="page-header">
      <h1>Dashboard</h1>
      <p>ยินดีต้อนรับกลับ, {{ authStore.user?.username || '' }}</p>
    </header>

    <div class="card">
      <p class="card-label">บัญชีของคุณ</p>
      <div class="account-grid">
        <div>
          <span class="grid-label">Username</span>
          <span class="grid-value">{{ authStore.user?.username }}</span>
        </div>
        <div>
          <span class="grid-label">Email</span>
          <span class="grid-value">{{ authStore.user?.email }}</span>
        </div>
        <div>
          <span class="grid-label">Role</span>
          <span class="grid-value mono">{{ authStore.user?.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--color-ink);
}

.page-header p {
  margin: 0;
  color: var(--color-muted);
  font-size: 14px;
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 24px;
  max-width: 520px;
}

.card-label {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

.account-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.account-grid > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-label {
  font-size: 13.5px;
  color: var(--color-muted);
}

.grid-value {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--color-ink-soft);
}

.grid-value.mono {
  font-family: var(--font-mono);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
