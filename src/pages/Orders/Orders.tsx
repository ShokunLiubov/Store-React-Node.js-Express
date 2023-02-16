import cn from 'classnames'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Paginator from '../../components/common/pagination/Pagination'
import { getOrders } from '../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../redux/redux-store'
import { IOrder } from '../../shared/interfaces/order.interface'
import styles from './orders.module.scss'

interface IOrdersProps {
	getOrders: (currentPage: number) => void
	ordersData: Array<IOrder>
	currentPage: number
	totalPages: number
}

export const Orders: React.FC<IOrdersProps> = ({
	ordersData,
	getOrders,
	currentPage,
	totalPages,
}) => {
	useEffect(() => {
		getOrders(currentPage)
	}, [])

	const onPageChange = (page: number) => {
		getOrders(page)
	}

	return (
		<div className={cn('containerAdminDark')}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th scope='col'>Order Number</th>
						<th scope='col'>Client Name</th>
						<th scope='col'>City</th>
						<th scope='col'>All Price</th>
						<th scope='col' className={styles.statusTh}>
							Status Order
						</th>
					</tr>
				</thead>
				<tbody>
					{ordersData.length > 0 &&
						ordersData.map((order: any) => (
							<tr key={order._id}>
								<td>{order.id}</td>
								<td>{order.client_name}</td>
								<td>{order.city}</td>
								<td>{order.order_price}$</td>
								<td>
									<div
										className={cn(
											order.status_order === 'Availability is check'
												? styles.count
												: styles.statusNot,
											order.status_order === 'Availability is check'
												? styles.count
												: '',
											order.status_order === 'Awaiting shipment'
												? styles.await
												: '',
											order.status_order === 'Sent' ? styles.sent : '',
											order.status_order === 'Refusal' ? styles.refusal : '',
											order.status_order === 'Received' ? styles.received : '',
											styles.status,
										)}
									>
										{order.status_order}
									</div>
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
		ordersData: state.order.ordersData,
		currentPage: state.order.currentPage,
		totalPages: state.order.totalPages,
	}
}

export default compose(connect(mapStateToProps, { getOrders }))(Orders)
