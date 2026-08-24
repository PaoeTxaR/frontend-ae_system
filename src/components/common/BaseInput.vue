<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">
    <label v-if="label" class="field-label">{{ label }}</label>
    <input
      class="field-input"
      :class="{ 'has-error': error }"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-ink-soft);
}

.field-input {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-family: var(--font-ui);
  color: var(--color-ink-soft);
  background: var(--color-surface);
  transition: border-color 0.15s ease;
}

.field-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.field-input.has-error {
  border-color: var(--color-danger);
}

.field-error {
  margin: 0;
  font-size: 12.5px;
  color: var(--color-danger);
}
</style>
