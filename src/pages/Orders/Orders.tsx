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
						<th scope='col'>Data checkout</th>
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
