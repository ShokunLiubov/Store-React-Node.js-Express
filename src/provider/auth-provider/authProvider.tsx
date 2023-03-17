import React, { useContext, useState } from 'react'

const AuthContext = React.createContext<any>({})

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC<any> = ({ children }) => {
	const [user, setUser] = useState(null)

	const authUser = (newUser: any) => {
		setUser(newUser)
	}
	return (
		<AuthContext.Provider value={{ user, authUser }}>
			{children}
		</AuthContext.Provider>
	)
}
