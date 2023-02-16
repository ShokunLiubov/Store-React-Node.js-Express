import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import Paginator from '../../components/common/pagination/Pagination'
import { MenuStore } from '../../components/store/menuStore/MenuStore'
import { useBasketModal } from '../../context/basketModalContext'
import { addToBasket } from '../../redux/basketReducer/basketThunk'
import { getProducts } from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { getUserInfo } from '../../redux/userReducer/userThunk'
import { IProduct } from '../../shared/interfaces/product.interface'
import styles from './storeHome.module.scss'

interface IStoreHome {
	productsData: Array<IProduct>
	getProducts: (currentPage: number) => void
	addToBasket: (id: string) => void
	getUserInfo: () => void
	currentPage: number
	totalPages: number
}

export const StoreHome: React.FC<IStoreHome> = ({
	productsData,
	getProducts,
	addToBasket,
	getUserInfo,
	currentPage,
	totalPages,
}) => {
	const basket = useBasketModal()
	useEffect(() => {
		getProducts(currentPage)
	}, [])

	const onPageChange = (page: number) => {
		getProducts(page)
	}

	return (
		<>
			<MenuStore />
			<div className={styles.carousel}>
				<img src='./../../shopImg/bcgimg.jpeg' />
			</div>

			<div className={styles.productsStore}>
				{productsData.length &&
					productsData.map((product: any) => (
						<NavLink to={''} key={product._id} className={styles.product}>
							<img src={product.image} />
							<div className={styles.info}>
								<h1>{product.title}</h1>
								<p>{product.price}$</p>
								<div onClick={basket.toggleBasketModal}>
									<button
										onClick={() => {
											addToBasket(product._id)
											getUserInfo()
										}}
									>
										Buy
									</button>
								</div>
							</div>
						</NavLink>
					))}
			</div>
			<Paginator
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsData: state.product.productsData,
		currentPage: state.product.currentPage,
		totalPages: state.product.totalPages,
	}
}

export default compose(
	connect(mapStateToProps, { getProducts, addToBasket, getUserInfo }),
)(StoreHome)
