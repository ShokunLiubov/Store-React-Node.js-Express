import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Paginator from '../../components/common/pagination/Pagination'
import { AppStateType } from '../../redux/redux-store'
import { getUsers } from '../../redux/userReducer/userThunk'
import { IUser } from '../../shared/interfaces/user.interface'
import styles from './customers.module.scss'

interface IMyCatalogsProps {
	getUsers: (page: number, sortField: string, sortOrder: string) => void
	usersData: Array<IUser>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
}

export const Customers: React.FC<IMyCatalogsProps> = ({
	getUsers,
	usersData,
	page,
	totalPages,
	sortField,
	sortOrder,
}) => {
	useEffect(() => {
		getUsers(page, sortField, sortOrder)
	}, [])

	const [sort, setSort] = useState(true)

	const onPageChange = (page: number) => {
		getUsers(page, sortField, sortOrder)
	}

	const setSortCatalog = (sortField: string, sort: boolean) => {
		let sortOrder = 'asc'
		if (sort) {
			setSort(!sort)
		} else {
			setSort(!sort)
			sortOrder = 'desc'
		}

		getUsers(1, sortField, sortOrder)
	}

	return (
		<div className={cn('containerAdminDark')}>
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
						<th scope='col'>Email</th>
						<th scope='col'>Phone</th>
						<th scope='col'>City</th>
					</tr>
				</thead>
				<tbody>
					{usersData.length > 0 &&
						usersData.map((customer: any) => (
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
	}
}

export default compose(connect(mapStateToProps, { getUsers }))(Customers)
