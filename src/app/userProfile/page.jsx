"use client"
import { useState } from 'react';
import { Card, Button, Form, Input, Avatar, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useContextApi } from '@/context/context';
import axios from 'axios';

const ProfileCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState();
    const { userData,uid } = useContextApi();
    const {profileImage}=userData;
    // const uid = localStorage.getItem('uid');

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

            alert(response.data.message);
        console.log(avatar,"is the avatar");
        
        toggleEditForm();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (!userData) {
        return (
            <div className='flex justify-center text-2xl items-center'>The User is not Logged In/Sign Up</div>
        );
    }

    return (
        <div className='flex flex-row justify-center'>
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
                        <Input disabled={!isEditing} />
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
            </Card>
        </div>
    );
};

export default ProfileCard;
