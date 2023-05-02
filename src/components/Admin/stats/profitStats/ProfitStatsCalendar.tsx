import cn from 'classnames'
import { useFormik } from 'formik'
import { debounce } from 'lodash'
import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import 'react-datetime/css/react-datetime.css'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useCalendar } from '../../../../context/calendarContext'
import { AppStateType } from '../../../../redux/redux-store'
import { getProfit } from '../../../../redux/statsReducer/statsThunk'
import { ICalendarRange } from '../../../../shared/interfaces/common/calendarRange.interface'
import './profitStats.scss'

interface IProfitStatsProps {
	getProfit: (values: ICalendarRange) => void
}

interface IFormik {
	dataRange: ICalendarRange
}

const ProfitStatsCalendar: React.FC<IProfitStatsProps> = ({
	getProfit,
}): JSX.Element => {
	const calendar = useCalendar()

	const formik = useFormik<IFormik>({
		initialValues: {
			dataRange: {},
		},
		onSubmit: async (values: IFormik) => {
			getProfit(values.dataRange)
		},
	})

	const [range, setRange] = useState({
		endDate: new Date(),
		startDate: new Date(),
		key: 'selection',
	})

	const handleCalendar = (ranges: any): void => {
		console.log(ranges)
		setRange(ranges.selection)
		formik.setFieldValue('dataRange', ranges)
		debounce(() => {
			calendar.closeCalendar()
			formik.submitForm()
		}, 2000)()
	}

	return (
		<div>
			<div className={'calendar'}>
				<label>Date</label>
				<div onClick={calendar.openCalendar}>
					<span className={cn('material-symbols-outlined', 'calendarIcon')}>
						calendar_month
					</span>
				</div>
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
					''
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {}
}

export default compose(connect(mapStateToProps, { getProfit }))(
	ProfitStatsCalendar,
)
