"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Drawer } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "@/util/firebase";
import { useContextApi } from "@/context/context";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(0);
  const { userData,setUserData } = useContextApi();
  const handleLogout = async () => {
    try {
      await signOut(auth).then(()=>{localStorage.clear("email");
        localStorage.clear("uid");}).then(()=>{setUserData(null); router.refresh()});
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // console.log(userData, " from Navbar");
    // console.log("Called")
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };

    
  }, [userData]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      {screenWidth >= 780 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            width: "100%",
          }}
        >
          <Breadcrumb
            items={[
              {
                title: <a href="/">Seller Cart</a>,
              },
              {
                title: <a href="/products">Products</a>,
              },
              {
                title: <a href="/sell">Sell Your Product</a>
              },
            ]}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            {userData ? (
              <>
                <ShoppingCartOutlined
                onClick={()=>router.push("/cart")}
                  style={{ fontSize: "24px", marginRight: "20px" }}
                />
                {
                userData.profileImage?
                <Avatar src={userData.profileImage} style={{ cursor: "pointer" }} onClick={()=>router.push("/userProfile")}/>
                :
                <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} onClick={()=>router.push("/userProfile")}/>
                }
                
                <span style={{ marginLeft: "10px" }}>{userData.firstName}</span>
                <Button onClick={handleLogout} className="ml-5">
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => router.push("/getstarted")}
                className="ml-5"
              >
                LogIn/SignUp
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              width: "100%",
              padding: "0px",
            }}
          >
            <Breadcrumb
              style={{ fontSize: "1rem" }}
              items={[
                {
                    title: <a href="/">Seller Cart</a>,
                },
              ]}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              {userData && <ShoppingCartOutlined style={{ fontSize: "24px" }} onClick={()=>router.push("/cart")}/>}
              <Button
                type="text"
                icon={<MoreOutlined />}
                onClick={showDrawer}
              />
            </div>
          </div>

          <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            <div style={{ padding: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                {userData? 
                <>
                {
                userData.profileImage?
                <Avatar src={userData.profileImage} style={{ cursor: "pointer" }} onClick={()=>router.push("/userProfile")}/>
                :
                <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} onClick={()=>router.push("/userProfile")}/>
                }
                    
                </>
                    :
                    <></>
                }
                {userData && <span style={{ marginLeft: "10px" }}>{userData.firstName}</span>}
              </div>
              <div style={{ marginBottom: "10px"  }} className="flex flex-col"> 
              <a  rel="noopener noreferrer" href="/" className="mt-10">
                  Home
              </a>
                <a  rel="noopener noreferrer" href="/products" className="mt-10">
                  Products
                </a>
                <a  rel="noopener noreferrer" href="/sell" className="mt-10">
                  Sell Your Product
                </a>
                <br />
                <>
                {userData ? (
                    <>
                  <br/>
                    <Button onClick={handleLogout} className="mt-10 w-1/2">
                      Logout
                    </Button>
                  </>
                ) 
                : 
                (
                    <Button
                    className="mt-10 w-1/2"
                    onClick={() => router.push("/getstarted")}
                    >
                    LogoIn/SignUp
                  </Button>
                )}
                </>
              </div>
            </div>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Navbar;
