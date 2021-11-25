import { RouterReducerState } from '@ngrx/router-store';
import {Product} from 'src/app/model/Product';
import {Order} from 'src/app/model/order';
import {Cart} from 'src/app/model/cart';
import { User } from 'src/app/model/user';
import { Address } from 'src/app/model/Address';
import { UserAuth } from 'src/app/model/userAuth';
import { CartWithProducts } from 'src/app/model/CartWithProducts';
import { OrderAllAccounts } from 'src/app/model/OrderAllAccounts';


export interface IAppState{
    productsState : ProductsState;
    cartState : CartState;
    routerReducer: RouterReducerState;
    userState: UserState
    orderState: OrderState;
    addressState: AddressState;
    responseState : ResponseState;
}

export interface ProductsState {
    products: Product[];
    message: string;
    loading : boolean;
    singleProduct : Product;
}

export const initialProductsState :ProductsState = {
    products: [],
    message: '',
    loading: false,
    singleProduct: {
        id: 0,
        name: '',
        description: '',
        price: 0,
        photo: '',
        type: '',
        quantity: 0,
    }
}

export interface CartState {
    cart: Cart[];
    cartWithProducts : CartWithProducts[];
    message: any;
    total: number;
    loading: boolean;

}

export const initialCartState :CartState = {
    cart: [],
    cartWithProducts : [],
    message: null,
    total : 0,
    loading: false
}


export interface UserState{
    user: User[];
    userAuth: UserAuth[];
    token: string
    loading: boolean;
    singleUser : User;
}

export const initialUserState :UserState = {
    user: [],
    userAuth: [],
    token: '',
    loading: false,
    singleUser : {
        id: 0,
        name: '',
        password: '',
        email: '',
    }
}

export interface OrderState {
    orders: Order[];
    orderAccount: any[];
    orderAllAccounts: OrderAllAccounts[]
    loading: boolean;
}

export const initialOrderState :OrderState = {
    orders: [],
    orderAccount: [],
    loading: false,
    orderAllAccounts: []
}

export interface AddressState{
    address: Address[];
    loading: boolean;
    singleAddress: Address;
}

export const initialAccountState :AddressState = {
    address: [],
    loading: false,
    singleAddress :{
        user_id: 0,
        full_name: "",
        address: '',
        email: '',
        telephone_number: ''
    }
}

export interface ResponseState{
    responseData : Array<any>;
}

export const initialResponseState : ResponseState = {
   responseData: [],
}