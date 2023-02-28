import cn from 'classnames'
import React from 'react'
import './input.scss'

interface IInput {
	label: string
	name: string
	formik: any
	placeholder?: string
	type?: string
	onBlur?: any
}

export const Input: React.FC<IInput> = ({
	label,
	name,
	placeholder,
	formik,
	type,
	onBlur,
}) => {
	const error = formik.errors[name] && (
		<div className={'error'}>{formik.errors[name]}</div>
	)

	return (
		<>
			<div
				className={cn('fieldInput', formik.errors[name] ? 'fieldError' : '')}
			>
				<label htmlFor={`${name}_id`}>{label}</label>
				<input
					autoComplete='off'
					id={`${name}_id`}
					type={type ? type : 'text'}
					name={name}
					placeholder={placeholder}
					onChange={formik.handleChange}
					value={formik.values[name]}
					onBlur={onBlur}
				/>
			</div>
			{error}
		</>
	)
}
