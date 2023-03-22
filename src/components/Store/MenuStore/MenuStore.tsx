import React from 'react'
import { NavLink } from 'react-router-dom'
import { publicUrl } from '../../../routes/layout/PublicLayout'
import './menuStore.scss'

interface IItemMenu {
	title: string
	path: string
}

const DateMenu: Array<IItemMenu> = [
	{ title: 'Perfumery', path: publicUrl + 'category/all' },
	{ title: "Women's perfumery", path: publicUrl + 'category/woman' },
	{ title: "Men's perfumery", path: publicUrl + 'category/man' },
	{ title: 'Unisex perfume', path: publicUrl + 'category/unisex' },
	{ title: 'Elite perfumery', path: publicUrl + 'category/elite' },
	{ title: 'Nicheva perfumery', path: publicUrl + 'category/nisheva' },
	{ title: 'Natural perfumery', path: publicUrl + 'category/natural' },
]

export const MenuStore: React.FC = () => {
	return (
		<nav className='menuStore'>
			<ul className='mainMenu'>
				{DateMenu.map(li => (
					<li className='menuLi' key={li.title}>
						<NavLink to={li.path}>{li.title}</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
