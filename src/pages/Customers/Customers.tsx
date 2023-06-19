import cn from 'classnames'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { compose } from 'redux'
import FiltersCustomers from '../../components/admin/filters/filtersCustomers/FiltersCustomers'
import Paginator from '../../components/common/pagination/Pagination'
import { TableComponent } from '../../components/common/table/Table'
import { AppStateType } from '../../redux/redux-store'
import { getCityForUsers, getUsers } from '../../redux/userReducer/user.thunk'
import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import './customers.scss'

interface ICustomersProps {
	getUsers: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersCustomers,
	) => Promise<string>
	getCityForUsers: () => void
	usersData: Array<IUser>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersCustomers
}

export const Customers: React.FC<ICustomersProps> = ({
	getCityForUsers,
	getUsers,
	usersData,
	page,
	totalPages,
	sortField,
	sortOrder,
	filters,
}): JSX.Element => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		getCityForUsers()
		const pageOrDefault = searchParams.get('page') || 1
		getUsers(pageOrDefault, sortField, sortOrder, filters)
	}, [location])

	const onPageChange = async (page: number) => {
		let url = await getUsers(page, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	const setSort = async (sortField: string, sortOrder: string) => {
		let url = await getUsers(1, sortField, sortOrder, filters)
		navigate(
			window.location.pathname + '?' + new URLSearchParams(url).toString(),
		)
	}

	return (
		<main className={cn('containerAdminDark')}>
			<span className='title'>Customers</span>
			<FiltersCustomers />
			<div className='line'></div>
			{!usersData.length ? (
				<div className={'notFoundByFilters'}>
					<span>Customers Not Found </span>
				</div>
			) : (
				<TableComponent
					data={usersData.map((customer: any) => (
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
									: customer.userInfo?.address?.city}
							</td>
						</tr>
					))}
					headers={[
						{ label: 'User Name', field: 'username', order: true },
						{ label: 'Email', field: 'userInfo.email', order: true },
						{ label: 'Phone', field: 'userInfo.phone', order: true },
						{ label: 'City', field: 'userInfo.address.city', order: true },
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
		</main>
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
