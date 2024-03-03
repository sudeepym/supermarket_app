import Header from "./common/Header"
import { useState,useEffect } from "react";
import { auth } from "../firebase/firebase";
import Cart_Item from "./common/Cart_Item";

export default function Cart()
{

    const [items,setItems] = useState([])
    useEffect(()=>{
        //fetch data from db
        const fetchCart = async()=> {
          try {

              const response = await fetch('http://127.0.0.1:5000/cart/get', {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                  email: auth.currentUser.email
                  })
              });

              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              console.log(jsonData[0])
              // console.log(JSON.parse(jsonData[0])[0]);
            setItems(JSON.parse(jsonData[0]))
            
          } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
          }
      }

      fetchCart();
    }, []);

    const totalPrice = items.reduce((total, item) => total + (item.Price * item.Quantity), 0);

    return(
    <>
        <Header/>
        <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
            <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
            </header>

            <div className="mt-8">
                <ul className="space-y-4">
                    {items.map((item, index) => (
                            <Cart_Item key={index} name={item.Product_Name} desc={item.Product_Description} quantity={item.Quantity}/>
                    ))}
  
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">

                    <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>{totalPrice}</dd>
                    </div>
                    </dl>


                    <div className="flex justify-end">
                    <a
                        href="#"
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                        Checkout
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    </>
    )
}
