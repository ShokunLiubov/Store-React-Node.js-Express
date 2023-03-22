import React from 'react'
// import './input.scss'

interface ICheckbox {
	data: any
	value: any
	onChange: any
}

export const Checkbox: React.FC<ICheckbox> = ({ data, value, onChange }) => {
	return (
		<>
			{data.map((checkbox: any) => (
				<label key={checkbox.value} htmlFor={value}>
					<input
						id={checkbox.value}
						type='checkbox'
						name={value}
						value={checkbox.value}
						onChange={onChange}
					/>
					{checkbox.label}
				</label>
			))}
		</>
	)
}
