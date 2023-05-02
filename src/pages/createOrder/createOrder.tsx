import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import ProductItem from '../../components/store/basketModal/productItem'
import { useUserInfo } from '../../context/editUserInfoContext'
import { getUserInfo } from '../../redux/authReducer/authThunk'
import { getDeliveryOptions } from '../../redux/deliveryReducer/deliveryThunk'
import { createOrder } from '../../redux/orderReducer/orderThunk'
import { AppStateType } from '../../redux/redux-store'
import { publicUrl } from '../../routes/layout/PublicLayout'
import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import './createOrder.scss'
import FormUserInfo from './formUserInfo'

interface ICreateOrder {
	getUserInfo: () => void
	createOrder: (togetherPrice: number) => void
	getDeliveryOptions: () => void
	products: IProductBasket[]
	basketSum: number
	deliveryOptions: IDeliveryOptions[]
}

interface ISelectedOptions {
	value: number
	label: string
}

export const CreateOrder: React.FC<ICreateOrder> = ({
	basketSum,
	getUserInfo,
	createOrder,
	getDeliveryOptions,
	deliveryOptions,
	products,
}): JSX.Element => {
	const defaultDeliveryOption = deliveryOptions[0]
	const [delivery, setDelivery] = useState(defaultDeliveryOption.price)

	const animatedComponents = makeAnimated()
	const editUserInfo = useUserInfo()
	const navigate = useNavigate()

	const selectDelivery = deliveryOptions.map(
		(opti: IDeliveryOptions): ISelectedOptions => {
			return { value: opti.price, label: 'Delivery ' + opti.name }
		},
	)

	useEffect(() => {
		getDeliveryOptions()
		getUserInfo()
	}, [])

	if (!products.length) {
		return <Navigate to={publicUrl} />
	}

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

							<div className={'select'}>
								<Select
									isMulti={false}
									name='colors'
									options={selectDelivery}
									value={selectDelivery.find(
										(option: ISelectedOptions) => option.value === delivery,
									)}
									onChange={(opti: SingleValue<ISelectedOptions>) =>
										opti && setDelivery(opti.value)
									}
									classNamePrefix='select'
									components={animatedComponents}
								/>
							</div>

							<div>Together:</div>
						</div>

						<div className='togetherPrice'>
							<div>{basketSum} $</div>
							<div>{delivery} $</div>
							<div>{togetherPrice} $</div>
						</div>
					</div>
					<div className='checkout'>
						{!editUserInfo.editUserInfo ? (
							<button
								onClick={(): void => {
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
		deliveryOptions: state.delivery.deliveryOptions,
	}
}

export default compose(
	connect(mapStateToProps, { getUserInfo, createOrder, getDeliveryOptions }),
)(CreateOrder)
