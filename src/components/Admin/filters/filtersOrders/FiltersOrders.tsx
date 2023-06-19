import cn from 'classnames'
import { debounce } from 'lodash'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import 'react-datetime/css/react-datetime.css'
import { connect } from 'react-redux'
import Select, { MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { useCalendar } from '../../../../context/calendar.context'
import { orderStatusArray } from '../../../../enums/orderStatus'
import { getOrders } from '../../../../redux/orderReducer/order.thunk'
import { AppStateType } from '../../../../redux/redux-store'
import { IFiltersOrders } from '../../../../shared/filters/filtersOrders.interface'
import { ISelectedOptions } from '../../../../shared/interfaces/common/selectedOptions.interface'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { handleSelectChange } from '../../../../utils/debounce/handleSelectChange'
import { Input } from '../../../ui/form/input/Input'
import { Search } from '../../../ui/form/search/Search'
import './filtersOrders.scss'
import { useFiltersOrders } from './useFiltersOrders'

interface IFiltersOrdersProps {
	sortField: string
	sortOrder: string
	getOrders: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersOrders,
	) => Promise<string>
	city: Array<string>
}

export const FiltersOrders: React.FC<IFiltersOrdersProps> = ({
	sortField,
	sortOrder,
	getOrders,
	city,
}): JSX.Element => {
	const { formik } = useFiltersOrders({ sortField, sortOrder, getOrders })

	const selectCity = city.map((madeIn: string): ISelectedOptions => {
		return { value: madeIn, label: madeIn }
	})

	const orderStatus = orderStatusArray.map(
		(status: string): ISelectedOptions => {
			return { value: status, label: status }
		},
	)

	const animatedComponents = makeAnimated()
	const [search, setSearch] = useState('')
	const [priceGte, setPriceGte] = useState('')
	const [priceLte, setPriceLte] = useState('')
	const calendar = useCalendar()

	const [range, setRange] = useState({
		endDate: new Date(),
		startDate: new Date(),
		key: 'selection',
	})

	const handleCalendar = (ranges: any): void => {
		setRange(ranges.selection)
		formik.setFieldValue('dataRange', ranges)
		formik.setFieldValue('page', 1)
		debounce(() => {
			calendar.closeCalendar()
			formik.submitForm()
		}, 2000)()
	}

	return (
		<form className={'filtersDark'} onSubmit={formik.handleSubmit}>
			<div className={'calendar'}>
				<label>Date checkout</label>
				{calendar.calendar ? (
					<div>
						<div className='overlay' onClick={calendar.toggleOverlay}>
							<div className='calendarItem'>
								<div>
									<DateRangePicker ranges={[range]} onChange={handleCalendar} />
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
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
								setPriceGte(e.target.value)
								handleInputChange(e, 'price.$gte', formik)
							}}
						/>
						<Input
							name={'price.$lte'}
							label={'to'}
							formik={formik}
							type={'number'}
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
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
							value={orderStatus.filter((option: ISelectedOptions) =>
								formik.values.status.includes(option.value),
							)}
							onChange={(e: MultiValue<ISelectedOptions>): void => {
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
				<div className={'search'}>
					<Search
						name='search'
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
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

export default compose(connect(mapStateToProps, { getOrders }))(FiltersOrders)
