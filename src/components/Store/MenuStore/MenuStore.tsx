import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useParam } from '../../../context/params.context'
import { MENU_STORE_DATA } from '../../../data/store/menuStoreData'
import './menuStore.scss'

export const MenuStore: React.FC = (): JSX.Element => {
	const location = useLocation()
	const navigate = useNavigate()
	const params = useParam()

	const resetSearchParams = () => {
		navigate(location.pathname)
		params.clearParams()
	}
	return (
		<nav className='menuStore'>
			<ul className='mainMenu'>
				{MENU_STORE_DATA.map(li => (
					<li className='menuLi' key={li.title}>
						<NavLink to={li.path} onClick={resetSearchParams}>
							{li.title}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
