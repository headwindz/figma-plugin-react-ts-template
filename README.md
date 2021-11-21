# Figma Plugin React TS Template

A basic template to start making figma plugin with react and typescript.

The template includes:

- Basic file structure
- TypeScript configuration
- Webpack configuration
- Hot reload support
- Engineering best practices: commitlint + tslint + prettier


# Quick start

- Run `yarn` to install dependencies.
- Run `yarn start` to start webpack in watch mode. Or run `yarn dev` to get hot reload abilities.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest` and choose `manifest.json` file from `dist` directory of this repository. Refers to [figma doc](https://www.figma.com/plugin-docs/setup/#go-to-menu-plugins-development-new-plugin) for more details.
- To get a production build for publish, run `yarn build`.

🚌 To change the UI part of your plugin, start editing [index.tsx](./src/components/app/index.tsx)

🚅 To change the sandbox part, start editing [index.ts](./sandbox/index.ts)

# Useful links


[Figma Plugin](https://www.figma.com/plugin-docs/intro/)
[Figma API](https://www.figma.com/plugin-docs/api/api-overview/)
[Figma message](https://www.figma.com/plugin-docs/creating-ui/)

## Messaging between between 「Sandbox」 and 「UI」

```typescript
// Sandbox
figma.ui.postMessage({a: 1}, '*')
figma.ui.on('message', console.log); // {b: 2}
```

```typescript
// UI
parent.postMessage({ pluginMessage: {b: 2} }, '*')
window.addEventListener('message', console.log); // { data: { pluginMessage: { a: 1 } } }
```

# How hot reload works

* TODO, more details about how to hot reload is implemented with socket.io

# License

This project is [MIT licensed](./LICENSE).