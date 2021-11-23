<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;


class OrderController extends Controller
{
   function order (Request $req){
       $user = JWTAuth::user()->id;

       $order = new Order();
       $order->user_id = $user;
       $order->address = $req->input('address');
       $order->payment_method = $req->input('payment_method');
       $order->total = $req->input('total');
       $order->save();

       $carts = Cart::where('user_id', $user)->get(); 
       if (empty($carts) || $carts == null){
           return response()->json(['message' =>'your cart is empty'], 500);
       }
       else{
        foreach ($carts as $cart){
            $orderProduct = new OrderProduct();
            $orderProduct->order_id = $order->id;
            $orderProduct->product_id = $cart['product_id'];
            $orderProduct->quantity = $cart['quantity'];
            $orderProduct->save();
            DB::table('cart')->where('user_id', $user)->delete();
        }    
     } return;       
   }

   function getAllOrders (){
      $orders = Order::select('order.total','user.name', 'order.created_at', 'order.id' )->distinct()->join('orderProduct','order.id','=','orderProduct.order_id')->join('user','user.id','=','order.user_id')->get();
      return response()->json($orders);
   }

   function orderList( ){
       $user_id = JWTAuth::user()->id;
       $orders = $order = Order::with('products')->where('user_id',  $user_id)->get();
       return response()->json($orders);
   }
}
