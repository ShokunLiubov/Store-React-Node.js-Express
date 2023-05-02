import cn from 'classnames'
import React from 'react'

interface NotfoundProps {
	styleAdmin?: string
}

export const Notfound: React.FC<NotfoundProps> = ({
	styleAdmin,
}): JSX.Element => {
	return (
		<span className={cn('center', 'notFound', styleAdmin)}>Not Found 404</span>
	)
}
