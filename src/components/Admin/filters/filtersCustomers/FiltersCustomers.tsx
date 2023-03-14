import cn from 'classnames'
import { useFormik } from 'formik'
import { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import * as Yup from 'yup'
import { AppStateType } from '../../../../redux/redux-store'
import { getUsers } from '../../../../redux/userReducer/userThunk'
import { IFiltersCustomers } from '../../../../shared/filters/filtersCustomers.interface'
import { ICategory } from '../../../../shared/interfaces/productInterface/category.interface'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { Search } from '../../search/Search'
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
	categories: Array<ICategory>
}

export const FiltersCustomers: React.FC<IFiltersCustomersProps> = ({
	sortField,
	sortOrder,
	getUsers,
	categories,
}) => {
	const selectCategory = categories.map((category: any) => {
		return { value: category._id, label: category.name }
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
						options={selectCategory}
						// value={selectCategory.filter((option: any) =>
						// 	formik.values.category.includes(option.value),
						// )}
						// onChange={(e: any) => {
						// 	handleSelectChange(e, 'category', formik)
						// }}
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
		categories: state.product.categories,
	}
}

export default compose(connect(mapStateToProps, { getUsers }))(FiltersCustomers)
