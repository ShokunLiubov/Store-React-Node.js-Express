import { useState } from 'react'
import { handleInputChange } from '../../../../../utils/debounce/handleInputChange'
import { Input } from '../../../../ui/form/input/Input'
import '../filtersCategory.scss'

interface IFilterValueProps {
	formik: any
}

export const FilterVolume: React.FC<IFilterValueProps> = ({ formik }) => {
	const [volumeGte, setVolumeGte] = useState('')
	const [volumeLte, setVolumeLte] = useState('')

	return (
		<div className={'filterFromTo'}>
			<span>Volume</span>
			<div className={'inputFromTo'}>
				<Input
					name={'volume.$gte'}
					label={'from'}
					formik={formik}
					type={'number'}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setVolumeGte(e.target.value)
						handleInputChange(e, 'volume.$gte', formik)
					}}
				/>
				<Input
					name={'volume.$lte'}
					label={'to'}
					formik={formik}
					type={'number'}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setVolumeLte(e.target.value)
						handleInputChange(e, 'volume.$lte', formik)
					}}
				/>
			</div>
		</div>
	)
}
