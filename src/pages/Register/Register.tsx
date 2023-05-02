import { useFormik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { compose } from 'redux'
import { Input } from '../../components/ui/form/input/Input'
import { registrationUser } from '../../redux/authReducer/authThunk'
import { AppStateType } from '../../redux/redux-store'
import { IAuth } from '../../shared/interfaces/userInterface/auth.interface'
import './register.scss'

interface RegisterProps {
	registrationUser: any
}

export const Register: React.FC<RegisterProps> = ({
	registrationUser,
}): JSX.Element => {
	const navigate = useNavigate()
	const [isShownPassword, setIsShownPassword] = useState<boolean>(false)

	const formik = useFormik<IAuth>({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: (values: IAuth): void => {
			registrationUser(values)
			navigate('/make-up')
		},
	})
	return (
		<div className={'containerLogin'}>
			<form className={'form'} onSubmit={formik.handleSubmit}>
				<img src='./../../imageAuth/bcgAuth.png' />
				<span>register</span>
				<div className='blockInput'>
					<span className='material-symbols-outlined'>mail</span>
					<Input
						label={'Login'}
						name={'username'}
						placeholder={'Login'}
						formik={formik}
					/>
				</div>

				<div className='blockInput'>
					<span className='material-symbols-outlined'>lock</span>
					<Input
						label={'Password'}
						name={'password'}
						placeholder={'Password'}
						formik={formik}
						type={isShownPassword ? 'text' : 'password'}
					/>
					<span
						className='material-symbols-outlined'
						onClick={(): void => setIsShownPassword(!isShownPassword)}
					>
						{isShownPassword ? 'visibility' : 'visibility_off'}
					</span>
				</div>

				<button type='submit'>Get Started</button>
			</form>
			<div className='bottomLink'>
				<NavLink to=''>Create Account</NavLink>
				<NavLink to=''>Need help</NavLink>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		user: state.auth.user,
	}
}

export default compose(connect(mapStateToProps, { registrationUser }))(Register)
