import { useFormik } from 'formik'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { publicUrl } from '../../../routes/layout/PublicLayout'
import { Input } from '../../ui/form/input/Input'
import { Basket } from './Basket'
import './headerStore.scss'
import UserAuth from './UserAuth'

export const HeaderStore: React.FC = () => {
	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2))
		},
	})
	return (
		<div className='HeaderShop'>
			<div className='top'>
				<span>100% original products!</span>
				<ul>
					<li>
						<NavLink to=''>Actions</NavLink>
					</li>
					<li>
						<NavLink to=''>MAKEUP Club</NavLink>
					</li>
					<li>
						<NavLink to=''>Delivery and Payment</NavLink>
					</li>
					<li>
						<NavLink to=''>Articles</NavLink>
					</li>
					<li>
						<NavLink to=''>About the store</NavLink>
					</li>
				</ul>
				<span>Office</span>
			</div>
			<div className='bottom'>
				<div className='connection'>
					<NavLink to=''>0(800) 50 77 40</NavLink>
					<p>Every day from 7:55 to 20:05</p>
					<button>Call back</button>
				</div>
				<NavLink to={publicUrl}>
					<img src='./../../shopImg/logo.svg' />
				</NavLink>
				<div className='user'>
					<UserAuth />
					<Basket />
					<form className='search' onSubmit={formik.handleSubmit}>
						<Input
							label={'search'}
							name={'search'}
							formik={formik}
							type='search'
							placeholder='Search...'
						/>
						<button type='submit'>
							<span className='material-symbols-outlined'>search</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
