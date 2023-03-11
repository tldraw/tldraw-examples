import {
	App,
	Canvas,
	defineShape,
	HTMLContainer,
	TLBaseShape,
	TLBoxUtil,
	Tldraw,
	TldrawConfig,
	TLOpacityType,
} from '@tldraw/tldraw-beta'
import { ContextMenu, TldrawUi, TldrawUiContextProvider } from '@tldraw/ui'
import '@tldraw/tldraw-beta/tldraw.css'
import '@tldraw/ui/tldraw-ui.css'
import { TLBoxTool } from '@tldraw/tldraw-beta'

type CardShape = TLBaseShape<
	'card',
	{
		w: number
		h: number
		opacity: TLOpacityType
	}
>

export const CardShape = defineShape<CardShape>({
	type: 'card',
	getShapeUtil: () => CardUtil,
})

class CardUtil extends TLBoxUtil<CardShape> {
	static type = 'card'

	override defaultProps(): CardShape['props'] {
		return {
			opacity: '1',
			w: 300,
			h: 300,
		}
	}

	render(shape: CardShape) {
		return (
			<HTMLContainer id={shape.id} style={{ border: '1px solid black' }}>
				hello
			</HTMLContainer>
		)
	}

	indicator(shape: CardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}

export class CardTool extends TLBoxTool {
	static id = 'card'
	static initial = 'idle'
	shapeType = 'card'
}

const customTldrawConfig = new TldrawConfig({
	tools: [CardTool],
	shapes: [CardShape],
})

export function CustomShapeExample() {
	const handleMount = (app: App) => {
		// You can access the app instance here, e.g. app.selectAll()
	}

	return (
		<div className="tldraw__editor">
			<Tldraw config={customTldrawConfig} onMount={handleMount}>
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
