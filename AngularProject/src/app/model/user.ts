import { Order } from "./Order";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: number;
    order : Order[];
}