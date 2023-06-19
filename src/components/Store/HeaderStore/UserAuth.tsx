import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { TypeAuth, useAuthType } from '../../../context/typeAuth.context'
import { logout } from '../../../redux/authReducer/auth.thunk'
import { AppStateType } from '../../../redux/redux-store'
import { authUrl } from '../../../routes/layout/AuthLayout'
import { publicUrl } from '../../../routes/layout/PublicLayout'
import { IUserOptions } from '../../../shared/interfaces/userInterface/user.interface'
import './headerStore.scss'

interface IUserAuth {
	user: IUserOptions
	isAuth: boolean
	logout: () => Promise<void>
}

export const UserAuth: React.FC<IUserAuth> = ({
	user,
	isAuth,
	logout,
}): JSX.Element => {
	const type = useAuthType()

	return (
		<div className='userAuth'>
			{!isAuth && (
				<NavLink
					to={publicUrl + authUrl + TypeAuth.LOGIN}
					onClick={() => type.setAuthType(TypeAuth.LOGIN)}
				>
					<span className='material-symbols-outlined'>person</span>
				</NavLink>
			)}
			{isAuth && (
				<div className='authBlock'>
					<span>{user.username}</span>
					<span
						className='userOut'
						onClick={() => {
							logout()
						}}
					>
						<span className='material-symbols-outlined'>logout</span>
					</span>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		user: state.auth.user,
		isAuth: state.auth.isAuth,
	}
}

export default compose(connect(mapStateToProps, { logout }))(UserAuth)
