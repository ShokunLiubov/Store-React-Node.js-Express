import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { BasketModalProvider } from './context/basketModal.context'
import { CalendarProvider } from './context/calendar.context'
import { EditUserInfoProvider } from './context/editUserInfo.context'
import { ParamsProvider } from './context/params.context'
import { SidebarProvider } from './context/sidebar.context'
import './global.scss'
import store from './redux/redux-store'
import { AppRoutes } from './routes/AppRoutes'
import RouterCombiner from './routes/RouterCombiner'

const App: React.FC = (): JSX.Element => {
	return (
		<div>
			<Provider store={store}>
				<EditUserInfoProvider>
					<ParamsProvider>
						<SidebarProvider>
							<CalendarProvider>
								<BasketModalProvider>
									<BrowserRouter>
										<RouterCombiner routes={AppRoutes} />
									</BrowserRouter>
								</BasketModalProvider>
							</CalendarProvider>
						</SidebarProvider>
					</ParamsProvider>
				</EditUserInfoProvider>
			</Provider>
		</div>
	)
}

export default App
