import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { compose } from 'redux'
import { Preloader } from '../../components/common/Preloader'
import ProductItem from '../../components/store/basketModal/productItem'
import { useUserInfo } from '../../context/editUserInfo.context'
import { getUserInfo } from '../../redux/authReducer/auth.thunk'
import { getDeliveryOptions } from '../../redux/deliveryReducer/delivery.thunk'
import { createOrder } from '../../redux/orderReducer/order.thunk'
import { AppStateType } from '../../redux/redux-store'
import { authUrl } from '../../routes/layout/AuthLayout'
import { publicUrl } from '../../routes/layout/PublicLayout'
import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import { IUserOptions } from '../../shared/interfaces/userInterface/user.interface'
import './createOrder.scss'
import FormUserInfo from './formUserInfo'

interface ICreateOrder {
	getUserInfo: () => void
	createOrder: (togetherPrice: number) => void
	getDeliveryOptions: () => void
	products: IProductBasket[]
	basketSum: number
	deliveryOptions: IDeliveryOptions[]
	user: IUserOptions
}

interface ISelectedOptions {
	value: number
	label: string
}

export const CreateOrder: React.FC<ICreateOrder> = ({
	getUserInfo,
	createOrder,
	getDeliveryOptions,
	basketSum,
	deliveryOptions,
	user,
	products,
}): JSX.Element => {
	const defaultDeliveryOption = deliveryOptions[0]

	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [delivery, setDelivery] = useState<number>(defaultDeliveryOption?.price)

	const animatedComponents = makeAnimated()
	const editUserInfo = useUserInfo()
	const navigate = useNavigate()

	useEffect(() => {
		getDeliveryOptions()
		getUserInfo()
		if (user) {
			setIsLoading(false)
		}
	}, [user])

	if (isLoading) {
		return <Preloader />
	}

	if (!user?.roles?.[0]) {
		navigate(publicUrl + authUrl + 'login')
	}

	const selectDelivery = deliveryOptions.map(
		(opti: IDeliveryOptions): ISelectedOptions => {
			return { value: opti.price, label: 'Delivery ' + opti.name }
		},
	)

	if (!products.length) {
		return <Navigate to={publicUrl} />
	}

	const togetherPrice = delivery + basketSum

	return (
		<div>
			<div className='blockCreateOrder'>
				<FormUserInfo />

				<main className='order'>
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
				</main>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		basketSum: state.basket.basketSum,
		products: state.basket.productsBasket,
		deliveryOptions: state.delivery.deliveryOptions,
		user: state.auth.user,
	}
}

export default compose(
	connect(mapStateToProps, { getUserInfo, createOrder, getDeliveryOptions }),
)(CreateOrder)
