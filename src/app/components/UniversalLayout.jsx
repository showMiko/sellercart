"use client";
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import React from 'react'
import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

const UniversalLayout = ({children}) => {
  const pathname=usePathname();
  return (
    <Layout>
      {
        pathname!=='/getstarted'?
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: "white",
          boxShadow: "0px 2px 5px 1px grey",
          margin:"0.1rem",
          marginBottom:"10px",
          zIndex:1
        }}
      >
        <Navbar/>:
      </Header>
      :<></>}
      <Content
        style={{
          padding: '3rem',
          minHeight: "100vh",
          backgroundColor:"#f0f5fc"
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Created By Soumik Samanta ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}

export default UniversalLayout;