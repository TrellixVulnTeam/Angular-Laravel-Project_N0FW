<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;

use Illuminate\Foundation\Auth\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('getId', [UserController::class, 'getId']);


 Route::post('signUp', [UserController::class, 'signUp']);
 Route::post('addCartItem/{product_id}',[CartController::class, 'addCartItem']);
 Route::get('products/{product_type}',[ProductController::class, 'getProductsType']);
 Route::get('cart',[CartController::class, 'cartOrders']);
 Route::get('sumPriceProducts',[CartController::class, 'sumPriceProducts']);
 Route::delete('deleteItem/{id}',[CartController::class, 'deleteItem']);
 Route::post('addOrder/{user_id}',[OrderController::class, 'order']);
 Route::post('account', [AccountController::class, 'addAccount']);
 Route::get('getAccountDetails', [AccountController::class, 'getAccountDetails']);
 Route::get('getOrdersAccount', [OrderController::class, 'orderList']);
 Route::get('product/{id}',[ProductController::class ,'singleProduct']);
 Route::get('products',[ProductController::class ,'getProducts']);
 Route::put('updateUser', [UserController::class, 'updateUser']);


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::get('logout', 'AuthController@logout');
    Route::post('me', [AuthController::class, 'me'])->name('me');
    Route::get('getId', [AuthController::class, 'getAuthUser']);
});

