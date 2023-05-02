import { FormikValues } from 'formik'
import { connect } from 'react-redux'
import Select, { MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { AppStateType } from '../../../../../redux/redux-store'
import { ISelectedOptions } from '../../../../../shared/interfaces/common/selectedOptions.interface'
import { ICategory } from '../../../../../shared/interfaces/productInterface/category.interface'
import { handleSelectChange } from '../../../../../utils/debounce/handleSelectChange'
import '../filtersCategory.scss'

interface IFilterCategoryProps {
	formik: FormikValues
	categories: Array<ICategory>
}

export const FilterCategory: React.FC<IFilterCategoryProps> = ({
	formik,
	categories,
}): JSX.Element => {
	const selectCategory = categories.map((category: ICategory) => {
		return { value: category._id, label: category.name }
	})
	const animatedComponents = makeAnimated()

	return (
		<div>
			<span>Category</span>
			<div className={'selectCategory'}>
				<Select
					isMulti
					name='colors'
					options={selectCategory}
					value={selectCategory.filter((option: ISelectedOptions) =>
						formik.values.category.includes(option.value),
					)}
					onChange={(e: MultiValue<ISelectedOptions>): void => {
						handleSelectChange(e, 'category', formik)
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
		categories: state.product.categories,
	}
}

export default compose(connect(mapStateToProps, {}))(FilterCategory)
