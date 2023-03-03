import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import FiltersOrders from '../../components/admin/filters/filtersOrders/FiltersOrders'
import Paginator from '../../components/common/pagination/Pagination'
import { getOrders } from '../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../redux/redux-store'
import { IOrder } from '../../shared/interfaces/order.interface'
import styles from './orders.module.scss'

interface IOrdersProps {
	getOrders: (
		page: number,
		sortField: string,
		sortOrder: string,
		filters: any,
	) => void
	ordersData: Array<IOrder>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
}

export const Orders: React.FC<IOrdersProps> = ({
	ordersData,
	getOrders,
	page,
	totalPages,
	sortField,
	sortOrder,
}) => {
	useEffect(() => {
		getOrders(page, sortField, sortOrder, {})
	}, [])

	const [sort, setSort] = useState(true)

	const onPageChange = (page: number) => {
		getOrders(page, sortField, sortOrder, {})
	}

	const setSortCatalog = (sortField: string, sort: boolean) => {
		let sortOrder = 'asc'
		if (sort) {
			setSort(!sort)
		} else {
			setSort(!sort)
			sortOrder = 'desc'
		}

		getOrders(1, sortField, sortOrder, {})
	}

	const sortArrow = (
		<span className='material-symbols-outlined'>
			{sort ? 'expand_more' : 'expand_less'}
		</span>
	)

	return (
		<div className={cn('containerAdminDark')}>
			<FiltersOrders />
			<div className={styles.line}></div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th
							scope='col'
							onClick={() => setSortCatalog('createdAt', sort)}
							className={styles.sort}
						>
							Data checkout
							{sortArrow}
						</th>
						<th
							scope='col'
							onClick={() => setSortCatalog('username', sort)}
							className={styles.sort}
						>
							Client Name
							{sortArrow}
						</th>
						<th scope='col'>City</th>
						<th
							scope='col'
							onClick={() => setSortCatalog('allPrice', sort)}
							className={styles.sort}
						>
							All Price
							{sortArrow}
						</th>
						<th scope='col' className={styles.statusTh}>
							Status Order
						</th>
					</tr>
				</thead>
				<tbody>
					{ordersData.length > 0 &&
						ordersData.map((order: any) => (
							<tr key={order._id}>
								<td>
									{order.createdAt.slice(0, -14)}
									<br />
									Time: {order.createdAt.slice(11, -5)}
								</td>
								<td>{order.fullName}</td>
								<td>
									City: {order.address.city} <br />
									Post Office: {order.address.postOffice}
								</td>
								<td>{order.allPrice}$</td>
								<td>
									<div
										className={cn(
											order.status === 'Availability is check'
												? styles.count
												: styles.statusNot,
											order.status === 'Availability is check'
												? styles.count
												: '',
											order.status === 'Awaiting shipment' ? styles.await : '',
											order.status === 'Sent' ? styles.sent : '',
											order.status === 'Refusal' ? styles.refusal : '',
											order.status === 'Received' ? styles.received : '',
											styles.status,
										)}
									>
										{order.status}
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
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
		ordersData: state.order.ordersData,
		page: state.order.currentPage,
		totalPages: state.order.totalPages,
		sortField: state.order.sortField,
		sortOrder: state.order.sortOrder,
	}
}

export default compose(connect(mapStateToProps, { getOrders }))(Orders)
