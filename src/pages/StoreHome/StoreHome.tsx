import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { compose } from 'redux'
import { MenuStore } from '../../components/store/menuStore/MenuStore'
import { useBasketModal } from '../../context/basketModalContext'
import { useParam } from '../../context/paramsContext'
import { getUserInfo } from '../../redux/authReducer/authThunk'
import { addToBasket } from '../../redux/basketReducer/basketThunk'
import {
	getDataForFilters,
	getProducts,
} from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { getStoreHomeProducts } from '../../redux/storeReducer/storeThunk'
import { publicUrl } from '../../routes/layout/PublicLayout'
import './storeHome.scss'

interface IStoreHome {
	addToBasket: (id: string) => void
	getUserInfo: () => void

	getStoreHomeProducts: () => void
	homeProducts: any
	getDataForFilters: () => void
}

export const StoreHome: React.FC<IStoreHome> = ({
	addToBasket,
	getUserInfo,
	getStoreHomeProducts,
	homeProducts,
	getDataForFilters,
}) => {
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
		<>
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
									{category?.products.map((product: any) => {
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
															onClick={e => {
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
		</>
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
