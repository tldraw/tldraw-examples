<div alt style="text-align: center; transform: scale(.5);">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://github.com/tldraw/tldraw-examples/raw/main/assets/github-hero-dark-draw.png" />
		<img alt="Signia" src="https://github.com/tldraw/tldraw-examples/raw/main/assets/github-hero-light-draw.png" />
	</picture>
</div>

# tldraw-examples

Welcome to the tldraw example repository. Here you will find examples of using the new tldraw v2 library. Each example is organized as a route in the `src/examples` folder.

## Development

This repo contains is a regular [Vite](https://vitejs.dev/) app.

First install dependencies:

```bash
yarn
# or
npm i
```

Then start the local development server.

```bash
yarn dev
# or
npm run dev
```

Each individual example is found in the `examples` folder.

Happy hacking!

## Using `Tldraw` in a different app

You should be able to use the `<Tldraw/>` component in any React app.

First install the `@tldraw/tldraw` package using `@alpha` for the **latest alpha release**.

```bash
yarn add @tldraw/tldraw@alpha
# or
npm install @tldraw/tldraw@alpha
```

Next, create a file like this one:

```tsx
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/editor.css'
import '@tldraw/tldraw/ui.css'

export default function () {
	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
			}}
		>
			<Tldraw />
		</div>
	)
}
```

In addition to the component, you will also need to:

- import the **CSS files** for the editor and UI
- have the library's **assets** available on the same host
- probably set a `viewport` meta tag in your **html**.

See below for more detail on these.

#### A note on next.js / server-rendered react

The `<Tldraw/>` component cannot be server-rendered. If you're using the component in a Next.js app, you will need to import it dynamically. The code to do that will look something like this:

```tsx
import dynamic from "next/dynamic"

const Editor = dynamic(
	async () => import('../components/Editor')),
	{ ssr: false }
)

export default function MyPage() {
	return <Editor/>
}
```

### `<Tldraw/>`

The `<Tldraw/>` component combines several other pieces:

- the tldraw editor (`@tldraw/editor`)
- the tldraw UI (`@tldraw/ui`)
- an engine (`@tldraw/sync-client`) for persistence and cross-tab syncronization

> **Note:** In the future, this library will also include an engine for using our collaboration services.

If you wanted to have more granular control, you could also use those subcomponents directly. See the **Exploded example** for what that would look like.

### Assets

In order for this app to work, the app must be able to find certain assets on the host. These are contained in the `embed-icons`, `fonts`, `icons`, and `translations` folders. If you are using the `<Tldraw/>` component in your app, you must also copy these folders into your public path.

> **Note:** This requirement is very likely to change in the near future.

While these files must be available, you can overwrite the individual files: for example, by placing different icons under the same name or modifying / adding translations.

### CSS

In order for the `<Tldraw/>` component to work, you must also import a CSS file from the library `@tldraw/editor` library (automatically installed with `@tldraw/tldraw`):

```ts
import '@tldraw/tldraw/editor.css'
import '@tldraw/tldraw/ui.css'
```

You can overwrite these files with other CSS, customize the styles via package patches, or copy the contents into a different file and import that instead.

In addition to these stylesheets, the root project imports the `src/index.css` file, so its styles are used for every example. Be sure to take a look at this file: you may find some of these styles necessary in your own usage of the `<Tldraw/>` component.

### HTML

The `index.html`'s meta viewport element for some important settings. These may not be critical to `<Tldraw/>` performing correctly, however some features (such as safe area positioning) may not work correctly if these are not set.

```html
<meta
	name="viewport"
	content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```
