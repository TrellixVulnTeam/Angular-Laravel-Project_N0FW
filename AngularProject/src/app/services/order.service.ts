import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../model/order';
import { AppConstants } from '../app.constants';
//import { OrderAccount } from '../model/orderAccount';
import { OrderAllAccounts } from '../model/OrderAllAccounts';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(`${AppConstants.SERVICES_BASE_URL}/auth/addOrder`,order);
  }

  getOrdersList(): Observable<any[]>{
    return this.http.get<any[]>(`${AppConstants.SERVICES_BASE_URL}/getOrdersAccount`);
  }

  getAllOrders (): Observable<OrderAllAccounts[]>{
    return this.http.get<OrderAllAccounts[]>(`${AppConstants.SERVICES_BASE_URL}/orders`);
  }
}
