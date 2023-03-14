import { useFormik } from 'formik'
import { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import * as Yup from 'yup'
import { getProducts } from '../../../../redux/productReducer/productThunk'
import { AppStateType } from '../../../../redux/redux-store'
import { IFiltersProduct } from '../../../../shared/filters/filtersProducts.interface'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { handleSelectChange } from '../../../../utils/debounce/handleSelectChange'
import { Input } from '../../../ui/form/input/Input'
import { Search } from '../../search/Search'
import './filtersMyCatalog.scss'

interface IFiltersMyCatalogProps {
	sortField: string
	sortOrder: string
	getProducts: (
		page: number,
		sortField: string,
		sortOrder: string,
		values: IFiltersProduct,
	) => void
	categories: any
}

export const FiltersMyCatalog: React.FC<IFiltersMyCatalogProps> = ({
	sortField,
	sortOrder,
	getProducts,
	categories,
}) => {
	const selectCategory = categories.map((category: any) => {
		return { value: category._id, label: category.name }
	})
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
	const animatedComponents = makeAnimated()
	const [search, setSearch] = useState('')
	const [countGte, setCountGte] = useState('')
	const [countLte, setCountLte] = useState('')
	const [priceGte, setPriceGte] = useState('')
	const [priceLte, setPriceLte] = useState('')

	const formik = useFormik<IFiltersProduct>({
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
		validationSchema,
		onSubmit: (values: IFiltersProduct) => {
			getProducts(1, sortField, sortOrder, values)
		},
	})

	return (
		<form className={'filters'} onSubmit={formik.handleSubmit}>
			<div className={'filterFromTo'}>
				<span>Count</span>
				<div className={'inputFromTo'}>
					<Input
						name={'count.$gte'}
						label={'from'}
						formik={formik}
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCountGte(e.target.value)
							handleInputChange(e, 'count.$gte', formik)
						}}
					/>
					<Input
						name={'count.$lte'}
						label={'to'}
						formik={formik}
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCountLte(e.target.value)
							handleInputChange(e, 'count.$lte', formik)
						}}
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
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPriceGte(e.target.value)
							handleInputChange(e, 'price.$gte', formik)
						}}
					/>
					<Input
						name={'price.$lte'}
						label={'to'}
						formik={formik}
						type={'number'}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPriceLte(e.target.value)
							handleInputChange(e, 'price.$lte', formik)
						}}
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
						value={selectCategory.filter((option: any) =>
							formik.values.category.includes(option.value),
						)}
						onChange={(e: any) => {
							handleSelectChange(e, 'category', formik)
						}}
						classNamePrefix='select'
						closeMenuOnSelect={false}
						components={animatedComponents}
					/>
				</div>
			</div>
			<div className={'search'}>
				<Search
					name='search'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearch(e.target.value)
						handleInputChange(e, 'search', formik)
					}}
					value={search}
					placeholder={'Search products...'}
				/>
			</div>
		</form>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		sortField: state.product.sortField,
		sortOrder: state.product.sortOrder,
		categories: state.product.categories,
	}
}

export default compose(connect(mapStateToProps, { getProducts }))(
	FiltersMyCatalog,
)
