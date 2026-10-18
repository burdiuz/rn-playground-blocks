import { existsSync, readdirSync } from 'node:fs';

import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

// Every folder in src/ except `internal` is a public entry (`@actualwave/rn-playground-blocks/<folder>`).
const entries = readdirSync('src', { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'internal')
  .map((d) => d.name);

const input = Object.fromEntries(
  entries.map((name) => [name, existsSync(`src/${name}/index.tsx`) ? `src/${name}/index.tsx` : `src/${name}/index.ts`]),
);

const external = (id) => /^(react|react-native|@react-native-community|expo-[a-z-]+)(\/|$)/.test(id);

const output = (format, ext) => ({
  dir: 'dist',
  format,
  sourcemap: true,
  entryFileNames: `[name]/index${ext}`,
  chunkFileNames: `shared/[name]-[hash]${ext}`,
});

// `theme` (the colour context) is shared between entries as a chunk, so every entry sees the same provider.
export default {
  input: { ...input, theme: 'src/theme.tsx' },
  external,
  output: [output('cjs', '.js'), output('es', '.es.js')],
  plugins: [
    typescript({ tsconfig: './tsconfig.build.json', rootDir: 'src', declaration: true, declarationDir: 'dist/types' }),
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'SKILL.md', dest: 'dist' },
      ],
    }),
  ],
};
