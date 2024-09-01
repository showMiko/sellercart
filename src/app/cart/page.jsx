"use client";

import { useContextApi } from '@/context/context';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Button } from 'antd';

const Cart = () => {
  const { uid,userData } = useContextApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // const fetchCartProducts = async () => {
    //   setLoading(true); // Set loading to true when fetching starts
    //   try {
    //     const response = await axios.get(`/api/getcart/${uid}`);
    //     setCartItems(response.data.cart);
    //     const total = response.data.cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    //     setTotalPrice(total);
    //   } catch (error) {
    //     console.error("Error fetching cart data:", error);
    //   } finally {
    //     setLoading(false); // Set loading to false when fetching ends
    //   }
    // };

    // if (uid) {
    //   fetchCartProducts();
    // }
    try {
        setCartItems(userData.cart);
        const total=userData.cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotalPrice(total);
        console.log(userData);
    } catch (error) {
        console.error(error)
    }
    finally{
        setLoading(false);
    }
  }, [userData,cartItems,totalPrice]);

  if (loading) {
    return (
      <div>
        <Skeleton active />
      </div>
    ); // Show loading spinner or message
  }

  return (
    cartItems &&
    <div className="cart-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '30px' }}>
      <div style={{ flex: '2', display: 'flex', flexDirection: 'column', maxWidth: '66%' }}>
        {cartItems.map((item, index) => (
          <Card 
            key={index} 
            className="product-card" 
            style={{ 
              display: 'flex', 
              margin: '10px 0', 
              width: '100%', 
              height: '80%', 
              flexDirection: 'row', 
              alignItems: 'center' 
            }}
          >
            <img 
              src={item.productImages[0]} 
              alt={item.productName} 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'cover', 
                marginRight: '10px' 
              }} 
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '16px', margin: '0' }}>{item.productName}</h2>
              <p style={{ fontSize: '12px', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                {item.description.length>100? item.description.slice(0,100):item.description}
              </p>
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>${item.price}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="order-summary" style={{ 
        border: '1px solid #f0f0f0', 
        borderRadius: '4px', 
        padding: '20px', 
        width: '30%', 
        minWidth: '250px', 
        marginTop: '20px' 
      }}>
        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Order Summary</h3>
        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: '0', fontSize: '16px' }}>Items</h4>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.productName}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
        <hr />
        <h4 style={{ margin: '0', fontSize: '16px' }}>Total:</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>
        <button style={{ marginTop: '10px', width: '100%'}} className='hover:text-green-200 bg-black rounded h-10 text-white hover:bg-black-200'>Buy Now</button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cart-container {
            flex-direction: column;
            align-items: center;
          }
          .order-summary {
            margin-top: 20px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Cart;
