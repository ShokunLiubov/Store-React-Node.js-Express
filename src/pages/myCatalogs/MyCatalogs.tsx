import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	NavLink,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom'
import { compose } from 'redux'
import FiltersMyCatalog from '../../components/admin/filters/filtersMyCatalog/FiltersMyCatalog'
import Paginator from '../../components/common/pagination/Pagination'
import {
	deleteProduct,
	editProduct,
	getProducts,
} from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { adminUrl } from '../../routes/layout/AdminLayout'
import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import styles from './myCatalogs.module.scss'

interface IMyCatalogsProps {
	getProducts: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersProducts,
	) => any
	productsData: Array<IProduct>
	deleteProduct: (id: string) => void
	page: number
	totalPages: number
	editProduct: (productId: string) => void
	sortField: string
	sortOrder: string
	filters: IFiltersProducts
}

export const MyCatalogs: React.FC<IMyCatalogsProps> = ({
	getProducts,
	productsData,
	deleteProduct,
	page,
	totalPages,
	editProduct,
	sortField,
	sortOrder,
	filters,
}) => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const pageOrDefault = searchParams.get('page') || 1
		getProducts(pageOrDefault, sortField, sortOrder, filters)
	}, [location])

	const [sort, setSort] = useState('1')

	const onPageChange = async (page: number) => {
		let url = await getProducts(page, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	const setSortCatalog = async (sortField: string, sortOrder: string) => {
		if (sortOrder === '1') {
			setSort('-1')
		} else {
			setSort('1')
			sortOrder = '-1'
		}

		let url = await getProducts(1, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	const sortOrderSpan = (
		<span className='material-symbols-outlined'>
			{sort === '1' ? 'expand_less' : 'expand_more'}
		</span>
	)

	return (
		<div className={cn('containerAdminWhite', styles.catalogs)}>
			<span className={'titleAdminPage'}>My Catalog</span>
			<FiltersMyCatalog />
			<div className={styles.line}></div>

			{!productsData.length ? (
				<div className={styles.notFound}>
					<span>Products Not Found </span>
				</div>
			) : (
				<table className={styles.catalogTable}>
					<thead>
						<tr>
							<th>Image</th>
							<th
								onClick={() => setSortCatalog('title', sort)}
								className={cn(styles.sort)}
							>
								Title
								{sortOrderSpan}
							</th>
							<th className={styles.thSmall}>Category</th>
							<th
								onClick={() => setSortCatalog('count', sort)}
								className={cn(styles.sort, styles.thSmall)}
							>
								Count
								{sortOrderSpan}
							</th>
							<th
								className={cn(styles.thSmall, styles.sort)}
								onClick={() => setSortCatalog('price', sort)}
							>
								Price
								{sortOrderSpan}
							</th>
							<th className={styles.thSmall}>Edit</th>
							<th className={styles.thSmall}>Delete</th>
						</tr>
					</thead>
					<tbody>
						{productsData.length > 0 &&
							productsData.map((product: any) => (
								<tr key={product._id} className={styles.cardProduct}>
									<td>
										<img
											src={
												product.image
													? product.image
													: './../../image_product/112cd464-94fd-4fbe-9200-5e7e83fe4c69_640x490_fit.jpeg'
											}
										/>
									</td>
									<td>
										<div className={styles.titleProduct}>
											<span>{product.title}</span>
										</div>
									</td>
									<td>
										<div className={styles.titleCategory}>
											<span>{product.category.name}</span>
										</div>
									</td>
									<td className={cn('numberDark')}>{product.count}</td>
									<td className={cn('numberDark')}>{product.price}$</td>
									<td>
										<NavLink
											to={adminUrl + 'edit-product'}
											className={cn(
												'material-symbols-outlined',
												styles.editIcon,
											)}
											onClick={() => editProduct(product._id)}
										>
											edit_square
										</NavLink>
									</td>
									<td>
										<span
											className={cn(
												'material-symbols-outlined',
												styles.deleteIcon,
											)}
											onClick={() => deleteProduct(product._id)}
										>
											delete
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
			<Paginator
				currentPage={page}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
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
	connect(mapStateToProps, { getProducts, deleteProduct, editProduct }),
)(MyCatalogs)
