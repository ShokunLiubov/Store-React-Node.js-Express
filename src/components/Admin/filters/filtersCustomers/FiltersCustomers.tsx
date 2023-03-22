import cn from 'classnames'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import * as Yup from 'yup'
import { AppStateType } from '../../../../redux/redux-store'
import {
	getCityForUsers,
	getUsers,
} from '../../../../redux/userReducer/userThunk'
import { IFiltersCustomers } from '../../../../shared/filters/filtersCustomers.interface'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { handleSelectChange } from '../../../../utils/debounce/handleSelectChange'
import { Search } from '../../../ui/form/search/Search'
import './filtersCustomers.scss'

interface IFiltersCustomersProps {
	sortField: string
	sortOrder: string
	getUsers: (
		page: number,
		sortField: string,
		sortOrder: string,
		values: IFiltersCustomers,
	) => void
	getCityForUsers: () => void
	city: Array<string>
}

export const FiltersCustomers: React.FC<IFiltersCustomersProps> = ({
	sortField,
	sortOrder,
	getUsers,
	getCityForUsers,
	city,
}) => {
	useEffect(() => {
		getCityForUsers()
	}, [])

	const selectCity = city.map((madeIn: any) => {
		return { value: madeIn, label: madeIn }
	})
	const validationSchema = Yup.object().shape({
		search: Yup.string(),
		city: Yup.array(),
	})
	const animatedComponents = makeAnimated()
	const [search, setSearch] = useState('')

	const formik = useFormik<IFiltersCustomers>({
		initialValues: {
			search: '',
			city: [],
		},
		validationSchema,
		onSubmit: (values: IFiltersCustomers) => {
			getUsers(1, sortField, sortOrder, values)
		},
	})

	return (
		<form
			className={cn('filters', 'filtersCustomers')}
			onSubmit={formik.handleSubmit}
		>
			<div className={'search'}>
				<Search
					name='search'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
						value={selectCity.filter((option: any) =>
							formik.values.city.includes(option.value),
						)}
						onChange={(e: any) => {
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

export default compose(connect(mapStateToProps, { getUsers, getCityForUsers }))(
	FiltersCustomers,
)
