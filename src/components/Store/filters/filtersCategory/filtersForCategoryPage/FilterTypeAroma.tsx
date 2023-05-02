import { FormikValues } from 'formik'
import { connect } from 'react-redux'
import Select, { MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { AppStateType } from '../../../../../redux/redux-store'
import { ISelectedOptions } from '../../../../../shared/interfaces/common/selectedOptions.interface'
import { handleSelectChange } from '../../../../../utils/debounce/handleSelectChange'
import '../filtersCategory.scss'

interface IFilterTypeAromaProps {
	formik: FormikValues
	typeAroma: Array<string>
}

export const FilterTypeAroma: React.FC<IFilterTypeAromaProps> = ({
	formik,
	typeAroma,
}): JSX.Element => {
	const selectTypeAroma = typeAroma.map((typeAroma: string) => {
		return { value: typeAroma, label: typeAroma }
	})
	const animatedComponents = makeAnimated()

	return (
		<div>
			<span>Type of Aroma</span>
			<div className={'selectCategory'}>
				<Select
					isMulti
					name='colors'
					options={selectTypeAroma}
					value={selectTypeAroma.filter((option: ISelectedOptions) =>
						formik.values.type_of_aroma.includes(option.value),
					)}
					onChange={(e: MultiValue<ISelectedOptions>): void => {
						handleSelectChange(e, 'type_of_aroma', formik)
					}}
					classNamePrefix='select'
					closeMenuOnSelect={false}
					components={animatedComponents}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		typeAroma: state.product.typeAroma,
	}
}

export default compose(connect(mapStateToProps, {}))(FilterTypeAroma)
