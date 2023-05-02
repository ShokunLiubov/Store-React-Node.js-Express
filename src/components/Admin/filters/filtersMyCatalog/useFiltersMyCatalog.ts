import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useParam } from '../../../../context/paramsContext'
import { IFiltersProducts } from '../../../../shared/filters/filtersProducts.interface'

interface IFiltersMyCatalogProps {
	sortField: string
	sortOrder: string
	getProducts: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		values: IFiltersProducts,
	) => Promise<string>
}

export const useFiltersMyCatalog = ({
  sortField,
  sortOrder,
  getProducts,
}: IFiltersMyCatalogProps) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = useParam()

  const validationSchema = Yup.object().shape({
    search: Yup.string(),
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
        search: '',
        category: [],
        count: {
            $gte: '',
            $lte: '',
        },
        price: {
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
    const paramsFromUrl = {
        search: searchParams.get('search') || '',
        category: searchParams.get('category')?.split(',') || [],
        count: {
            $gte: searchParams.get('count[$gte]') || '',
            $lte: searchParams.get('count[$lte]') || '',
        },
        price: {
            $gte: searchParams.get('price[$gte]') || '',
            $lte: searchParams.get('price[$lte]') || '',
        },
    }

    if (params.params) {
        formik.setFieldValue('search', paramsFromUrl.search)
        formik.setFieldValue('category', paramsFromUrl.category)
        formik.setFieldValue('count', paramsFromUrl.count)
        formik.setFieldValue('price', paramsFromUrl.price)
    }

    params.searchParams()

    setTimeout(() => {
        formik.submitForm()
    }, 0)
}, [searchParams])

  return {
    formik,
  }
}
