import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { AppStateType } from '../../../../../redux/redux-store'
import { handleSelectChange } from '../../../../../utils/debounce/handleSelectChange'
import '../filtersCategory.scss'

interface IFilterCountryTMProps {
	formik: any
	countryTM: Array<string>
}

export const FilterCountryTM: React.FC<IFilterCountryTMProps> = ({
	formik,
	countryTM,
}) => {
	const selectCountryTM = countryTM.map((country: any) => {
		return { value: country, label: country }
	})
	const animatedComponents = makeAnimated()

	return (
		<div>
			<span>Country TM</span>
			<div className={'selectCategory'}>
				<Select
					isMulti
					name='colors'
					options={selectCountryTM}
					value={selectCountryTM.filter((option: any) =>
						formik.values.country_of_TM.includes(option.value),
					)}
					onChange={(e: any) => {
						handleSelectChange(e, 'country_of_TM', formik)
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
		countryTM: state.product.countryTM,
	}
}

export default compose(connect(mapStateToProps, {}))(FilterCountryTM)
