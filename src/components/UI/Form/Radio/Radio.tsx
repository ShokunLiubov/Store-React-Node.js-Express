import cn from 'classnames'
import { FormikValues } from 'formik'
import React from 'react'
import './radio.scss'

interface IRadio {
	data: Array<IRadioData>
	formik: FormikValues
	label: string
}

interface IRadioData {
	label: string
	name: string
	value: string
}

export const Radio: React.FC<IRadio> = ({
	formik,
	data,
	label,
}): JSX.Element => {
	return (
		<div
			className={cn(
				'wrapRadio',
				formik.errors[data[0].name] ? 'radioError' : '',
			)}
		>
			<label>{label}</label>
			{data.map(({ label, name, value }) => (
				<div key={`${label}_id`} className={'radio'}>
					<label htmlFor={`${label}_id`}>{label}</label>
					<input
						checked={formik.values[name] === value}
						id={`${label}_id`}
						type='radio'
						name={name}
						onChange={formik.handleChange}
						value={value}
					/>
				</div>
			))}
			{formik.errors[data[0].name] && (
				<div className={'errorRadio'}>{formik.errors[data[0].name]} </div>
			)}
		</div>
	)
}
