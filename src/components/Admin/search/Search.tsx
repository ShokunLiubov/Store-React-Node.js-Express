import styles from './Search.module.css'

interface ISearch {
	onChange: React.ChangeEventHandler
}

export const Search: React.FC<ISearch> = ({ onChange }) => {
	return (
		<input
			className={styles.search}
			type='text'
			onChange={onChange}
			placeholder='Search by the title ...'
		/>
	)
}
