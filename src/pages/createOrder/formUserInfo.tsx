import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Input } from '../../components/ui/form/input/Input'
import { AppStateType } from '../../redux/redux-store'
import {
	createUserInfo,
	getUserInfo,
	updateUserInfo,
} from '../../redux/userReducer/userThunk'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import './createOrder.scss'

interface IFormUserInfo {
	getUserInfo: () => void
	createUserInfo: (value: IUserInfo) => void
	updateUserInfo: (value: IUserInfo) => void
	userInfo: IUserInfo
}

export const FormUserInfo: React.FC<IFormUserInfo> = ({
	getUserInfo,
	userInfo,
	createUserInfo,
	updateUserInfo,
}) => {
	useEffect(() => {
		getUserInfo()
		if (!Object.keys(userInfo).length) {
			setEditData(true)
		}
	}, [userInfo])

	const [editData, setEditData] = useState(false)
	const address = userInfo.address

	const formik = useFormik({
		initialValues: {
			fullName: `${userInfo.fullName || ''}`,
			email: `${userInfo.email || ''}`,
			phone: `${userInfo.phone || ''}`,
			street: `${address ? address.street : ''}`,
			city: `${address ? address.city : ''}`,
			postOffice: `${address ? address.postOffice : ''}`,
		},
		onSubmit: ({ email, fullName, phone, city, postOffice, street }) => {
			const userAndDeliveryInfo = {
				email,
				fullName,
				phone,
				address: { city, postOffice, street },
			}
			if (!Object.keys(userInfo).length) {
				createUserInfo(userAndDeliveryInfo)
			}
			updateUserInfo(userAndDeliveryInfo)

			setEditData(false)
		},
	})

	return (
		<>
			{!editData && (
				<>
					<div className='formUserInfo'>
						<h5>Personal data :</h5>

						<div className='userInfo'>
							<span className='labelForInfo'>First and last name</span>
							<span>{userInfo.fullName}</span>
							<span className='labelForInfo'>E-mail</span>
							<span>{userInfo.email}</span>
							<span className='labelForInfo'>Phone</span>
							<span>{userInfo.phone}</span>
							<button
								onClick={() => setEditData(true)}
								className='submitFormInfo'
							>
								Change contact information
							</button>
						</div>
					</div>
					<div className='formDeliveryInfo'>
						<h5>Delivery information :</h5>

						<div className='userInfo'>
							<span className='labelForInfo'>Delivery address</span>
							<span>{address && address.street}</span>
							<span className='labelForInfo'>City</span>
							<span>{address && address.city}</span>
							<span className='labelForInfo'>Post office</span>
							<span>{address && address.postOffice}</span>
							<button
								onClick={() => setEditData(true)}
								className='submitFormInfo'
							>
								Change address
							</button>
						</div>
					</div>
				</>
			)}

			{/* formEdit */}

			{editData && (
				<>
					<form className='InfoForm' onSubmit={formik.handleSubmit}>
						<div className='formUserInfo'>
							<h5>Personal data :</h5>
							<Input
								label={'First and last name'}
								name={'fullName'}
								formik={formik}
							/>
							<Input label={'E-mail'} name={'email'} formik={formik} />
							<Input label={'Phone'} name={'phone'} formik={formik} />
						</div>
						<div className='formDeliveryInfo'>
							<h5>Delivery information :</h5>
							<Input
								label={'Delivery address'}
								name={'street'}
								formik={formik}
							/>
							<Input label={'City'} name={'city'} formik={formik} />
							<Input
								label={'Post office'}
								name={'postOffice'}
								formik={formik}
							/>
							<button type='submit' className='submitFormInfo'>
								Save
							</button>
						</div>
					</form>
				</>
			)}
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		userInfo: state.user.userInfo,
	}
}

export default compose(
	connect(mapStateToProps, { getUserInfo, createUserInfo, updateUserInfo }),
)(FormUserInfo)
