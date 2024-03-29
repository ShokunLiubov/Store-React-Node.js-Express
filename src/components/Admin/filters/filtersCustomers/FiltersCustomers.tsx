import cn from 'classnames'
import { useState } from 'react'
import { connect } from 'react-redux'
import Select, { MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { AppStateType } from '../../../../redux/redux-store'
import { getUsers } from '../../../../redux/userReducer/user.thunk'
import { IFiltersCustomers } from '../../../../shared/filters/filtersCustomers.interface'
import { ISelectedOptions } from '../../../../shared/interfaces/common/selectedOptions.interface'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { handleSelectChange } from '../../../../utils/debounce/handleSelectChange'
import { Search } from '../../../ui/form/search/Search'
import './filtersCustomers.scss'
import { useFiltersCustomers } from './useFiltersCustomers'

interface IFiltersCustomersProps {
	sortField: string
	sortOrder: string
	getUsers: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		values: IFiltersCustomers,
	) => Promise<string>
	city: Array<string>
}

export const FiltersCustomers: React.FC<IFiltersCustomersProps> = ({
	sortField,
	sortOrder,
	getUsers,
	city,
}): JSX.Element => {
	const selectCity = city.map((madeIn: string): ISelectedOptions => {
		return { value: madeIn, label: madeIn }
	})

	const animatedComponents = makeAnimated()
	const [search, setSearch] = useState('')
	const { formik } = useFiltersCustomers({ sortField, sortOrder, getUsers })

	return (
		<form
			className={cn('filters', 'filtersCustomers')}
			onSubmit={formik.handleSubmit}
		>
			<div className={'search'}>
				<Search
					name='search'
					onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setSearch(e.target.value)
						handleInputChange(e, 'search', formik)
					}}
					value={search}
					placeholder={'Search name or email or phone...'}
				/>
			</div>
			<div>
				<span>City</span>
				<div className={'selectCategory'}>
					<Select
						isMulti
						name='colors'
						options={selectCity}
						value={selectCity.filter((option: ISelectedOptions) =>
							formik.values.city.includes(option.value),
						)}
						onChange={(e: MultiValue<ISelectedOptions>): void => {
							handleSelectChange(e, 'city', formik)
						}}
						classNamePrefix='select'
						closeMenuOnSelect={false}
						components={animatedComponents}
					/>
				</div>
			</div>
		</form>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		sortField: state.user.sortField,
		sortOrder: state.user.sortOrder,
		city: state.user.city,
	}
}

export default compose(connect(mapStateToProps, { getUsers }))(FiltersCustomers)
