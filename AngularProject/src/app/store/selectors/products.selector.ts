import { ActivatedRoute } from '@angular/router';
import {createSelector} from '@ngrx/store';
import { Products } from 'src/app/model/products';
import {ProductsState, IAppState} from '../state/app.state';
import { RouterStateUrl } from './custom-serializer';
import { selectCurrentRoute, selectRouteParam, selectRouteParams } from './router.selector';





const selectProducts = (state: IAppState) => {
    return state.productsState;
};
  
export const selectProductList  = createSelector(
    selectProducts,
    (state: ProductsState) => {
      return state.products;
    }
);

export const selectProductLoading  = createSelector(
  selectProducts,
  (state: ProductsState) => {
    return state.loading;
  }
);


export const selectProductById  = createSelector(
  selectProductList,
  selectCurrentRoute,
  (products: Products[], route: RouterStateUrl) => {
    let product = [];
    for (let index = 0; index < products.length; index++) {
      if( products[index].id === route.params['id']){
        product.push(products[index])
        return  product;
       } 
    }
    return products;
  }
);



