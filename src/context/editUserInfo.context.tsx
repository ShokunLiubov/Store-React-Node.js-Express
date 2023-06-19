import React, { useContext, useState } from 'react'

interface IEditUserInfoProvider {
	children: React.ReactNode
}
interface IEditUserInfo {
	editUserInfo?: boolean
	visibleEditUserInfo?: () => void
	notVisibleEditUserInfo?: () => void
}

const editUserInfoContext = React.createContext<any>({})

export const useUserInfo = () => {
	return useContext(editUserInfoContext)
}

export const EditUserInfoProvider: React.FC<IEditUserInfoProvider> = ({
	children,
}): JSX.Element => {
	const [editUserInfo, setEditUserInfo] = useState(false)

	const visibleEditUserInfo = () => {
		setEditUserInfo(true)
	}

	const notVisibleEditUserInfo = () => {
		setEditUserInfo(false)
	}
	return (
		<editUserInfoContext.Provider
			value={{ editUserInfo, visibleEditUserInfo, notVisibleEditUserInfo }}
		>
			{children}
		</editUserInfoContext.Provider>
	)
}
