import cn from 'classnames'
import { FormikValues } from 'formik'
import React from 'react'
import { ISelectedOptions } from '../../../../shared/interfaces/common/selectedOptions.interface'
import './select.scss'

interface ISelect {
	options: ISelectedOptions[]
	name: string
	formik: FormikValues
	label: string
}

export const Select: React.FC<ISelect> = ({
	options,
	name,
	formik,
	label,
}): JSX.Element => {
	const error = formik.errors[name] && (
		<div className={'error'}>{formik.errors[name]}</div>
	)

	return (
		<>
			<div
				className={cn('fieldSelect', formik.errors[name] ? 'fieldError' : '')}
			>
				<label>{label}</label>
				<select
					name={name}
					className={'select'}
					value={formik.values[name]}
					onChange={formik.handleChange}
				>
					{options.map(
						(opti: ISelectedOptions): React.ReactNode => (
							<option key={opti.label} value={formik.values[opti.label]}>
								{opti.label}
							</option>
						),
					)}
				</select>
			</div>
			{error}
		</>
	)
}
