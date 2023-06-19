import { faker } from '@faker-js/faker'
import bcrypt from "bcryptjs"
import { EnumRoles } from '../enums/roles.enum'
import Role from '../models/Role.model'
import User from '../models/User.model'
import UserInfo from '../models/UserInfo.model'

class seedingUsers {

    async createUserWithUserInfo(countUsers: any) {
        try {
            const hashPassword = bcrypt.hashSync(faker.internet.password(20), 7)
            const userRole = await Role.findOne({ value: EnumRoles.USER })
            for (let i = 1; i <= countUsers; i++) {

                const user = await User.create({
                    username: faker.internet.userName(),
                    password: hashPassword,
                    roles: [userRole?._id],
                })
                const userInfo = await UserInfo.create({
                    fullName: faker.name.fullName(),
                    email: faker.internet.email(),
                    phone: faker.phone.number('+380#########'),
                    address: {
                        city: faker.address.cityName(),
                        street: faker.address.street(),
                        postOffice: faker.address.zipCode('###'),
                    },
                })

                const userId = { _id: user._id }
                const userInfoId = { $set: { userInfo: userInfo._id } }
                await User.updateOne(userId, userInfoId)
            }

        } catch (e) {
            console.log(e)
        }
    }

}
export default new seedingUsers()