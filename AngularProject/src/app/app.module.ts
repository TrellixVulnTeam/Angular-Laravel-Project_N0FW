import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { ProfileComponent } from './components/private/user/profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from 'src/app/store/effects/products.effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { appReducers } from 'src/app/store/reducers/app.reducer';
import { CartEffects } from 'src/app/store/effects/cart.effects';
import { UserEffects } from 'src/app/store/effects/user.effects';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { JwtModule } from "@auth0/angular-jwt";
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { OrderEffects } from 'src/app/store/effects/order.effects';
import { AccountEffects } from './store/effects/account.effects';
import { AdminComponent } from './components/private/admin/admin.component';
import { TestComponent } from './view/test/test.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { OrderListComponent } from './components/private/user/order-list/order-list.component';
import { UpdateProfileComponent } from './components/private/user/update-profile/update-profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpdateAddressComponent } from './components/private/user/update-address/update-address.component';



export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    SignInComponent,
    CartComponent,
    OrderComponent,
    AdminComponent,
    TestComponent,
    NavbarComponent,
    FooterComponent,
    OrderListComponent,
    UpdateProfileComponent,
    UpdateAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    StoreModule.forRoot({}, {}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ProductsEffect, CartEffects, UserEffects, OrderEffects, AccountEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
     JwtModule.forRoot({
      config: { //aggiunge athorization header
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8000"],
      },
    }),
    ],    
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 
 }
