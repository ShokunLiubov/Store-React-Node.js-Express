import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { compose } from 'redux'
import ProductItem from '../../components/store/basketModal/productItem'
import { useUserInfo } from '../../context/editUserInfoContext'
import { getUserInfo } from '../../redux/authReducer/authThunk'
import { createOrder } from '../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../redux/redux-store'
import { publicUrl } from '../../routes/layout/PublicLayout'
import './createOrder.scss'
import FormUserInfo from './formUserInfo'

interface ICreateOrder {
	basketSum: number
	getUserInfo: () => void
	createOrder: (togetherPrice: number) => void
	products: any
}

export const CreateOrder: React.FC<ICreateOrder> = ({
	basketSum,
	getUserInfo,
	createOrder,
	products,
}) => {
	const editUserInfo = useUserInfo()
	const navigate = useNavigate()
	useEffect(() => {
		getUserInfo()
	}, [])

	if (!products.length) {
		return <Navigate to={publicUrl} />
	}

	const delivery = 49
	const togetherPrice = delivery + basketSum

	return (
		<div>
			<div className='blockCreateOrder'>
				<FormUserInfo />

				<div className='order'>
					<h5>Your order :</h5>
					<div className='productItems'>
						<ProductItem />
					</div>
					<div className='line'></div>
					<div className='totalPrice'>
						<div>
							<div>Total price:</div>
							<div>Delivery:</div>
							<div>Together:</div>
						</div>

						<div>
							<div>{basketSum} $</div>
							<div>{delivery} $</div>
							<div>{togetherPrice} $</div>
						</div>
					</div>
					<div className='checkout'>
						{!editUserInfo.editUserInfo ? (
							<button
								onClick={() => {
									createOrder(togetherPrice)
									navigate(publicUrl + 'complete')
								}}
							>
								Checkout
							</button>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		basketSum: state.basket.basketSum,
		products: state.basket.productsBasket,
	}
}

export default compose(connect(mapStateToProps, { getUserInfo, createOrder }))(
	CreateOrder,
)
