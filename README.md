# Carlos Núñez · Full Stack Portfolio

Portafolio profesional bilingüe (ES/EN), actualizado para presentar experiencia en desarrollo web, aplicaciones de escritorio y soluciones offline.

## Stack

- React + TypeScript
- Vite 8
- Tailwind CSS 4
- CSS accesible y responsive, sin librerías de animaciones externas
- Sin backend, formularios PHP, cookies analíticas, imágenes personales ni bases de datos para este sitio

## Desarrollo local

Requisitos: Node.js 22.12 o superior.

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

Salida de producción: `dist/`.

## Despliegue

**Netlify / Vercel:** conectar este repositorio, comando de compilación `npm run build`, directorio de publicación `dist`. No se necesitan variables de entorno.

**GitHub Pages:** requiere activar Pages y configurar un despliegue de `dist`; el repositorio por sí solo no publica automáticamente la nueva versión. La configuración Vite usa `base: './'` para facilitar alojamiento en subrutas. El flujo CI verifica compilación y tipos; no publica el sitio.

## Contenido

- El contenido del portfolio está en `src/App.tsx` y es bilingüe.
- Los estilos están en `src/styles.css`.
- Los CV imprimibles y guardables como PDF están en `public/cv.html` y `public/cv-en.html`.
- No se publican repositorios privados de proyectos ni datos de alumnos o pacientes.
- Las ilustraciones de los proyectos son esquemas CSS, no capturas reales.
- Las métricas (20+ módulos; 500–999 usuarios; 20–40 minutos a menos de 10 segundos) se reportan como **estimaciones basadas en experiencia directa**, no como benchmarks auditados.
- Nexo Alinura está en desarrollo avanzado; no se afirma que esté lanzado a producción.

## Seguridad y privacidad

Se retiró el formulario PHP heredado y sus dependencias. Contacto mediante enlace `mailto:`, LinkedIn y GitHub. No se solicita información personal en un formulario interno y no se carga la fotografía de perfil.

## Historial

La versión anterior permanece recuperable en el historial Git. La rama `main` contiene la renovación completa del frontend.
