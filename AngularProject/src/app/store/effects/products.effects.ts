import { Actions, ofType,createEffect } from '@ngrx/effects';
import { Products } from "src/app/model/products";
import { Action, Store } from '@ngrx/store';
import { ProductsService } from "src/app/services/products.service";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { switchMap, map , mergeMap, filter, withLatestFrom, catchError, exhaustMap, tap, } from 'rxjs/operators';
import {
  RouterNavigatedAction,
  routerNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';

import {ShowAllProductsAction,
        GetProductsAction, 
        ProductActionsType, 
        ProductsTypeActionSuccess, 
        ProductsTypeAction, 
        GetSingleProductActionFail,
        ProductsTypeActionFail,
        GetSingleProductActionSuccess,
        GetSingleProductAction} from '../actions/products.actions'
import { IAppState } from '../state/app.state';

@Injectable ()

export class ProductsEffect {
    constructor(private actions$ : Actions, private products_service: ProductsService, private store : Store<IAppState>, private spinner: NgxSpinnerService){}

    loadAllProducts$ : Observable<Action> = createEffect(() => {
        return  this.actions$.pipe(
            ofType(ShowAllProductsAction),
            switchMap(() => this.products_service.getAll()),
            map((productsResp: Products[]) =>
               GetProductsAction({products : productsResp})
            ) 
         );
   });
    
loadSingleProducts$ : Observable<Action> = createEffect(() => {
  return  this.actions$.pipe(
      ofType(GetSingleProductAction),
      exhaustMap((action) =>  this.products_service.getSingleProduct(action.item_id).pipe(
        map((product) => GetSingleProductActionSuccess({products : product}))
      )
    ),catchError((errorResp) =>{
      return of(GetSingleProductActionFail({message : errorResp.error.message}))
    })
  )   
}); 


  loadProductsType$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/products')
      }),
      map((r: RouterNavigatedAction) => {
        return r.payload.routerState.root.firstChild?.params['type'];
      }),
      switchMap((type: string) => {
        if (type == undefined) {
          return this.products_service.getAll().pipe(
            map((data) => {
              return GetProductsAction({ products: data });
            })
          )
        } else {
          return this.products_service.getProductsType(type).pipe(
            map((data) => {
              return ProductsTypeActionSuccess({ products: data });
            })
          );
        }
      }),catchError((errorResp) =>{
        return of(ProductsTypeActionFail({message : errorResp.error.message}))
      })
    )
  });

} 
    