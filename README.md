# Beauty — Frontend E-commerce

Tienda online de cosméticos y cuidado personal construida con React + Vite + Tailwind CSS.

## Funcionalidades (PRD v1.0)

- **Home**: hero banner, categorías, productos destacados, promociones, blog preview, barra de confianza
- **Catálogo (PLP)**: filtros por categoría, marca, precio, tono/tipo de piel, ordenamiento, chips activos
- **PDP**: galería, variantes (tono/tamaño), tabs (descripción, ingredientes, uso, reviews), schema SEO
- **Carrito**: drawer lateral + página completa, persistencia localStorage, barra envío gratis
- **Checkout**: 4 pasos (dirección → envío → pago → confirmación)
- **Wishlist**: favoritos con persistencia
- **Búsqueda**: autocompletado, búsquedas recientes y populares
- **Perfil**: historial de pedidos, puntos de fidelidad
- **Blog**: listado + artículos con product cards shoppable
- **i18n**: Español / English
- **Modo oscuro**: toggle con persistencia
- **Accesibilidad**: focus visible, ARIA labels, navegación por teclado

## Stack

- React 19 + Vite 8
- React Router 7
- Tailwind CSS 4
- Axios (API backend con fallback a mock data)
- Lucide React (iconos)
- React Helmet Async (SEO meta tags)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## API Backend

Por defecto conecta a `http://localhost:8080/api`. Si el backend no está disponible, usa datos mock automáticamente.

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Home |
| `/productos` | Catálogo |
| `/productos/:category` | Catálogo filtrado |
| `/productos/:category/:slug` | Detalle producto |
| `/carrito` | Carrito |
| `/checkout` | Checkout |
| `/wishlist` | Favoritos |
| `/buscar?q=` | Búsqueda |
| `/cuenta` | Perfil |
| `/blog` | Blog |
| `/blog/:slug` | Artículo |
