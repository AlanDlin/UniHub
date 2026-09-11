# Optimización de batería

Cambios aplicados al shell de UniHub para reducir CPU, red y trabajo repetido en iPad/iOS:

- cache local del paquete HTML de UniHub ya descomprimido;
- evita descargar, convertir Base64 y descomprimir el paquete en cada apertura;
- fallback a la copia cacheada si Supabase no responde;
- timeout de red para evitar requests colgados;
- Service Worker con cache selectiva del shell, sin borrar la cache del payload;
- headers de Vercel más razonables para recursos estáticos.

El payload principal de UniHub continúa alojado en Supabase (`app_assets`, versión `5.3.0`). Las optimizaciones internas de Pyodide/PyForge deben hacerse en ese payload si se quiere aislar la ejecución Python en un Web Worker y poder cortar bucles infinitos.
