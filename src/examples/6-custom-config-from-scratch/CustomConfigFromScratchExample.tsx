import { Box2d, Vec2d } from '@tldraw/primitives'
import {
	defineShape,
	TLBaseShape,
	Tldraw,
	TldrawEditorConfig,
	TLOpacityType,
	MenuGroup,
	menuItem,
	toolbarItem,
	TLShapeUtil,
	SVGContainer,
	StateNode,
	Vec2dModel,
	TLPointerEvent,
} from '@tldraw/tldraw'
import '@tldraw/tldraw/editor.css'
import '@tldraw/tldraw/ui.css'

// Let's make a custom shape called a Stamp, which places red dots on things!

// Shape Type
// ----------
// The shape type defines the stamp's type (`stamp`) and its props.
// Every shape needs an opacity prop (for now), but other than that
// you can add whatever you want, so long as it's JSON serializable.
type StampShape = TLBaseShape<
	'stamp',
	{
		opacity: TLOpacityType
	}
>

// Shape Definition
// ----------------
// The shape definition is used to tell TypeScript about the shape
// and to register the shape with the app.
export const StampShape = defineShape<StampShape>({
	type: 'stamp',
	getShapeUtil: () => StampUtil,
	// validator: createShapeValidator({ ... })
})

// Shape Util
// ----------
// The StampUtil class is used by the app to answer questions about a
// shape of the 'stamp' type. For example, what is the default props
// for this shape? What should we render for it, or for its indicator?
class StampUtil extends TLShapeUtil<StampShape> {
	static type = 'stamp'

	// There are a LOT of other things we could add here, like these flags
	override isAspectRatioLocked = (shape: StampShape) => true
	override canResize = (shape: StampShape) => false
	override canBind = (shape: StampShape) => true

	static WIDTH = 40
	static HEIGHT = 40

	override defaultProps(): StampShape['props'] {
		return {
			opacity: '1',
		}
	}

	override getBounds(shape: StampShape): Box2d {
		return Box2d.From({
			x: 0,
			y: 0,
			w: StampUtil.WIDTH,
			h: StampUtil.HEIGHT,
		})
	}

	override getCenter(shape: StampShape): Vec2dModel {
		return Vec2d.From({
			x: StampUtil.WIDTH / 2,
			y: StampUtil.HEIGHT / 2,
			z: 0,
		})
	}

	override getOutline(shape: StampShape): Vec2dModel[] {
		return [
			Vec2d.From({ x: 0, y: 0, z: 0 }),
			Vec2d.From({ x: StampUtil.WIDTH, y: 0, z: 0 }),
			Vec2d.From({ x: StampUtil.WIDTH, y: StampUtil.HEIGHT, z: 0 }),
			Vec2d.From({ x: 0, y: StampUtil.HEIGHT, z: 0 }),
		]
	}

	// This is the component that will be rendered for the shape.
	// Try changing the contents of the SVGContainer to see what happens.
	render(shape: StampShape) {
		// You can access class methods from here
		const bounds = this.bounds(shape)

		// Render a filled circle
		return (
			<SVGContainer
				id={shape.id}
				style={{
					pointerEvents: 'all',
				}}
			>
				<svg>
					<circle fill="red" cx={bounds.w / 2} cy={bounds.h / 2} r={bounds.w / 2} />
				</svg>
			</SVGContainer>
		)
	}

	// The indicator is used when hovering over a shape or when it's selected.
	// This can only be SVG path data; generally you want the outline of the
	// component you're rendering.
	indicator(shape: StampShape) {
		return <circle cx={StampUtil.WIDTH / 2} cy={StampUtil.HEIGHT / 2} r={StampUtil.WIDTH / 2} />
	}
}

// Tool
// ----
export class StampTool extends StateNode {
	static id = 'stamp'
	static initial = 'idle'
	shapeType = 'stamp'

	override onPointerDown?: TLPointerEvent | undefined = (info) => {
		const { app } = this
		const pageSpacePoint = app.screenToPage(info.point.x, info.point.y)
		const shapesAtPoint = app.getShapesAtPoint(pageSpacePoint)
		const highestShape = shapesAtPoint[shapesAtPoint.length - 1]

		const stampId = app.createShapeId()
		app.createShapes([{
			id: stampId,
			type: 'stamp',
			x: pageSpacePoint.x - StampUtil.WIDTH / 2,
			y: pageSpacePoint.y - StampUtil.HEIGHT / 2,
			props: {
				opacity: '1',
			},
		}])

		app.reparentShapes([stampId], highestShape?.id ?? null)
	}
}

// Finally, collect the custom tools and shapes into a config object
const customTldrawConfig = new TldrawEditorConfig({
	tools: [StampTool],
	shapes: [StampShape],
	allowUnknownShapes: true,
})

// ... and we can make our custom shape example!
export default function () {
	return (
		<div className="tldraw__editor">
			<Tldraw
				config={customTldrawConfig}
				overrides={{
					tools(app, tools) {
						// In order for our custom tool to show up in the UI...
						// We need to add it to the tools list. This "toolItem"
						// has information about its icon, label, keyboard shortcut,
						// and what to do when it's selected.
						tools.stamp = {
							id: 'stamp',
							icon: 'color',
							label: 'Stamp' as any,
							kbd: 's',
							readonlyOk: false,
							onSelect: () => {
								app.setSelectedTool('stamp')
							},
						}
						return tools
					},
					toolbar(app, toolbar, { tools }) {
						// The toolbar is an array of items. We can add it to the
						// end of the array or splice it in, then return the array.
						toolbar.splice(4, 0, toolbarItem(tools.stamp))
						return toolbar
					},
					keyboardShortcutsMenu(app, keyboardShortcutsMenu, { tools }) {
						// Same for the keyboard shortcuts menu, but this menu contains
						// both items and groups. We want to find the "Tools" group and
						// add it to that before returning the array.
						const toolsGroup = keyboardShortcutsMenu.find(
							(group) => group.id === 'shortcuts-dialog.tools'
						) as MenuGroup
						toolsGroup.children.push(menuItem(tools.stamp))
						return keyboardShortcutsMenu
					},
				}}
			/>
		</div>
	)
}
