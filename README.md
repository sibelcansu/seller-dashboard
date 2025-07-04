# 🛒 Ürün Ekleme Paneli – React + Supabase

Bu proje, kullanıcıların e-posta ve şifreyle kayıt olup giriş yapabileceği, ardından ürünlerini ekleyip görüntüleyebileceği bir **React + Supabase** uygulamasıdır.

## 🚀 Özellikler

- ✅ Kullanıcı girişi (login/signup)  
- ✅ Protected route sistemi ile güvenli sayfa erişimi  
- ✅ Ürün ekleme (isim, açıklama, fiyat, görsel)  
- ✅ Supabase Storage'a görsel yükleme  
- ✅ Supabase veritabanına ürün kaydı  
- ✅ Ürün listeleme (Dashboard ve /products sayfası)  
- ✅ Giriş yapılmadan `/add-product` gibi sayfalara erişim engellenir  
- ✅ Çıkış (logout) butonu ile güvenli oturum sonlandırma

## 🛠️ Kullanılan Teknolojiler

- ⚛️ React
- 🔥 Supabase (Auth + Database + Storage)
- 🎯 React Hook Form
- 🛣 React Router v6+
- 🧱 TailwindCSS (isteğe bağlı)

## 📁 Proje Yapısı

```bash
src/
├── components/
│   └── ProtectedRoute.tsx
├── features/
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   └── products/
│       ├── AddProduct.tsx
│       └── Products.tsx
├── routes/
│   └── AppRouter.tsx
├── lib/
│   └── supabaseClient.ts
└── App.tsx
