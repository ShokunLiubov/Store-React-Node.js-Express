import { useFormik } from 'formik'
import { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as Yup from 'yup'
import { getProducts } from '../../../../redux/productReducer/productThunk'
import { AppStateType } from '../../../../redux/redux-store'
import { ICategory } from '../../../../shared/interfaces/productInterface/category.interface'
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
		values: any,
	) => void
	categories: Array<ICategory>
}

export const SearchHeaderStore: React.FC<ISearchHeaderStoreProps> = ({
	sortField,
	sortOrder,
	getProducts,
}) => {
	const validationSchema = Yup.object().shape({
		search: Yup.string(),
	})
	const [search, setSearch] = useState('')

	const formik = useFormik<any>({
		initialValues: {
			search: '',
		},
		validationSchema,
		onSubmit: values => {
			getProducts(1, sortField, sortOrder, values)
		},
	})

	return (
		<form className={'search'} onSubmit={formik.handleSubmit}>
			<Search
				name='search'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
		categories: state.product.categories,
	}
}

export default compose(connect(mapStateToProps, { getProducts }))(
	SearchHeaderStore,
)
