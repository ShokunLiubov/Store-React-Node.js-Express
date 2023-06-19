import React, { useContext, useState } from 'react'

export enum TypeAuth {
	LOGIN = 'login',
	REGISTER = 'register',
}

interface IAuthTypeProvider {
	children: React.ReactNode
}
interface IAuthType {
	auth?: TypeAuth
	setAuthType?(auth: TypeAuth): void
}

const authTypeContext = React.createContext<any>({})

export const useAuthType = () => {
	return useContext(authTypeContext)
}

export const AuthTypeProvider: React.FC<IAuthTypeProvider> = ({
	children,
}): JSX.Element => {
	const [auth, setAuth] = useState(TypeAuth.LOGIN)

	const setAuthType = (authType: TypeAuth) => {
		setAuth(authType)
	}
	return (
		<authTypeContext.Provider value={{ auth, setAuthType }}>
			{children}
		</authTypeContext.Provider>
	)
}
