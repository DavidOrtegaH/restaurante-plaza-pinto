# Bar Plaza · Pinto

Página web de presentación para Bar Plaza, una bar cafetería en Pinto (Comunidad de Madrid). Muestra la carta a partir de las fotografías facilitadas, y ofrece acceso rápido al teléfono y a la dirección.

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
- Las páginas de la carta de `public/images/menu/` son copias preparadas para web de las fotografías proporcionadas. Se corrigió su orientación y se ajustaron ligeramente el brillo y el contraste para facilitar la lectura. Las fotografías fuente se conservan en `assets/menu-originals/`.
- Las fotografías y el contenido de la carta mantienen los derechos de sus titulares. Confirma con el restaurante que tienes permiso para publicarlos en el sitio y en el repositorio público.
- Las imágenes disponibles son de la carta, no del interior o la fachada del bar. No se han incorporado fotos de directorios de terceros porque no se pudo confirmar su fecha de captura y su permiso de reutilización. Se pueden añadir fotos propias recientes del local cuando estén disponibles.
- El horario no aparece confirmado en el material disponible, así que la web invita a consultarlo por teléfono.

## Licencia

El código y el diseño propios del proyecto se ofrecen bajo CC BY-NC-ND 4.0. Las fotografías de la carta y su contenido se excluyen de esa licencia y mantienen los derechos de sus titulares. Consulta [LICENSE](./LICENSE).

## SpecDD

Lee `AGENTS.md` y `.specdd/bootstrap.md` antes de una tarea de desarrollo. La especificación raíz está en `ProyectoRestaurantePlazaPinto.sdd`; las especificaciones locales están junto a sus archivos.
