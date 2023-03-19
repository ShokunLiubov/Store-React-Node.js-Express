import CompleteOrder from './completeOrder/CompleteOrder'
import CreateOrder from './createOrder/createOrder'
import CreateProduct from './createProduct/CreateProduct'
import Customers from './customers/Customers'
import Login from './login/Login'
import MyCatalogs from './myCatalogs/MyCatalogs'
import { Notfound } from './notfound/Notfound'
import Orders from './orders/Orders'
import ProductPage from './productPage/ProductPage'
import Register from './register/Register'
import { Stats } from './stats/Stats'
import StoreHome from './storeHome/StoreHome'

export const Pages = {
	MyCatalogs: () => <MyCatalogs />,
	CreateProduct: () => <CreateProduct />,
	Customers: () => <Customers />,
	Orders: () => <Orders />,
	Stats: () => <Stats />,
	Notfound: () => <Notfound />,
	Login: () => <Login />,
	Register: () => <Register />,
	StoreHome: () => <StoreHome />,
	CreateOrder: () => <CreateOrder />,
	ProductPage: () => <ProductPage />,
	CompleteOrder: () => <CompleteOrder />,
}
