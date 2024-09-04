"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Drawer, message } from "antd";
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
        localStorage.clear("uid");}).then(()=>{message.success("Logging Out "); setUserData(null); });


        router.push("/getstarted");
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
                title: <div className="cursor-pointer hover:bg-gray-200 rounded " onClick={()=>router.push("/")}>Seller Cart</div>,
              },
              {
                title: <div className="cursor-pointer hover:bg-gray-200 rounded " onClick={()=>router.push("/products")}>Products</div>,
              },
              {
                title: <div className="cursor-pointer hover:bg-gray-200 rounded " onClick={()=>router.push("/sell")}>Sell Your Product</div>
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
                
                <span className="cursor-pointer" onClick={()=>router.push("/userProfile")} style={{ marginLeft: "10px" }}>{userData.firstName}</span>
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
                    title: <div className="cursor-pointer hover:bg-gray-200 rounded " onClick={()=>router.push("/")}>Seller Cart</div>
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
                {userData && <div onClick={()=>router.push("/userProfile")} style={{ marginLeft: "10px" }} className="cursor-pointer">{userData.firstName}</div>}
              </div>
              <div style={{ marginBottom: "10px"  }} className="flex flex-col"> 
              <div  rel="noopener noreferrer"  className="p-5  cursor-pointer hover:bg-gray-200 rounded-xl text-md mt-10" onClick={()=>router.push("/")}>
                  Home
              </div>
                <div  rel="noopener noreferrer"  className="p-5  cursor-pointer hover:bg-gray-200 rounded-xl text-md mt-10" onClick={()=>router.push("/products")}>
                  Products
                </div>
                <div  rel="noopener noreferrer"  className="p-5  cursor-pointer hover:bg-gray-200 rounded-xl text-md mt-10" onClick={()=>router.push("/sell")}>
                  Sell Your Product
                </div>
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
                    LogIn/SignUp
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
