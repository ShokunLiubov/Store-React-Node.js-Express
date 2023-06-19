import { Dispatch } from 'redux'
import { userService } from '../../api/services/user.service'
import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import * as AC from './user.action-creator'

export const getUsers = (
	currentPage: number | string,
	sortField: string,
	sortOrder: string,
	filters: IFiltersCustomers,
) => {
	return async (dispatch: Dispatch): Promise<string> => {
		dispatch(AC.setFiltersUsers(filters))
		const response = await userService.fetchUsers(
			currentPage,
			sortField,
			sortOrder,
			filters,
		)

		const { docs, page, totalPages } = response.data
		dispatch(AC.setUsers(docs, page, totalPages, sortField, sortOrder))

		return response.url
	}
}

export const getCityForUsers = () => {
	return async (dispatch: Dispatch): Promise<void> => {
		let response = await userService.getCity()
		dispatch(AC.setCityForUsers(response))
	}
}
