import cn from 'classnames'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { compose } from 'redux'
import FiltersOrders from '../../components/admin/filters/filtersOrders/FiltersOrders'
import Paginator from '../../components/common/pagination/Pagination'
import { TableComponent } from '../../components/common/table/Table'
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
	) => Promise<string>
	ordersData: Array<IOrder>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersOrders
	getCityForOrders: () => void
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
}): JSX.Element => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		getCityForOrders()
		const pageOrDefault = searchParams.get('page') || 1
		getOrders(pageOrDefault, sortField, sortOrder, filters)
	}, [location])

	const onPageChange = async (page: number) => {
		let url = await getOrders(page, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	const setSort = async (sortField: string, sortOrder: string) => {
		let url = await getOrders(1, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	return (
		<div className={cn('containerAdminDark')}>
			<span className='title'>Orders</span>
			<FiltersOrders />
			<div>
				{!ordersData.length ? (
					<div className={'notFoundByFilters'}>
						<span>Orders Not Found </span>
					</div>
				) : (
					<TableComponent
						data={ordersData.map(
							(order: IOrder): React.ReactNode => (
								<tr key={order._id}>
									<td>
										{order.createdAt && order.createdAt.slice(0, -14)}
										<br />
										Time: {order.createdAt && order.createdAt.slice(11, -5)}
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
							),
						)}
						headers={[
							{ label: 'Data checkout', field: 'createdAt', order: true },
							{ label: 'Client Name', field: 'fullName', order: true },
							{ label: 'City', field: 'allPrice', order: false },
							{ label: 'Total Price', field: 'allPrice', order: true },
							{
								label: 'Status Order',
								field: 'userInfo.address.city',
								order: false,
							},
						]}
						onSort={setSort}
						classTable={'darkTable'}
					/>
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
