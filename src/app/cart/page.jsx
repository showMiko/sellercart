"use client";

import { useContextApi } from '@/context/context';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Button, Spin, message } from 'antd';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { uid,setBuyNowItems } = useContextApi();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deleting, setDeleting] = useState(false); // New state for deletion loading
  const router=useRouter();
  useEffect(() => {
    if (uid) {
      initCartItems();
    }
  }, [uid]);

  const initCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/fetchCartItems", {
        params: { uid }
      });
      const fetchedItems = response.data.cartData || [];
      setCartItems(fetchedItems);
      setBuyNowItems(cartItems);
      calculateTotal(fetchedItems); // Calculate total after fetching
    } catch (error) {
      message.error('Error fetching your Cart');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotalPrice(total);
  };

  const handleDelete = async (itemId) => {
    setDeleting(true); // Start loading
    try {
      const response = await axios.put(`/api/deletecart/${uid}/${itemId}`);
      if (response.status === 200) {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.filter((_, index) => index !== itemId);
          calculateTotal(updatedItems); // Recalculate total after deletion
          return updatedItems;
        });
        setBuyNowItems((prevItems) => {
          const updatedItems = prevItems.filter((_, index) => index !== itemId);
          calculateTotal(updatedItems); // Recalculate total after deletion
          return updatedItems;
        });
        message.success("Product Removed from the Cart");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to Remove from the Cart");
    } finally {
      setDeleting(false); // End loading
    }
  };


  const handleBuyNow=()=>{
    setLoading(true);
    setBuyNowItems(cartItems);
    setLoading(false);
    router.push("/buynow");

  }

  if (loading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }

  return (
    <Spin spinning={deleting} tip="Removing item...">
    {cartItems &&
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
                  {item.description.length > 100 ? item.description.slice(0, 100) : item.description}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>${item.price}</p>
              </div>
              <button
                onClick={() => handleDelete(index)} 
                className='hover:text-red-600 bg-black rounded h-10 text-white hover:bg-black-200 w-[100px] mt-5'
              >
                Delete
              </button>
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
          <button onClick={handleBuyNow} style={{ marginTop: '10px', width: '100%' }} className='hover:text-green-200 bg-black rounded h-10 text-white hover:bg-black-200'>Buy Now</button>
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
    }
    </Spin>
  );
}

export default Cart;
