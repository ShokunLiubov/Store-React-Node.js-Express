import Order from '../models/Order'
import Products from '../models/Products'
import Token from '../models/Token'
import User from '../models/User'
import UserInfo from '../models/UserInfo'
import seedingCategory from './seedingCategory'
import seedingClassification from './seedingClassification'
import seedingOrders from './seedingOrders'
import seedingProducts from './seedingProducts'
import seedingUsers from './seedingUsers'

class seeding {

    async refresh() {
        try {
            await UserInfo.deleteMany({})
            await User.deleteMany({})
            await Order.deleteMany({})
            await Products.deleteMany({})
            await Token.deleteMany({})
        } catch (e) {
            console.log(e)
        }
    }

    async sendingData() {
        try {
            await seedingUsers.createUserWithUserInfo(20)
            await seedingCategory.createCategory()
            await seedingClassification.createClassification()
            await seedingProducts.createProducts(40)
            await seedingOrders.createOrders()
        } catch (e) {
            console.log(e)
        }
    }

}
export default new seeding()