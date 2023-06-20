import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { compose } from 'redux'
import { TypeAuth } from '../../../context/typeAuth.context'
import { AppStateType } from '../../../redux/redux-store'
import { authUrl } from '../../../routes/layout/Auth.layout'
import { publicUrl } from '../../../routes/layout/Public.layout'
import { IUserOptions } from '../../../shared/interfaces/userInterface/user.interface'
import { Preloader } from '../../common/Preloader'
import styles from './headerAuth.module.scss'

interface IActive {
	isActive: boolean
	isPending: boolean
}

interface IHeaderAuthProps {
	user: IUserOptions
}

const HeaderAuth: React.FC<IHeaderAuthProps> = ({ user }): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const location = useLocation()

	useEffect(() => {
		if (user) {
			setIsLoading(false)
		}
	}, [user])

	if (isLoading) {
		return <Preloader />
	}

	return (
		<div className={styles.menuAuth}>
			<span className={styles.title}>
				{location.pathname === `${publicUrl + authUrl}login` && 'Login Page'}
				{location.pathname === `${publicUrl + authUrl}register` &&
					'Register Page'}
			</span>
			<nav>
				<NavLink to={publicUrl} className={cn(styles.backShop)}>
					<span className={cn('material-symbols-outlined', styles.icon)}>
						arrow_back_ios
					</span>
					Back to Shop
				</NavLink>
				{!user?.roles?.[0] && (
					<NavLink
						to={publicUrl + authUrl + TypeAuth.REGISTER}
						className={(navData: IActive) =>
							navData.isActive ? styles.active : ''
						}
					>
						<span className={cn('material-symbols-outlined', styles.icon)}>
							app_registration
						</span>
						Register
					</NavLink>
				)}
				{!user?.roles?.[0] && (
					<NavLink
						to={publicUrl + authUrl + TypeAuth.LOGIN}
						className={(navData: IActive) =>
							navData.isActive ? styles.active : ''
						}
					>
						<span className={cn('material-symbols-outlined', styles.icon)}>
							how_to_reg
						</span>
						Login
					</NavLink>
				)}
			</nav>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		user: state.auth.user,
	}
}

export default compose(connect(mapStateToProps, {}))(HeaderAuth)
