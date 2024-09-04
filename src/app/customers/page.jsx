"use client";
import React, { useState } from "react";
import { Card, Button, Spin, Alert, Divider } from "antd";
import { useContextApi } from "@/context/context";

const CustomerCards = () => {
  const {
    userData,
    loading: userDataLoading,
    error: userDataError,
  } = useContextApi();
  const {uid}=useContextApi();
  const [loadingId, setLoadingId] = useState(null);

  const handleConfirm = async (customerId) => {
    setLoadingId(customerId);
    try {
      await fetch(`/api/confirm/${customerId}`, { method: "POST" });
    } catch (error) {
      console.error("Error confirming customer:", error);
    } finally {
      setLoadingId(null);
    }
  };

  if (!userData) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (userDataError) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Alert message="Error loading customer data" type="error" />
      </div>
    );
  }

  return (
    userData && (
      <div className="p-2">
        {userData.customers.map((customer,index) => {
          return (
            <div
              key={index}
              className={`customer-card ${
                customer.confirmed ? "confirmed" : "not-confirmed"
              }`}
              style={{
                margin: "10px 10px 10px 10px", 
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                // flexDirection: "column",
                padding: "16px",
                alignItems:"center",
                justifyContent:"center",
                flexWrap:"wrap"
              }}
            >
              <div style={{flex:"1", minWidth:"100px",minHeight:"100px",padding:"10px"}}>
                <img
                  alt={customer.item.productName}
                  src={customer.item.productImages[0]}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    marginRight: "16px",
                    
                  }}
                  />
                </div>


                  <div style={{flex:"2",padding:"10px"}} >
                    <h3 style={{ fontSize: "20px", margin: "0 0 8px" }}>
                      {customer.item.productName}
                    </h3>
                    <p
                      style={{
                        fontSize: "18px",
                        margin: "0 0 8px",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      ${customer.item.price}
                    </p>
                    <h5 className="text-gray-400">Order Id: 245692</h5>
                  </div>

                  <div style={{flex:"3",padding:"10px"}}>
                  <h4 style={{ margin: "8px 0 4px", fontSize: "16px" }}>
                    Ordered By:
                  </h4>
                  <p style={{ margin: "0", fontWeight: "bold", color: "#333" }}>
                    {customer.customerName}
                  </p>
                  <h4 style={{ margin: "8px 0 4px", fontSize: "16px" }}>
                    Address:
                  </h4>
                  <p style={{ margin: "0", color: "#555" }}>
                    {customer.address.street},<br />
                    {customer.address.city}, {customer.address.state}{" "}
                    {customer.address.zip}
                  </p>
                  </div>
                  <Button
                    // type="primary"
                    onClick={() => handleConfirm(index)}
                    // disabled={loadingId === customer.id}
                    disabled={loadingId === index}
                    // loading={loadingId === customer.id}
                    loading={loadingId === index}
                    className="custom-button"
                    style={{ marginTop: "12px",flex:"0.5",padding:"10px"}}
                    
                  >
                    Confirm
                  </Button>

              </div>
          );
        })}
        <style jsx>{`
          .customer-cards-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: stretch; // Allow cards to stretch to full width
            padding: 20px;
            justify-content: center;
            width:100%;
          }
          .customer-card {
            transition: box-shadow 0.2s;
          }
          .customer-card:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          }
          
          .not-confirmed{
            background-color:#fff4f4;
          }
          
          .confirmed{
            background-color:#e6ffe6;
          }

          @media (max-width: 768px) {
            .customer-card {
              width: 95%; // Adjust width for smaller screens
            }
          }
        `}</style>
      </div>
    )
  );
};

export default CustomerCards;
