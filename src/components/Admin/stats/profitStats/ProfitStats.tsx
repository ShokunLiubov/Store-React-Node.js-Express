import React from 'react'
import { IRangeDate } from '../../../../shared/stats/rangeDate.interface'
import './profitStats.scss'

interface IProfitStatsProps {
	profit: number
	range: IRangeDate
}

export const ProfitStats: React.FC<IProfitStatsProps> = ({
	profit,
	range,
}): JSX.Element => {
	let rangeTime = ''

	if (range.from && range.to) {
		rangeTime = `${range.from.slice(0, 10)} - ${range.to.slice(0, 10)}`

		if (range.from === range.to) {
			rangeTime = range.from.slice(0, 10)
		}
	}
	return (
		<div className='profitStats'>
			<span>Profit over time</span>
			<span>{rangeTime}</span>
			<span className='profit'>{profit}$</span>
		</div>
	)
}
