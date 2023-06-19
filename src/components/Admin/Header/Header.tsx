import cn from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSidebar } from '../../../context/sidebar.context'
import { IHeader } from '../../../shared/interfaces/header.interface'
import styles from './header.module.scss'

interface IHeaderProps {
	items: Array<IHeader>
	logo: string
}

export const Header: React.FC<IHeaderProps> = ({
	items,
	logo,
}): JSX.Element => {
	const sidebar = useSidebar()

	return (
		<nav>
			<div className={styles.navbar}>
				<div className={styles.leftNavbar}>
					<span
						className={cn('material-symbols-outlined', styles.sidebarBurger)}
						onClick={sidebar.toggleSidebar}
					>
						{!sidebar.sidebar ? 'menu' : 'close'}
					</span>

					<NavLink to='/' className={styles.logo}>
						{logo}
					</NavLink>
				</div>

				<ul className={styles.rightNavbar}>
					{items.map((item: IHeader) => (
						<li key={item.icon}>
							<NavLink to={item.path}>
								<span className={cn('material-symbols-outlined', styles.icon)}>
									{item.icon}
								</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}
