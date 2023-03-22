import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import FiltersCustomers from '../../components/admin/filters/filtersCustomers/FiltersCustomers'
import Paginator from '../../components/common/pagination/Pagination'
import { AppStateType } from '../../redux/redux-store'
import { getUsers } from '../../redux/userReducer/userThunk'
import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import styles from './customers.module.scss'

interface IMyCatalogsProps {
	getUsers: (
		page: number,
		sortField: string,
		sortOrder: string,
		filters: IFiltersCustomers,
	) => void
	usersData: Array<IUser>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersCustomers
}

export const Customers: React.FC<IMyCatalogsProps> = ({
	getUsers,
	usersData,
	page,
	totalPages,
	sortField,
	sortOrder,
	filters,
}) => {
	useEffect(() => {
		getUsers(page, sortField, sortOrder, filters)
	}, [])

	const [sort, setSort] = useState(true)

	const onPageChange = (page: number) => {
		getUsers(page, sortField, sortOrder, filters)
	}

	const setSortCatalog = (sortField: string, sort: boolean) => {
		let sortOrder = '1'
		if (sort) {
			setSort(!sort)
		} else {
			setSort(!sort)
			sortOrder = '-1'
		}

		getUsers(1, sortField, sortOrder, filters)
	}

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
								<span className='material-symbols-outlined'>
									{sort ? 'expand_more' : 'expand_less'}
								</span>
							</th>
							<th
								scope='col'
								onClick={() => setSortCatalog('userInfo.email', sort)}
								className={cn(styles.sort)}
							>
								Email
								<span className='material-symbols-outlined'>
									{sort ? 'expand_more' : 'expand_less'}
								</span>
							</th>
							<th
								scope='col'
								onClick={() => setSortCatalog('userInfo.phone', sort)}
								className={cn(styles.sort)}
							>
								Phone
								<span className='material-symbols-outlined'>
									{sort ? 'expand_more' : 'expand_less'}
								</span>
							</th>
							<th
								scope='col'
								onClick={() => setSortCatalog('userInfo.address.city', sort)}
								className={cn(styles.sort)}
							>
								City
								<span className='material-symbols-outlined'>
									{sort ? 'expand_more' : 'expand_less'}
								</span>
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

export default compose(connect(mapStateToProps, { getUsers }))(Customers)
