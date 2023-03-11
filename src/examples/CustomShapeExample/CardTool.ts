import { TLBoxTool } from '@tldraw/tldraw-beta'

export class CardTool extends TLBoxTool {
	static id = 'card'
	static initial = 'idle'
	shapeType = 'card'
}
