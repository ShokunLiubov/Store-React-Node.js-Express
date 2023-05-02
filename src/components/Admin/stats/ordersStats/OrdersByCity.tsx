import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { IOrdersByCity } from '../../../../shared/stats/ordersByCity.interface'
import './ordersStats.scss'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

interface IOrdersByCityProps {
	ordersByCity: Array<IOrdersByCity>
}

export const OrdersByCity: React.FC<IOrdersByCityProps> = ({
	ordersByCity,
}): JSX.Element => {
	let label: Array<string> = []
	let total: Array<number> = []

	if (ordersByCity && ordersByCity.length) {
		ordersByCity.forEach((cityData: IOrdersByCity): void => {
			label.push(cityData._id)
			total.push(cityData.total)
		})
	}

	const options: any = {
		plugins: {
			datalabels: {
				color: '#bfbfc6',
				formatter: (value: number, context: any): string => {
					const sum = context.chart.data.datasets[0].data.reduce(
						(a: number, b: number) => a + b,
						0,
					)
					return ((value * 100) / sum).toFixed(2) + '%'
				},
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
				text: 'Orders by popular cities for year',
				color: '#bfbfc6',
				font: {
					weight: '300',
					size: '18px',
					family: 'Montserrat, sans-serif',
				},
			},
		},
		responsive: true,
	}

	const data = {
		labels: label,
		datasets: [
			{
				label: '# of Votes',
				data: total,
				backgroundColor: [
					'#d75776a6',
					'#295ca8',
					'#ffcd57a3',
					'#4bc0c0a8',
					'#9866ff8c',
					'#ff9f40a6',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'#2480f7',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	return <Pie data={data} options={options} />
}
