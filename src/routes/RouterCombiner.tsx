import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { compose } from 'redux'
import { Preloader } from '../components/common/Preloader'
import { checkAuth } from '../redux/authReducer/authThunk'
import { AppStateType } from '../redux/redux-store'
import { IRoutes } from '../shared/interfaces/routes.interface'

interface IRouterCombiner {
	routes: Array<IRoutes>
	checkAuth: () => void
	isLoading: boolean
	user: any
}

export const RouterCombiner: React.FC<IRouterCombiner> = ({
	routes,
	checkAuth,
	isLoading,
	user,
}) => {
	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
		}
	}, [])

	const RoutesMap = routes.map(({ Layout, Component, path, baseUrl }) => (
		<Route key={path} element={isLoading ? <Preloader /> : <Layout />}>
			<Route
				key={path}
				path={baseUrl ? `${baseUrl}${path}` : path}
				element={<Component />}
			/>
		</Route>
	))
	return <Routes>{RoutesMap}</Routes>
}

const mapStateToProps = (state: AppStateType) => {
	return {
		user: state.auth.user,
		isLoading: state.auth.isLoading,
	}
}

export default compose(connect(mapStateToProps, { checkAuth }))(RouterCombiner)
