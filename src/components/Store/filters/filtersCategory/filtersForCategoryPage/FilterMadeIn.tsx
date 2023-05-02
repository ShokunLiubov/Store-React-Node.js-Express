import { FormikValues } from 'formik'
import { connect } from 'react-redux'
import Select, { MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { AppStateType } from '../../../../../redux/redux-store'
import { ISelectedOptions } from '../../../../../shared/interfaces/common/selectedOptions.interface'
import { handleSelectChange } from '../../../../../utils/debounce/handleSelectChange'
import '../filtersCategory.scss'

interface IFilterMadeInProps {
	formik: FormikValues
	madeIn: Array<string>
}

export const FilterMadeIn: React.FC<IFilterMadeInProps> = ({
	formik,
	madeIn,
}): JSX.Element => {
	const selectMadeIn = madeIn.map((madeIn: string) => {
		return { value: madeIn, label: madeIn }
	})
	const animatedComponents = makeAnimated()

	return (
		<div>
			<span>Made In</span>
			<div className={'selectCategory'}>
				<Select
					isMulti
					name='colors'
					options={selectMadeIn}
					value={selectMadeIn.filter((option: ISelectedOptions) =>
						formik.values.made_in.includes(option.value),
					)}
					onChange={(e: MultiValue<ISelectedOptions>): void => {
						handleSelectChange(e, 'made_in', formik)
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
		madeIn: state.product.madeIn,
	}
}

export default compose(connect(mapStateToProps, {}))(FilterMadeIn)
