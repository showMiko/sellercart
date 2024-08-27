import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Drawer } from 'antd';
import { ShoppingCartOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

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
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        updateScreenWidth();
        window.addEventListener('resize', updateScreenWidth);
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            {
                screenWidth >= 620 ?
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
                            <ShoppingCartOutlined style={{ fontSize: '24px', marginRight: '20px' }} />
                            <Avatar icon={<UserOutlined />} />
                            <span style={{ marginLeft: '10px' }}>Dummy Name</span>
                        </div>
                    </div> :
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
                                    <span style={{ marginLeft: '10px' }}>Dummy Name</span>
                                </div>
                                {menuItems.map(item => (
                                    <div key={item.key} style={{ marginBottom: '10px' }}>
                                        {item.label}
                                    </div>
                                ))}
                                <div style={{ marginBottom: '10px' }}><a target="_blank" rel="noopener noreferrer" href="">Component
            </a></div>
                                
                            </div>
                        </Drawer>
                    </>
            }

        </>
    )
};

export default Navbar;

