export function isRequired(value) {
  return value && value.trim().length > 0
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function minLength(value, len) {
  return value && value.length >= len
}
