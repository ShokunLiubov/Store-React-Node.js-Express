import React from 'react'
import './pagination.scss'

interface IPaginator {
	currentPage: number
	onPageChange: (page: number) => void
	totalPages: number
}

const Paginator: React.FC<IPaginator> = ({
	currentPage,
	onPageChange,
	totalPages,
}): JSX.Element => {
	let prevPage = currentPage - 1
	let nextPage = currentPage + 1
	let threePage = currentPage + 2
	let lastPage = totalPages
	let firstPage = 1

	let changeCurrentHandler = (page: number): void => {
		onPageChange(page)
	}

	let HTMLLast

	if (
		lastPage != currentPage &&
		lastPage != currentPage + 1 &&
		lastPage != currentPage + 2
	) {
		HTMLLast = (
			<span
				className={`${'selectedPage'} 
        ${currentPage === lastPage ? 'selectedPageActive' : ''}`}
				onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
					changeCurrentHandler(lastPage)
				}}
			>
				{lastPage}
			</span>
		)
	}

	let HTMLFirst
	if (firstPage != currentPage && firstPage != currentPage - 1) {
		HTMLFirst = (
			<span
				className={`${'selectedPage'} ${
					currentPage === firstPage ? 'selectedPageActive' : ''
				}`}
				onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
					changeCurrentHandler(firstPage)
				}}
			>
				{firstPage}
			</span>
		)
	}

	let HTMLThree
	if (currentPage < 2 && lastPage > 2) {
		HTMLThree = (
			<span
				className={`${'selectedPage'} 
        ${currentPage === lastPage ? 'prevNone' : ''}
        `}
				onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
					changeCurrentHandler(threePage)
				}}
			>
				{threePage}
			</span>
		)
	}

	return (
		<>
			{totalPages <= 1 ? (
				''
			) : (
				<nav>
					{totalPages && (
						<div className={'pageNavbar'}>
							{/* prev button */}
							<span
								className={`${'navigationButton'} ${
									currentPage === 1 ? 'navigationPreventNone' : ''
								}`}
								onClick={e => {
									changeCurrentHandler(prevPage)
								}}
							>
								&laquo;
							</span>
							{/* prev button */}

							{/* first button */}
							{HTMLFirst}
							{/* first button */}

							{/* block buttons */}
							<span
								className={`${'selectedPage'} 
                ${currentPage === 1 ? 'prevNone' : ''}
                `}
								onClick={(
									e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
								): void => {
									changeCurrentHandler(prevPage)
								}}
							>
								{prevPage}
							</span>

							<span
								className={`${'selectedPage'} ${'selectedPageActive'} `}
								onClick={(
									e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
								): void => {
									changeCurrentHandler(currentPage)
								}}
							>
								{currentPage}
							</span>

							<span
								className={`${'selectedPage'} 
                ${currentPage === lastPage ? 'prevNone' : ''}
                `}
								onClick={(
									e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
								): void => {
									changeCurrentHandler(nextPage)
								}}
							>
								{nextPage}
							</span>

							{/* three button */}
							{HTMLThree}

							{/* three button */}

							{/* block buttons */}

							{/* last button */}
							{HTMLLast}
							{/* last button */}

							{/* next button */}
							<span
								className={`${'navigationButton'} ${
									currentPage === lastPage ? 'navigationPreventNone' : ''
								}`}
								onClick={(
									e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
								): void => {
									changeCurrentHandler(nextPage)
								}}
							>
								&raquo;
							</span>
							{/* next button */}
						</div>
					)}
				</nav>
			)}
		</>
	)
}

export default Paginator
