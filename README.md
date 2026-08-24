## สิ่งที่ต้องติดตั้งก่อน

| โปรแกรม | เวอร์ชันที่ต้องมี | ตรวจสอบด้วยคำสั่ง |
|---|---|---|
| Node.js | 18 ขึ้นไป | `node -v` |
| npm (มากับ Node.js อยู่แล้ว) | 9 ขึ้นไป | `npm -v` |

**ยังไม่มี Node.js?** โหลดได้ที่ [https://nodejs.org](https://nodejs.org) เลือกเวอร์ชัน LTS

---

## 1. Clone โปรเจกต์

```bash
git clone <URL ของ repository นี้>
cd frontend
```

## 2. ติดตั้ง dependencies
```bash
npm install
```

**สำหรับผู้ใช้ Windows ที่เจอ error แบบนี้:**
```
File ...\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```
เปิด PowerShell แบบ **Run as administrator** แล้วรันคำสั่งนี้ครั้งเดียว:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
พิมพ์ `Y` แล้ว Enter จากนั้นปิด-เปิด PowerShell ใหม่ แล้วลอง `npm install` อีกครั้ง


## 3. ตั้งค่า URL ของ backend

เปิดไฟล์ `.env` ที่ root ของโปรเจกต์ (ถ้ายังไม่มี ให้สร้างไฟล์ชื่อ `.env` ขึ้นมาใหม่) ใส่ค่า:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

แก้เลข port ให้ตรงกับที่ backend รันอยู่จริง (ค่าเริ่มต้นของ backend คือ `8080`)

## 4. รันโปรเจกต์

**สำคัญ:** ต้องรัน [backend](../jwt-demo) ไว้ก่อนแล้ว ไม่งั้น login จะไม่ผ่าน

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ **`http://localhost:5173`**

