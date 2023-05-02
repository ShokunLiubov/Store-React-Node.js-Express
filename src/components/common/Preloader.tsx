import cn from 'classnames'
import React from 'react'

export const Preloader: React.FC = (): JSX.Element => {
	return (
		<div className={cn('center')}>
			<img src='./../../preloader.gif' />
		</div>
	)
}
