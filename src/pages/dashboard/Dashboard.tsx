import cn from 'classnames'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { compose } from 'redux'
import { OrdersByCity } from '../../components/admin/stats/ordersStats/OrdersByCity'
import { OrdersByMonthChart } from '../../components/admin/stats/ordersStats/OrdersByMonthChart'
import { ProfitStats } from '../../components/admin/stats/profitStats/ProfitStats'
import ProfitStatsCalendar from '../../components/admin/stats/profitStats/ProfitStatsCalendar'
import { AppStateType } from '../../redux/redux-store'
import {
	getProfit,
	getStatsForOrders,
	getYearsForStats,
} from '../../redux/statsReducer/stats.thunk'
import { ICalendarRange } from '../../shared/interfaces/common/calendarRange.interface'
import { IOrdersByCity } from '../../shared/stats/ordersByCity.interface'
import { IOrdersByMonth } from '../../shared/stats/ordersByMonth.interface'
import { IRangeDate } from '../../shared/stats/rangeDate.interface'
import { handleSelectChangeNotMulti } from '../../utils/debounce/handleSelectChangeNotMulti'
import './dashboard.scss'

interface IDashboardProps {
	ordersByMonth: Array<IOrdersByMonth>
	ordersByCity: Array<IOrdersByCity>
	years: Array<number>
	profit: number
	range: IRangeDate
	getProfit: (dataRange: ICalendarRange) => void
	getYearsForStats: () => void
	getStatsForOrders: (years: number) => Promise<string>
}

interface IFormik {
	year: {
		value: number
		label: number
	}
}

export const Dashboard: React.FC<IDashboardProps> = ({
	range,
	ordersByMonth,
	years,
	ordersByCity,
	profit,
	getProfit,
	getStatsForOrders,
	getYearsForStats,
}): JSX.Element => {
	const navigate = useNavigate()

	useEffect(() => {
		getProfit({})
		getYearsForStats()

		const preloader = async () => {
			const url = await getStatsForOrders(years[years.length - 1])
			navigate(
				window.location.pathname + '?' + new URLSearchParams(url).toString(),
			)
		}
		preloader()
	}, [])

	const selectYear = years.map((year: number) => {
		return { value: year, label: year }
	})

	const formik = useFormik<IFormik>({
		initialValues: {
			year: {
				value: years[years.length - 1] || 0,
				label: years[years.length - 1] || 0,
			},
		},
		onSubmit: async (values: IFormik) => {
			let url = await getStatsForOrders(values.year.value)

			navigate(
				window.location.pathname + '?' + new URLSearchParams(url).toString(),
			)
		},
	})

	return (
		<main className={cn('containerAdminDark', 'dashboard')}>
			<div className='dashboardSelects'>
				<div className={'select'}>
					<Select
						isMulti={false}
						placeholder='Select year...'
						name='year'
						options={selectYear}
						value={formik.values.year}
						onChange={selectedOption => {
							handleSelectChangeNotMulti(selectedOption, 'year', formik)
						}}
					/>
				</div>
				<ProfitStatsCalendar />
			</div>

			<div className={'stats_top'}>
				<div className={'stats_top__left'}>
					{ordersByCity ? <OrdersByCity ordersByCity={ordersByCity} /> : ''}
				</div>
				<div className={'stats_top__right'}>
					{profit >= 0 ? <ProfitStats profit={profit} range={range} /> : ''}
				</div>
			</div>
			<OrdersByMonthChart ordersByMonth={ordersByMonth} />
		</main>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		ordersByMonth: state.stats.ordersByMonth,
		ordersByCity: state.stats.ordersByCity,
		years: state.stats.years,
		profit: state.stats.profit,
		range: state.stats.range,
	}
}

export default compose(
	connect(mapStateToProps, { getStatsForOrders, getYearsForStats, getProfit }),
)(Dashboard)
