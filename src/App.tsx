import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { BasketModalProvider } from './context/basketModalContext'
import { CalendarProvider } from './context/calendarContext'
import { EditUserInfoProvider } from './context/editUserInfoContext'
import { SidebarProvider } from './context/sidebarContext'
import './global.scss'
import store from './redux/redux-store'
import { AppRoutes } from './routes/AppRoutes'
import RouterCombiner from './routes/RouterCombiner'

const App: React.FC = () => {
	return (
		<div>
			<Provider store={store}>
				<EditUserInfoProvider>
					<SidebarProvider>
						<CalendarProvider>
							<BasketModalProvider>
								<BrowserRouter>
									<RouterCombiner routes={AppRoutes} />
								</BrowserRouter>
							</BasketModalProvider>
						</CalendarProvider>
					</SidebarProvider>
				</EditUserInfoProvider>
			</Provider>
		</div>
	)
}

export default App
