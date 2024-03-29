import { Pages } from '../pages/PagesCombiner'
import { IRoutes } from '../shared/interfaces/routes.interface'
import { adminUrl } from './layout/Admin.layout'
import { authUrl } from './layout/Auth.layout'
import { Layouts } from './layout/Layouts'
import { publicUrl } from './layout/Public.layout'

export const AppRoutes: Array<IRoutes> = [
	{
		path: 'my-catalogs',
		Component: Pages.MyCatalogs,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},
	{
		path: 'edit-product',
		Component: Pages.CreateProduct,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},
	{
		path: 'new-product',
		Component: Pages.CreateProduct,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},
	{
		path: 'customers',
		Component: Pages.Customers,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},
	{
		path: 'orders',
		Component: Pages.Orders,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},
	{
		path: 'stats',
		Component: Pages.Dashboard,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},
	{
		path: 'delivery',
		Component: Pages.Delivery,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},
	{
		path: 'login',
		Component: Pages.Auth,
		Layout: Layouts.AuthLayout,
		baseUrl: publicUrl + authUrl,
	},
	{
		path: 'register',
		Component: Pages.Auth,
		Layout: Layouts.AuthLayout,
		baseUrl: publicUrl + authUrl,
	},
	{
		path: '',
		Component: Pages.StoreHome,
		Layout: Layouts.PublicLayout,
		baseUrl: publicUrl,
	},
	{
		path: 'product/:id',
		Component: Pages.ProductPage,
		Layout: Layouts.PublicLayout,
		baseUrl: publicUrl,
	},
	{
		path: 'checkout',
		Component: Pages.CreateOrder,
		Layout: Layouts.PublicLayout,
		baseUrl: publicUrl,
	},
	{
		path: 'complete',
		Component: Pages.CompleteOrder,
		Layout: Layouts.PublicLayout,
		baseUrl: publicUrl,
	},
	{
		path: 'category/:category',
		Component: Pages.CategoryPage,
		Layout: Layouts.PublicLayout,
		baseUrl: publicUrl,
	},
	{
		path: 'search',
		Component: Pages.CategoryPage,
		Layout: Layouts.PublicLayout,
		baseUrl: publicUrl,
	},
	{
		path: '*',
		Component: Pages.Notfound,
		Layout: Layouts.AuthLayout,
	},
]
