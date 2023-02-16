import cn from 'classnames'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'
import { getUsers } from '../../redux/userReducer/userThunk'
import { IUser } from '../../shared/interfaces/user.interface'
import styles from './customers.module.scss'

interface IMyCatalogsProps {
	getUsers: () => void
	usersData: Array<IUser>
}

export const Customers: React.FC<IMyCatalogsProps> = ({
	getUsers,
	usersData,
}) => {
	useEffect(() => {
		getUsers()
	}, [])
	return (
		<div className={cn('containerAdminDark')}>
			<table className={styles.ordersTable}>
				<thead>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>Email</th>
						<th scope='col'>Phone</th>
						<th scope='col'>City</th>
					</tr>
				</thead>
				<tbody>
					{usersData.length &&
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
										: customer.userInfo.city}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		usersData: state.user.usersData,
	}
}

export default compose(connect(mapStateToProps, { getUsers }))(Customers)
