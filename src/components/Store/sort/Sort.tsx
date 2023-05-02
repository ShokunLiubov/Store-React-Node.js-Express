import cn from 'classnames'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../../redux/redux-store'
import './sort.scss'

interface ISortProps {
	setSortCatalog: (sortField: string, sortOrder: string) => void
}

export const Sort: React.FC<ISortProps> = ({ setSortCatalog }): JSX.Element => {
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
					onClick={(): void => setSort('title', sortOrder)}
				>
					Title
				</span>
				<span
					className={sortField === '_id' ? 'active' : ''}
					onClick={(): void => setSort('_id', sortOrder)}
				>
					Date
				</span>
				<span
					className={sortField === 'price' ? 'active' : ''}
					onClick={(): void => setSort('price', sortOrder)}
				>
					Price
				</span>
				<span
					className={cn(
						'material-symbols-outlined',
						sortOrder === 'asc' ? 'active' : '',
					)}
					onClick={(): void => setSort(sortField, 'asc')}
				>
					arrow_upward
				</span>
				<span
					className={cn(
						'material-symbols-outlined',
						sortOrder === 'desc' ? 'active' : '',
					)}
					onClick={(): void => setSort(sortField, 'desc')}
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

export default compose(connect(mapStateToProps, {}))(Sort)
