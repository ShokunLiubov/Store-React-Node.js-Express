import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import Paginator from '../../components/common/pagination/Pagination'
import { MenuStore } from '../../components/store/menuStore/MenuStore'
import Sort from '../../components/store/sort/Sort'
import { useBasketModal } from '../../context/basketModalContext'
import { addToBasket } from '../../redux/basketReducer/basketThunk'
import { getProducts } from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { getUserInfo } from '../../redux/userReducer/userThunk'
import { publicUrl } from '../../routes/layout/PublicLayout'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import styles from './storeHome.module.scss'

interface IStoreHome {
	productsData: Array<IProduct>
	getProducts: (
		currentPage: number,
		sortField: string,
		sortOrder: string,
		filter: any,
	) => void
	addToBasket: (id: string) => void
	getUserInfo: () => void
	currentPage: number
	totalPages: number
	sortField: string
	sortOrder: string
}

export const StoreHome: React.FC<IStoreHome> = ({
	productsData,
	getProducts,
	addToBasket,
	getUserInfo,
	currentPage,
	totalPages,
	sortField,
	sortOrder,
}) => {
	const basket = useBasketModal()
	useEffect(() => {
		getProducts(currentPage, sortField, sortOrder, {})
	}, [])

	const onPageChange = (page: number) => {
		getProducts(page, sortField, sortOrder, {})
	}

	const setSortCatalog = (sortField: string, sortOrder: string) => {
		getProducts(1, sortField, sortOrder, {})
	}

	return (
		<>
			<MenuStore />
			<div className={styles.carousel}>
				<img src='./../../shopImg/bcgimg.jpeg' />
			</div>
			<div className={styles.blockSort}>
				<Sort setSortCatalog={setSortCatalog} />
			</div>

			<div className={styles.productsStore}>
				{productsData.length &&
					productsData.map((product: any) => (
						<NavLink
							to={publicUrl + 'product/' + product._id}
							key={product._id}
							className={styles.product}
						>
							<img src={product.image} />
							<div className={styles.info}>
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
		sortField: state.product.sortField,
		sortOrder: state.product.sortOrder,
	}
}

export default compose(
	connect(mapStateToProps, { getProducts, addToBasket, getUserInfo }),
)(StoreHome)
