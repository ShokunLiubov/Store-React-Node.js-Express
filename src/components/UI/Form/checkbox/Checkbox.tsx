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
			{data.map((name: any) => (
				<label key={name} htmlFor={value}>
					<input
						id={name}
						type='checkbox'
						name={value}
						value={name}
						onChange={onChange}
					/>
					{name}
				</label>
			))}
		</>
	)
}
