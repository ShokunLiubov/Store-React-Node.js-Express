import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { compose } from 'redux'
import { AppStateType } from '../../../redux/redux-store'
import { authUrl } from '../../../routes/layout/AuthLayout'
import { publicUrl } from '../../../routes/layout/PublicLayout'
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
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			setIsLoading(false)
		}
	}, [user])

	if (isLoading) {
		return <Preloader />
	}

	// if (user?.roles?.[0]) {
	// 	navigate(publicUrl)
	// }

	return (
		<div className={styles.menuAuth}>
			<span className={styles.title}>
				{location.pathname === `${publicUrl + authUrl}login` && 'Login Page'}
				{location.pathname === `${publicUrl + authUrl}register` &&
					'Register Page'}
			</span>
			<nav>
				<NavLink to='/make-up' className={cn(styles.backShop)}>
					<span className={cn('material-symbols-outlined', styles.icon)}>
						arrow_back_ios
					</span>
					Back to Shop
				</NavLink>
				{!user?.roles?.[0] && (
					<NavLink
						to={publicUrl + authUrl + 'register'}
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
						to={publicUrl + authUrl + 'login'}
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
