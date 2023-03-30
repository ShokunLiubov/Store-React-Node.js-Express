import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { compose } from 'redux'
import FiltersCustomers from '../../components/admin/filters/filtersCustomers/FiltersCustomers'
import Paginator from '../../components/common/pagination/Pagination'
import { AppStateType } from '../../redux/redux-store'
import { getCityForUsers, getUsers } from '../../redux/userReducer/userThunk'
import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import styles from './customers.module.scss'

interface ICustomersProps {
	getUsers: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersCustomers,
	) => any
	usersData: Array<IUser>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersCustomers
	getCityForUsers: any
}

export const Customers: React.FC<ICustomersProps> = ({
	getUsers,
	usersData,
	page,
	totalPages,
	sortField,
	sortOrder,
	filters,
	getCityForUsers,
}) => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		getCityForUsers()
		const pageOrDefault = searchParams.get('page') || 1
		getUsers(pageOrDefault, sortField, sortOrder, filters)
	}, [location])

	const [sort, setSort] = useState('1')

	const onPageChange = async (page: number) => {
		let url = await getUsers(page, sortField, sortOrder, filters)
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

		let url = await getUsers(1, sortField, sortOrder, filters)
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
			<span className='title'>Customers</span>
			<FiltersCustomers />
			<div className='line'></div>
			{!usersData.length ? (
				<div className={'notFoundByFilters'}>
					<span>Customers Not Found </span>
				</div>
			) : (
				<table className={styles.ordersTable}>
					<thead>
						<tr>
							<th
								scope='col'
								onClick={() => setSortCatalog('username', sort)}
								className={cn(styles.sort)}
							>
								User Name
								{sortOrderSpan}
							</th>
							<th
								scope='col'
								onClick={() => setSortCatalog('userInfo.email', sort)}
								className={cn(styles.sort)}
							>
								Email
								{sortOrderSpan}
							</th>
							<th
								scope='col'
								onClick={() => setSortCatalog('userInfo.phone', sort)}
								className={cn(styles.sort)}
							>
								Phone
								{sortOrderSpan}
							</th>
							<th
								scope='col'
								onClick={() => setSortCatalog('userInfo.address.city', sort)}
								className={cn(styles.sort)}
							>
								City
								{sortOrderSpan}
							</th>
						</tr>
					</thead>
					<tbody>
						{usersData.map((customer: any) => (
							<tr key={customer._id}>
								<td>{customer.username}</td>
								<td>
									{customer.userInfo === undefined
										? 'unknown'
										: customer.userInfo.email}
								</td>
								<td>
									{customer.userInfo === undefined
										? 'unknown'
										: customer.userInfo.phone}
								</td>
								<td>
									{customer.userInfo === undefined
										? 'unknown'
										: customer.userInfo.address.city}
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
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		usersData: state.user.usersData,
		page: state.user.currentPage,
		totalPages: state.user.totalPages,
		sortField: state.user.sortField,
		sortOrder: state.user.sortOrder,
		filters: state.user.filters,
	}
}

export default compose(connect(mapStateToProps, { getUsers, getCityForUsers }))(
	Customers,
)
