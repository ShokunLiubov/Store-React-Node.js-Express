import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { AppStateType } from '../../../../../redux/redux-store'
import { handleSelectChange } from '../../../../../utils/debounce/handleSelectChange'
import '../filtersCategory.scss'

interface IFilterTypeAromaProps {
	formik: any
	typeAroma: Array<string>
}

export const FilterTypeAroma: React.FC<IFilterTypeAromaProps> = ({
	formik,
	typeAroma,
}) => {
	const selectTypeAroma = typeAroma.map((typeAroma: any) => {
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
					value={selectTypeAroma.filter((option: any) =>
						formik.values.type_of_aroma.includes(option.value),
					)}
					onChange={(e: any) => {
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
