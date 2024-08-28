"use client"
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Drawer } from 'antd';
import { ShoppingCartOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '@/util/firebase';
import { useContextApi } from '@/context/context';
import { useRouter } from 'next/navigation';

const menuItems = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                General
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                Layout
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
                Navigation
            </a>
        ),
    },
];

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const router=useRouter();
    const [screenWidth, setScreenWidth] = useState(0);
    const {userData}=useContextApi();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.clear('email');
            localStorage.clear('uid');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    useEffect(() => {
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        console.log(userData," from Navbar")

        updateScreenWidth();
        window.addEventListener('resize', updateScreenWidth);
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
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
            {
                screenWidth >= 780 ?
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', width: "100%" }}>
                        <Breadcrumb
                            items={[
                                {
                                    title: 'Seller Cart',
                                },
                                {
                                    title: <a href="">Component</a>,
                                },
                                {
                                    title: <a href="">Menus</a>,
                                    menu: {
                                        items: menuItems,
                                    },
                                },
                                {
                                    title: 'Button',
                                },
                            ]}
                        />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {userData?
                            <>
                            <ShoppingCartOutlined style={{ fontSize: '24px', marginRight: '20px' }} />
                            <Avatar icon={<UserOutlined />} style={{cursor:"pointer"}}/>
                            <span style={{ marginLeft: '10px' }}>{userData.firstName}</span>
                            <Button onClick={handleLogout} className='ml-5'>Logout</Button>
                            </>
                            :
                            <Button onClick={()=>router.push('/getstarted')} className='ml-5'>LogoIn/SignUp</Button>
                            }
                        </div>
                    </div> 
                    :
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', width: "100%",padding:"0px" }}>
                            <Breadcrumb
                            style={{fontSize:"1rem"}}
                                items={[
                                    {
                                        title: 'Seller Cart',
                                    },
                                ]}
                            />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                                <Button type="text" icon={<MoreOutlined />} onClick={showDrawer} />
                            </div>
                        </div>

                        <Drawer
                            title="Menu"
                            placement="right"
                            closable={true}
                            onClose={onClose}
                            visible={visible}
                        >
                            <div style={{ padding: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                    <Avatar icon={<UserOutlined />} />
                                    <span style={{ marginLeft: '10px' }}>{userData.firstName}</span>
                                </div>
                                {menuItems.map(item => (
                                    <div key={item.key} style={{ marginBottom: '10px' }}>
                                        {item.label}
                                    </div>
                                ))}
                                <div style={{ marginBottom: '10px' }}><a target="_blank" rel="noopener noreferrer" href="">Component</a>
                                <br></br><Button className='mt-10' onClick={handleLogout}>Logout</Button>
                                </div>
                                
                            </div>
                        </Drawer>
                    </>
            }

        </>
    )
};

export default Navbar;

