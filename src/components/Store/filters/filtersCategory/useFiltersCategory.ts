import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useParam } from '../../../../context/params.context'
import { IFiltersProducts } from '../../../../shared/filters/filtersProducts.interface'
import { ICategory } from '../../../../shared/interfaces/productInterface/category.interface'
import { IClassification } from '../../../../shared/interfaces/productInterface/classification.interface'

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
	categories: Array<ICategory>
	genderPage: boolean
	classificationPage: boolean
	categoriesPage: boolean
}

export const useFiltersCategory = ({
	getProducts,
	sortField,
	sortOrder,
	genderPage,
	classificationPage,
	categoriesPage,
	classifications,
	categories,
}: IFiltersCategoryProps) => {
	const { category } = useParams()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const params = useParam()

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
			page: '',
		},
		validationSchema,
		onSubmit: async (values: IFiltersProducts) => {
			const pageOrDefault = values.page || searchParams.get('page') || 1
			const sortFieldOrDefault = searchParams.get('sortField') || sortField
			const sortOrderOrDefault = searchParams.get('sortOrder') || sortOrder
			let url = await getProducts(
				pageOrDefault,
				sortFieldOrDefault,
				sortOrderOrDefault,
				values,
			)
			navigate(
				window.location.pathname + '?' + new URLSearchParams(url).toString(),
			)
			values.page = ''
		},
	})

	useEffect(() => {
		formik.setValues(formik.initialValues)

		const paramsFromUrl = {
			category: searchParams.get('category')?.split(',') || [],
			gender: searchParams.get('gender')?.split(',') || [],
			type_of_aroma: searchParams.get('type_of_aroma')?.split(',') || [],
			country_of_TM: searchParams.get('country_of_TM')?.split(',') || [],
			made_in: searchParams.get('made_in')?.split(',') || [],
			classification: searchParams.get('classification')?.split(',') || [],
			count: {
				$gte: searchParams.get('count[$gte]') || '',
				$lte: searchParams.get('count[$lte]') || '',
			},
			price: {
				$gte: searchParams.get('price[$gte]') || '',
				$lte: searchParams.get('price[$lte]') || '',
			},
			volume: {
				$gte: searchParams.get('volume[$gte]') || '',
				$lte: searchParams.get('volume[$lte]') || '',
			},
		}

		formik.setFieldValue('category', paramsFromUrl.category)
		formik.setFieldValue('gender', paramsFromUrl.gender)
		formik.setFieldValue('type_of_aroma', paramsFromUrl.type_of_aroma)
		formik.setFieldValue('country_of_TM', paramsFromUrl.country_of_TM)
		formik.setFieldValue('made_in', paramsFromUrl.made_in)
		formik.setFieldValue('classification', paramsFromUrl.classification)
		formik.setFieldValue('count', paramsFromUrl.count)
		formik.setFieldValue('price', paramsFromUrl.price)
		formik.setFieldValue('volume', paramsFromUrl.volume)

		if (params.params) {
			formik.setValues(formik.initialValues)
		}

		if (genderPage) {
			formik.setFieldValue('gender', category)
			formik.setFieldValue('page', '1')
		}

		if (classifications.length && classificationPage) {
			const classification = classifications.find(
				(c: IClassification) => c.slug === category,
			)

			formik.setFieldValue('classification', classification?._id)
			formik.setFieldValue('page', '1')
		}

		if (categories.length && categoriesPage) {
			const currentCategory = categories.find(
				(c: ICategory) => c.slug === category,
			)
			formik.setFieldValue('category', [currentCategory?._id])
			formik.setFieldValue('page', '1')
		}

		params.searchParams()

		setTimeout(() => {
			formik.submitForm()
		}, 0)
	}, [category, params.params])

	return { formik }
}
