import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { compose } from 'redux'
import { Header } from '../../components/admin/header/Header'
import { Sidebar } from '../../components/admin/sidebar/Sidebar'
import { Preloader } from '../../components/common/Preloader'
import { HEADER_ADMIN_MENU } from '../../data/admin/headerData'
import { SIDEBAR_ADMIN_MENU } from '../../data/admin/sidebarData'
import { getDeliveryOptions } from '../../redux/deliveryReducer/deliveryThunk'
import { AppStateType } from '../../redux/redux-store'
import { getYearsForStats } from '../../redux/statsReducer/statsThunk'
import { IUserOptions } from '../../shared/interfaces/userInterface/user.interface'

export const adminUrl = '/make-up-admin/'

interface AdminLayoutProps {
	user: IUserOptions
	getDeliveryOptions: () => void
	getYearsForStats: () => void
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
	user,
	getDeliveryOptions,
	getYearsForStats,
}): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		if (user) {
			getDeliveryOptions()
			setIsLoading(false)
			getYearsForStats()
		}
	}, [user])

	if (isLoading) {
		return <Preloader />
	}

	if (user?.roles?.[0]?.value !== 'ADMIN') {
		return <Navigate to='not-found' />
	}

	return (
		<div className='AdminLayout'>
			<Header items={HEADER_ADMIN_MENU} logo={'Make Up Admin'} />
			<div className='adminContainer'>
				<Sidebar items={SIDEBAR_ADMIN_MENU} />
				<Outlet />
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		user: state.auth.user,
	}
}

export default compose(
	connect(mapStateToProps, { getDeliveryOptions, getYearsForStats }),
)(AdminLayout)
