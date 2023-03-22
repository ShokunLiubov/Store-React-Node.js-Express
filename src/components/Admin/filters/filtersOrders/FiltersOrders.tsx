import cn from 'classnames'
import { useFormik } from 'formik'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
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
import {
	getCityForOrders,
	getOrders,
} from '../../../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../../../redux/redux-store'
import { IFiltersOrders } from '../../../../shared/filters/filtersOrders.interface'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { handleSelectChange } from '../../../../utils/debounce/handleSelectChange'
import { Input } from '../../../ui/form/input/Input'
import { Search } from '../../../ui/form/search/Search'
import './filtersOrders.scss'

interface IFiltersOrdersProps {
	sortField: string
	sortOrder: string
	getOrders: (
		page: number,
		sortField: string,
		sortOrder: string,
		filters: IFiltersOrders,
	) => void
	getCityForOrders: any
	city: Array<string>
}

export const FiltersOrders: React.FC<IFiltersOrdersProps> = ({
	sortField,
	sortOrder,
	getOrders,
	getCityForOrders,
	city,
}) => {
	useEffect(() => {
		getCityForOrders()
	}, [])

	const selectCity = city.map((madeIn: any) => {
		return { value: madeIn, label: madeIn }
	})
	const orderStatus = orderStatusArray.map((status: any) => {
		return { value: status, label: status }
	})

	const animatedComponents = makeAnimated()
	const [search, setSearch] = useState('')
	const [priceGte, setPriceGte] = useState('')
	const [priceLte, setPriceLte] = useState('')
	const calendar = useCalendar()

	const formik = useFormik<IFiltersOrders>({
		initialValues: {
			search: '',
			dataRange: {},
			city: [],
			price: {
				$gte: '',
				$lte: '',
			},
			status: [],
		},
		onSubmit: values => {
			calendar.closeCalendar()
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
		formik.setFieldValue('dataRange', ranges)
		debounce(() => {
			formik.submitForm()
		}, 2000)()
	}

	return (
		<form className={'filtersDark'} onSubmit={formik.handleSubmit}>
			<div className={'calendar'}>
				<label>Data checkout</label>
				{calendar.calendar ? (
					<div>
						<div className='overlay' onClick={calendar.toggleOverlay}>
							<div className='calendarItem'>
								<div>
									<DateRangePicker ranges={[range]} onChange={handleSelect} />
								</div>
							</div>
						</div>
					</div>
				) : (
					<div onClick={calendar.openCalendar}>
						<span className={cn('material-symbols-outlined', 'calendarIcon')}>
							calendar_month
						</span>
					</div>
				)}
			</div>
			<div className='filtersOrder'>
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
		city: state.order.city,
	}
}

export default compose(
	connect(mapStateToProps, { getOrders, getCityForOrders }),
)(FiltersOrders)
