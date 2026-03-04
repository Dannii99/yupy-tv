# Architecture

## Angular (modo moderno)
- Standalone components por defecto.
- Standalone routes con lazy loading por feature.
- Preferir `inject()` + funciones puras donde aplique.
- `ChangeDetectionStrategy.OnPush` por defecto.

## Estado: Signals vs RxJS (regla práctica)
### Usar Signals para:
- Estado local de UI (loading, selected, filters, toggles).
- Derivados/computed (view models).
- Sincronización simple entre componentes a través de services “store” con signals.

### Usar RxJS para:
- Streams naturales: websockets, events, typeaheads, debounce, polling.
- Composición compleja (merge, switchMap, retry, backoff).
- HTTP cuando te convenga el pipeline (aunque el resultado final se puede volcar a signals).

### Regla de oro
- UI consume Signals.
- RxJS se usa como “motor” de streams cuando aporta valor real.
- Si hay Observable, se recomienda convertir el resultado a signal si es estado de UI:
  - `toSignal(observable$)` o
  - `observable$.subscribe(...)` con cleanup (preferible `toSignal`).

## HTTP
- Tipado estricto de respuestas.
- Manejo de errores consistente (ideal interceptor + mapping en servicios).
- Evitar llamadas duplicadas y side effects ocultos.

## Formularios
- Reactive Forms (siempre).
- Integración con NG-ZORRO form components.
- Validaciones consistentes y mensajes uniformes.

## UI
- NG-ZORRO para componentes base.
- Tailwind para layout/spacing.
- SCSS para overrides puntuales y tokens globales.