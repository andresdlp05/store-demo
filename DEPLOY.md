# Tienda demo GA4 — despliegue en Cloud Storage

Sitio estático de 4 productos para probar el tracking de GA4 (view_item, add_to_cart, purchase)
con el token `rcp` y los UTM que vienen del correo.

## Archivos
- `index.html` — catálogo (4 productos)
- `producto.html` — ficha de producto (dispara **view_item**; botones **add_to_cart** / comprar)
- `gracias.html` — confirmación (dispara **purchase**)
- `analytics.js` — GA4 (gtag) + helpers de eventos  ← **pon aquí tu Measurement ID**
- `products.js` — catálogo y utilidades de URL (mantiene rcp + UTM al navegar)
- `styles.css`, `img/p1..p4.svg`, `404.html`

## Paso 1 — Poner tu Measurement ID de GA4
1. GA4 → Admin → Flujos de datos → Web → crea el flujo → copia `G-XXXXXXXXXX`.
2. En `analytics.js`, reemplaza `const GA4_ID = "G-XXXXXXXXXX";` por tu ID.

## Paso 2 — Desplegar en Cloud Storage (web estático)
```bash
# variables
PROJECT=proinnovate-project
BUCKET=gs://medialab-store-demo        # el nombre debe ser único global
REGION=us-central1

# crear bucket
gcloud config set project $PROJECT
gsutil mb -l $REGION -b on $BUCKET

# subir el sitio
gsutil -m cp -r ./* $BUCKET

# configurar página principal y 404
gsutil web set -m index.html -e 404.html $BUCKET
```

### Hacerlo público (OJO: política de organización)
```bash
gsutil iam ch allUsers:objectViewer $BUCKET
```
> ⚠️ El proyecto tiene **acceso público bloqueado por política** en varios buckets. Si este comando
> falla con "public access prevention", NO podrás servir el sitio público desde Cloud Storage
> directo. Alternativas:
> - **Firebase Hosting** (recomendado, gratis, HTTPS y dominio): `firebase init hosting` → `firebase deploy`.
> - **Load Balancer + Cloud CDN** delante del bucket (más configuración).

La URL del sitio (bucket público) sería:
`https://storage.googleapis.com/medialab-store-demo/index.html`

## Paso 3 — Export GA4 → BigQuery
GA4 → Admin → Vínculos de productos → **BigQuery** → vincular → elige dataset y proyecto.
Crea tablas `events_YYYYMMDD` que luego unes con tu tabla de envíos por `rcp` e `item_id`.

## Paso 4 — Enlaces del correo
Cada producto del correo apunta a su ficha con UTM + token:
```
https://TU-DOMINIO/producto.html?sku=SKU-002&utm_source=connectif&utm_medium=email&utm_campaign=CAMP-TEST&rcp=TOKEN_ANONIMO
```

## Verificación
- GA4 → Informes → Tiempo real: entra a una ficha y verás `view_item`.
- En BigQuery (tras el export): `event_name IN ('view_item','add_to_cart','purchase')` con el parámetro `rcp`.
