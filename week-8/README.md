# Ecommerce Lab

React Native ve Expo kullanılarak geliştirilmiş, API tabanlı üç ekranlı bir e-ticaret uygulamasıdır. Uygulama; ürün listeleme, ürün detaylarını görüntüleme ve Context API ile sepet yönetimi özelliklerini içerir.

## Özellikler

- DummyJSON REST API üzerinden ürün verilerini çekme
- Yeniden kullanılabilir ürün kartı bileşeni
- Ürün detay sayfası
- Dosya tabanlı yönlendirme
- Context API ile ortak sepet durumu
- Ürün ekleme, adet değiştirme ve sepetten kaldırma
- Yükleme, hata ve boş sepet durumları

## Teknolojiler

- React Native
- Expo
- Expo Router
- JavaScript
- React Context API
- React Hooks
- DummyJSON API

## Proje Yapısı

```text
app/
  _layout.js
  index.js
  cart.js
  product/
    [id].js

components/
  ProductCard.js

context/
  CartContext.js
```

## Gereksinimler

- Node.js sürüm 18 veya üzeri
- npm
- Expo Go mobil uygulaması
- Bilgisayar ve mobil cihazın aynı ağ üzerinde bulunması

## Kurulum

Proje dizininde aşağıdaki komutları çalıştırın:

```bash
npm install
```

## Çalıştırma

Geliştirme sunucusunu başlatmak için:

```bash
npm start
```

Expo Go ile önbelleği temizleyerek başlatmak için:

```bash
npm run start:clear
```

Android hedefinde başlatmak için:

```bash
npm run start:android
```

iOS hedefinde başlatmak için:

```bash
npm run start:ios
```

Web hedefinde başlatmak için:

```bash
npm run start:web
```

Android üretim dışı bundle çıktısı oluşturmak için:

```bash
npm run export:android
```

## Kullanılan API

Ürün listesi:

```text
https://dummyjson.com/products?limit=20
```

Ürün detayı:

```text
https://dummyjson.com/products/{id}
```

## Sayfa Akışı

- Ana sayfa: `/`
- Ürün detay sayfası: `/product/{id}`
- Sepet sayfası: `/cart`
