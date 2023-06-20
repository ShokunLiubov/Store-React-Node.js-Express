import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { compose } from 'redux'
import { MenuStore } from '../../components/store/menuStore/MenuStore'
import { useBasketModal } from '../../context/basketModal.context'
import { useParam } from '../../context/params.context'
import { getUserInfo } from '../../redux/authReducer/auth.thunk'
import { addToBasket } from '../../redux/basketReducer/basket.thunk'
import {
	getDataForFilters,
	getProducts,
} from '../../redux/productReducer/product.thunk'
import { AppStateType } from '../../redux/redux-store'
import { getStoreHomeProducts } from '../../redux/storeReducer/store.thunk'
import { publicUrl } from '../../routes/layout/Public.layout'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import { IStoreHomeProducts } from '../../shared/interfaces/storeInterface/storeHomeProducts.interface'
import './storeHome.scss'

interface IStoreHomeProps {
	addToBasket: (id: string) => void
	getUserInfo: () => void
	getStoreHomeProducts: () => void
	getDataForFilters: () => void
	homeProducts: IStoreHomeProducts[]
}

export const StoreHome: React.FC<IStoreHomeProps> = ({
	addToBasket,
	getUserInfo,
	getStoreHomeProducts,
	getDataForFilters,
	homeProducts,
}): JSX.Element => {
	const location = useLocation()
	const navigate = useNavigate()
	const params = useParam()

	const resetSearchParams = () => {
		navigate(location.pathname)
		params.clearParams()
	}
	const basket = useBasketModal()
	useEffect(() => {
		getDataForFilters()
		getStoreHomeProducts()
	}, [])

	return (
		<main>
			<MenuStore />
			<div className={'carousel'}>
				<img src='./../../shopImg/bcgimg.jpeg' />
			</div>

			<div className={'storeHome'}>
				{homeProducts.length ? (
					homeProducts.map((category: any) => {
						return (
							<div key={category.name}>
								<div className='category'>
									<NavLink
										to={publicUrl + 'category/' + category.slug}
										onClick={resetSearchParams}
									>
										{category.name}
									</NavLink>
								</div>
								<div className='products'>
									{category?.products.map((product: IProduct) => {
										return (
											<NavLink
												to={publicUrl + 'product/' + product._id}
												key={product._id}
												className={'product'}
											>
												<img src={product.image} />
												<div className={'info'}>
													<h1>{product.title}</h1>
													<p>{product.price}$</p>
													<div onClick={basket.toggleBasketModal}>
														<button
															onClick={(
																e: React.MouseEvent<HTMLButtonElement>,
															): void => {
																e.preventDefault()
																addToBasket(product._id)
																getUserInfo()
															}}
														>
															Buy
														</button>
													</div>
												</div>
											</NavLink>
										)
									})}
								</div>
							</div>
						)
					})
				) : (
					<div className='unexpected'>Unexpected error</div>
				)}
			</div>
		</main>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsData: state.product.productsData,
		currentPage: state.product.currentPage,
		totalPages: state.product.totalPages,
		sortField: state.product.sortField,
		sortOrder: state.product.sortOrder,
		homeProducts: state.store.home,
	}
}

export default compose(
	connect(mapStateToProps, {
		getProducts,
		addToBasket,
		getUserInfo,
		getStoreHomeProducts,
		getDataForFilters,
	}),
)(StoreHome)
