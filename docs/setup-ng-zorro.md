# NG-ZORRO Setup (Angular Standalone)

Este documento detalla la instalación y configuración exacta de **NG-ZORRO** en este proyecto para asegurar consistencia y facilitar su replicación.

## 1. Prerrequisitos
*   **Angular:** v21.2.0 (Standalone Mode)
*   **Node.js:** v20.x o superior (v22.x recomendado)
*   **TypeScript:** ~5.9.2

## 2. Instalación
Para instalar NG-ZORRO en un proyecto Angular standalone, se recomienda usar el schematic oficial:

```bash
ng add ng-zorro-antd
```

*Nota: Durante la instalación se seleccionó "None" para i18n y se habilitó la carga de iconos dinámicos.*

## 3. Dependencias Instaladas
Según el `package.json`, las dependencias clave son:

```json
"dependencies": {
  "@angular/animations": "^21.2.0",
  "ng-zorro-antd": "^21.1.0"
}
```

## 4. Configuración Angular
En un entorno standalone, los providers se configuran en `src/app/app.config.ts`. Es **crítico** incluir el soporte para animaciones y el cliente HTTP para que los componentes y los iconos funcionen correctamente.

### `src/app/app.config.ts`
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(), // Requerido para animaciones de modales, selectores, etc.
    provideHttpClient()       // Requerido para la carga de iconos de NG-ZORRO
  ]
};
```

## 5. Estilos Globales
Los estilos se cargan directamente en el archivo CSS principal del proyecto.

### `src/styles.css`
```css
/* Importación de los estilos base de NG-ZORRO */
@import "ng-zorro-antd/ng-zorro-antd.css";

/* Integración opcional con Tailwind */
@import "tailwindcss";
```

## 6. Ejemplo Funcional
A continuación, se muestra cómo crear un componente standalone que utiliza componentes de NG-ZORRO junto con utilidades de Tailwind CSS.

### `example.component.ts`
```typescript
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NzButtonModule, NzCardModule, NzIconModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <nz-card class="w-full max-w-md shadow-lg rounded-xl" nzTitle="NG-ZORRO + Tailwind">
        <p class="text-gray-600 mb-6">
          Ejemplo funcional de una tarjeta con botón e icono.
        </p>
        <div class="flex gap-4">
          <button nz-button nzType="primary" class="bg-indigo-600 border-none rounded-lg">
            <span nz-icon nzType="check"></span>
            Confirmar
          </button>
          <button nz-button nzType="default" class="rounded-lg">
            Cancelar
          </button>
        </div>
      </nz-card>
    </div>
  `
})
export class ExampleComponent {}
```

## 7. Troubleshooting

### Error: `provideAnimationsAsync()` no encontrado o error al compilar
*   **Causa:** Falta el paquete `@angular/animations`.
*   **Solución:** Ejecutar `npm install @angular/animations`.

### Error: Los iconos no se muestran (aparece un cuadro vacío o log de error)
*   **Causa:** No se ha configurado el `provideHttpClient()` en el `app.config.ts`.
*   **Solución:** Asegúrate de que `provideHttpClient()` esté presente en la lista de providers globales.

### Error: Estilos no cargan o componentes se ven "rotos"
*   **Causa:** El `@import` en `styles.css` es incorrecto o no se ha registrado el archivo en `angular.json`.
*   **Solución:** Verifica que `src/styles.css` esté en la sección `styles` de `angular.json` y que contenga `@import "ng-zorro-antd/ng-zorro-antd.css";`.

### Error de tipos en `nzValue` (Strict Mode)
*   **Causa:** Usar pipes como `number` dentro de `[nzValue]` puede devolver `null`, lo cual no es aceptado por el tipo de entrada de NG-ZORRO.
*   **Solución:** Pasar el valor numérico directamente o usar el operador nullish coalescing: `[nzValue]="(val | number) ?? ''"`.
