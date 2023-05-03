import cn from 'classnames'
import { useState } from 'react'
import './table.scss'

interface IHeaders {
	label: string
	field: string
	order: boolean
	classTh?: string
}

interface ITableComponentProps {
	data: React.ReactNode
	headers: Array<IHeaders>
	onSort: (field: string, order: string) => void
	classTable?: string
	classTh?: string
}

export const TableComponent: React.FC<ITableComponentProps> = ({
	data,
	headers,
	onSort,
	classTable,
}) => {
	const [sort, setSort] = useState('1')

	const setSortTable = async (sort: string) => {
		if (sort === '1') {
			setSort('-1')
		} else {
			setSort('1')
			sort = '-1'
		}
	}

	const sortOrderSpan = (
		<span className='material-symbols-outlined'>
			{sort === '1' ? 'expand_less' : 'expand_more'}
		</span>
	)

	return (
		<table className={cn('table', classTable)}>
			<thead>
				<tr>
					{headers.map(header => (
						<th
							key={header.field}
							scope='col'
							onClick={async () => {
								header.order && (await setSortTable(sort))
								onSort(header.field, sort)
							}}
							className={cn('sortTable', header.classTh ? header.classTh : '')}
						>
							{header.label}
							{header.order ? sortOrderSpan : ''}
						</th>
					))}
				</tr>
			</thead>
			<tbody>{data}</tbody>
		</table>
	)
}
