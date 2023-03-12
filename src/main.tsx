import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ExampleBasic from './examples/1-basic/BasicExample'
import ExampleApi from './examples/2-api/APIExample'
import CustomConfigExample from './examples/3-custom-config/CustomConfigExample'
import CustomUiExample from './examples/4-custom-ui/CustomUiExample'
import ExplodedExample from './examples/5-exploded/ExplodedExample'
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
		element: <CustomConfigExample />,
	},
	{
		path: '/custom-ui',
		element: <CustomUiExample />,
	},
	{
		path: '/exploded',
		element: <ExplodedExample />,
	},
])

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
