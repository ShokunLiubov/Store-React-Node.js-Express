import Auth from './auth/Auth'
import CategoryPage from './categoryPage/CategoryPage'
import CompleteOrder from './completeOrder/CompleteOrder'
import CreateOrder from './createOrder/createOrder'
import CreateProduct from './createProduct/CreateProduct'
import Customers from './customers/Customers'
import Dashboard from './dashboard/Dashboard'
import Delivery from './delivery/Delivery'
import MyCatalogs from './myCatalogs/MyCatalogs'
import { Notfound } from './notfound/Notfound'
import Orders from './orders/Orders'
import ProductPage from './productPage/ProductPage'
import StoreHome from './storeHome/StoreHome'

export const Pages = {
	MyCatalogs: () => <MyCatalogs />,
	CreateProduct: () => <CreateProduct />,
	Customers: () => <Customers />,
	Orders: () => <Orders />,
	Dashboard: () => <Dashboard />,
	Notfound: () => <Notfound />,
	Auth: () => <Auth />,
	StoreHome: () => <StoreHome />,
	CreateOrder: () => <CreateOrder />,
	ProductPage: () => <ProductPage />,
	CompleteOrder: () => <CompleteOrder />,
	CategoryPage: () => <CategoryPage />,
	Delivery: () => <Delivery />,
}
