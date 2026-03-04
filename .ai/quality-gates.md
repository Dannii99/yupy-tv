# Quality Gates

Antes de PR:
- Compila sin errores.
- Lint pasa.
- Prettier aplicado.
- No hay `any`.
- OnPush aplicado (salvo justificación).
- trackBy en listas.
- Templates sin lógica pesada.
- Signals:
  - computed puros
  - effects con side effects controlados
- RxJS:
  - sin nested subscriptions
  - usar operadores correctos (switchMap, debounce, etc.)
- UX:
  - loading/empty/error cubiertos
- Accesibilidad mínima:
  - labels, focus, aria cuando aplique