# Lucide Icons Setup (Angular Standalone)

Este documento detalla la instalación y configuración de **Lucide Icons** en este proyecto Angular para asegurar un sistema de iconografía moderno, ligero y con soporte completo para tree-shaking.

## 1. Prerrequisitos
*   **Angular:** v19.0.0 o superior (Este proyecto usa v21.2.0).
*   **Node.js:** v20.x o superior.

## 2. Instalación
Para integrar Lucide en Angular, se utiliza la librería oficial:

```bash
npm install lucide-angular
```

## 3. Dependencias
Se ha añadido la siguiente dependencia al `package.json`:

```json
"dependencies": {
  "lucide-angular": "^0.477.0"
}
```

## 4. Configuración Global (Recomendada)
Para habilitar el **Tree-shaking** (incluir solo los iconos que se usan) y facilitar el acceso global, los iconos se registran en el archivo de configuración principal.

### `src/app/app.config.ts`
Debes importar `LucideAngularModule` y los iconos específicos, luego registrarlos usando `importProvidersFrom`.

```typescript
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, LayoutDashboard, Video, Heart, Settings, Search, User, Play, Menu, MenuFold, MenuUnfold, CheckCircle, Team, DotChart } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    importProvidersFrom(
      LucideAngularModule.pick({
        LayoutDashboard,
        Video,
        Heart,
        Settings,
        Search,
        User,
        Play,
        Menu,
        MenuFold,
        MenuUnfold,
        CheckCircle,
        Team,
        DotChart
      })
    )
  ]
};
```

## 5. Ejemplo de Uso en Componente Standalone
Para usar un icono en un componente, simplemente importa `LucideAngularModule` en el array de `imports`.

### `my-component.ts`
```typescript
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="flex items-center gap-2">
      <!-- El nombre en el HTML debe ser en kebab-case -->
      <lucide-icon name="layout-dashboard" class="w-5 h-5 text-indigo-600"></lucide-icon>
      <span>Dashboard</span>
    </div>
  `
})
export class MyComponent {}
```

## 6. Buenas Prácticas
1.  **Registro Centralizado**: Si un icono se usa en múltiples partes de la app, añádelo al `app.config.ts`.
2.  **Registro Local**: Si un icono es muy específico de un componente pesado (ej. un editor de video), regístralo solo en ese componente usando `LucideAngularModule.pick({ IconName })` en sus imports locales.
3.  **Estilizado con Tailwind**: Usa clases de Tailwind para dimensionar los iconos (`w-4 h-4`, `w-6 h-6`). Lucide hereda el `currentColor`, por lo que puedes usar `text-gray-500` o `text-primary`.
4.  **Nomenclatura**: Recuerda que en el código TS el icono se importa como `LayoutDashboard` (PascalCase), pero en el HTML se usa como `layout-dashboard` (kebab-case).

## 7. Troubleshooting

### Error: El icono no aparece
*   **Causa:** El icono no ha sido registrado en el `LucideAngularModule.pick({...})`.
*   **Solución:** Añade el icono a la lista de iconos seleccionados en `app.config.ts` o en el componente local.

### Error: Los estilos de color no se aplican
*   **Causa:** Algunos SVG pueden tener colores fijos o no heredar correctamente si se aplican a contenedores superiores.
*   **Solución:** Aplica la clase de color directamente al componente `<lucide-icon>`.

### Error: "LucideAngularModule" is not a module
*   **Causa:** Versión incompatible o error de importación.
*   **Solución:** Asegúrate de estar usando `importProvidersFrom` en la configuración standalone en lugar de intentar declararlo en un `NgModule` inexistente.
