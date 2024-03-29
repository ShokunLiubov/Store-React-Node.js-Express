import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { compose } from 'redux'
import * as Yup from 'yup'
import { getProducts } from '../../../../redux/productReducer/product.thunk'
import { AppStateType } from '../../../../redux/redux-store'
import { publicUrl } from '../../../../routes/layout/Public.layout'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { Search } from '../../../ui/form/search/Search'
import './searchHeaderStore.scss'

interface ISearchHeaderStoreProps {
	sortField: string
	sortOrder: string
	getProducts: (
		page: number,
		sortField: string,
		sortOrder: string,
		values: IFormik,
	) => Promise<string>
}

interface IFormik {
	search: string
}

export const SearchHeaderStore: React.FC<ISearchHeaderStoreProps> = ({
	sortField,
	sortOrder,
	getProducts,
}): JSX.Element => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	useEffect(() => {
		getProducts(1, sortField, sortOrder, {
			search: searchParams.get('search') || '',
		})
	}, [])

	const validationSchema = Yup.object().shape({
		search: Yup.string(),
	})
	const [search, setSearch] = useState('')

	const formik = useFormik<IFormik>({
		initialValues: {
			search: '',
		},
		validationSchema,
		onSubmit: async values => {
			navigate(publicUrl + 'search')

			let url = await getProducts(1, sortField, sortOrder, values)

			navigate(
				window.location.pathname + '?' + new URLSearchParams(url).toString(),
			)
		},
	})

	return (
		<form className={'search'} onSubmit={formik.handleSubmit}>
			<Search
				name='search'
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					setSearch(e.target.value)
					handleInputChange(e, 'search', formik)
				}}
				value={search}
				placeholder={'Search products...'}
			/>
			<button type='submit'>
				<span className='material-symbols-outlined'>search</span>
			</button>
		</form>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		sortField: state.user.sortField,
		sortOrder: state.user.sortOrder,
	}
}

export default compose(connect(mapStateToProps, { getProducts }))(
	SearchHeaderStore,
)
