import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { MenuStore } from '../../components/store/menuStore/MenuStore'
import { AppStateType } from '../../redux/redux-store'
import { publicUrl } from '../../routes/layout/PublicLayout'
import './completeOrder.scss'

interface ICreateOrder {}

export const CompleteOrder: React.FC<ICreateOrder> = ({}): JSX.Element => {
	return (
		<>
			<MenuStore />
			<main className='completeOrder'>
				<span>Thank you for your order.</span>
				<NavLink to={publicUrl}>Continue products</NavLink>
			</main>
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {}
}

export default compose(connect(mapStateToProps, {}))(CompleteOrder)
