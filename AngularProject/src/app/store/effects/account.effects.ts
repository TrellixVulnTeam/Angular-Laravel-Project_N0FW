import { Actions, ofType,createEffect } from '@ngrx/effects';
import { Account } from "src/app/model/account";
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map , mergeMap, filter, withLatestFrom, } from 'rxjs/operators';
import {
  routerNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
import { createAccountAction, createAccountActionSuccess, getDetailsAccountAction, getDetailsAccountActionSuccess } from '../actions/account.actions';
import { AccountService } from 'src/app/services/account.service';

@Injectable ()


export class AccountEffects{

    constructor(private actions$ : Actions, private account_service : AccountService){}

    AddAccount$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(createAccountAction),
            mergeMap((action) => {
                return this.account_service.addAccount(action.account).pipe(
                    map((data) => {
                        return createAccountActionSuccess({ account: data});
                    })
                );
            })
        );
    });

    getDetailsAccount$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDetailsAccountAction),
            mergeMap(() => {
                return this.account_service.getDetailsAccount().pipe(
                    map((data) => {
                        return getDetailsAccountActionSuccess({ account: data});
                    })
                );
            })
        );
    });
}