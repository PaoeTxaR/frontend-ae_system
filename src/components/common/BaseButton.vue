<script setup>
defineProps({
  type: { type: String, default: 'button' },
  loading: { type: Boolean, default: false },
  variant: { type: String, default: 'primary' }, // primary | ghost
})
</script>

<template>
  <button
    :type="type"
    class="base-btn"
    :class="variant"
    :disabled="loading"
  >
    <span v-if="loading" class="btn-spinner" />
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s ease, opacity 0.15s ease;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-btn.primary {
  background: var(--color-ink);
  color: #ffffff;
}

.base-btn.primary:hover:not(:disabled) {
  background: var(--color-ink-soft);
}

.base-btn.ghost {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-ink-soft);
}

.base-btn.ghost:hover:not(:disabled) {
  background: var(--color-bg);
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
