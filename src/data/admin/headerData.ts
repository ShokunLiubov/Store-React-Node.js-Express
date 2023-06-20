import { authUrl } from '../../routes/layout/Auth.layout'
import { publicUrl } from '../../routes/layout/Public.layout'
import { IHeader } from './../../shared/interfaces/header.interface'

export const HEADER_ADMIN_MENU: IHeader[] = [
	{ path: '/setting', icon: 'settings' },
	{ path: `${publicUrl + authUrl}login`, icon: 'logout' },
]
