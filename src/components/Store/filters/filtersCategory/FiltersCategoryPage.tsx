import cn from 'classnames'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import * as Yup from 'yup'
import { getProducts } from '../../../../redux/productReducer/productThunk'
import { AppStateType } from '../../../../redux/redux-store'
import { IFiltersProducts } from '../../../../shared/filters/filtersProducts.interface'
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
interface IFiltersCategoryProps {
	sortField: string
	sortOrder: string
	getProducts: (
		page: number,
		sortField: string,
		sortOrder: string,
		values: IFiltersProducts,
	) => void
	classifications: Array<IClassification>
	filters: IFiltersProducts
}

export const FiltersCategoryPage: React.FC<IFiltersCategoryProps> = ({
	sortField,
	sortOrder,
	getProducts,
	classifications,
}) => {
	const { category } = useParams()

	const genderPage =
		category === 'woman' || category === 'man' || category === 'unisex'

	const classificationPage =
		category === 'elite' || category === 'nisheva' || category === 'natural'

	const validationSchema = Yup.object().shape({
		category: Yup.array(),
		count: Yup.object().shape({
			$gte: Yup.number().nullable().integer(),
			$lte: Yup.number().nullable().integer(),
		}),
		price: Yup.object().shape({
			$gte: Yup.number().nullable().positive(),
			$lte: Yup.number().nullable().positive(),
		}),
	})

	const formik = useFormik<IFiltersProducts>({
		initialValues: {
			category: [],
			classification: [],
			gender: [],
			type_of_aroma: [],
			country_of_TM: [],
			made_in: [],
			count: {
				$gte: '',
				$lte: '',
			},
			price: {
				$gte: '',
				$lte: '',
			},
			volume: {
				$gte: '',
				$lte: '',
			},
		},
		validationSchema,
		onSubmit: (values: IFiltersProducts) => {
			getProducts(1, sortField, sortOrder, values)
		},
	})

	useEffect(() => {
		if (genderPage) {
			formik.setValues(formik.initialValues)
			formik.setFieldValue('gender', category)
			setTimeout(() => {
				formik.submitForm()
			}, 0)
		}
		if (classifications.length && classificationPage) {
			formik.setValues(formik.initialValues)
			const classification = classifications.find(
				(c: IClassification) => c.slug === category,
			)
			formik.setFieldValue('classification', classification?._id)

			setTimeout(() => {
				formik.submitForm()
			}, 0)
		}
		if (category === 'all') {
			formik.setValues(formik.initialValues)
			setTimeout(() => {
				formik.submitForm()
			}, 0)
		}
	}, [category])

	return (
		<form className={cn('filtersCategory')} onSubmit={formik.handleSubmit}>
			<FilterCategory formik={formik} />
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
