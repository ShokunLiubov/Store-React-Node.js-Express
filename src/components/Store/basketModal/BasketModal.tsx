import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { useBasketModal } from '../../../context/basketModalContext'
import { AppStateType } from '../../../redux/redux-store'
import { IProductBasket } from '../../../shared/interfaces/productInterface/productBasket.interface'
import './basketModal.scss'
import ProductItem from './productItem'

interface IBasketModal {
	productsBasket: IProductBasket[]
	basketSum: number
}

export const BasketModal: React.FC<IBasketModal> = ({
	productsBasket,
	basketSum,
}) => {
	const basket = useBasketModal()

	return (
		<div className='modal'>
			<div className='overlay' onClick={basket.toggleBasketModal}>
				<div className='basketModal' onClick={basket.toggleBasketModal}>
					<div className='title'>
						<h3>Basket</h3>
						<span
							className='material-symbols-outlined'
							onClick={basket.toggleBasketModal}
						>
							close
						</span>
					</div>
					<div className='line'></div>

					<div className='productItems'>
						{productsBasket.length ? <ProductItem /> : 'Basket is empty'}
					</div>

					<div className='totalPrice'>
						<div>Total price:</div>
						<div>{basketSum} $</div>;
					</div>

					<div className='line'></div>
					<div className='bottom'>
						<span onClick={basket.toggleBasketModal}>Continue Shopping</span>
						{productsBasket.length ? (
							<NavLink to={'/checkout'}>
								<button onClick={basket.toggleBasketModal}>Checkout</button>
							</NavLink>
						) : (
							<button type='button' disabled>
								Checkout
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		productsBasket: state.basket.productsBasket,
		basketSum: state.basket.basketSum,
	}
}

export default compose(connect(mapStateToProps, {}))(BasketModal)
