# Bar Plaza · Pinto

Página web de presentación para Bar Plaza, una bar cafetería en Pinto (Comunidad de Madrid). Muestra la carta a partir de las fotografías facilitadas, y ofrece acceso rápido al teléfono y a la dirección.

## Stack

- [Astro](https://astro.build/) para generar una web estática rápida, sin servidor ni base de datos.
- TypeScript y CSS sin framework adicional.
- Vercel para alojar el sitio estático; no se necesita adaptador de servidor. El [plan Hobby](https://vercel.com/docs/plans/hobby) es gratuito para proyectos personales y no comerciales. Como esta web presenta un negocio real, confirma las condiciones de Vercel antes de usarla como sitio oficial; el proyecto no requiere funciones de pago.

## Requisitos

- Node.js 22.23.4 o posterior.
- npm.

## Desarrollo

```sh
npm install
npm run dev
```

Para generar una versión de producción y verla en local:

```sh
npm run build
npm run preview
```

Astro guarda el resultado estático en `dist/`.

## Despliegue en Vercel

1. Publica el repositorio en GitHub.
2. Importa el repositorio desde el panel de Vercel.
3. Selecciona la rama de producción (`main`). Vercel detecta Astro automáticamente.
4. Conserva los valores detectados: comando de build `astro build` y carpeta de salida `dist`.

Las ramas que no sean de producción pueden usarse como despliegues de vista previa.

## Contenido y fotos

- El teléfono y la dirección se han tomado de la portada fotografiada de la carta: `91 941 46 66` y `Calle Joan Miró, 5, 28320 Pinto, Madrid`.
- Las páginas de la carta de `public/images/menu/` son copias preparadas para web de las fotografías proporcionadas. Se corrigió su orientación y se ajustaron ligeramente el brillo y el contraste para facilitar la lectura. Las fotografías fuente se conservan en `assets/menu-originals/`.
- Las fotografías y el contenido de la carta mantienen los derechos de sus titulares. Confirma con el restaurante que tienes permiso para publicarlos en el sitio y en el repositorio público.
- Las imágenes disponibles son de la carta, no del interior o la fachada del bar. Se pueden añadir fotos propias del local cuando estén disponibles.
- El horario no aparece confirmado en el material disponible, así que la web invita a consultarlo por teléfono.

## Licencia

El código y el diseño propios del proyecto se ofrecen bajo CC BY-NC-ND 4.0. Las fotografías de la carta y su contenido se excluyen de esa licencia y mantienen los derechos de sus titulares. Consulta [LICENSE](./LICENSE).
