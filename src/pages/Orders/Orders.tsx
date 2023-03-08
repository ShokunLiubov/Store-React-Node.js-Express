import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import FiltersOrders from '../../components/admin/filters/filtersOrders/FiltersOrders'
import Paginator from '../../components/common/pagination/Pagination'
import { useCalendar } from '../../context/calendarContext'
import { getOrders } from '../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../redux/redux-store'
import { IOrder } from '../../shared/interfaces/order.interface'
import './orders.scss'

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
	filters: any
}

export const Orders: React.FC<IOrdersProps> = ({
	ordersData,
	getOrders,
	page,
	totalPages,
	sortField,
	sortOrder,
	filters,
}) => {
	useEffect(() => {
		getOrders(page, sortField, sortOrder, {})
	}, [])

	const [sort, setSort] = useState(true)

	const onPageChange = (page: number) => {
		getOrders(page, sortField, sortOrder, filters)
	}

	const setSortCatalog = (sortField: string, sort: boolean) => {
		let sortOrder = 'asc'
		if (sort) {
			setSort(!sort)
		} else {
			setSort(!sort)
			sortOrder = 'desc'
		}

		getOrders(1, sortField, sortOrder, filters)
	}

	const calendar = useCalendar()

	const sortArrow = (
		<span className='material-symbols-outlined'>
			{sort ? 'expand_more' : 'expand_less'}
		</span>
	)
	const handleCloseCalendar = () => {
		if (calendar.calendar.calendar && !calendar.calendar.useCalendar) {
			calendar.toggleCalendar(false, false)
		}
	}

	return (
		<div className={cn('containerAdminDark')} onClick={handleCloseCalendar}>
			<span className='title'>Orders</span>
			<FiltersOrders />
			<div className={'line'}></div>
			<div>
				<table className={'table'}>
					<thead>
						<tr>
							<th scope='col' onClick={() => setSortCatalog('createdAt', sort)}>
								<span className={'sort'}>
									Data checkout
									{sortArrow}
								</span>
							</th>
							<th scope='col' onClick={() => setSortCatalog('username', sort)}>
								<span className={'sort'}>
									Client Name
									{sortArrow}
								</span>
							</th>
							<th scope='col'>City</th>
							<th scope='col' onClick={() => setSortCatalog('allPrice', sort)}>
								<span className={'sort'}>
									Total Price
									{sortArrow}
								</span>
							</th>
							<th scope='col' className={'statusTh'}>
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
													? 'count'
													: 'statusNot',
												order.status === 'Availability is check' ? 'count' : '',
												order.status === 'Awaiting shipment' ? 'await' : '',
												order.status === 'Sent' ? 'sent' : '',
												order.status === 'Refusal' ? 'refusal' : '',
												order.status === 'Received' ? 'received' : '',
												'status',
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
		filters: state.order.filters,
	}
}

export default compose(connect(mapStateToProps, { getOrders }))(Orders)
