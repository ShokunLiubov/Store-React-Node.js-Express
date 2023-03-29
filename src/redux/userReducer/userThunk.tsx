import { Dispatch } from 'redux'
import { userService } from '../../api/services/userService'
import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import * as AC from './userActionCreator'

export const getUsers = (
	currentPage: number | string,
	sortField: string,
	sortOrder: string,
	filters: IFiltersCustomers,
) => {
	return async (dispatch: Dispatch) => {
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
	return async (dispatch: Dispatch) => {
		let response = await userService.getCity()
		dispatch(AC.setCityForUsers(response))
	}
}
