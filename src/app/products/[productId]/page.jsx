"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Divider, message, Rate, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useContextApi } from "@/context/context";

const ProductsPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true); // Loading for product fetch
  const [cartLoading, setCartLoading] = useState(false); // Loading for add to cart
  const router = useRouter();
  const productId = params.productId;
  const { uid } = useContextApi();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/fetchProduct/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    setCartLoading(true); // Start loading
    try {
      const response = await axios.post("/api/addtocart", {
        product,
        uid,
      });
      message.success(response.data.message);
    } catch (error) {
      message.error("Failed to add to cart");
    } finally {
      setCartLoading(false); // Stop loading
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div style={{ paddingTop: "3rem" }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[500px] h-[500px] mb-4 overflow-hidden">
              <Image
                src={selectedImage || product.productImages[0]}
                alt={product.productName}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto mt-4 scrollbar-hide justify-center" style={{ width: "100%" }}>
              {product.productImages.map((image, index) => (
                <div key={index} onClick={() => handleImageClick(image)} className="cursor-pointer">
                  <div className="relative w-[100px] h-[100px] overflow-hidden">
                    <Image
                      src={image}
                      alt={product.productName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="text-3xl font-bold mt-2">{product.productName}</h1>
            <h1 className="text-xl font-bold text-gray-700 mt-2">Category: {product.category}</h1>
            <p className="text-lg font-semibold text-gray-700 mt-2">Price: Rs {product.price}/-</p>
            <div className="text-gray-500 mt-2">
              <p className="text-xl">About the Product</p>
              <br />{product.description}
            </div>
            <div className="flex md:flex-row justify-between mt-10">
              <Button size="large" icon={<ShoppingCartOutlined />} loading={cartLoading} onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size="large">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
