import { ErrorBoundary, ErrorFallback } from '@tldraw/tldraw'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ExampleBasic from './1-basic/BasicExample'
import ExampleApi from './2-api/APIExample'
import CustomConfigExample from './3-custom-config/CustomConfigExample'
import CustomUiExample from './4-custom-ui/CustomUiExample'
import ExplodedExample from './5-exploded/ExplodedExample'
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
		<ErrorBoundary
			fallback={(error) => <ErrorFallback error={error} />}
			onError={(error) => console.error(error)}
		>
			<RouterProvider router={router} />
		</ErrorBoundary>
	</StrictMode>
)
