<div alt style="text-align: center; transform: scale(.5);">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="https://github.com/tldraw/tldraw-examples/raw/main/assets/github-hero-dark-draw.png" />
		<img alt="Signia" src="https://github.com/tldraw/tldraw-examples/raw/main/assets/github-hero-light-draw.png" />
	</picture>
</div>

# tldraw-examples

Welcome to the tldraw example repository. Here you will find examples of using the new tldraw v2 library. Each example is organized as a route in the `src/examples` folder.

👉 Try it on [CodeSandbox](https://codesandbox.io/p/github/tldraw/tldraw-examples/main?file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522clf70mxin006cf0hdaqgkclmi%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clf70n0jd000x3b6j7um8cy5s%2522%253A%257B%2522key%2522%253A%2522clf70n0jd000x3b6j7um8cy5s%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522key%2522%253A%2522clf8ant6h00dc3b6islra7ra9%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522key%2522%253A%2522clf8ant8h00eo3b6iz2mg6gm0%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clf70n0jd000x3b6j7um8cy5s%2522%252C%2522spacesOrder%2522%253A%255B%2522clf70n0jd000x3b6j7um8cy5s%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D)

## Local Development

This repository contains a regular [Vite](https://vitejs.dev/) app.

To run the project locally, first fork and clone this repo.

Install dependencies:

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

## License

The code in this repo is licensed under MIT.

The various tldraw libraries are licensed mostly under Apache 2.0.
