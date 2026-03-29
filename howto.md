# Card System How-To

Bu doküman, projedeki yeni kart sisteminin nasıl çalıştığını ve nasıl yönetileceğini açıklar.

## Amaç

Eski `oldsite` altındaki kart içeriklerini:

- ana sayfada doğrudan görünmeyen bir kütüphane olarak tutmak
- admin panelinden seçilebilir hale getirmek
- belirli ekran bölgelerine yerleştirmek
- gerektiğinde düzenlenebilir canlı kartlara dönüştürmek

şeklinde kullanıyoruz.

## Temel fikir

Sistem iki ayrı katmandan oluşur:

1. Legacy template library
   `oldsite` kökenli kartların tanımlı olduğu, görünmeyen şablon havuzu.

2. Live content cards
   Veritabanına kaydedilen ve gerçekten ekranda gösterilen kartlar.

Admin panelinde bir legacy şablon seçilir, editöre yüklenir, sonra belirli bir placement alanına kaydedilir.

## Önemli kavramlar

### Persona

Kartın hedef kitlesini belirtir.

- `recruiter`
- `colleague`
- `qa`
- `curious`

### Placement

Kartın nerede görüneceğini belirtir.

Şu an desteklenen placement anahtarları:

- `recruiter:panel`
- `cards:page`
- `colleague:panel`
- `qa:panel`
- `curious:panel`

Tanımlar: [cards-schema.ts](c:\.temp_private\ubterziogludenew\src\lib\cards-schema.ts)

## Dosya yapısı

Ana dosyalar:

- Şema ve placement tanımları: [cards-schema.ts](c:\.temp_private\ubterziogludenew\src\lib\cards-schema.ts)
- Veritabanı erişimi: [cards-api.ts](c:\.temp_private\ubterziogludenew\src\lib\cards-api.ts)
- Legacy şablon kütüphanesi: [legacy-card-library.ts](c:\.temp_private\ubterziogludenew\src\lib\legacy-card-library.ts)
- Admin ekranı: [AdminCards.tsx](c:\.temp_private\ubterziogludenew\src\pages\AdminCards.tsx)
- Recruiter panel renderı: [RecruiterCards.tsx](c:\.temp_private\ubterziogludenew\src\components\sections\recruiter\RecruiterCards.tsx)
- Gizli cards sayfası: [Cards.tsx](c:\.temp_private\ubterziogludenew\src\pages\Cards.tsx)
- Ortak kart grid renderer: [CustomCardsGrid.tsx](c:\.temp_private\ubterziogludenew\src\components\sections\recruiter\CustomCardsGrid.tsx)
- Legacy recruiter preview deck: [RecruiterProfileDeck.tsx](c:\.temp_private\ubterziogludenew\src\components\sections\recruiter\RecruiterProfileDeck.tsx)

## Veritabanı modeli

`content_cards` tablosunda önemli alanlar:

- `persona`
- `placement_key`
- `source_template_key`
- `title`
- `description`
- `sort_order`
- `image_path`

`content_card_actions` tablosu kart butonlarını tutar.

Placement alanlarını ekleyen migration:

- [20260329000100_add_card_placements.sql](c:\.temp_private\ubterziogludenew\supabase\migrations\20260329000100_add_card_placements.sql)

## Çalışma akışı

### 1. Admin paneline gir

Route:

- `/admin`

Login gerekiyorsa:

- `/login`

Route tanımları: [App.tsx](c:\.temp_private\ubterziogludenew\src\App.tsx)

### 2. Persona seç

Admin ekranında önce hedef persona seçilir.

Örnek:

- `recruiter`

### 3. Placement seç

Aynı persona için hangi bölgede gösterileceği seçilir.

Örnek:

- ana sayfadaki recruiter paneli için `recruiter:panel`
- gizli preview sayfası için `cards:page`

### 4. Kart kaynağını belirle

İki yol vardır:

1. `New` ile sıfırdan kart oluşturmak
2. `Legacy library` bölümünden eski bir kart şablonu yüklemek

Legacy template seçildiğinde:

- başlık gelir
- açıklama gelir
- varsa action linkleri gelir
- `source_template_key` otomatik dolar

### 5. Düzenle

Editörde şunlar güncellenebilir:

- `title`
- `description`
- `sort_order`
- `placement`
- `image`
- action listesi

### 6. Kaydet

`Save` sonrası:

- kart `content_cards` tablosuna yazılır
- action’lar `content_card_actions` tablosuna yazılır
- ilgili placement bölgesinde görünür hale gelir

## Ekranda nerede ne görünüyor

### Ana sayfa recruiter paneli

Burada sadece `recruiter:panel` placement’ına atanmış canlı kartlar gösterilir.

Kod: [RecruiterCards.tsx](c:\.temp_private\ubterziogludenew\src\components\sections\recruiter\RecruiterCards.tsx)

### Gizli cards sayfası

Route:

- `/cards`

Bu sayfa iki şey gösterir:

1. eski recruiter deck preview
2. `cards:page` placement’ına atanmış canlı kartlar

Kod: [Cards.tsx](c:\.temp_private\ubterziogludenew\src\pages\Cards.tsx)

## Legacy library nasıl genişletilir

Yeni bir eski-site kartı kütüphaneye eklemek için:

1. `oldsite` içindeki kart içeriğini incele
2. [legacy-card-library.ts](c:\.temp_private\ubterziogludenew\src\lib\legacy-card-library.ts) içine yeni template ekle
3. Gerekirse varsayılan action’ları tanımla
4. Uygun `suggestedPersonas` ve `defaultPlacementKey` belirle

Bu yapı şu an template metadata tutuyor. Yani legacy kartın birebir özel tasarım HTML’i değil, yönetilebilir bir kart başlangıcı sağlıyor.

## Yeni placement eklemek

Yeni bir gösterim bölgesi eklemek için:

1. [cards-schema.ts](c:\.temp_private\ubterziogludenew\src\lib\cards-schema.ts) içinde:
   - `CARD_PLACEMENT_KEYS`
   - `CARD_PLACEMENTS`
2. İlgili UI bileşeninde o placement için `fetchCards({ persona, placementKey })` çağrısı
3. Gerekirse admin ekranında yeni placement görünmesini doğrula

## Supabase tarafı

Migration listesi kontrolü:

```powershell
supabase migration list
```

Migration uygulama:

```powershell
supabase db push --include-all
```

Bu sistem için gerekli güncel migration:

- `20260329000100_add_card_placements.sql`

## Sık kullanılan akışlar

### Recruiter paneline eski bir kart eklemek

1. `/admin` aç
2. Persona `recruiter`
3. Placement `Homepage / Recruiter panel`
4. Legacy library’den kart seç
5. Gerekirse içeriği düzelt
6. `Save`

### Gizli sayfaya kart eklemek

1. `/admin` aç
2. Persona `recruiter`
3. Placement `Hidden cards page`
4. Legacy veya manuel kart seç
5. `Save`

## Mevcut sınırlar

- Legacy library şu an tam HTML renderer değil, yönetilebilir template kaynağıdır.
- `RecruiterProfileDeck` hala `/cards` sayfasında preview amaçlı sabit duruyor.
- `colleague`, `qa`, `curious` placement’ları tanımlı ama bu paneller için özel render alanları henüz eklenmedi.

## Önerilen sonraki adımlar

1. `colleague`, `qa`, `curious` panelleri için de placement bazlı render eklemek
2. Legacy template’leri kategori bazında ayırmak
3. Template preview modal eklemek
4. Kart çoğaltma özelliği eklemek
5. Template ile live card ayrımını admin’de renk veya badge ile daha görünür yapmak
