# Correcciones de auditoría y SEO · 12 de noviembre de 2026

Se han corregido los once hallazgos técnicos de la auditoría sobre la versión anterior del sitio. Los originales de la carta y sus 76 platos y suplementos se conservan; la optimización no cambia sus precios ni descripciones.

## Resolución de hallazgos

| ID | Corrección | Verificación |
|---|---|---|
| A01 | JavaScript del visor externo, sin relajar la CSP | Las cinco cartas abren y cierran con las cabeceras de producción |
| A02 | Texto secundario más oscuro y tamaños de ayuda/pie aumentados | Axe y Lighthouse sin errores de contraste detectados |
| A03 | WebP con cuatro tamaños de miniatura, versión de lectura independiente y primera carta prioritaria | Presupuesto de miniaturas y medición móvil de Lighthouse |
| A04 | Eliminada la captura de Ctrl + rueda | El evento no se cancela y el zoom interno permanece disponible con botones |
| A05 | Imágenes contenidas sin deformación, sobre fondo crema y tarjetas uniformes | Lighthouse sin aviso de proporción incorrecta |
| A06 | Controles del visor con rol de grupo y nombre accesible | Axe en móvil y escritorio, con el modal abierto |
| A07 | Eliminada la dependencia del paquete hacia sí mismo y actualizado el lockfile | Instalación reproducible en CI con npm ci |
| A08 | Estados de carga/error y acceso a la transcripción de la categoría | Petición de imagen abortada: mensaje, controles desactivados y foco en la carta textual |
| A09 | Una fuente estructurada con IDs estables, precios en céntimos y validación | Comparación de todos los platos/descripciones/precios contra la transcripción archivada |
| A10 | TypeScript para el visor, contratos de datos, pruebas de navegador y GitHub Actions | npm run verify |
| A11 | Canonical, datos Restaurant, metadatos sociales, imagen 1200×630, robots y sitemap | Pruebas de origen y SEO; Lighthouse |

La marca usa una letra vectorial decorativa para evitar que su inicial se confunda con la etiqueta visible del enlace. Los checks de accesibilidad incluyen WCAG 2.0, 2.1 y 2.2, niveles A y AA. El contenido auxiliar y los JPG anteriores se conservan fuera de public para no desplegarlos.

## Resultados medidos

Comparación orientativa de Lighthouse 13.6.0 móvil simulado sobre la build local con cabeceras de producción. Se utilizó un dominio reservado de prueba para activar la ruta de SEO de producción; ese dominio no se ha configurado en el código ni debe publicarse como dominio real.

| Métrica | Antes | Después |
|---|---:|---:|
| Rendimiento | 75 | 96 |
| Accesibilidad automática | 95 | 100 |
| Buenas prácticas | 88 | 100 |
| SEO básico | 100 | 100 |
| LCP simulado | 30,9 s | 2,9 s |
| Bytes descargados | 9.768.360 | 555.736 |
| CLS | 0 | 0 |

La descarga medida se reduce aproximadamente un 94 %. El informe SEO básico anterior no detectaba la ausencia de canonical, datos estructurados o imagen social: el mismo 100 no significa que no haya habido mejoras. Estas puntuaciones no certifican conformidad WCAG ni garantizan posiciones en buscadores.

## Comprobaciones

- `npm run check`: sin errores, avisos ni sugerencias.
- `npm test`: dos contratos que cubren la integridad de toda la carta y la política de origen/indexación.
- `npm run test:e2e`: ocho pruebas de navegador sobre la build y sus cabeceras, incluyendo WCAG automatizado, teclado, imágenes fallidas, caché, SEO y acceso sin JavaScript.
- `npm run build`: correcta, con recursos optimizados.
- `npm audit`: sin vulnerabilidades conocidas notificadas durante esta revisión.
- Verificación visual de escritorio, móvil y visor con las nuevas imágenes comprimidas.

## SEO y despliegue en Netlify

- Netlify aporta `URL`; se usa como origen de producción.
- `SITE_URL` permite sustituirlo por un dominio propio HTTPS cuando exista.
- No se inventa una URL pública. Sin origen configurado, el build tiene noindex y robots deshabilita el rastreo.
- Los deploy previews y branch deploys permanecen fuera de indexación.
- El sitemap solo contiene URLs de producción. Canonical, Open Graph y la imagen social usan el mismo origen.
- Los datos estructurados incluyen únicamente nombre, teléfono y dirección conocidos, además de enlaces confirmados. No incluyen reseñas, valoraciones u horarios inventados.
- Los archivos con hash de `/_astro/` tienen caché anual inmutable; el HTML no recibe esa caché.

## Pendientes ajenos a las correcciones del código

Tras el primer despliegue, hay que comprobar la URL real, TLS, las cabeceras efectivas, el sitemap y la indexación en Search Console. Sigue pendiente una revisión con lectores de pantalla y Safari/iOS reales. Los permisos del titular para las imágenes/contenido y la confirmación comercial de precios y alérgenos deben verificarse con el restaurante; una auditoría de código no acredita esos permisos.

La licencia CC BY-NC-ND 4.0 solicitada se mantiene. Los materiales del restaurante conservan los derechos de sus titulares.
