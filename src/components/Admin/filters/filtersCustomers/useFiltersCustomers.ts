import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useParam } from '../../../../context/paramsContext'
import { IFiltersCustomers } from '../../../../shared/filters/filtersCustomers.interface'

interface IFiltersCustomersProps {
	sortField: string
	sortOrder: string
	getUsers: (
		page: number | string,
		sortField: string,
		sortOrder: string,
		values: IFiltersCustomers,
	) => Promise<string>
}

export const useFiltersCustomers = ({
  sortField,
  sortOrder,
  getUsers,
} : IFiltersCustomersProps) => {
    
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = useParam()

  const validationSchema = Yup.object().shape({
    search: Yup.string(),
    city: Yup.array(),
})

  const formik = useFormik<IFiltersCustomers>({
    initialValues: {
        search: '',
        city: [],
        page: '',
    },
    validationSchema,
    onSubmit: async (values: IFiltersCustomers) => {
        const pageOrDefault = values.page || searchParams.get('page') || 1
        const sortFieldOrDefault = searchParams.get('sortField') || sortField
        const sortOrderOrDefault = searchParams.get('sortOrder') || sortOrder
        let url = await getUsers(
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
        city: searchParams.get('city')?.split(',') || [],
    }

    if (params.params) {
        formik.setFieldValue('search', paramsFromUrl.search)
        formik.setFieldValue('city', paramsFromUrl.city)
    }

    params.searchParams()

    setTimeout(() => {
        formik.submitForm()
    }, 0)
}, [searchParams])

  return { formik }
}
