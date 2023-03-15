import cn from 'classnames'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { compose } from 'redux'
import { Input } from '../../components/ui/form/input/Input'
import { Radio } from '../../components/ui/form/radio/Radio'
import { Textarea } from '../../components/ui/form/textarea/Textarea'
import { selectTypeAroma } from '../../data/select/selectTypeAroma'
import {
	createNewProduct,
	getSelectData,
	updateProduct,
} from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { adminUrl } from '../../routes/layout/AdminLayout'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import { validateCreateProductForm } from '../../utils/validate/Validate'
import './createProduct.scss'

interface CreateProductProps {
	createNewProduct: (formData: any) => void
	updateProduct: (formData: any, id: any) => void
	editProduct: IProduct
	getSelectData: any
	categories: any
	classifications: any
}

export const CreateProduct: React.FC<CreateProductProps> = ({
	createNewProduct,
	editProduct,
	updateProduct,
	getSelectData,
	categories,
	classifications,
}) => {
	useEffect(() => {
		getSelectData()
	}, [])
	const selectClassification = classifications.map((classification: any) => {
		return { value: classification._id, label: classification.name }
	})
	const selectCategory = categories.map((category: any) => {
		return { value: category._id, label: category.name }
	})
	const navigate = useNavigate()
	let pathnameEditProduct = useLocation().pathname === adminUrl + 'edit-product'
	const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)

	const title = pathnameEditProduct ? editProduct.title : ''
	const category = pathnameEditProduct ? editProduct.category : ''
	const classification = pathnameEditProduct ? editProduct.classification : ''
	const price = pathnameEditProduct ? editProduct.price : ''
	const count = pathnameEditProduct ? editProduct.count : ''
	const gender = pathnameEditProduct ? editProduct.gender : ''
	const volume = pathnameEditProduct ? editProduct.volume : ''
	const type_of_aroma = pathnameEditProduct ? editProduct.type_of_aroma : ''
	const country_of_TM = pathnameEditProduct ? editProduct.country_of_TM : ''
	const made_in = pathnameEditProduct ? editProduct.made_in : ''
	const description = pathnameEditProduct ? editProduct.description : ''

	const formik = useFormik({
		initialValues: {
			image: '',
			title: title,
			category: `${category}`,
			classification: `${classification}`,
			price: `${price}`,
			count: `${count}`,
			gender: `${gender}`,
			volume: `${volume}`,
			type_of_aroma: `${type_of_aroma}`,
			country_of_TM: `${country_of_TM}`,
			made_in: `${made_in}`,
			description: `${description}`,
		},
		onSubmit: (values: any) => {
			if (values.image === '') {
				values.image = editProduct.image
			}
			const formData = new FormData()

			for (let value in values) {
				formData.append(value, values[value])
			}

			if (pathnameEditProduct) {
				updateProduct(formData, editProduct._id)
			} else {
				createNewProduct(formData)
			}

			navigate(adminUrl + 'my-catalogs')
		},
		enableReinitialize: true,
		validateOnChange: validateAfterSubmit,
		validate: validateCreateProductForm,
	})

	const handleSelectChange = (selectedOption: any, fieldName: any) => {
		formik.setFieldValue(fieldName, selectedOption.value)
	}

	return (
		<div className={cn('containerAdminDark')}>
			<form
				className={'NewProductForm'}
				onSubmit={formik.handleSubmit}
				encType='multipart/form-data'
			>
				<span>
					{pathnameEditProduct ? 'Edit Product' : 'Create New Product'}
				</span>

				<div className='fieldInput'>
					<label>Dowland Image</label>
					<input
						type='file'
						name='image'
						accept='image/*'
						placeholder={
							pathnameEditProduct ? 'Edit image product' : 'Add image product'
						}
						onChange={(e: any) =>
							formik.setFieldValue('image', e.currentTarget.files[0])
						}
					/>
				</div>

				<Input label={'Name Product'} name={'title'} formik={formik} />
				<div className='selectCreateProduct'>
					<label>Category</label>
					<Select
						className='basic-single'
						classNamePrefix='select'
						name='category'
						options={selectCategory}
						value={selectCategory.filter(
							(option: any) => option.value === formik.values.category,
						)}
						onChange={(e: any) => {
							handleSelectChange(e, 'category')
						}}
					/>
				</div>
				<div className='selectCreateProduct'>
					<label>Classification</label>
					<Select
						className='basic-single'
						classNamePrefix='select'
						name='classification'
						options={selectClassification}
						value={selectClassification.filter(
							(option: any) => option.value === formik.values.classification,
						)}
						onChange={(e: any) => {
							handleSelectChange(e, 'classification')
						}}
					/>
				</div>
				<div className='selectCreateProduct'>
					<label>Type Aroma</label>
					<Select
						className='basic-single'
						classNamePrefix='select'
						name='type_of_aroma'
						options={selectTypeAroma}
						value={selectTypeAroma.filter(
							option => option.value === formik.values.type_of_aroma,
						)}
						onChange={(e: any) => {
							handleSelectChange(e, 'type_of_aroma')
						}}
					/>
				</div>

				<Input label={'Price'} name={'price'} formik={formik} />

				<Input label={'Count'} name={'count'} formik={formik} />

				<Radio
					data={[
						{ label: 'Man', name: 'gender', value: 'man' },
						{ label: 'Woman', name: 'gender', value: 'woman' },
						{ label: 'Unisex', name: 'gender', value: 'unisex' },
					]}
					label={'Gender'}
					formik={formik}
				/>

				<Input label={'Volume'} name={'volume'} formik={formik} />

				<Input label={'Country of TM'} name={'country_of_TM'} formik={formik} />

				<Input label={'Made in'} name={'made_in'} formik={formik} />

				<Textarea label={'Description'} id={'description'} formik={formik} />
				<div className={'createButton'}>
					<button
						className='mainButton'
						type='submit'
						onClick={() => {
							setValidateAfterSubmit(true)
							formik.handleSubmit()
						}}
					>
						{pathnameEditProduct ? 'Edit product' : 'Create a product'}
					</button>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsData: state.product.productsData,
		editProduct: state.product.editProduct,
		categories: state.product.categories,
		classifications: state.product.classifications,
	}
}

export default compose(
	connect(mapStateToProps, { createNewProduct, updateProduct, getSelectData }),
)(CreateProduct)
