# Civis Causa | Next-Gen Human Rights Archive

[**https://civiscausa.org**](https://civiscausa.org)

Civis Causa, dünya genelindeki insan hakları ihlallerini veri odaklı bir yaklaşımla belgeleyen, yüksek performanslı ve editoryal bir dijital arşiv portalıdır. On binlerce vaka dosyasını milisaniye hızında işleyebilen bu platform, "Büyük Veri" (Big Data) analitiğini modern web estetiğiyle birleştirir.

## 🎯 Amaç

Platformun temel amacı; insan hakları ihlallerini, tanıklıkları ve hukuki süreçleri sistematik bir şekilde dijital ortama aktararak kalıcı ve erişilebilir bir hafıza oluşturmaktır.
- **Şeffaflık:** Veriye dayalı analizlerle hak ihlallerini görünür kılmak.
- **Hız ve Erişilebilirlik:** Devasa veri setlerini (50,000+ vaka) herhangi bir donma veya gecikme (0ms latency) olmadan kullanıcıya sunmak.
- **Editoryal Estetik:** Bilgiyi, kullanıcıyı yormayan ancak vakanın ağırlığını hissettiren derin ve karanlık (deep-dark) bir editoryal tasarımla sunmak.

## 🚀 Teknolojiler

Proje, modern web ekosisteminin en performanslı araçları üzerine inşa edilmiştir:

- **Çekirdek:** [Next.js 15+](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Dil:** [TypeScript](https://www.typescriptlang.org/)
- **Performans Katmanı:** 
  - **Virtual Scrolling:** On binlerce satırı tarayıcıyı yormadan render eden sanal kaydırma mekanizması.
  - **Web Workers:** Arama ve filtreleme gibi ağır işlemleri ana thread'den ayıran arkaplan işleme.
  - **Canvas API:** Veri görselleştirmeleri için GPU hızlandırmalı grafikler.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Hafif ve hızlı durum yönetimi)
- **Styling:** [Vanilla Extract](https://vanilla-extract.style/) (Sıfır çalışma zamanı CSS) & [Styled Components](https://styled-components.com/)
- **Animasyon:** [Framer Motion](https://www.framer.com/motion/) (60 FPS pürüzsüz geçişler)
- **Veri Görselleştirme:** [D3.js](https://d3js.org/)
- **İkonografi:** [Lucide React](https://lucide.dev/)

## 🛠️ Kurulum

Geliştirme ortamını ayağa kaldırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Ardından [http://localhost:3000](http://localhost:3000) adresinden projeye erişebilirsiniz.

---
*Bu proje insan hakları mücadelesine veri ve teknoloji ile katkı sağlamak amacıyla geliştirilmiştir.*
