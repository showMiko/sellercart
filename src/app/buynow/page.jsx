"use client"
import { useContextApi } from '@/context/context'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd';
import Address from '../address/page';
import axios from 'axios';

const BuyNow = () => {
  const { setBuyNowItems,buyNowItems, currentAddress,userData,uid } = useContextApi();
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log(buyNowItems);
    // Calculate total price
    if(buyNowItems)
    {
      const total = buyNowItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
      setTotalPrice(total);
    }
  }, [buyNowItems,currentAddress,userData]);

  const handleBuyNow = async () => {
    console.log("Buy Product");
    const name=`${userData.firstName} ${userData.lastName}`;
    const response = await axios.post('/api/confirmOrder',{buyNowItems,currentAddress,uid,name});
    // Add payment gateway logic here

    if(response.status===200)
      { 
        message.success("Order Placed");
        setBuyNowItems();
      }else
      message.error("Failed to Place Order");
  }

  if (!buyNowItems || buyNowItems.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center h-screen p-10 text-center '>
        <div className='text-xl mb-4'>You Cannot Directly Access the Buy Now Page. Either Go to your Cart and select Buy Now or Go To the Individual Products Page</div>
        <div className='flex flex-row justify-between w-[50%]'>
        <Button type="primary" onClick={() => router.push('/products')}>View Products</Button>
        <Button type="primary" onClick={() => router.push('/cart')}>View Cart</Button>
        </div>
      </div>
    );
  }

  return (
    <div >
      <div>
        <Address/>
      </div>
      <div className="cart-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '30px', backgroundColor: '#f9f9f9' }}>
        

      <div style={{ flex: '2', display: 'flex', justifyContent:"space-between", alignItems:"center" ,flexDirection: 'column', minWidth: '66%' }}>
        {buyNowItems.map((item, index) => (
          <Card 
            key={index} 
            className="product-card" 
            style={{ 
              display: 'flex', 
              margin: '10px 0', 
              width: '100%', 
              flexDirection: 'row', 
              alignItems: 'center', 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
              borderRadius: '8px' 
            }}
          >
            <div className='flex justify-center items-center' >
            <img 
              src={item.productImages[0]} 
              alt={item.productName} 
              style={{ 
                width: '50px', 
                height: '50px', 
                objectFit: 'cover', 
                marginRight: '10px',
              }} 
              />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '15px', margin: '0' }}>{item.productName}</h2>
              <p style={{ fontSize: '10px', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',textWrap:"wrap" }}>
                {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
              </p>
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>${item.price}</p>
            </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="order-summary border border-gray-300 rounded-lg p-5 w-full max-w-sm mx-5 bg-white">
  <h3 className="text-2xl mb-2">Order Summary</h3>
  <div className="mb-2">
    <h4 className="m-0 text-xl">Items</h4>
    {buyNowItems.map((item, index) => (
      <div key={index} className="flex justify-between">
        <span>{item.productName}</span>
        <span>Rs {item.price}/-</span>
      </div>
    ))}
  </div>
  <hr />
  <div className="flex justify-between font-bold text-lg">
    <span>Total:</span>
    <span>Rs {totalPrice}/-</span>
  </div>
  <div className="mt-4">
    <div className="font-semibold">Delivering To</div>
    <div>Name: {userData?.firstName} {userData?.lastName}</div>
    <div>{currentAddress?.street}</div>
    <div>
      {currentAddress?.city} {currentAddress?.state} - {currentAddress?.zip}
    </div>
    <div>Contact No: +91 {currentAddress?.phone}</div>
    <div>Email: {currentAddress?.email}</div>
  </div>
  <Button onClick={handleBuyNow} type="primary" className="mt-2 w-full">Buy Now</Button>
</div>
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
  )
}

export default BuyNow;
