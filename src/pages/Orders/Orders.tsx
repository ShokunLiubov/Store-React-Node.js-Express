import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { compose } from 'redux'
import FiltersOrders from '../../components/admin/filters/filtersOrders/FiltersOrders'
import Paginator from '../../components/common/pagination/Pagination'
import {
	getCityForOrders,
	getOrders,
} from '../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../redux/redux-store'
import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IOrder } from '../../shared/interfaces/order.interface'
import './orders.scss'

interface IOrdersProps {
	getOrders: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersOrders,
	) => any
	ordersData: Array<IOrder>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersOrders
	getCityForOrders: any
}

export const Orders: React.FC<IOrdersProps> = ({
	ordersData,
	getOrders,
	page,
	totalPages,
	sortField,
	sortOrder,
	filters,
	getCityForOrders,
}) => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		getCityForOrders()
		const pageOrDefault = searchParams.get('page') || 1
		getOrders(pageOrDefault, sortField, sortOrder, filters)
	}, [location])

	const [sort, setSort] = useState('1')

	const onPageChange = async (page: number) => {
		let url = await getOrders(page, sortField, sortOrder, filters)
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

		let url = await getOrders(1, sortField, sortOrder, filters)
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
		<div className={cn('containerAdminDark')}>
			<span className='title'>Orders</span>
			<FiltersOrders />
			<div className={'line'}></div>
			<div>
				{!ordersData.length ? (
					<div className={'notFoundByFilters'}>
						<span>Orders Not Found </span>
					</div>
				) : (
					<table className={'table'}>
						<thead>
							<tr>
								<th
									scope='col'
									onClick={() => setSortCatalog('createdAt', sort)}
								>
									<span className={'sort'}>
										Data checkout
										{sortOrderSpan}
									</span>
								</th>
								<th
									scope='col'
									onClick={() => setSortCatalog('username', sort)}
								>
									<span className={'sort'}>
										Client Name
										{sortOrderSpan}
									</span>
								</th>
								<th scope='col'>City</th>
								<th
									scope='col'
									onClick={() => setSortCatalog('allPrice', sort)}
								>
									<span className={'sort'}>
										Total Price
										{sortOrderSpan}
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
														? 'availabilityIs'
														: '',
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
				)}
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

export default compose(
	connect(mapStateToProps, { getOrders, getCityForOrders }),
)(Orders)
