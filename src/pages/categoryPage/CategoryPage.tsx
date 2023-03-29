import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
	NavLink,
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom'
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
		page: number | string,
		sortField: string,
		sortOrder: string,
		filter: any,
	) => any
	addToBasket: (id: string) => void
	getUserInfo: () => void
	page: number
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
	page,
	totalPages,
	sortField,
	sortOrder,
	getDataForFilters,
	filters,
}) => {
	const { category } = useParams()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const location = useLocation()

	const pageGender =
		category === 'woman'
			? "women's"
			: '' || category === 'man'
			? "men's"
			: '' || category === 'unisex'
			? 'unisex'
			: ''

	const classificationPage =
		category === 'elite' || category === 'nisheva' || category === 'natural'

	const basket = useBasketModal()
	useEffect(() => {
		getDataForFilters()
	}, [])

	const onPageChange = async (page: number) => {
		let url = await getProducts(page, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	const setSortCatalog = async (sortField: string, sortOrder: string) => {
		let url = await getProducts(1, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	return (
		<>
			<MenuStore />
			<div className='pageHeader'>
				<span>{pageGender ? pageGender + ' perfumery' : ''}</span>
				<span>{classificationPage ? category + ' perfumery' : ''}</span>
				<span>{!classificationPage && !pageGender ? category : ''}</span>
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
						currentPage={page}
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
		page: state.product.currentPage,
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
