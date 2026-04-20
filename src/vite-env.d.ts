/// <reference types="vite/client" />

// Custom Figma asset imports resolved by the figmaAssetResolver plugin in
// vite.config.ts. Paths like `figma:asset/<hash>.png` are rewritten to
// `src/assets/<hash>.png` at build time.
declare module 'figma:asset/*' {
  const src: string;
  export default src;
}
