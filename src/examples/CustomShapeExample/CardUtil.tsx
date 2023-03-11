import { HTMLContainer, TLBaseShape, TLBoxUtil } from '@tldraw/tldraw-beta'

export type CardShapeProps = {
	w: number
	h: number
	opacity: number
}

export type CardShape = TLBaseShape<'card', CardShapeProps>

declare module '@tldraw/tlschema' {
	export interface TLCustomShapeProps {
		card: CardShapeProps
	}
}

export class CardUtil extends TLBoxUtil<CardShape> {
	static type = 'card'

	defaultProps(): CardShapeProps {
		return {
			w: 64 * 2,
			h: 89 * 2,
			opacity: 1,
		}
	}

	render(shape: CardShape) {
		return (
			<HTMLContainer
				className="rs-hitarea-stroke"
				style={{
					width: '100%',
					height: '100%',
					backgroundColor: '#efefef',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					border: '1px solid #777',
					borderRadius: 2,
				}}
			>
				{/* Something here */}
			</HTMLContainer>
		)
	}

	indicator(shape: CardShape) {
		const { h, w } = shape.props
		return <rect x={0} y={0} width={w} height={h} rx={2} ry={2} />
	}
}
