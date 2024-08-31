"use client"
import React, { useState } from 'react';
import { Form, Input, Select, Upload, Button, Spin, message, Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined,  CloseCircleOutlined } from '@ant-design/icons';
import { useContextApi } from '@/context/context';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const {uid}=useContextApi(); 
  const router=useRouter();
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prevImages) => [...prevImages, { name: file.name, url: reader.result }]);
      setImageLinks((prevLinks) => [...prevLinks, reader.result]);
    };
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      const finalImageLinks = imageLinks; 
  
      const formData = {
        productName,
        description: productDescription,
        category,
        price,
        images: finalImageLinks,
        listedBy: uid
      };
  
      const response = await axios.post("/api/sell", formData);
  
      message.success('Product submitted successfully!');
      resetForm();
      router.push("/userProfile");
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('There was an error submitting your product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setCategory('');
    setPrice('');
    setImages([]);
    setImageLinks([]);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} style={{padding: '3rem'}}>
      <Form.Item label="Product Name" required>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
        />
      </Form.Item>

      <Form.Item label="Product Description" required>
        <Input.TextArea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Enter product description"
        />
      </Form.Item>

      <Form.Item label="Category" required>
        <Select
          value={category}
          onChange={(value) => setCategory(value)}
          placeholder="Select a category"
        >
          <Option value="electronics">Electronics</Option>
          <Option value="fashion">Fashion</Option>
          <Option value="home">Home</Option>
          {/* Add more categories as needed */}
        </Select>
      </Form.Item>

      <Form.Item label="Price (INR)" required>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price in INR"
        />
      </Form.Item>

      <Form.Item label="Upload Images">
        <Upload
          customRequest={({ file, onSuccess }) => {
            handleUpload(file);
            onSuccess(null, file);
          }}
          multiple
          showUploadList={false}
        >
          <Button icon={<PlusOutlined />}>Upload Images</Button>
        </Upload>
        <Row gutter={16} style={{ marginTop: 16 }}>
          {images.map((image, index) => (
            <Col key={index} style={{ position: 'relative' }}>
              <img src={image.url} alt={image.name} style={{ width: '200px', height: '200px' }} />
              <p>{image.name}</p>
              <Button
                icon={<CloseCircleOutlined />}
                onClick={() => handleRemoveImage(index)}
                style={{ position: 'absolute', top: 0,backgroundColor:"transparent",border:"none" }}
                size="middle"
                danger
              />
            </Col>
          ))}
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" disabled={images.length === 0} htmlType="submit" loading={loading} block>
          {loading ? <Spin indicator={<LoadingOutlined />} /> : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
