import { Pages } from '../pages/PagesCombiner'
import { IRoutes } from '../shared/interfaces/routes.interface'
import { adminUrl } from './layout/AdminLayout'
import { authUrl } from './layout/AuthLayout'
import { Layouts } from './layout/Layouts'
import { publicUrl } from './layout/PublicLayout'

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
		Component: Pages.Stats,
		Layout: Layouts.AdminLayout,
		baseUrl: adminUrl,
	},

	{
		path: 'login',
		Component: Pages.Login,
		Layout: Layouts.AuthLayout,
		baseUrl: authUrl,
	},
	{
		path: 'register',
		Component: Pages.Register,
		Layout: Layouts.AuthLayout,
		baseUrl: authUrl,
	},
	{
		path: '',
		Component: Pages.StoreHome,
		Layout: Layouts.PublicLayout,
		baseUrl: publicUrl,
	},
	{
		path: ':id',
		Component: Pages.StoreHome, //component Product
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
		path: '*',
		Component: Pages.Notfound,
		Layout: Layouts.AuthLayout,
	},
]
