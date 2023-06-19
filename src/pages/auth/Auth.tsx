import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { compose } from 'redux'
import { Preloader } from '../../components/common/Preloader'
import { Input } from '../../components/ui/form/input/Input'
import { TypeAuth, useAuthType } from '../../context/typeAuth.context'
import { login, registrationUser } from '../../redux/authReducer/auth.thunk'
import { AppStateType } from '../../redux/redux-store'
import { publicUrl } from '../../routes/layout/PublicLayout'
import { IAuth } from '../../shared/interfaces/userInterface/auth.interface'
import { IUserOptions } from '../../shared/interfaces/userInterface/user.interface'
import './auth.scss'

interface RegisterProps {
	registrationUser: (values: IAuth) => Promise<string | undefined>
	login: (values: IAuth) => Promise<string | undefined>
	user: IUserOptions
}

export const AuthPage: React.FC<RegisterProps> = ({
	registrationUser,
	login,
	user,
}): JSX.Element => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isShownPassword, setIsShownPassword] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const type = useAuthType()

	useEffect(() => {
		if (user) {
			setIsLoading(false)
		}
	}, [user])

	const formik = useFormik<IAuth>({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: async (values: IAuth): Promise<void> => {
			let message

			if (type.auth === TypeAuth.REGISTER) {
				message = await registrationUser(values)
			} else if (type.auth === TypeAuth.LOGIN) {
				message = await login(values)
			}

			if (!message) {
				navigate(publicUrl)
			} else {
			}
		},
	})

	if (isLoading) {
		return <Preloader />
	}

	if (user?.roles?.[0]) {
		navigate(publicUrl)
	}

	return (
		<main className={'containerLogin'}>
			<form className={'form'} onSubmit={formik.handleSubmit}>
				<img src='./../../imageAuth/bcgAuth.png' />
				<span className='authTitle'>{type.auth}</span>
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
				<div className='errorAuth'>{error}</div>

				<button type='submit'>Get Started</button>
			</form>
			<div className='bottomLink'>
				<NavLink to=''>Create Account</NavLink>
				<NavLink to=''>Need help</NavLink>
			</div>
		</main>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		user: state.auth.user,
	}
}

export default compose(connect(mapStateToProps, { registrationUser, login }))(
	AuthPage,
)
