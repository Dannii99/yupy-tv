# Conventions

## Formato (Prettier)
- Prettier es la fuente de verdad para formato.
- No pelearse con el formatter: dejar que el tooling mande.
- Mantener imports ordenados según la configuración del repo.

## Angular
- Standalone por defecto:
  - `standalone: true`
  - `imports: [...]` explícitos
- OnPush por defecto.
- Inputs/Outputs tipados.
- Evitar lógica pesada en template; construir `viewModel` en TS (idealmente con computed).
- Listas: `trackBy` siempre.
- Cleanup:
  - preferir `takeUntilDestroyed(inject(DestroyRef))` o `toSignal`.

## Signals
- `signal()` para estado.
- `computed()` para derivados (sin side effects).
- `effect()` solo para side effects controlados (y documentados).
- No hacer requests dentro de `computed`.

## RxJS
- Usar RxJS cuando haya streams o async composition real.
- Preferir `switchMap` para búsquedas; `debounceTime` para inputs; `shareReplay` para cache seguro.
- Evitar nested subscriptions.
- Si Observable termina representando estado de UI, convertir a signal.

## NG-ZORRO
- Reusar componentes oficiales (table/form/modal/drawer/message/notification).
- Estados: loading/empty/error deben estar siempre definidos.

## Estilos
- Tailwind: layout + spacing + responsive.
- SCSS: overrides puntuales y estilos específicos de componente.
- Evitar `!important`.