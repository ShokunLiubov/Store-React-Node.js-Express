import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useParam } from '../../../../context/paramsContext'
import { IFiltersOrders } from '../../../../shared/filters/filtersOrders.interface'

interface IFiltersOrdersProps {
	sortField: string
	sortOrder: string
	getOrders: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersOrders,
	) => Promise<string>
}

export const useFiltersOrders = ({
    sortField,
    sortOrder,
    getOrders
}: IFiltersOrdersProps) => {
    
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = useParam()

const formik = useFormik<IFiltersOrders>({
    initialValues: {
        search: '',
        dataRange: {},
        city: [],
        price: {
            $gte: '',
            $lte: '',
        },
        status: [],
        page: '',
    },
    onSubmit: async (values: IFiltersOrders) => {
        const pageOrDefault = values.page || searchParams.get('page') || '1'
        const sortFieldOrDefault = searchParams.get('sortField') || sortField
        const sortOrderOrDefault = searchParams.get('sortOrder') || sortOrder
        let url = await getOrders(
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
        from: searchParams.get('dataRange[from]'),
        to: searchParams.get('dataRange[to]'),
        city: searchParams.get('city')?.split(',') || [],
        status: searchParams.get('status')?.split(',') || [],
        price: {
            $gte: searchParams.get('price[$gte]') || '',
            $lte: searchParams.get('price[$lte]') || '',
        },
    }

    if (params.params) {
        formik.setFieldValue('search', paramsFromUrl.search)
        formik.setFieldValue('status', paramsFromUrl.status)
        formik.setFieldValue('city', paramsFromUrl.city)
        formik.setFieldValue('price', paramsFromUrl.price)
        if (paramsFromUrl.to && paramsFromUrl.from) {
            formik.setFieldValue('dataRange', {
                selection: {
                    endDate: paramsFromUrl.to,
                    startDate: paramsFromUrl.from,
                },
            })
        }
    }

    params.searchParams()

    setTimeout(() => {
        formik.submitForm()
    }, 0)
}, [params.params])

  return {
    formik,
  }
}
