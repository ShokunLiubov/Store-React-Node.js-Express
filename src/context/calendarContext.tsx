import React, { useContext, useState } from 'react'

interface ICalendarProvider {
	children: any
}
interface ICalendar {
	calendar?: boolean
	toggleCalendar?(e: React.MouseEvent<HTMLSpanElement>): void
	toggleOverlay?: any
}

const calendarContext = React.createContext<any>({})

export const useCalendar = () => {
	return useContext(calendarContext)
}

export const CalendarProvider: React.FC<ICalendarProvider> = ({ children }) => {
	const [calendar, setCalendar] = useState(false)

	const toggleOverlay = (e: React.MouseEvent<HTMLSpanElement>) => {
		const target = e.target as Element

		if (target.className === 'overlay') {
			setCalendar(false)
		}
	}
	const openCalendar = (e: React.MouseEvent<HTMLSpanElement>) => {
		setCalendar(true)
	}

	const closeCalendar = () => {
		setCalendar(false)
	}

	return (
		<calendarContext.Provider
			value={{ calendar, openCalendar, toggleOverlay, closeCalendar }}
		>
			{children}
		</calendarContext.Provider>
	)
}
