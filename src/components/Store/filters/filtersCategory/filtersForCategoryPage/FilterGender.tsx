import { useState } from 'react'
import { handleInputChange } from '../../../../../utils/debounce/handleInputChange'
import { Checkbox } from '../../../../ui/form/checkbox/Checkbox'
import '../filtersCategory.scss'

interface IFilterGenderProps {
	formik: any
}

export const FilterGender: React.FC<IFilterGenderProps> = ({ formik }) => {
	const data = [
		{ label: 'Man', value: 'man' },
		{ label: 'Woman', value: 'woman' },
		{ label: 'Unisex', value: 'unisex' },
	]

	const [gender, setGender] = useState<string[]>([])

	return (
		<div className='filterCheckbox'>
			<span>Gender</span>
			<Checkbox
				data={data}
				value={formik.values.gender}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const { value, checked } = e.target
					const newGender = checked
						? [...gender, value]
						: gender.filter(g => g !== value)
					setGender(newGender)
					handleInputChange(e, 'gender', formik, newGender)
				}}
			/>
		</div>
	)
}
