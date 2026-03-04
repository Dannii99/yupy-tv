# PROMS

## prom init

"Lee los archivos de la carpeta .ai para entender el contexto del proyecto.
Este proyecto es Angular standalone usando signals, rxjs cuando aplique,
NG-ZORRO para UI, Tailwind para layout y SCSS para estilos."

## prom para gemini

Lee y respeta:

- .ai/rules.md
- .ai/architecture.md
- .ai/project-context.md
  y las skills configuradas (si existen).

Objetivo:
Crear la base UI del portal Yupi TV Admin y el primer feature "dashboard".

Requisitos:

1. Crear un AdminLayout responsive (sidebar + header + content) usando NG-ZORRO + Tailwind.
   - Sidebar colapsable
   - Header con título + buscador placeholder + avatar
   - Mobile: sidebar tipo drawer o colapsado
2. Ruteo standalone:
   - app.routes.ts con lazy load al layout y al dashboard
3. Feature Dashboard:
   - Página dashboard con cards (NG-ZORRO) + Tailwind layout
   - Estados: loading/empty (aunque sea mock)
4. Estado:
   - Signals para UI state (collapsed, loading)
   - RxJS solo si es necesario (no forzar)
5. Entrega:
   - Lista de archivos a crear/modificar
   - Código completo de cada archivo
   - Cómo validar con `ng serve`

No inventes dependencias nuevas. Mantén SCSS solo para overrides puntuales.
