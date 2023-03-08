import cn from 'classnames'
import { useFormik } from 'formik'
import { debounce } from 'lodash'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import 'react-datetime/css/react-datetime.css'
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { useCalendar } from '../../../../context/calendarContext'
import { orderStatusArray } from '../../../../enums/orderStatus'
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
	createdAt: any
	city: any
	price: {
		$gte: string
		$lte: string
	}
	status: any
}

export const FiltersOrders: React.FC<IFiltersOrders> = ({
	sortField,
	sortOrder,
	getOrders,
}) => {
	const orderStatus = orderStatusArray.map((status: any) => {
		return { value: status, label: status }
	})

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
	const calendar = useCalendar()

	const formik = useFormik<FormValues>({
		initialValues: {
			search: '',
			createdAt: {},
			city: [],
			price: {
				$gte: '',
				$lte: '',
			},
			status: [],
		},
		// validationSchema,
		onSubmit: values => {
			getOrders(1, sortField, sortOrder, values)
		},
	})

	const [range, setRange] = useState({
		endDate: new Date(),
		startDate: new Date(),
		key: 'selection',
	})

	const handleSelect = (ranges: any) => {
		setRange(ranges.selection)
		formik.setFieldValue('createdAt', ranges)
		calendar.toggleCalendar(true, true)
		if (formik.values.createdAt.selection) {
			debounce(() => {
				formik.submitForm()
				calendar.toggleCalendar(false, false)
			}, 2000)()
		}
	}

	return (
		<form className={'ordersFilters'} onSubmit={formik.handleSubmit}>
			<div className={'calendar'}>
				<label>Data checkout</label>
				{calendar.calendar.calendar ? (
					<div className='calendarItem'>
						<DateRangePicker ranges={[range]} onChange={handleSelect} />
					</div>
				) : (
					<div onClick={e => calendar.toggleCalendar(true, false)}>
						<span className={cn('material-symbols-outlined', 'calendarIcon')}>
							calendar_month
						</span>
					</div>
				)}
			</div>
			<div
				// onClick={() => calendar.toggleCalendar(false)}
				className='filtersOrder'
			>
				<div className={'filterFromTo'}>
					<span>Total Price</span>
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
					<span>Status Order</span>
					<div className={'select'}>
						<Select
							isMulti
							name='colors'
							options={orderStatus}
							value={orderStatus.filter((option: any) =>
								formik.values.status.includes(option.value),
							)}
							onChange={(e: any) => {
								handleSelectChange(e, 'status', formik)
							}}
							classNamePrefix='select'
							closeMenuOnSelect={false}
							components={animatedComponents}
						/>
					</div>
				</div>

				<div>
					<span>City</span>
					<div className={'select'}>
						<Select
							isMulti
							name='colors'
							// options={orderStatus}
							// value={orderStatus.filter((option: any) =>
							// 	formik.values.status.includes(option.value),
							// )}
							// onChange={(e: any) => {
							// 	handleSelectChange(e, 'status', formik)
							// }}
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
						placeholder={'Search clients...'}
					/>
				</div>
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
