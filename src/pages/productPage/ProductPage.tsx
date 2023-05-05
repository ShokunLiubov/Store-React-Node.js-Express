import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Preloader } from '../../components/common/Preloader'
import { MenuStore } from '../../components/store/menuStore/MenuStore'
import { useBasketModal } from '../../context/basketModalContext'
import { getUserInfo } from '../../redux/authReducer/authThunk'
import { addToBasket } from '../../redux/basketReducer/basketThunk'
import { getProductsOnPage } from '../../redux/productReducer/productThunk'
import { AppStateType } from '../../redux/redux-store'
import { IProductOptions } from '../../shared/interfaces/productInterface/productOptions.interface'
import './productPage.scss'

interface IProductPageProps {
	addToBasket: (productId: string) => void
	getProductsOnPage: (id: string) => void
	getUserInfo: () => Promise<void>
	product: IProductOptions
}

export const ProductPage: React.FC<IProductPageProps> = ({
	getProductsOnPage,
	addToBasket,
	getUserInfo,
	product,
}): JSX.Element => {
	const navigate = useNavigate()
	const basket = useBasketModal()
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		id && getProductsOnPage(id)

		setTimeout(() => {
			if (id) {
				setIsLoading(false)
			}
		}, 50)
	}, [])

	if (isLoading) {
		return <Preloader />
	}

	if (!isLoading && !product._id) {
		return <Navigate to='/not-found' replace />
	}

	return (
		<>
			{product.count && (
				<>
					<MenuStore />
					<div className='productPage'>
						<div className='productPageTop'>
							<div className='productText'>
								<div>
									<span className='title'>{product.title}</span>
								</div>
								<div>
									<span className='highlight'>Category:</span>
									<span>{product.category ? product.category.name : ''}</span>
								</div>
								<div>
									<span className='highlight'>Classification:</span>
									<span>
										{product.classification ? product.classification.name : ''}
									</span>
								</div>
								<div>
									<span className='highlight'>Gender:</span>
									<span>{product.gender}</span>
								</div>

								<div>
									<span className='highlight'>Type of aroma:</span>
									<span>{product.type_of_aroma}</span>
								</div>
								<div>
									<span className='highlight'>Volume:</span>
									<span>{product.volume}</span>
								</div>
								<div>
									<span className='highlight'>Made in:</span>
									<span>{product.made_in}</span>
								</div>
								<div>
									<span className='highlight'>Country of TM:</span>
									<span>{product.country_of_TM}</span>
								</div>
							</div>
							<div className='productImg'>
								<img src={product.image} />
							</div>
							<div className='productBuy'>
								<div>
									<span className='price'>
										{product.price ? product.price + '$' : ''}
									</span>
								</div>
								<div>
									<span
										className={
											product.count > 0 ? 'availability' : 'notAvailability'
										}
									>
										{product.count > 0 ? 'Availability!' : 'Not available!'}
									</span>
								</div>
								<div>
									{product.count > 0 ? (
										<div onClick={basket.toggleBasketModal}>
											<button
												className='buttonProduct'
												onClick={(): void => {
													product._id && addToBasket(product._id)
													getUserInfo()
												}}
											>
												Buy
											</button>
										</div>
									) : (
										<button className='buttonProduct'>
											Notify about appearance
										</button>
									)}
								</div>
								<div className='iconBlock'>
									<span className='material-symbols-outlined'>package</span>
									<span>Free shipping from 300$</span>
								</div>
								<div className='iconBlock'>
									<span className='material-symbols-outlined'>
										workspace_premium
									</span>
									<span>Guarantee</span>
								</div>
							</div>
						</div>
						<div className='productPageBottom'>
							<div className='productDescription'>
								<span className='title'>Description {product.title}</span>
								<span>{product.description}</span>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

const mapStateToProps = (state: AppStateType) => {
	return {
		product: state.product.productForPage,
	}
}

export default compose(
	connect(mapStateToProps, { getProductsOnPage, addToBasket, getUserInfo }),
)(ProductPage)
