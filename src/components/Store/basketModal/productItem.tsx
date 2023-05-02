import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import {
	addToBasket,
	deleteProductFromBasket,
	removeCountProduct,
} from '../../../redux/basketReducer/basketThunk'
import { AppStateType } from '../../../redux/redux-store'
import { publicUrl } from '../../../routes/layout/PublicLayout'
import { IProductBasket } from '../../../shared/interfaces/productInterface/productBasket.interface'
import './basketModal.scss'

interface IProductItem {
	productsBasket: IProductBasket[]
	addToBasket: (productId: string) => void
	removeCountProduct: (productId: string) => void
	deleteProductFromBasket: (productId: string) => void
}

export const ProductItem: React.FC<IProductItem> = ({
	productsBasket,
	addToBasket,
	removeCountProduct,
	deleteProductFromBasket,
}): JSX.Element => {
	return (
		<>
			{productsBasket.length &&
				productsBasket.map((product: IProductBasket) => (
					<div key={product.id}>
						<NavLink to={publicUrl + 'product/' + product.id} className='item'>
							<div className='productImg'>
								<img src={product.image} />
							</div>

							<div className='product_info'>
								<div className='info_option'>
									<p className='title'>{product.title}</p>
									<p className='classification'>
										{product.classification ? product.classification.name : ''}
									</p>
									<div className='counter'>
										<span
											className='material-symbols-outlined'
											onClick={(
												e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
											): void => {
												e.preventDefault()
												removeCountProduct(product.id)
											}}
										>
											remove
										</span>
										<p className='count'>{product.count}</p>
										<span
											className='material-symbols-outlined'
											onClick={(
												e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
											): void => {
												e.preventDefault()
												addToBasket(product.id)
											}}
										>
											add
										</span>
										<span
											className='material-symbols-outlined'
											onClick={(
												e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
											): void => {
												e.preventDefault()
												deleteProductFromBasket(product.id)
											}}
										>
											close
										</span>
									</div>
								</div>
								<p className='productPrice'>{product.price} $</p>
							</div>
						</NavLink>
						<div className='line'></div>
					</div>
				))}
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsBasket: state.basket.productsBasket,
	}
}

export default compose(
	connect(mapStateToProps, {
		addToBasket,
		removeCountProduct,
		deleteProductFromBasket,
	}),
)(ProductItem)
