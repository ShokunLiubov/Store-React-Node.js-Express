import cn from 'classnames'
import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useParam } from '../../../context/paramsContext'
import { useSidebar } from '../../../context/sidebarContext'
import { ISidebar } from '../../../shared/interfaces/sidebar.interface'
import styles from './sidebar.module.scss'

interface ISidebarProps {
	items: Array<ISidebar>
}

export const Sidebar: React.FC<ISidebarProps> = ({ items }): JSX.Element => {
	const sidebar = useSidebar()
	const location = useLocation()
	const navigate = useNavigate()
	const params = useParam()

	const resetSearchParams = () => {
		navigate(location.pathname)
		params.clearParams()
	}

	const sidebarItem = items.map((item: ISidebar) => (
		<li key={item.path}>
			<NavLink
				to={item.path}
				className={navData => (navData.isActive ? styles.active : styles.item)}
				onClick={resetSearchParams}
			>
				<span className={cn('material-symbols-outlined', styles.itemIcon)}>
					{item.icon}
				</span>
				<div
					className={cn(
						styles.titleItem,
						!sidebar.sidebar && styles.titleItemClose,
					)}
				>
					{item.title}
				</div>
			</NavLink>
		</li>
	))

	return (
		<nav>
			<div
				className={cn(styles.sidebar, !sidebar.sidebar && styles.sidebarClose)}
			>
				<ul>{sidebarItem}</ul>
			</div>
		</nav>
	)
}
