import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/editor/tldraw.css'
import '@tldraw/ui/tldraw-ui.css'

export default function () {
	return (
		<div className="tldraw__editor">
			<Tldraw />
		</div>
	)
}
