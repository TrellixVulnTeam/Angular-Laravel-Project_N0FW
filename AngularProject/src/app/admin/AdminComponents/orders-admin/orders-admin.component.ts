import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store/state/app.state';
import {select, Store} from '@ngrx/store'
import { GetOrders } from 'src/app/store/actions/order.actions';
import { OrderAllAccounts } from 'src/app/model/OrderAllAccounts';
import {Observable} from 'rxjs/'
import { selectAllOrdersAccount } from 'src/app/store/selectors/order.selector';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {

  orders$? : Observable<OrderAllAccounts[]>;

  constructor(private store : Store<IAppState>) { 
    this.store.dispatch(GetOrders());
   this.orders$ = this.store.select(selectAllOrdersAccount);
  }

  ngOnInit(): void {
  }

}
