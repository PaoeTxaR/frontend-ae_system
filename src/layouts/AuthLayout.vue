<template>
  <div class="auth-shell">
    <div class="auth-card">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 380px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 40px 32px;
  box-shadow: 0 1px 2px rgba(20, 24, 31, 0.04);
}
</style>
