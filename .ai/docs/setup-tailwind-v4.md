# Configuración de Tailwind CSS v4 en YupiTv (Angular 21)

Este documento detalla la implementación exacta de **Tailwind CSS v4** en este proyecto. A diferencia de v3, v4 utiliza un motor "CSS-first" y se integra mediante PostCSS en el pipeline de build de Angular (Vite).

## 1. Prerrequisitos
*   **Angular:** 19.0.0 o superior (Este proyecto usa v21.2.0).
*   **Node.js:** v20.x o superior (Recomendado v22+ para soporte nativo de ESM).
*   **Builder:** Debe usar `@angular/build:application` (Basado en Vite/Esbuild).

## 2. Instalación de Dependencias
Ejecuta el siguiente comando para instalar Tailwind v4 y su plugin oficial para PostCSS:

```bash
npm install tailwindcss @tailwindcss/postcss postcss autoprefixer
```

## 3. Estructura de Archivos y Contenido

### A. `package.json` (Configuración de Módulos)
Es fundamental que el proyecto esté marcado como ES Module para evitar warnings de Node.js con los archivos de configuración `.js`.

```json
{
  "type": "module",
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

### B. Configuración de PostCSS (Integración)
Este proyecto utiliza una configuración dual para asegurar que tanto el servidor de desarrollo (Vite) como las extensiones del editor y herramientas de linting procesen Tailwind v4 correctamente.

#### 1. `postcss.config.js`
**Ubicación:** Raíz del proyecto.
**Contenido:**
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
  },
};
```

#### 2. `.postcssrc.json`
**Ubicación:** Raíz del proyecto.
Este archivo es crucial para la funcionalidad de Tailwind en entornos que prefieren configuraciones estáticas o JSON.
**Contenido:**
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

> **Nota sobre compatibilidad:** Ambos archivos pueden y deben convivir. `postcss.config.js` ofrece flexibilidad para JavaScript moderno (ESM), mientras que `.postcssrc.json` garantiza que herramientas secundarias reconozcan los plugins sin errores de parsing.

### C. `src/styles.css` (Importación)
En v4, no se usa un archivo `tailwind.config.js` por defecto; todo se configura en el CSS.

```css
@import "tailwindcss";

/* NG-ZORRO Styles (Opcional si usas la librería) */
@import "ng-zorro-antd/ng-zorro-antd.css";

@layer base {
  /* Tus resets o variables globales aquí */
}
```

### D. `angular.json` (Registro de Estilos)
Asegúrate de que el archivo CSS principal esté registrado.

```json
"styles": [
  "src/styles.css"
]
```

## 4. Errores Típicos y Soluciones

### Error: `@import "tailwindcss"` no se reconoce
*   **Causa:** No se ha configurado el plugin de PostCSS correctamente o el builder de Angular no está detectando el archivo de configuración.
*   **Solución:** Asegúrate de que `postcss.config.js` esté en la raíz y que el builder en `angular.json` sea `@angular/build:application`.

### Error: `MODULE_TYPELESS_PACKAGE_JSON`
*   **Causa:** Intentas usar `export default` en `postcss.config.js` sin tener `"type": "module"` en el `package.json`.
*   **Solución:** Añade `"type": "module"` a tu `package.json`.

### Error: Conflictos con SCSS
*   **Causa:** Tailwind v4 prefiere archivos `.css`. Si usas `.scss`, asegúrate de que el plugin de PostCSS se ejecute después del compilador de Sass.
*   **Solución:** Se recomienda usar `src/styles.css` como punto de entrada global incluso si tus componentes usan SCSS.

## 5. Checklist de Validación
1. [ ] `package.json` tiene `"type": "module"`.
2. [ ] `postcss.config.js` contiene el plugin `@tailwindcss/postcss`.
3. [ ] `src/styles.css` tiene la línea `@import "tailwindcss";` al inicio.
4. [ ] El comando `npm start` no muestra warnings de PostCSS.

## 6. Snippet de Prueba
Copia esto en tu `src/app/app.html` para verificar que Tailwind está funcionando:

```html
<div class="flex min-h-screen items-center justify-center bg-gray-100">
  <div class="rounded-xl bg-white p-8 shadow-2xl transition-transform hover:scale-105">
    <h1 class="text-3xl font-bold text-blue-600 underline decoration-wavy">
      ¡Tailwind v4 funcionando!
    </h1>
    <p class="mt-4 text-gray-500">
      Si ves este texto centrado, con sombra y el título azul subrayado, la configuración es correcta.
    </p>
    <button class="mt-6 cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 active:bg-blue-800">
      Confirmar
    </button>
  </div>
</div>
```
