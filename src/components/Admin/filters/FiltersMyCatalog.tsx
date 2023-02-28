import { useFormik } from 'formik'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import * as Yup from 'yup'
import { selectCategory } from '../../../data/select/selectCategory'
import { getProducts } from '../../../redux/productReducer/productThunk'
import { AppStateType } from '../../../redux/redux-store'
import { Input } from '../../ui/form/input/Input'
import { Search } from '../search/Search'
import './filtersMyCatalog.scss'
// const capitalize = (str: string) =>
// 	str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

interface IFiltersMyCatalog {
	sortField: string
	sortOrder: string
	getProducts: any
}

interface FormValues {
	search: any
	category: Array<any>
	count: {
		$gte: any
		$lte: any
	}
	price: {
		$gte: any
		$lte: any
	}
}

export const FiltersMyCatalog: React.FC<IFiltersMyCatalog> = ({
	sortField,
	sortOrder,
	getProducts,
}) => {
	const validationSchema = Yup.object({
		// firstName: Yup.string().required("Required"),
		// lastName: Yup.string().required("Required"),
		// email: Yup.string().email("Invalid email address").required("Required"),
	})
	const animatedComponents = makeAnimated()

	const formik = useFormik<FormValues>({
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
		},
		// validationSchema,
		onSubmit: values => {
			getProducts(1, sortField, sortOrder, values)
		},
	})
	const handleSelectChange = (selectedOptions: any) => {
		formik.setFieldValue(
			'category',
			selectedOptions.map((option: any) => option.value),
		)
	}

	const delayedSubmit = debounce(formik.submitForm, 500)

	return (
		<form className={'catalogFilters'} onSubmit={formik.handleSubmit}>
			<div className={'filterFromTo'}>
				<span>Count</span>
				<div className={'inputFromTo'}>
					<Input
						name={'count.$gte'}
						label={'from'}
						formik={formik}
						onBlur={delayedSubmit}
					/>
					<Input
						name={'count.$lte'}
						label={'to'}
						formik={formik}
						onBlur={delayedSubmit}
					/>
				</div>
			</div>

			<div className={'filterFromTo'}>
				<span>Price</span>
				<div className={'inputFromTo'}>
					<Input
						name={'price.$gte'}
						label={'from'}
						formik={formik}
						onBlur={delayedSubmit}
					/>
					<Input
						name={'price.$lte'}
						label={'to'}
						formik={formik}
						onBlur={delayedSubmit}
					/>
				</div>
			</div>
			<div>
				<span>Category</span>
				<div className={'selectCategory'}>
					<Select
						isMulti
						name='colors'
						options={selectCategory}
						// className='basic-multi-select'
						value={selectCategory.filter(option =>
							formik.values.category.includes(option.value),
						)}
						onChange={handleSelectChange}
						classNamePrefix='select'
						closeMenuOnSelect={false}
						onBlur={delayedSubmit}
						components={animatedComponents}
					/>
				</div>
			</div>
			<div className={'search'}>
				<Search
					name='search'
					onChange={formik.handleChange}
					onBlur={delayedSubmit}
					value={formik.values.search}
					placeholder={'Search products...'}
				/>
			</div>

			{/* <button className={'buttonFilter'} type='submit'>
				Apply Filters
			</button> */}
		</form>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsData: state.product.productsData,
		currentPage: state.product.currentPage,
		totalPages: state.product.totalPages,
		sortField: state.product.sortField,
		sortOrder: state.product.sortOrder,
	}
}

export default compose(connect(mapStateToProps, { getProducts }))(
	FiltersMyCatalog,
)
