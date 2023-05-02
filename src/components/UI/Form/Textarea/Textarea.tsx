import cn from 'classnames'
import { FormikValues } from 'formik'
import React from 'react'
import './textarea.scss'

interface ITextarea {
	label: string
	id: string
	formik: FormikValues
}

export const Textarea: React.FC<ITextarea> = ({
	label,
	id,
	formik,
}): JSX.Element => {
	const error = formik.errors[id] && (
		<div className={'error'}>{formik.errors[id]}</div>
	)
	return (
		<>
			<div
				className={cn('fieldTextarea', formik.errors[id] ? 'fieldError' : '')}
			>
				<label htmlFor={id}>{label}</label>
				<textarea
					id={id}
					onChange={formik.handleChange}
					value={formik.values[id]}
				></textarea>
			</div>
			{error}
		</>
	)
}
