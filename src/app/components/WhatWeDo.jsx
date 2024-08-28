
"use client"
import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const WhatWeDo = () => {
  return (
    <div style={styles.container} className='sm:mt-0'>
      <Row justify="center" align="middle">
        <Col xs={24} md={18}>
          {/* <Title style={styles.title}>What We Do</Title> */}
          <h1 className="text-3xl md:text-5xl p-2  tracking-loose">
              What We Do
            </h1>
          <p className="text-sm md:text-xl text-gray-50 mb-4 text-black" style={{fontStyle:'italic'}}>
          We are the One Stop Solution for Your Products. You may choose to sell whatever you need to or can choose to buy what others have Listed. On our platform you can be both buyer and seller. Keep Track of all your orders, customers and your listed products.All in a Seamless UI.
            </p>
            
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: 'white',
    textAlign: 'center',
    marginTop:"9vw"
  },
  title: {
    fontSize: '3em',
    marginBottom: '16px',
    marginTop:"30px",
    color:"black"
  },
  paragraph: {
    fontSize: '1.5rem',
    fontStyle: 'italic',
    color:"black"
  },
};

export default WhatWeDo;
