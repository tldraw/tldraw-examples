import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/editor.css'
import '@tldraw/tldraw/ui.css'

export default function () {
	return (
		<div className="tldraw__editor">
			<Tldraw />
		</div>
	)
}
