# Bar Plaza · Pinto

Página web de presentación para Bar Plaza, una bar cafetería en Pinto (Comunidad de Madrid). Incluye la carta recreada digitalmente, su transcripción accesible, datos de contacto, Google Maps y pedidos mediante Uber Eats.

## Stack

- [Astro](https://astro.build/) para generar una web estática rápida, sin servidor ni base de datos.
- TypeScript y CSS sin framework adicional.
- Netlify Free para alojar el sitio estático con uso comercial permitido; no se necesita adaptador de servidor ni funciones de pago. El plan aplica un límite mensual de créditos y pausa los proyectos al agotarse, sin recarga automática. Revisa las condiciones actuales antes de publicar.
- SpecDD para mantener requisitos de proyecto y contratos locales junto al código, en archivos `.sdd`.

## Requisitos

- Node.js 22.23.4 o posterior.
- npm.

## Desarrollo

```sh
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en el navegador. Para fijar la escucha a la interfaz local: `npm run dev -- --host 127.0.0.1`.

Para generar una versión de producción y verla en local:

```sh
npm run build
npm run preview
```

Astro guarda el resultado estático en `dist/`.

## Despliegue en Netlify Free

1. Publica el repositorio en GitHub e impórtalo desde Netlify.
2. Selecciona la rama de producción (`main`). El archivo `netlify.toml` ya configura el comando `npm run build` y la carpeta `dist`.
3. Netlify publica una URL HTTPS y aplica las cabeceras de seguridad definidas en `public/_headers`.

El plan Free admite proyectos comerciales con un límite mensual de créditos; al agotarse, las publicaciones se pausan hasta el siguiente ciclo y no se recarga automáticamente. Confirma el límite vigente en Netlify antes de lanzar.

## Contenido y fotos

- El teléfono y la dirección se han tomado de la portada fotografiada de la carta: `91 941 46 66` y `Calle Joan Miró, 5, 28320 Pinto, Madrid`.
- Las cinco páginas PNG de `public/images/menu/` se han recreado mediante IA a partir de las fotografías proporcionadas, manteniendo nombres, ingredientes, precios y el estilo de la carta física. Las imágenes de comida son ilustrativas. La transcripción y las instrucciones de generación se conservan en `public/images/menu/transcription.json`; las fotografías fuente, en `assets/menu-originals/`.
- Las fotografías y el contenido de la carta mantienen los derechos de sus titulares. Confirma con el restaurante que tienes permiso para publicarlos en el sitio y en el repositorio público.
- Las imágenes disponibles son de la carta, no del interior o la fachada del bar. No se han incorporado fotos de directorios de terceros porque no se pudo confirmar su fecha de captura y su permiso de reutilización. Se pueden añadir fotos propias recientes del local cuando estén disponibles.
- La carta puede ampliarse con controles de zoom y consultarse como texto desplegable mediante teclado o lector de pantalla.
- La dirección enlaza a Google Maps y el botón de pedidos abre la ficha del restaurante en Uber Eats. El teléfono se presenta como texto y no se publican horarios sin confirmar.

## Publicación del repositorio

La rama de producción es `main`, la de integración es `develop` y el desarrollo se realiza en `features`. Los mensajes siguen Conventional Commits en inglés.

Los archivos de entorno, dependencias, resultados de compilación, cachés, claves privadas y duplicados locales de `pictures/` se excluyen mediante `.gitignore`. Antes de publicar cambios, revisa los archivos preparados y el historial para evitar incluir credenciales o datos privados. El repositorio no requiere secretos para compilar.

## Licencia

El código y el diseño propios del proyecto se ofrecen bajo CC BY-NC-ND 4.0. Las fotografías de la carta y su contenido se excluyen de esa licencia y mantienen los derechos de sus titulares. Consulta [LICENSE](./LICENSE).

## SpecDD

Lee `AGENTS.md` y `.specdd/bootstrap.md` antes de una tarea de desarrollo. La especificación raíz está en `ProyectoRestaurantePlazaPinto.sdd`; las especificaciones locales están junto a sus archivos.
