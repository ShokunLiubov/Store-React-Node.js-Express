import { faker } from '@faker-js/faker'
import { ORDER_STATUS } from '../enums/orderStatus'
import Order from '../models/Order'
import Products from '../models/Products'
import User from '../models/User'

class seedingOrders {

    async createOrders() {

        try {
            const users = await User
                .find()
                .select('username')
                .populate({
                    path: "userInfo",
                    model: "UserInfo",
                })
                .populate({
                    path: "roles",
                    match: { value: "USER" }
                })

            users.map(async (user) => {
                const numberOfOrders = faker.datatype.number({ min: 1, max: 10 })

                for (let i = 0; i < numberOfOrders; i++) {

                    const numberOfProducts = faker.datatype.number({ min: 1, max: 10 })
                    const productsBasket = []
                    const products = await Products.find({})

                    for (let j = 0; j < numberOfProducts; j++) {
                        const randomProduct = Math.floor(Math.random() * products.length)
                        const product = products[randomProduct]
                        productsBasket.push({
                            productId: product.id,
                            count: faker.datatype.number({ min: 1, max: 5 }),
                        })
                    }

                    const keysStatus = Object.keys(ORDER_STATUS)
                    const randomStatus = keysStatus[Math.floor(Math.random() * keysStatus.length)]
                    let info = user.userInfo
                    let allPrice = 0
                    for (let i = 0; i < productsBasket.length; i++) {
                        const product = productsBasket[i]
                        const productPrice = await Products.findById({ _id: product.productId })
                        allPrice += productPrice.price * product.count
                    }

                    const order = await Order.create({
                        fullName: info.fullName,
                        address: {
                            city: info.address.city,
                            street: info.address.street,
                            postOffice: info.address.postOffice,
                        },
                        products: productsBasket,
                        allPrice: allPrice,
                        status: ORDER_STATUS[randomStatus],
                        createdAt: faker.date.between('2022-10-01T00:00:00.000Z', '2023-03-01T00:00:00.000Z')
                    })

                    const userId = { _id: user._id }

                    await User.findByIdAndUpdate(
                        userId,
                        {
                            $addToSet: { orders: order._id },
                        },
                        { new: true, useFindAndModify: false },
                    )
                }

            })

        } catch (e) {
            console.log(e)
        }

    }

}
export default new seedingOrders()