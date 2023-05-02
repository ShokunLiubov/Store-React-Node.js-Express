import { ISidebar } from './../../shared/interfaces/sidebar.interface'

const adminUrl = '/make-up-admin/'

export const SIDEBAR_ADMIN_MENU: ISidebar[] = [
	{
		path: adminUrl + 'my-catalogs',
		icon: 'menu_book',
		title: 'My Catalogs',
	},
	{
		path: adminUrl + 'new-product',
		icon: 'library_add',
		title: 'New Product',
	},
	{ path: adminUrl + 'orders', icon: 'list_alt', title: 'Orders' },
	{ path: adminUrl + 'customers', icon: 'group', title: 'Customers' },
	{
		path: adminUrl + 'delivery',
		icon: 'local_shipping',
		title: 'Delivery',
	},
	{
		path: adminUrl + 'stats',
		icon: 'signal_cellular_alt',
		title: 'Dashboard',
	},
]