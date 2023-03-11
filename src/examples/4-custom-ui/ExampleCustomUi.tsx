import { App, Canvas, Tldraw, TldrawEditor, useApp } from '@tldraw/tldraw'
import { ContextMenu, TldrawUi, TldrawUiContextProvider } from '@tldraw/ui'
import '@tldraw/editor/tldraw.css'
import './custom-ui.css'
import { track, useValue } from 'signia-react'
import { useEffect } from 'react'

export default function () {
	return (
		<div className="tldraw__editor">
			<TldrawEditor>
				<Canvas />
				<CustomUi />
			</TldrawEditor>
		</div>
	)
}

const CustomUi = track(() => {
	const app = useApp()

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'Delete':
				case 'Backspace': {
					app.deleteShapes()
				}
			}
		}

		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keyup', handleKeyUp)
		}
	})

	return (
		<div className="custom-layout">
			<div className="custom-toolbar">
				<button
					className="custom-button"
					data-isactive={app.currentToolId === 'select'}
					onClick={() => app.setSelectedTool('select')}
				>
					Select
				</button>
				<button
					className="custom-button"
					data-isactive={app.currentToolId === 'draw'}
					onClick={() => app.setSelectedTool('draw')}
				>
					Pencil
				</button>
				<button
					className="custom-button"
					data-isactive={app.currentToolId === 'eraser'}
					onClick={() => app.setSelectedTool('eraser')}
				>
					Eraser
				</button>
			</div>
		</div>
	)
})
