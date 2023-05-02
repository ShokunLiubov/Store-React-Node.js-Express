import cn from 'classnames'
import { FormikValues } from 'formik'
import React from 'react'
import './input.scss'

interface IInput {
	label: string
	name: string
	formik: FormikValues
	placeholder?: string
	type?: string
	onBlur?: React.FocusEventHandler<HTMLInputElement>
	onChange?: any
	value?: string
}

export const Input: React.FC<IInput> = ({
	label,
	name,
	placeholder,
	formik,
	type,
	onBlur,
	onChange,
	value,
}): JSX.Element => {
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
					onChange={onChange ? onChange : formik.handleChange}
					value={value ? value : formik.values[name]}
					onBlur={onBlur}
				/>
			</div>
			{error}
		</>
	)
}
