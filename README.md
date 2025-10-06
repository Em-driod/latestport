# Portfolio (Vite + React + TypeScript + React Router)

A clean, hand-coded portfolio scaffold. Tailwind-ready without installing it here.

## Scripts
- dev: start Vite dev server
- build: type-check and build
- preview: preview production build

## Getting Started
```bash
npm install
npm run dev
```

## Add Tailwind CSS (you will install)
1. Install deps:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
2. Edit `tailwind.config.js`:
```js
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
```
3. Replace the contents of `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Start dev:
```bash
npm run dev
```

## Structure
- `src/main.tsx`: app entry
- `src/router.tsx`: routes
- `src/pages/*`: page components
- `src/components/*`: shared UI
- `src/data/*`: editable data for projects/experience

## Notes
- Accessible, responsive layout.
- Subtle CSS only; you can enhance with Tailwind utilities after install.
