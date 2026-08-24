# Frontend (Vue 3 + Pinia + Vue Router + Axios)

หน้าบ้านที่เชื่อมกับ Spring Boot JWT backend — มีหน้า Login, Sidebar navbar, และหน้า User Management

## ติดตั้งและรัน

ต้องมี Node.js ติดตั้งก่อน (แนะนำเวอร์ชัน 18 ขึ้นไป)

```bash
npm install
npm run dev
```

แอปจะรันที่ `http://localhost:5173`

> **สำคัญ:** ต้องรัน backend (Spring Boot) ที่ `http://localhost:8080` ไว้ก่อน ไม่งั้น login จะไม่ผ่าน เช็ค URL backend ได้ที่ไฟล์ `.env` (`VITE_API_BASE_URL`)

## โครงสร้างที่สำคัญ

- `src/api/axiosInstance.js` — axios instance กลาง แนบ JWT token ให้อัตโนมัติทุก request ผ่าน interceptor, ดัก 401 แล้วเด้งกลับหน้า login อัตโนมัติ
- `src/stores/authStore.js` — Pinia store เก็บ token/user, ผูกกับ localStorage (refresh หน้าแล้วยัง login ค้าง)
- `src/router/index.js` — navigation guard กันหน้าที่ต้อง login (`meta.requiresAuth`)
- `src/layouts/` — `AuthLayout` (หน้า login ไม่มี sidebar) กับ `DashboardLayout` (มี sidebar)
- `src/components/layout/Sidebar.vue` — navbar ฝั่งซ้าย มีเมนู Dashboard, User Management, และปุ่ม logout

## ทดสอบ flow

1. เปิด `http://localhost:5173` → จะเด้งไปหน้า `/login` อัตโนมัติ (เพราะยังไม่มี token)
2. ล็อกอินด้วย user ที่ register ไว้กับ backend (ดู README ของ backend สำหรับคำสั่ง curl register)
3. ล็อกอินสำเร็จ → เด้งเข้า `/dashboard` เห็น sidebar ซ้ายมือ
4. คลิก "User Management" ในเมนู → ไป `/users` → ดึงรายชื่อ user ทั้งหมดจาก backend
5. คลิก "ออกจากระบบ" → เคลียร์ token → เด้งกลับหน้า login

## สิ่งที่ควรทำต่อ

- เพิ่มหน้า Register (ตอนนี้ยังต้องสมัครผ่าน backend โดยตรงด้วย curl/Postman)
- เพิ่ม role-based UI: ซ่อนเมนู User Management ถ้าไม่ใช่ ADMIN (เช็คจาก `authStore.user.role`)
- เพิ่ม pagination ในตาราง user ถ้าข้อมูลเยอะ
- Production build: `npm run build` แล้ว deploy โฟลเดอร์ `dist/`
