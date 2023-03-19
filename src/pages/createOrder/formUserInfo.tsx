import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Input } from '../../components/ui/form/input/Input'
import { useUserInfo } from '../../context/editUserInfoContext'
import {
	createUserInfo,
	getUserInfo,
	updateUserInfo,
} from '../../redux/authReducer/authThunk'
import { AppStateType } from '../../redux/redux-store'
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
	const editUserInfo = useUserInfo()
	useEffect(() => {
		getUserInfo()
		if (!Object.keys(userInfo).length) {
			editUserInfo.visibleEditUserInfo()
		}
	}, [userInfo])

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
			editUserInfo.notVisibleEditUserInfo()
		},
	})

	return (
		<>
			{!editUserInfo.editUserInfo && (
				<>
					<div className='formUserInfo'>
						<h5>Personal information :</h5>

						<div className='userInfo'>
							<span className='labelForInfo'>First and last name</span>
							<span>{userInfo.fullName}</span>
							<span className='labelForInfo'>E-mail</span>
							<span>{userInfo.email}</span>
							<span className='labelForInfo'>Phone</span>
							<span>{userInfo.phone}</span>
							<span
								onClick={() => editUserInfo.visibleEditUserInfo()}
								className='editFormInfo'
							>
								Change information
							</span>
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
							{/* <button
								onClick={() => editUserInfo.visibleEditUserInfo()}
								className='submitFormInfo'
							>
								Change information
							</button> */}
						</div>
					</div>
				</>
			)}

			{/* formEdit */}

			{editUserInfo.editUserInfo && (
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
							<button type='submit' className='submitFormInfo'>
								Save
							</button>
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
						</div>
					</form>
				</>
			)}
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		userInfo: state.auth.userInfo,
	}
}

export default compose(
	connect(mapStateToProps, { getUserInfo, createUserInfo, updateUserInfo }),
)(FormUserInfo)
