import React, { useContext, useState } from 'react'

interface IParamsProvider {
	children: React.ReactNode
}
interface IBasket {
	params?: boolean
	clearParams?(e: React.MouseEvent<HTMLSpanElement>): void
	searchParams?(e: React.MouseEvent<HTMLSpanElement>): void
}

const paramsContext = React.createContext<any>({})

export const useParam = () => {
	return useContext(paramsContext)
}

export const ParamsProvider: React.FC<IParamsProvider> = ({
	children,
}): JSX.Element => {
	const [params, setParams] = useState(true)

	const clearParams = () => {
		setParams(true)
	}

	const searchParams = () => {
		setParams(false)
	}
	return (
		<paramsContext.Provider value={{ params, clearParams, searchParams }}>
			{children}
		</paramsContext.Provider>
	)
}
