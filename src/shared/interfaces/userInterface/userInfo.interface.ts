export interface IUserInfo {
    _id?: string;
    fullName: string;
    email: string;
    phone: number | string;
    address: {
        city: string;
        street: string;
        postOffice: string;
    };
}

export interface IUserInfoOptions extends Partial<IUserInfo>{}
