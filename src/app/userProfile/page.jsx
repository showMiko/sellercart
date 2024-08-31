"use client"
import { useState } from 'react';
import { Card, Button, Form, Input, Avatar, Upload, FloatButton,message } from 'antd';
import { UploadOutlined,PlusCircleTwoTone,UserOutlined,ProductFilled,ReconciliationOutlined,DropboxOutlined  } from '@ant-design/icons';
import { CiLocationArrow1 } from "react-icons/ci";
import { MdChecklistRtl } from "react-icons/md";


import { useContextApi } from '@/context/context';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfileCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState();
    const { userData,uid } = useContextApi();
    // const {profileImage}=userData;
    let profileImage="";

    if(userData)
    {
        profileImage=userData.profileImage
    }
    const router=useRouter();
    const toggleEditForm = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            form.resetFields();
        }
    };

    useState(()=>{
        console.log(userData.profileImage,"is the Image");
    },userData);

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
        return false; // Prevent automatic upload
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.put("/api/updateProfile", {
                uid,
                values,
                avatar,
                profileImage
            });

            console.log({values,uid,avatar})

            message.success(response.data.message);

        console.log(avatar,"is the avatar");
        toggleEditForm();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (!userData) {
        return (
            <div className='flex justify-center text-2xl items-center'>
                Loading Your Profile...
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <Card style={{ textAlign: "center", width: '100%', maxWidth: '400px', padding: '20px' }}>
                <Upload
                    showUploadList={false}
                    beforeUpload={handleUpload}
                    disabled={!isEditing}
                >
                    <div
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            cursor: isEditing ? 'pointer' : 'default',
                        }}
                    >
                        <Avatar size={150} src={avatar || profileImage} >User</Avatar>
                        {isEditing && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    pointerEvents: 'none',
                                }}
                                className="hover-overlay"
                            >
                                <UploadOutlined style={{ fontSize: '24px', color: '#fff' }} />
                            </div>
                        )}
                    </div>
                </Upload>
                <h1 style={{ fontSize: '24px' }}>{`${userData.firstName} ${userData.lastName}`}</h1>
                <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: '20px' }}>
                    <Form.Item label="First Name" name="firstName" initialValue={userData.firstName} rules={[{ required: true }]}>
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" initialValue={userData.lastName} rules={[{ required: true }]}>
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item label="Email" name="email" initialValue={userData.email} rules={[{ required: true, type: 'email' }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Mobile No" name="mobileNo" initialValue={userData.mobileNo} rules={[{ required: true }]}>
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Button type="primary" onClick={toggleEditForm} style={{ marginBottom: '10px' }}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                    {isEditing && (
                        <Button type="primary" htmlType="submit" className='ml-10'>
                            Submit
                        </Button>
                    )}
                </Form>
                <div className="flex justify-center flex-wrap">
                <Button className='m-2' icon={<CiLocationArrow1/>} onClick={()=>router.push('/address')}>Address</Button>
                <Button className='m-2' icon={<DropboxOutlined />} onClick={()=>router.push('/orders')}>Orders</Button>
                <Button className='m-2' icon={<UserOutlined/>} onClick={()=>router.push('/customers')}>Customers</Button>
                <Button className='m-2' icon={<MdChecklistRtl />} onClick={()=>router.push('/listedProducts')}>Listed Products</Button>
            </div>  
                
            </Card>
            
            <div> 
            <FloatButton style={{width:"150px"}} shape='square' onClick={() => router.push("/sell")} description={<div className='flex justify-center'>
                <PlusCircleTwoTone style={{fontSize:"15px",marginRight:"10px"}}/>Add Your Product
            </div>
        }
            />
            </div>
        </div>
    );
};

export default ProfileCard;
