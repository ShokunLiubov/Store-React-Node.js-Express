import { FormikValues } from 'formik'
import { connect } from 'react-redux'
import Select, { MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { AppStateType } from '../../../../../redux/redux-store'
import { ISelectedOptions } from '../../../../../shared/interfaces/common/selectedOptions.interface'
import { IClassification } from '../../../../../shared/interfaces/productInterface/classification.interface'
import { handleSelectChange } from '../../../../../utils/debounce/handleSelectChange'
import '../filtersCategory.scss'

interface IFilterClassificationProps {
	formik: FormikValues
	classifications: Array<IClassification>
}

export const FilterClassification: React.FC<IFilterClassificationProps> = ({
	formik,
	classifications,
}): JSX.Element => {
	const selectClassifications = classifications.map(
		(classification: IClassification) => {
			return { value: classification._id, label: classification.name }
		},
	)
	const animatedComponents = makeAnimated()

	return (
		<div>
			<span>Classifications</span>
			<div className={'selectCategory'}>
				<Select
					isMulti
					name='colors'
					options={selectClassifications}
					value={selectClassifications.filter((option: ISelectedOptions) =>
						formik.values.classification.includes(option.value),
					)}
					onChange={(e: MultiValue<ISelectedOptions>): void => {
						handleSelectChange(e, 'classification', formik)
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
		classifications: state.product.classifications,
	}
}

export default compose(connect(mapStateToProps, {}))(FilterClassification)
