import { ObjectId } from 'mongoose'
import Order from '../models/Order.model'
import Products from '../models/Products.model'
import User from '../models/User.model'
import { IOrderDocument } from '../types/order.interface'

class orderService {
	async createOrder(payload: IOrderDocument, userId: string) {
		const { fullName, address, allPrice, products }: IOrderDocument = payload

		const order = await Order.create({
			fullName,
			address: {
				city: address?.city,
				street: address?.street,
				postOffice: address?.postOffice,
			},
			allPrice,
			products,
		})

		products.map(async (product: { count?: number; productId?: ObjectId }) => {
			const count = product.count ?? 1

			return await Products.findByIdAndUpdate(
				{ _id: product.productId },
				{
					$inc: {
						count: -count,
					},
				},
			)
		})

		const userUpdate = await User.findByIdAndUpdate(
			{ id: userId },
			{
				$addToSet: { orders: order._id },
			},
			{ new: true, useFindAndModify: false },
		)
		return { order, userUpdate }
	}
}

export default new orderService()
