# UniHub

Mirror reproducible de la versión actualmente publicada en `https://python-taller.vercel.app/`.

## Estado capturado

- Proyecto Vercel: `python-taller`
- Deployment de producción: `dpl_DCjwB1NovgVHr98uYSBhnqNBoJSs`
- PWA shell: `v5.5.8`
- Paquete UniHub Cloud solicitado por el shell: `5.3.0`

## Arquitectura actual

El `index.html` publicado es un cargador liviano. Descarga desde Supabase los fragmentos de `app_assets` correspondientes a la versión `5.3.0`, concatena el Base64, descomprime el paquete GZIP en el navegador y reemplaza el documento por la aplicación completa.

Por eso este repositorio reproduce exactamente el shell público del deploy, pero el payload principal de la app continúa alojado en Supabase, igual que en producción.

## Deploy

Se puede importar esta carpeta directamente en Vercel como proyecto estático. No requiere build command.
