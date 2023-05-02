import { FormikValues } from 'formik'
import { useState } from 'react'
import { handleInputChange } from '../../../../../utils/debounce/handleInputChange'
import { Input } from '../../../../ui/form/input/Input'
import '../filtersCategory.scss'

interface IFilterPriceProps {
	formik: FormikValues
}

export const FilterPrice: React.FC<IFilterPriceProps> = ({
	formik,
}): JSX.Element => {
	const [priceGte, setPriceGte] = useState('')
	const [priceLte, setPriceLte] = useState('')

	return (
		<div className={'filterFromTo'}>
			<span>Price</span>
			<div className={'inputFromTo'}>
				<Input
					name={'price.$gte'}
					label={'from'}
					formik={formik}
					type={'number'}
					onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setPriceGte(e.target.value)
						handleInputChange(e, 'price.$gte', formik)
					}}
				/>
				<Input
					name={'price.$lte'}
					label={'to'}
					formik={formik}
					type={'number'}
					onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setPriceLte(e.target.value)
						handleInputChange(e, 'price.$lte', formik)
					}}
				/>
			</div>
		</div>
	)
}
