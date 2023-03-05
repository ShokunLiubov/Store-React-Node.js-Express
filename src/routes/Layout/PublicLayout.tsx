import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderStore } from '../../components/store/headerStore/HeaderStore'

interface PublicLayoutProps {}

export const PublicLayout: React.FC<PublicLayoutProps> = () => {
	return (
		<div className='PublicLayout'>
			<HeaderStore />

			<div className='storeContainer'>
				{/* <MenuStore /> */}
				<Outlet />
			</div>
		</div>
	)
}
