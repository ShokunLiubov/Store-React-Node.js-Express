import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { compose } from 'redux'
import Paginator from '../../components/common/pagination/Pagination'
import FiltersCategoryPage from '../../components/store/filters/filtersCategory/FiltersCategoryPage'
import { MenuStore } from '../../components/store/menuStore/MenuStore'
import Sort from '../../components/store/sort/Sort'
import { useBasketModal } from '../../context/basketModalContext'
import { getUserInfo } from '../../redux/authReducer/authThunk'
import { addToBasket } from '../../redux/basketReducer/basketThunk'
import {
	getDataForFilters,
	getProducts,
} from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { publicUrl } from '../../routes/layout/PublicLayout'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import './categoryPage.scss'

interface ICategoryPage {
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
	getDataForFilters: any
	filters: any
}

export const CategoryPage: React.FC<ICategoryPage> = ({
	productsData,
	getProducts,
	addToBasket,
	getUserInfo,
	currentPage,
	totalPages,
	sortField,
	sortOrder,
	getDataForFilters,
	filters,
}) => {
	const { category } = useParams()
	const basket = useBasketModal()
	useEffect(() => {
		getDataForFilters()
		getProducts(currentPage, sortField, sortOrder, filters)
	}, [])

	const onPageChange = (page: number) => {
		getProducts(page, sortField, sortOrder, filters)
	}

	const setSortCatalog = (sortField: string, sortOrder: string) => {
		getProducts(1, sortField, sortOrder, filters)
	}

	let pageHeader =
		category === 'woman' ? "women's" : '' || category === 'man' ? "men's" : ''

	return (
		<>
			<MenuStore />
			<div className='pageHeader'>
				<span>
					{pageHeader ? pageHeader + ' perfumery' : category + ' perfumery'}
				</span>
			</div>
			<div className='containerCategoryPage'>
				<div className='filtersProducts'>
					<FiltersCategoryPage />
				</div>
				<div className='catalogProducts'>
					<div className={'carouselCategoryPage'}>
						<img src='./../../shopImg/imgCategory.jpeg' />
					</div>
					<div className={'blockSort'}>
						<Sort setSortCatalog={setSortCatalog} />
					</div>

					<div className={'productsStore'}>
						{productsData.length &&
							productsData.map((product: any) => (
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
							))}
					</div>
					<Paginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				</div>
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
		filters: state.product.filters,
	}
}

export default compose(
	connect(mapStateToProps, {
		getProducts,
		addToBasket,
		getUserInfo,
		getDataForFilters,
	}),
)(CategoryPage)
