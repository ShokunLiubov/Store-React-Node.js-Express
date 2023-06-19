import { IStoreHomeProducts } from '../../shared/interfaces/storeInterface/storeHomeProducts.interface'

export interface ISetStoreHomeProducts {
	type: string
	payload: Array<IStoreHomeProducts>
}
