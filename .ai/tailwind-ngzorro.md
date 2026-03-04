# Tailwind + NG-ZORRO + SCSS Playbook

## Qué hace cada cosa
- NG-ZORRO: componentes UI y consistencia visual.
- Tailwind: layout/spacing/responsive rápido.
- SCSS: overrides finos, tokens globales, casos especiales.

## Buenas prácticas
- No “pisar” estilos de NG-ZORRO globalmente sin necesidad.
- Si un override es global, documentarlo en `styles.scss`.
- Si un estilo es solo de un componente, SCSS local.

## Pattern recomendado
- Wrapper con clase + SCSS local para ajustar NG-ZORRO dentro del componente.
- Tailwind para contenedor y grid/flex.