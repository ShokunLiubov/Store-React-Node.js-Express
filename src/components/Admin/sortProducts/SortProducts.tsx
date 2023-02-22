import cn from 'classnames'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../../redux/redux-store'
import './sortProducts.scss'

interface ISortProductsProps {
	setSortCatalog: any
}

export const SortProducts: React.FC<ISortProductsProps> = ({
	setSortCatalog,
}) => {
	const [sortField, setSortField] = useState('_id')
	const [sortOrder, setSortOrder] = useState('asc')

	const setSort = (sortField: string, sortOrder: string) => {
		setSortField(sortField)
		setSortOrder(sortOrder)
		setSortCatalog(sortField, sortOrder)
	}
	return (
		<div className='sortProduct'>
			<div className='sort'>
				<label>Sort by:</label>
				<span
					className={sortField === 'title' ? 'active' : ''}
					onClick={() => setSort('title', sortOrder)}
				>
					Title
				</span>
				<span
					className={sortField === '_id' ? 'active' : ''}
					onClick={() => setSort('_id', sortOrder)}
				>
					Date
				</span>
				<span
					className={sortField === 'price' ? 'active' : ''}
					onClick={() => setSort('price', sortOrder)}
				>
					Price
				</span>
				<span
					className={cn(
						'material-symbols-outlined',
						sortOrder === 'asc' ? 'active' : '',
					)}
					onClick={() => setSort(sortField, 'asc')}
				>
					arrow_upward
				</span>
				<span
					className={cn(
						'material-symbols-outlined',
						sortOrder === 'desc' ? 'active' : '',
					)}
					onClick={() => setSort(sortField, 'desc')}
				>
					arrow_downward
				</span>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsData: state.product.productsData,
		currentPage: state.product.currentPage,
		totalPages: state.product.totalPages,
	}
}

export default compose(connect(mapStateToProps, {}))(SortProducts)
