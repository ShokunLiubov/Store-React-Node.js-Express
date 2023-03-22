import { useState } from 'react'
import { handleInputChange } from '../../../../../utils/debounce/handleInputChange'
import { Input } from '../../../../ui/form/input/Input'
import '../filtersCategory.scss'

interface IFilterCountProps {
	formik: any
}

export const FilterCount: React.FC<IFilterCountProps> = ({ formik }) => {
	const [countGte, setCountGte] = useState('')
	const [countLte, setCountLte] = useState('')

	return (
		<div className={'filterFromTo'}>
			<span>Count</span>
			<div className={'inputFromTo'}>
				<Input
					name={'count.$gte'}
					label={'from'}
					formik={formik}
					type={'number'}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setCountGte(e.target.value)
						handleInputChange(e, 'count.$gte', formik)
					}}
				/>
				<Input
					name={'count.$lte'}
					label={'to'}
					formik={formik}
					type={'number'}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setCountLte(e.target.value)
						handleInputChange(e, 'count.$lte', formik)
					}}
				/>
			</div>
		</div>
	)
}
