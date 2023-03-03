import { useFormik } from 'formik'
import { useState } from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { getOrders } from '../../../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../../../redux/redux-store'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { handleSelectChange } from '../../../../utils/debounce/handleSelectChange'
import { Input } from '../../../ui/form/input/Input'
import { Search } from '../../search/Search'

import './filtersOrders.scss'

interface IFiltersOrders {
	sortField: string
	sortOrder: string
	getOrders: (
		page: number,
		sortField: string,
		sortOrder: string,
		filters: any,
	) => void
}

interface FormValues {
	search: string
	createdAt: {
		from: string
		to: string
	}
	city: any
	price: {
		$gte: string
		$lte: string
	}
	status: string
}

export const FiltersOrders: React.FC<IFiltersOrders> = ({
	sortField,
	sortOrder,
	getOrders,
}) => {
	// const validationSchema = Yup.object().shape({
	// 	search: Yup.string(),
	// 	category: Yup.array(),
	// 	count: Yup.object().shape({
	// 		$gte: Yup.number().nullable().integer(),
	// 		$lte: Yup.number().nullable().integer(),
	// 	}),
	// 	price: Yup.object().shape({
	// 		$gte: Yup.number().nullable().positive(),
	// 		$lte: Yup.number().nullable().positive(),
	// 	}),
	// })
	const animatedComponents = makeAnimated()
	const [search, setSearch] = useState('')
	const [countGte, setCountGte] = useState('')
	const [countLte, setCountLte] = useState('')
	const [priceGte, setPriceGte] = useState('')
	const [priceLte, setPriceLte] = useState('')

	const formik = useFormik<FormValues>({
		initialValues: {
			search: '',
			createdAt: {
				from: '',
				to: '',
			},
			city: [],
			price: {
				$gte: '',
				$lte: '',
			},
			status: '',
		},
		// validationSchema,
		onSubmit: values => {
			console.log(values)

			// getOrders(1, sortField, sortOrder, values)
		},
	})

	const handleFromDateChange = (moment: any) => {
		formik.setFieldValue('fromDate', moment.format('YYYY-MM-DD'))
	}

	const handleToDateChange = (moment: any) => {
		formik.setFieldValue('toDate', moment.format('YYYY-MM-DD'))
	}

	return (
		<form className={'catalogFilters'} onSubmit={formik.handleSubmit}>
			<div className={'filterFromTo'}>
				<Datetime
					// name='fromDate'
					value={formik.values.createdAt.from}
					onChange={handleFromDateChange}
				/>

				<label htmlFor='toDate'>To Date</label>
				<Datetime
					// name='toDate'
					value={formik.values.createdAt.to}
					onChange={handleToDateChange}
				/>

				<span>Count</span>
				<div className={'inputFromTo'}>
					<Input
						name={'count.$gte'}
						label={'from'}
						formik={formik}
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCountGte(e.target.value)
							handleInputChange(e, 'count.$gte', formik)
						}}
					/>
					<Input
						name={'count.$lte'}
						label={'to'}
						formik={formik}
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCountLte(e.target.value)
							handleInputChange(e, 'count.$lte', formik)
						}}
					/>
				</div>
			</div>

			<div className={'filterFromTo'}>
				<span>Price</span>
				<div className={'inputFromTo'}>
					<Input
						name={'price.$gte'}
						label={'from'}
						formik={formik}
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPriceGte(e.target.value)
							handleInputChange(e, 'price.$gte', formik)
						}}
					/>
					<Input
						name={'price.$lte'}
						label={'to'}
						formik={formik}
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPriceLte(e.target.value)
							handleInputChange(e, 'price.$lte', formik)
						}}
					/>
				</div>
			</div>
			<div>
				<span>Category</span>
				<div className={'selectCategory'}>
					<Select
						isMulti
						name='colors'
						// options={selectCategory}
						// value={selectCategory.filter(option =>
						// 	formik.values.category.includes(option.value),
						// )}
						onChange={(e: any) => {
							handleSelectChange(e, 'category', formik)
						}}
						classNamePrefix='select'
						closeMenuOnSelect={false}
						components={animatedComponents}
					/>
				</div>
			</div>
			<div className={'search'}>
				<Search
					name='search'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearch(e.target.value)
						handleInputChange(e, 'search', formik)
					}}
					value={search}
					placeholder={'Search products...'}
				/>
			</div>
		</form>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		sortField: state.order.sortField,
		sortOrder: state.order.sortOrder,
	}
}

export default compose(connect(mapStateToProps, { getOrders }))(FiltersOrders)
