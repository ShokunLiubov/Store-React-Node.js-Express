import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderStore } from '../../components/store/headerStore/HeaderStore'

export const publicUrl = '/make-up/'

interface PublicLayoutProps {}

export const PublicLayout: React.FC<PublicLayoutProps> = (): JSX.Element => {
	return (
		<div className='PublicLayout'>
			<HeaderStore />
			<div className='storeContainer'>
				<Outlet />
			</div>
		</div>
	)
}
