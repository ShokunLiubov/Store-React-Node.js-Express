
export interface IProductCreate {
    [key: string]: any;
    image?: string | File;
    title: string;
    category: string;
    classification: string;
    count: number | string;
    price: number | string;
    gender: string;
    volume: string;
    type_of_aroma: string;
    country_of_TM: string;
    made_in: string;
    description: string;
  }