import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Example } from './examples/Example'
import { CustomShapeExample } from './examples/CustomShapeExample'
import './index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Example />,
	},
	{
		path: '/custom',
		element: <CustomShapeExample />,
	},
])

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
