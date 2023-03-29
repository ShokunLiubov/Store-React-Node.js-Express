import { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { getProducts } from '../../../../redux/productReducer/productThunk'
import { AppStateType } from '../../../../redux/redux-store'
import { ICategory } from '../../../../shared/interfaces/productInterface/category.interface'
import { handleInputChange } from '../../../../utils/debounce/handleInputChange'
import { handleSelectChange } from '../../../../utils/debounce/handleSelectChange'
import { Input } from '../../../ui/form/input/Input'
import { Search } from '../../../ui/form/search/Search'
import './filtersMyCatalog.scss'
import { useFiltersMyCatalog } from './useFiltersMyCatalog'

interface IFiltersMyCatalogProps {
	sortField: string
	sortOrder: string
	getProducts: (
		page: number,
		sortField: string,
		sortOrder: string,
		values: any,
	) => any
	categories: Array<ICategory>
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

	const animatedComponents = makeAnimated()
	const [search, setSearch] = useState('')
	const [countGte, setCountGte] = useState('')
	const [countLte, setCountLte] = useState('')
	const [priceGte, setPriceGte] = useState('')
	const [priceLte, setPriceLte] = useState('')

	const { formik } = useFiltersMyCatalog({ sortField, sortOrder, getProducts })

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
