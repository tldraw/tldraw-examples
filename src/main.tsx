import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ExampleBasic from './examples/1-basic/ExampleBasic'
import ExampleApi from './examples/2-api/ExampleApi'
import ExampleCustom from './examples/3-custom/ExampleCustom'
import ExampleCustomUi from './examples/4-custom-ui/ExampleCustomUi'
import './index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <ExampleBasic />,
	},
	{
		path: '/api',
		element: <ExampleApi />,
	},
	{
		path: '/custom',
		element: <ExampleCustom />,
	},
	{
		path: '/custom-ui',
		element: <ExampleCustomUi />,
	},
])

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
