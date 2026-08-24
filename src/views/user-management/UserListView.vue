<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { isEmail, isRequired, minLength } from '@/utils/validators'

const userStore = useUserStore()
const isFormOpen = ref(false)
const isSaving = ref(false)
const editingUser = ref(null)
const formError = ref('')
const errors = reactive({ username: '', email: '', password: '' })
const form = reactive({ username: '', email: '', password: '', role: 'USER' })

function resetForm() {
  Object.assign(form, { username: '', email: '', password: '', role: 'USER' })
  Object.keys(errors).forEach((field) => { errors[field] = '' })
  formError.value = ''
}

function openCreateForm() {
  editingUser.value = null
  resetForm()
  isFormOpen.value = true
}

function openEditForm(user) {
  editingUser.value = user
  Object.assign(form, { username: user.username || '', email: user.email || '', password: '', role: user.role || 'USER' })
  Object.keys(errors).forEach((field) => { errors[field] = '' })
  formError.value = ''
  isFormOpen.value = true
}

function closeForm() {
  if (isSaving.value) return
  isFormOpen.value = false
}

function validateForm() {
  Object.keys(errors).forEach((field) => { errors[field] = '' })
  if (!isRequired(form.username)) errors.username = 'กรุณาระบุ username'
  if (!isEmail(form.email)) errors.email = 'กรุณาระบุ email ให้ถูกต้อง'
  if (!editingUser.value && !minLength(form.password, 6)) errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
  if (editingUser.value && form.password && !minLength(form.password, 6)) errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
  return !Object.values(errors).some(Boolean)
}

async function submitForm() {
  if (!validateForm()) return
  isSaving.value = true
  formError.value = ''
  const payload = { username: form.username.trim(), email: form.email.trim(), role: form.role }
  if (form.password) payload.password = form.password
  try {
    if (editingUser.value) await userStore.update(editingUser.value.id, payload)
    else await userStore.create(payload)
   await userStore.fetchAll() // refresh data only
    isFormOpen.value = false
  } catch (err) {
    formError.value = err.response?.data?.message || 'บันทึกข้อมูลผู้ใช้ไม่สำเร็จ'
  } finally {
    isSaving.value = false
  }
}

async function confirmDelete(user) {
  if (!window.confirm(`ต้องการลบผู้ใช้ ${user.username} ใช่หรือไม่?`)) return
  try {
    await userStore.remove(user.id)
  } catch (err) {
    // The store exposes the API error in the page-level error state.
  }
}

onMounted(() => {
  userStore.fetchAll()
})
</script>

<template>
  <div>
    <header class="page-header">
      <div>
        <h1>User Management</h1>
        <p>รายชื่อผู้ใช้ทั้งหมดในระบบ</p>
      </div>
      <BaseButton @click="openCreateForm">เพิ่มผู้ใช้</BaseButton>
    </header>

    <LoadingSpinner v-if="userStore.loading" />

    <p v-else-if="userStore.error" class="error-box">{{ userStore.error }}</p>

    <div v-else class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th class="actions-column">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="userStore.list.length === 0">
            <td colspan="5" class="empty-cell">ยังไม่มีผู้ใช้ในระบบ</td>
          </tr>
          <tr v-for="user in userStore.list" :key="user.id">
            <td class="mono">{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-badge">{{ user.role }}</span>
            </td>
            <td class="actions-column">
              <button class="table-action" type="button" @click="openEditForm(user)">แก้ไข</button>
              <button class="table-action danger" type="button" @click="confirmDelete(user)">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isFormOpen" class="modal-backdrop" @click.self="closeForm">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="user-form-title">
        <div class="modal-header">
          <div>
            <h2 id="user-form-title">{{ editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้' }}</h2>
            <p>{{ editingUser ? 'แก้ไขข้อมูลบัญชีผู้ใช้' : 'สร้างบัญชีผู้ใช้ใหม่' }}</p>
          </div>
          <button class="close-button" type="button" aria-label="ปิด" @click="closeForm">×</button>
        </div>
        <p v-if="formError" class="error-box">{{ formError }}</p>
        <form class="user-form" @submit.prevent="submitForm">
          <BaseInput v-model="form.username" label="Username" placeholder="เช่น somchai" :error="errors.username" />
          <BaseInput v-model="form.email" label="Email" type="email" placeholder="name@example.com" :error="errors.email" />
          <BaseInput  v-if="!editingUser" v-model="form.password" label="Password" type="password" :placeholder="editingUser ? 'เว้นว่างหากไม่เปลี่ยน' : 'อย่างน้อย 6 ตัวอักษร'" :error="errors.password" />
          <div class="field">
            <label class="field-label" for="role">Role</label>
            <select id="role" v-model="form.role" class="field-input">
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div class="modal-actions">
            <BaseButton type="button" variant="ghost" @click="closeForm">ยกเลิก</BaseButton>
            <BaseButton type="submit" :loading="isSaving">บันทึก</BaseButton>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
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

.error-box {
  padding: 12px 16px;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  border-radius: var(--radius-sm);
  font-size: 13.5px;
}

.table-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  text-align: left;
  padding: 12px 20px;
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

tbody td {
  padding: 14px 20px;
  font-size: 13.5px;
  color: var(--color-ink-soft);
  border-bottom: 1px solid var(--color-border);
}

tbody tr:last-child td {
  border-bottom: none;
}

.mono {
  font-family: var(--font-mono);
  color: var(--color-muted);
}

.role-badge {
  font-family: var(--font-mono);
  font-size: 11.5px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  padding: 3px 8px;
  border-radius: 4px;
}

.actions-column {
  text-align: right;
  white-space: nowrap;
}

.table-action {
  padding: 6px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-accent);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.table-action + .table-action {
  margin-left: 6px;
}

.table-action:hover {
  background: var(--color-accent-soft);
  border-color: var(--color-accent);
}

.table-action.danger {
  color: var(--color-danger);
}

.table-action.danger:hover {
  background: var(--color-danger-soft);
  border-color: var(--color-danger);
}

.empty-cell {
  text-align: center;
  color: var(--color-muted);
  padding: 32px 20px;
}

.modal-backdrop {
  position: fixed;
  z-index: 10;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(20, 24, 31, 0.48);
}

.modal {
  width: min(100%, 480px);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: 0 18px 50px rgba(20, 24, 31, 0.2);
  animation: modal-in 0.18s ease-out;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0 0 4px;
  color: var(--color-ink);
  font-size: 19px;
}

.modal-header p {
  margin: 0;
  color: var(--color-muted);
  font-size: 13px;
}

.close-button {
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-muted);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.close-button:hover {
  background: var(--color-bg);
  color: var(--color-ink);
}

.user-form {
  display: grid;
  gap: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  color: var(--color-ink-soft);
  font-size: 13px;
  font-weight: 500;
}

.field-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-ink-soft);
  font: inherit;
}

.field-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .page-header {
    align-items: stretch;
    flex-direction: column;
  }

  .page-header :deep(.base-btn) {
    width: 100%;
  }

  .table-card {
    overflow-x: auto;
  }

  table {
    min-width: 680px;
  }

  .modal {
    padding: 20px;
  }
}
</style>
