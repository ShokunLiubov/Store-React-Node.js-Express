import { publicUrl } from '../../routes/layout/Public.layout'
import { IMenuStore } from '../../shared/interfaces/menuStore.interface'

export const MENU_STORE_DATA: Array<IMenuStore> = [
	{ title: 'Perfumery', path: publicUrl + 'category/all' },
	{ title: "Women's perfumery", path: publicUrl + 'category/woman' },
	{ title: "Men's perfumery", path: publicUrl + 'category/man' },
	{ title: 'Unisex perfume', path: publicUrl + 'category/unisex' },
	{ title: 'Elite perfumery', path: publicUrl + 'category/elite' },
	{ title: 'Nicheva perfumery', path: publicUrl + 'category/nisheva' },
	{ title: 'Natural perfumery', path: publicUrl + 'category/natural' },
]
