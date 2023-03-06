import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import FiltersMyCatalog from '../../components/admin/filters/filtersMyCatalog/FiltersMyCatalog'
import Paginator from '../../components/common/pagination/Pagination'
import {
	deleteProduct,
	editProduct,
	getProducts,
} from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { IProduct } from '../../shared/interfaces/product.interface'
import styles from './myCatalogs.module.scss'

interface IMyCatalogsProps {
	getProducts: (
		currentPage: number,
		sortField: string,
		sortOrder: string,
		values: any,
	) => void
	productsData: Array<IProduct>
	deleteProduct: (id: string) => void
	currentPage: number
	totalPages: number
	editProduct: (productId: string) => void
	sortField: string
	sortOrder: string
	filters: any
}

export const MyCatalogs: React.FC<IMyCatalogsProps> = ({
	getProducts,
	productsData,
	deleteProduct,
	currentPage,
	totalPages,
	editProduct,
	sortField,
	sortOrder,
	filters,
}) => {
	useEffect(() => {
		getProducts(currentPage, sortField, sortOrder, {})
	}, [])

	const [sort, setSort] = useState(true)

	const onPageChange = (page: number) => {
		getProducts(page, sortField, sortOrder, filters)
	}

	const setSortCatalog = (sortField: string, sort: boolean) => {
		let sortOrder = 'asc'
		if (sort) {
			setSort(!sort)
		} else {
			setSort(!sort)
			sortOrder = 'desc'
		}
		getProducts(1, sortField, sortOrder, filters)
	}

	const sortArrow = (
		<span className='material-symbols-outlined'>
			{sort ? 'expand_more' : 'expand_less'}
		</span>
	)

	return (
		<div className={cn('containerAdminWhite', styles.catalogs)}>
			<span className={styles.title}>My Catalog</span>
			<FiltersMyCatalog />
			<div className={styles.line}></div>
			<table className={styles.catalogTable}>
				<thead>
					<tr>
						<th>Image</th>
						<th
							onClick={() => setSortCatalog('title', sort)}
							className={cn(styles.sort)}
						>
							Title
							{sortArrow}
						</th>
						<th className={styles.thSmall}>Category</th>
						<th className={styles.thSmall}>Count</th>
						<th
							className={cn(styles.thSmall, styles.sort)}
							onClick={() => setSortCatalog('price', sort)}
						>
							Price
							{sortArrow}
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
										to={'/edit-product'}
										className={cn('material-symbols-outlined', styles.editIcon)}
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
			<Paginator
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
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
	connect(mapStateToProps, { getProducts, deleteProduct, editProduct }),
)(MyCatalogs)
