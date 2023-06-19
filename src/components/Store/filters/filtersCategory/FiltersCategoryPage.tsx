import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { getProducts } from '../../../../redux/productReducer/product.thunk'
import { AppStateType } from '../../../../redux/redux-store'
import { IFiltersProducts } from '../../../../shared/filters/filtersProducts.interface'
import { ICategory } from '../../../../shared/interfaces/productInterface/category.interface'
import { IClassification } from '../../../../shared/interfaces/productInterface/classification.interface'
import './filtersCategory.scss'
import FilterCategory from './filtersForCategoryPage/FilterCategory'
import FilterClassification from './filtersForCategoryPage/FilterClassification'
import { FilterCount } from './filtersForCategoryPage/FilterCount'
import FilterCountryTM from './filtersForCategoryPage/FilterCountryTM'
import { FilterGender } from './filtersForCategoryPage/FilterGender'
import FilterMadeIn from './filtersForCategoryPage/FilterMadeIn'
import { FilterPrice } from './filtersForCategoryPage/FilterPrice'
import FilterTypeAroma from './filtersForCategoryPage/FilterTypeAroma'
import { FilterVolume } from './filtersForCategoryPage/FilterVolume'
import { useFiltersCategory } from './useFiltersCategory'

interface IFiltersCategoryProps {
	sortField: string
	sortOrder: string
	getProducts: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		values: IFiltersProducts,
	) => Promise<string>
	classifications: Array<IClassification>
	filters: IFiltersProducts
	categories: Array<ICategory>
}

export const FiltersCategoryPage: React.FC<IFiltersCategoryProps> = ({
	sortField,
	sortOrder,
	getProducts,
	classifications,
	categories,
}): JSX.Element => {
	const { category } = useParams()

	const genderPage =
		category === 'woman' || category === 'man' || category === 'unisex'

	const classificationPage =
		category === 'elite' || category === 'nisheva' || category === 'natural'

	const categoriesPage =
		category === 'face' ||
		category === 'gifts' ||
		category === 'perfumery' ||
		category === 'hair' ||
		category === 'makeup' ||
		category === 'perfumery' ||
		category === 'to-men' ||
		category === 'health&care' ||
		category === 'clothes'

	const { formik } = useFiltersCategory({
		getProducts,
		sortField,
		sortOrder,
		genderPage,
		classificationPage,
		categoriesPage,
		classifications,
		categories,
	})

	return (
		<form className={'filtersCategory'} onSubmit={formik.handleSubmit}>
			{categoriesPage ? '' : <FilterCategory formik={formik} />}
			{classificationPage ? '' : <FilterClassification formik={formik} />}
			{genderPage ? '' : <FilterGender formik={formik} />}
			<FilterTypeAroma formik={formik} />
			<FilterMadeIn formik={formik} />
			<FilterCountryTM formik={formik} />
			<FilterCount formik={formik} />
			<FilterPrice formik={formik} />
			<FilterVolume formik={formik} />
		</form>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		sortField: state.product.sortField,
		sortOrder: state.product.sortOrder,
		categories: state.product.categories,
		filters: state.product.filters,
		classifications: state.product.classifications,
	}
}

export default compose(connect(mapStateToProps, { getProducts }))(
	FiltersCategoryPage,
)
