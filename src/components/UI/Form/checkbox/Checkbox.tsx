import React from 'react'

interface ICheckbox {
	data: any
	value: any
	onChange: any
}

export const Checkbox: React.FC<ICheckbox> = ({
	data,
	value,
	onChange,
}): JSX.Element => {
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
