import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderAuth } from '../../components/auth/headerAuth/HeaderAuth'

export const authUrl = '/auth/'

export const AuthLayout: React.FC = () => {
	return (
		<div className='AuthLayout'>
			<HeaderAuth />
			<div className='center'>
				<Outlet />
			</div>
		</div>
	)
}
