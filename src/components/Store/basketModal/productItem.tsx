import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useBasketModal } from '../../../context/basketModalContext'
import {
	addToBasket,
	deleteProductFromBasket,
	removeCountProduct,
} from '../../../redux/basketReducer/basketThunk'
import { AppStateType } from '../../../redux/redux-store'
import { IProductBasket } from '../../../shared/interfaces/productInterface/productBasket.interface'
import './basketModal.scss'

interface IProductItem {
	productsBasket: IProductBasket[]
	// basketSum: number;
	addToBasket: (productId: string) => Promise<void>
	removeCountProduct: (productId: string) => Promise<void>
	deleteProductFromBasket: (productId: string) => Promise<void>
}

export const ProductItem: React.FC<IProductItem> = ({
	productsBasket,
	addToBasket,
	removeCountProduct,
	deleteProductFromBasket,
}) => {
	const basket = useBasketModal()

	return (
		<>
			{productsBasket.length &&
				productsBasket.map((product: any) => (
					<div key={product.id}>
						<div className='item'>
							<div className='productImg'>
								<img src={product.image} />
							</div>

							<div className='product_info'>
								<div className='info_option'>
									<p className='title'>{product.title}</p>
									<p className='classification'>{product.classification}</p>
									<div className='counter'>
										<span
											className='material-symbols-outlined'
											onClick={() => removeCountProduct(product.id)}
										>
											remove
										</span>
										<p className='count'>{product.count}</p>
										<span
											className='material-symbols-outlined'
											onClick={() => addToBasket(product.id)}
										>
											add
										</span>
										<span
											className='material-symbols-outlined'
											onClick={() => deleteProductFromBasket(product.id)}
										>
											close
										</span>
									</div>
								</div>
								<p className='productPrice'>{product.price} $</p>
							</div>
						</div>
						<div className='line'></div>
					</div>
				))}
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsBasket: state.basket.productsBasket,
		basketSum: state.basket.basketSum,
	}
}

export default compose(
	connect(mapStateToProps, {
		addToBasket,
		removeCountProduct,
		deleteProductFromBasket,
	}),
)(ProductItem)
