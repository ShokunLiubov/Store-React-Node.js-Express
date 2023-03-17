import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { compose } from 'redux'
import { Header } from '../../components/admin/header/Header'
import { Sidebar } from '../../components/admin/sidebar/Sidebar'
import { Preloader } from '../../components/common/Preloader'
import { AppStateType } from '../../redux/redux-store'
import { IHeader } from '../../shared/interfaces/header.interface'
import { ISidebar } from '../../shared/interfaces/sidebar.interface'

export const adminUrl = '/make-up-admin/'

const HEADER_ADMIN_MENU: Array<IHeader> = [
	{ path: '/setting', icon: 'settings' },
	{ path: '/auth/login', icon: 'logout' },
]

const SIDEBAR_ADMIN_MENU: Array<ISidebar> = [
	{
		path: adminUrl + 'my-catalogs',
		icon: 'menu_book',
		title: 'My Catalogs',
		id: 1,
	},
	{
		path: adminUrl + 'new-product',
		icon: 'library_add',
		title: 'New Product',
		id: 2,
	},
	{ path: adminUrl + 'orders', icon: 'list_alt', title: 'Orders', id: 3 },
	{ path: adminUrl + 'customers', icon: 'group', title: 'Customers', id: 4 },
	{
		path: adminUrl + 'stats',
		icon: 'signal_cellular_alt',
		title: 'Stats',
		id: 6,
	},
]

interface AdminLayoutProps {
	user: any
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ user }) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (user) {
			setIsLoading(false)
		}
	}, [user])

	if (isLoading) {
		return <Preloader />
	}

	if (user?.roles?.[0]?.value !== 'ADMIN') {
		return <Navigate to='make-up' />
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
		isLoading: state.auth.isLoading,
	}
}

export default compose(connect(mapStateToProps, {}))(AdminLayout)
