// import styles from './Search.module.css'

interface ISearch {
	onChange: React.ChangeEventHandler
	name: string
	value: string
	placeholder?: string
	onBlur?: any
	onInput?: any
}

export const Search: React.FC<ISearch> = ({
	onChange,
	name,
	value,
	placeholder,
	onBlur,
	onInput,
}) => {
	return (
		<>
			<input
				id={name}
				value={value}
				autoComplete='off'
				type='search'
				onChange={onChange}
				placeholder={placeholder}
				onBlur={onBlur}
				onInput={onInput}
			/>
		</>
	)
}
