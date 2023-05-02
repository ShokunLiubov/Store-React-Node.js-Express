import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Line } from 'react-chartjs-2'
import { IOrdersByMonth } from '../../../../shared/stats/ordersByMonth.interface'
import './ordersStats.scss'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	ChartDataLabels,
)

interface IDashboardProps {
	ordersByMonth: Array<IOrdersByMonth>
}

export const OrdersByMonthChart: React.FC<IDashboardProps> = ({
	ordersByMonth,
}): JSX.Element => {
	const commonOptions = {
		responsive: true,
		scales: {
			x: {
				ticks: {
					color: '#bfbfc6',
					font: {
						weight: '300',
						family: 'Montserrat, sans-serif',
					},
				},
			},
			y: {
				ticks: {
					color: '#bfbfc6',
					font: {
						weight: '300',
						family: 'Montserrat, sans-serif',
					},
				},
			},
		},
	}

	const optionsTotalPrice: any = {
		...commonOptions,
		plugins: {
			datalabels: {
				display: false,
			},
			tooltip: {
				align: 'end',
				font: {
					color: '#bfbfc6',
					family: 'Montserrat, sans-serif',
				},
			},
			legend: {
				position: 'top' as const,
				labels: {
					color: '#bfbfc6',
					font: {
						weight: '300',
						family: 'Montserrat, sans-serif',
					},
				},
			},
			title: {
				display: true,
				text: 'Orders by Month Total Price',
				color: '#bfbfc6',
				font: {
					weight: '300',
					size: '18px',
					family: 'Montserrat, sans-serif',
				},
			},
		},
	}

	const optionsCount: any = {
		plugins: {
			datalabels: {
				display: false,
			},
			tooltip: {
				font: {
					color: '#bfbfc6',
					family: 'Montserrat, sans-serif',
				},
			},
			legend: {
				position: 'top' as const,
				labels: {
					color: '#bfbfc6',
					font: {
						weight: '300',
						family: 'Montserrat, sans-serif',
					},
				},
			},
			title: {
				display: true,
				text: 'Orders by Month Count Orders',
				color: '#bfbfc6',
				font: {
					weight: '300',
					size: '18px',
					family: 'Montserrat, sans-serif',
				},
			},
		},
		...commonOptions,
	}

	const getMonthName = (monthNumber: number) => {
		const months: Array<string> = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]

		return months[monthNumber - 1]
	}

	let label: Array<string> = []
	let total: Array<number> = []
	let count: Array<number> = []
	if (ordersByMonth && ordersByMonth.length) {
		ordersByMonth.forEach((monthData: IOrdersByMonth): void => {
			label.push(getMonthName(monthData.month))
			total.push(monthData.total)
			count.push(monthData.count)
		})
	}

	const dataTotalPrice = {
		labels: label,
		datasets: [
			{
				fill: true,
				label: 'Total Price',
				data: total,
				borderColor: '#2480f7',
				backgroundColor: '#2480f791',
			},
		],
	}

	const dataCount = {
		labels: label,
		datasets: [
			{
				fill: true,
				label: 'Count',
				data: count,
				borderColor: '#2480f7',
				backgroundColor: '#2480f791',
			},
		],
	}

	return (
		<div className='stats_middle'>
			<div className='stats_middle__left'>
				{ordersByMonth.length ? (
					<Line options={optionsTotalPrice} data={dataTotalPrice} />
				) : (
					''
				)}
			</div>
			<div className='stats_middle__right'>
				{ordersByMonth.length ? (
					<Line options={optionsCount} data={dataCount} />
				) : (
					''
				)}
			</div>
		</div>
	)
}
