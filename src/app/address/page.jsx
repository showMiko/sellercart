"use client";
import React, { useContext, useState, useEffect } from 'react';
import { Button, List, Spin, Modal, Form, Input, message, Radio } from 'antd';
import { useContextApi } from '@/context/context';
import axios from 'axios';
import {DeleteOutlined,EditOutlined,PlusCircleOutlined} from '@ant-design/icons';

const Address = () => {
  const { userData, uid, setCurrentAddress } = useContextApi(); // Ensure setCurrentAddress is available
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [form] = Form.useForm(); // Create a form instance
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (uid) {
      initAddress();
    }
  }, [uid]);

  const initAddress = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/address", {
        params: { uid }
      });
      const fetchedAddresses = response.data.addressData || [];
      setAddresses(fetchedAddresses);
      if (fetchedAddresses.length > 0) {
        setCurrentAddress(fetchedAddresses[0]); // Set the first address as the current address
        setSelectedAddress(fetchedAddresses[0].id); // Select the first address by default
      }
    } catch (error) {
      message.error('Error fetching addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEditAddress = async (values) => {
    setLoading(true);
    try {
      if (editingAddress) {
        const id = editingAddress.id;
        await axios.put("/api/address", { id, values, uid });
        message.success('Address updated successfully');
        initAddress();
      } else {
        const response = await axios.post("/api/address", { values, uid });
        if (response.status === 200) {
          message.success('Address Added Successfully');
          initAddress();
        }
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error occurred while saving address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/address", {
        params: { uid, id }
      });
      message.success('Address deleted successfully');
      initAddress();
    } catch (error) {
      message.error('Error occurred while deleting address');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (address = null) => {
    setEditingAddress(address);
    setIsModalVisible(true);
    if (address) {
      form.setFieldsValue(address); // Set the form fields to the address being edited
    } else {
      form.resetFields(); // Reset the form fields for a new address
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAddress(null);
    form.resetFields(); // Reset the form fields when the modal is closed
  };

  const handleAddressChange = (e) => {
    const selectedId = e.target.value;
    const selectedAddr = addresses.find(addr => addr.id === selectedId);
    setSelectedAddress(selectedId);
    setCurrentAddress(selectedAddr); // Update the current address in context
  };

  return (
    <Spin spinning={loading} size='large' style={{ height: "100dvh", top: "50%" }}>
      <div className='p-3'>
        {
          !loading &&
          <>
            <Button style={{ marginBottom: "10px" }} type="primary" onClick={() => showModal()}><PlusCircleOutlined /> Address</Button>
            <List
              bordered
              dataSource={addresses}
              renderItem={(item) => (
                <List.Item key={item.id} className="address-item">
                  <Radio
                    value={item.id}
                    checked={selectedAddress === item.id}
                    onChange={handleAddressChange}
                  />
                  <div className="address-text">
                    {item.street}, {item.city}, {item.state}, {item.zip}, {item.phone}, {item.email}
                  </div>
                  <div>
                    <Button onClick={() => showModal(item)}><EditOutlined /></Button>
                    <Button onClick={() => handleDeleteAddress(item.id)}><DeleteOutlined /></Button>
                  </div>
                </List.Item>
              )}
            />
            {addresses.length === 0 && <div>No address added.</div>}
          </>
        }

        <Modal
          title={editingAddress ? 'Edit Address' : 'Add Address'}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            form={form} // Associate the form instance with the Form component
            onFinish={handleAddEditAddress}
          >
            <Form.Item
              name="street"
              label="Street"
              rules={[{ required: true, message: 'Please input the street!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please input the city!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please input the state!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="zip"
              label="Zip Code"
              rules={[{ required: true, message: 'Please input the zip code!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input the phone number!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingAddress ? 'Save' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Spin>
  );
};

export default Address;
