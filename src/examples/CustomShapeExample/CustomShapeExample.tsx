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
import {
	ContextMenu,
	MenuGroup,
	menuItem,
	TldrawUi,
	TldrawUiContextProvider,
	TldrawUiOverrides,
	toolbarItem,
} from '@tldraw/ui'
import '@tldraw/tldraw-beta/tldraw.css'
import '@tldraw/ui/tldraw-ui.css'
import { TLBoxTool } from '@tldraw/tldraw-beta'

// Let's make a custom shape called a Card.

// Shape Type
// ----------
// The shape type defines the card's type (`card`) and its props.
// Every shape needs an opacity prop (for now), but other than that
// you can add whatever you want, so long as it's JSON serializable.
type CardShape = TLBaseShape<
	'card',
	{
		w: number
		h: number
		opacity: TLOpacityType
	}
>

// Shape Definition
// ----------------
// The shape definition is used to tell TypeScript about the shape
// and to register the shape with the app.
export const CardShape = defineShape<CardShape>({
	type: 'card',
	getShapeUtil: () => CardUtil,
	// validator: createShapeValidator({ ... })
})

// Shape Util
// ----------
// The CardUtil class is used by the app to answer questions about a
// shape of the 'card' type. For example, what is the default props
// for this shape? What should we render for it, or for its indicator?
class CardUtil extends TLBoxUtil<CardShape> {
	static type = 'card'

	// There are a LOT of other things we could add here, like these flags
	override isAspectRatioLocked = (shape: CardShape) => false
	override canResize = (shape: CardShape) => true
	override canBind = (shape: CardShape) => true

	override defaultProps(): CardShape['props'] {
		return {
			opacity: '1',
			w: 300,
			h: 300,
		}
	}

	// This is the component that will be rendered for the shape.
	// Try changing the contents of the HTMLContainer to see what happens.
	render(shape: CardShape) {
		return (
			<HTMLContainer id={shape.id} style={{ border: '1px solid black' }}>
				hello
			</HTMLContainer>
		)
	}

	// The indicator is used when hovering over a shape or when it's selected.
	// This can only be SVG path data; generally you want the outline of the
	// component you're rendering.
	indicator(shape: CardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}

// Tool
// ----
// Because the card tool can be just a rectangle, we can extend the
// TLBoxTool class. This gives us a lot of functionality for free.
export class CardTool extends TLBoxTool {
	static id = 'card'
	static initial = 'idle'
	shapeType = 'card'
}

// Finally, collect the custom tools and shapes into a config object
const customTldrawConfig = new TldrawConfig({
	tools: [CardTool],
	shapes: [CardShape],
	allowUnknownShapes: true,
})

// ... and we can make our custom shape example!
export function CustomShapeExample() {
	const handleMount = (app: App) => {
		// You can access the app instance here, e.g. app.selectAll()
	}

	return (
		<div className="tldraw__editor">
			<Tldraw config={customTldrawConfig} onMount={handleMount}>
				<TldrawUiContextProvider
					overrides={{
						tools(app, tools) {
							// In order for our custom tool to show up in the UI...
							// We need to add it to the tools list. This "toolItem"
							// has information about its icon, label, keyboard shortcut,
							// and what to do when it's selected.
							tools.card = {
								id: 'card',
								icon: 'color',
								label: 'Card' as any,
								kbd: 'c',
								readonlyOk: false,
								onSelect: () => {
									app.setSelectedTool('card')
								},
							}
							return tools
						},
						toolbar(app, toolbar, { tools }) {
							// The toolbar is an array of items. We can add it to the
							// end of the array or splice it in, then return the array.
							toolbar.splice(4, 0, toolbarItem(tools.card))
							return toolbar
						},
						keyboardShortcutsMenu(app, keyboardShortcutsMenu, { tools }) {
							// Same for the keyboard shortcuts menu, but this menu contains
							// both items and groups. We want to find the "Tools" group and
							// add it to that before returning the array.
							const toolsGroup = keyboardShortcutsMenu.find(
								(group) => group.id === 'shortcuts-dialog.tools'
							) as MenuGroup
							toolsGroup.children.push(menuItem(tools.card))
							return keyboardShortcutsMenu
						},
					}}
				>
					<ContextMenu>
						<Canvas />
					</ContextMenu>
					<TldrawUi />
				</TldrawUiContextProvider>
			</Tldraw>
		</div>
	)
}
