import React, { useContext, useState } from 'react'

interface ICalendarProvider {
	children: any
}
interface ICalendar {
	calendar?: boolean
	toggleCalendar?(calendar: boolean): void
}

const calendarContext = React.createContext<any>({})

export const useCalendar = () => {
	return useContext(calendarContext)
}

export const CalendarProvider: React.FC<ICalendarProvider> = ({ children }) => {
	const [calendar, setCalendar] = useState({
		calendar: false,
		useCalendar: false,
	})

	const toggleCalendar = (calendar: boolean, useCalendar: boolean) => {
		setCalendar({ calendar, useCalendar })
	}
	return (
		<calendarContext.Provider value={{ calendar, toggleCalendar }}>
			{children}
		</calendarContext.Provider>
	)
}
