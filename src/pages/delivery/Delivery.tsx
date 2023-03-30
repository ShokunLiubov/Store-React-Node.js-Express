import cn from 'classnames'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Input } from '../../components/ui/form/input/Input'
import {
	getDeliveryOptions,
	setPriceDelivery,
} from '../../redux/deliveryReducer/deliveryThunk'
import { AppStateType } from '../../redux/redux-store'
import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import { IDeliveryPrice } from '../../shared/interfaces/deliveryInterface/deliveryPrice.interface'
import './delivery.scss'

interface IDeliveryProps {
	deliveryOptions: Array<IDeliveryOptions>
	getDeliveryOptions: () => void
	setPriceDelivery: (values: IDeliveryPrice) => void
}

const Delivery: React.FC<IDeliveryProps> = ({
	deliveryOptions,
	getDeliveryOptions,
	setPriceDelivery,
}) => {
	useEffect(() => {
		getDeliveryOptions()
	}, [])
	const deliveryInfo = deliveryOptions.reduce(
		(acc: any, option: IDeliveryOptions) => {
			acc[option.deliveryType] = {
				id: option._id,
				name: option.name,
				price: option.price,
			}
			return acc
		},
		{},
	)
	const [editPostal, setEditPostal] = useState(false)
	const [editCourier, setEditCourier] = useState(false)

	const formikPostal = useFormik<IDeliveryPrice>({
		initialValues: {
			_id: deliveryInfo.postal.id,
			price: deliveryInfo.postal.price,
		},
		onSubmit: (values: IDeliveryPrice) => {
			setPriceDelivery(values)
			getDeliveryOptions()
		},
	})

	const formikCourier = useFormik({
		initialValues: {
			id: deliveryInfo.courier.id,
			price: deliveryInfo.courier.price,
		},
		onSubmit: (values: any) => {
			setPriceDelivery(values)
			getDeliveryOptions()
		},
	})
	return (
		<div className={cn('containerAdminWhite')}>
			<span className={'titleAdminPage'}>Delivery</span>
			<div className='deliveryContainer'>
				<div className='deliveryBlock'>
					{!editPostal ? (
						<>
							<span>Delivery {deliveryInfo.postal.name}</span>
							<div className='deliveryPrice'>
								<span>{deliveryInfo.postal.price}$</span>
								<span
									className='material-symbols-outlined'
									onClick={() => {
										setEditPostal(true)
									}}
								>
									edit
								</span>
							</div>
						</>
					) : (
						<form className='editPrice' onSubmit={formikPostal.handleSubmit}>
							<Input
								label={'Delivery ' + deliveryInfo.postal.name}
								name={'price'}
								formik={formikPostal}
								type={'number'}
							/>
							<span
								className='material-symbols-outlined'
								onClick={() => {
									setEditPostal(false)
									formikPostal.submitForm()
								}}
							>
								done
							</span>
						</form>
					)}
				</div>
				<div className='deliveryBlock'>
					{!editCourier ? (
						<>
							<span>Delivery {deliveryInfo.courier.name}</span>
							<div className='deliveryPrice'>
								<span>{deliveryInfo.courier.price}$</span>
								<span
									className='material-symbols-outlined'
									onClick={() => setEditCourier(true)}
								>
									edit
								</span>
							</div>
						</>
					) : (
						<form className='editPrice' onSubmit={formikCourier.handleSubmit}>
							<Input
								label={'Delivery ' + deliveryInfo.courier.name}
								name={'price'}
								formik={formikCourier}
								type={'number'}
							/>
							<span
								className='material-symbols-outlined'
								onClick={() => {
									setEditCourier(false)
									formikCourier.submitForm()
								}}
							>
								done
							</span>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		deliveryOptions: state.delivery.deliveryOptions,
	}
}

export default compose(
	connect(mapStateToProps, { getDeliveryOptions, setPriceDelivery }),
)(Delivery)
