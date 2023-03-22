import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useBasketModal } from '../../../context/basketModalContext'
import { AppStateType } from '../../../redux/redux-store'
import BasketModal from '../basketModal/BasketModal'
import './headerStore.scss'

interface IBasket {}

export const Basket: React.FC<IBasket> = ({}) => {
	const basket = useBasketModal()

	return (
		<>
			{basket.basketModal && <BasketModal />}
			<div className='basket'>
				<span
					onClick={basket.toggleBasketModal}
					className='material-symbols-outlined'
				>
					shopping_bag
				</span>
			</div>
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {}
}

export default compose(connect(mapStateToProps, {}))(Basket)
