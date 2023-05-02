import React, { useContext, useState } from 'react'

interface ICalendarProvider {
	children: React.ReactNode
}
interface ICalendar {
	calendar?: boolean
	openCalendar?(e: React.MouseEvent<HTMLSpanElement>): void
	closeCalendar?(e: React.MouseEvent<HTMLSpanElement>): void
	toggleOverlay?(e: React.MouseEvent<HTMLSpanElement>): void
}

const calendarContext = React.createContext<any>({})

export const useCalendar = () => {
	return useContext(calendarContext)
}

export const CalendarProvider: React.FC<ICalendarProvider> = ({
	children,
}): JSX.Element => {
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
