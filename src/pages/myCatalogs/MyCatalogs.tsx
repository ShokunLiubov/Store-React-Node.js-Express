import cn from 'classnames'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import SortProducts from '../../components/admin/sortProducts/SortProducts'
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
	) => void
	productsData: Array<IProduct>
	deleteProduct: (id: string) => void
	currentPage: number
	totalPages: number
	editProduct: (productId: string) => void
	sortFieldCurrent: string
	sortOrderCurrent: string
}

export const MyCatalogs: React.FC<IMyCatalogsProps> = ({
	getProducts,
	productsData,
	deleteProduct,
	currentPage,
	totalPages,
	editProduct,
	sortFieldCurrent,
	sortOrderCurrent,
}) => {
	useEffect(() => {
		getProducts(currentPage, sortFieldCurrent, sortOrderCurrent)
	}, [])

	const onPageChange = (page: number) => {
		getProducts(page, sortFieldCurrent, sortOrderCurrent)
	}

	const setSortCatalog = (sortField: string, sortOrder: string) => {
		getProducts(currentPage, sortField, sortOrder)
	}

	return (
		<div className={cn('containerAdminWhite', styles.catalogs)}>
			<SortProducts setSortCatalog={setSortCatalog} />
			<div className={styles.sortBottomLine}></div>
			<table className={styles.catalogTable}>
				<thead>
					<tr>
						<th>Image</th>
						<th>Title</th>
						<th className={styles.thSmall}>Category</th>
						<th className={styles.thSmall}>Count</th>
						<th className={styles.thSmall}>Price</th>
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
										<span>{product.category}</span>
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
		sortFieldCurrent: state.product.sortField,
		sortOrderCurrent: state.product.sortOrder,
	}
}

export default compose(
	connect(mapStateToProps, { getProducts, deleteProduct, editProduct }),
)(MyCatalogs)
