# Project Context

Nombre: Yupi TV Admin

Qué es:
Portal admin moderno y responsive para gestionar y consumir contenido de streamers en una sola plataforma (YouTube, Twitch, Kick, etc.). La UI debe ser llamativa, clara y usable.

Audiencia:
Usuarios finales + admins/operadores que quieren seguir streamers y organizar favoritos.

Stack y reglas técnicas:

- Respetar `.ai/rules.md` y `.ai/architecture.md`
- Angular standalone, Signals para estado UI, RxJS cuando haya streams (search/typeahead/polling)
- NG-ZORRO como UI kit
- Tailwind para layout/spacing
- SCSS para overrides puntuales
- Prettier

MVP (primeras features):

1. Layout (shell): sidebar + header + content, responsive
2. Dashboard: resumen + cards + listas (favs / recientes)
3. Streamers: listado + búsqueda + detalle
4. Favoritos: CRUD básico (local inicialmente)
5. Settings: preferencias de UI (tema, densidad, idioma si aplica)

Principios UI:

- Mobile-first y responsive
- Estados: loading / empty / error siempre presentes
- Accesibilidad básica (labels, focus, navegación)
