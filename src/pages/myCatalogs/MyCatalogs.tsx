import cn from 'classnames'
import React, { useEffect } from 'react'
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
import { TableComponent } from '../../components/common/table/Table'
import {
	deleteProduct,
	editProduct,
	getProducts,
} from '../../redux/productReducer/product.thunk'
import { AppStateType } from '../../redux/redux-store'
import { adminUrl } from '../../routes/layout/Admin.layout'
import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import styles from './myCatalogs.module.scss'

interface IMyCatalogsProps {
	getProducts: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersProducts,
	) => Promise<string>
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
}): JSX.Element => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const pageOrDefault = searchParams.get('page') || 1
		getProducts(pageOrDefault, sortField, sortOrder, filters)
	}, [location])

	const onPageChange = async (page: number): Promise<void> => {
		let url = await getProducts(page, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	const setSort = async (
		sortField: string,
		sortOrder: string,
	): Promise<void> => {
		let url = await getProducts(1, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	return (
		<main className={cn('containerAdminWhite', styles.catalogs)}>
			<span className={'titleAdminPage'}>My Catalog</span>
			<FiltersMyCatalog />

			{!productsData.length ? (
				<div className={styles.notFound}>
					<span>Products Not Found </span>
				</div>
			) : (
				<TableComponent
					data={productsData.map(
						(product: IProduct): React.ReactNode => (
							<tr key={product._id} className={'cardProduct'}>
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
									<div className={'titleProduct'}>
										<span>{product.title}</span>
									</div>
								</td>
								<td>
									<div className={'titleCategory'}>
										<span>{product.category.name}</span>
									</div>
								</td>
								<td className={cn('numberDark')}>{product.count}</td>
								<td className={cn('numberDark')}>{product.price}$</td>
								<td>
									<NavLink
										to={adminUrl + 'edit-product'}
										className={cn('material-symbols-outlined', 'editIcon')}
										onClick={(): void => editProduct(product._id)}
									>
										edit_square
									</NavLink>
								</td>
								<td>
									<span
										className={cn('material-symbols-outlined', 'deleteIcon')}
										onClick={(): void => deleteProduct(product._id)}
									>
										delete
									</span>
								</td>
							</tr>
						),
					)}
					headers={[
						{ label: 'Image', field: 'username', order: false },
						{ label: 'Title', field: 'title', order: true },
						{
							label: 'Category',
							field: 'userInfo.phone',
							order: false,
							classTh: 'thSmall',
						},
						{
							label: 'Count',
							field: 'count',
							order: true,
							classTh: 'thSmall',
						},
						{
							label: 'Price',
							field: 'price',
							order: true,
							classTh: 'thSmall',
						},
						{ label: 'Edit', field: 'edit', order: false, classTh: 'thSmall' },
						{
							label: 'Delete',
							field: 'delete',
							order: false,
							classTh: 'thSmall',
						},
					]}
					onSort={setSort}
					classTable={'whiteTable'}
				/>
			)}
			<Paginator
				currentPage={page}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</main>
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
