import { App, Canvas, Tldraw } from '@tldraw/tldraw-beta'
import { ContextMenu, TldrawUi, TldrawUiContextProvider } from '@tldraw/ui'
import '@tldraw/tldraw-beta/tldraw.css'
import '@tldraw/ui/tldraw-ui.css'

export function Example() {
	const handleMount = (app: App) => {
		// You can access the app instance here, e.g. app.selectAll()
	}

	return (
		<div className="tldraw__editor">
			<Tldraw onMount={handleMount}>
				<TldrawUiContextProvider>
					<ContextMenu>
						<Canvas />
					</ContextMenu>
					<TldrawUi />
				</TldrawUiContextProvider>
			</Tldraw>
		</div>
	)
}
