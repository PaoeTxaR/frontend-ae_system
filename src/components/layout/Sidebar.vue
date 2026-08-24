<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();

const navItems = [
  { name: "dashboard", label: "Dashboard", icon: "grid" },
  { name: "user-management", label: "User Management", icon: "users" },
];

async function getProfile() {
  const profile = await userStore.fetchByToken();
  console.log(profile);
}

async function handleLogout() {
  await authStore.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <span class="brand-mark">AE</span>
      <span class="brand-name">Admin Console</span>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="nav-item"
        :class="{ active: route.name === item.name }"
      >
        <span class="nav-indicator" />
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="user-chip">
        <div class="user-avatar">
          {{ authStore.user?.username?.[0]?.toUpperCase() || "?" }}
        </div>
        <div class="user-info">
          <div class="user-name">
            {{ authStore.user?.username || "ไม่ทราบชื่อ" }}
          </div>
          <div class="user-role">{{ authStore.user?.role || "" }}</div>
        </div>
      </div>
      <button class="logout-btn" @click="handleLogout">ออกจากระบบ</button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--color-ink);
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-mark {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 13px;
  color: var(--color-ink);
  background: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-name {
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: rgba(255, 255, 255, 0.65);
  font-size: 13.5px;
  font-weight: 500;
  position: relative;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.nav-indicator {
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: transparent;
}

.nav-item.active .nav-indicator {
  background: var(--color-accent);
}

.sidebar-footer {
  padding: 16px 12px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 4px;
  margin-bottom: 8px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--color-accent);
  color: #ffffff;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-info {
  min-width: 0;
}

.user-name {
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  color: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.logout-btn {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.75);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.24);
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
