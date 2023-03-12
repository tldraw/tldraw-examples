<div alt style="text-align: center; transform: scale(.5);">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://github.com/tldraw/tldraw-examples/raw/main/assets/github-hero-dark-draw.png" />
		<img alt="Signia" src="https://github.com/tldraw/tldraw-examples/raw/main/assets/github-hero-light-draw.png" />
	</picture>
</div>

# tldraw-examples

Welcome to the tldraw example repository. Here you will find examples of using the new tldraw v2 libraries. Each example is organized as a route in the `src/examples` folder.

## Installation

This app is a regular [Vite](https://vitejs.dev/) app.

First install dependencies:

```bash
yarn
# or
npm install
# or
pnpm
```

Then start the local development server.

## Notes on Usage

We distribute tldraw as two main packages:

- The `@tldraw/tldraw` package contains the tldraw editor and client
- The `@tldraw/ui` package contains our user interface

An extremely minimal usage (without our UI) might look like this:

```tsx
import { Tldraw } from '@tldraw/tldraw-beta'
import '@tldraw/tldraw-beta/tldraw.css'

export default function () {
	return <Tldraw />
}
```

And with our UI library:

```tsx
import { Canvas, Tldraw } from '@tldraw/tldraw-beta'
import { ContextMenu, TldrawUi, TldrawUiContextProvider } from '@tldraw/ui'
import '@tldraw/tldraw-beta/tldraw.css'
import '@tldraw/ui/tldraw-ui.css'

export default function () {
	return (
		<Tldraw>
			<TldrawUiContextProvider>
				<ContextMenu>
					<Canvas />
				</ContextMenu>
				<TldrawUi />
			</TldrawUiContextProvider>
		</Tldraw>
	)
}
```

#### Assets

In order for this app to work, the app must be able to find certain assets on the host. These are contained in the `embed-icons`, `fonts`, `icons`, and `translations` folders. If you are using the `<Tldraw/>` component in your app, you must also copy these folders into your public path.

> **Note:** This requirement is very likely to change in the near future.

While these files must be available, you can overwrite the individual files: for example, by placing different icons under the same name or modifying / adding translations.

#### Styles

In order for the `<Tldraw/>` component to work, you must also import a CSS file from the library:

```ts
import '@tldraw/tldraw-beta/tldraw.css'
```

If you are also using the `@tldraw/ui` library then you must also import:

```ts
import '@tldraw/ui/tldraw-ui.css'
```

You can overwrite these files with other CSS, customize the styles via package patches, or copy the contents into a different file and import that instead.

In addition to these stylesheets, the root project imports the `src/index.css` file, so its styles are used for every example. Be sure to take a look at this file: you may find some of these styles necessary in your own usage of the `<Tldraw/>` component.

#### HTML

The `index.html`'s meta viewport element for some important settings. These may not be critical to `<Tldraw/>` performing correctly, however some features (such as safe area positioning) may not work correctly if these are not set.

```html
<meta
	name="viewport"
	content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```
