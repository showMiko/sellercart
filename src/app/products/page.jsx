"use client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Input, Select, Skeleton, Empty, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useContextApi } from "@/context/context";

const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { setCurrProduct } = useContextApi();
  useEffect(() => {
    fetchProducts();
  }, [page, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${page}`);
      const data = await response.json();
      if (data.products) {
        // Only append new products if they are not already in the list
        setProducts((prev) => [
          ...new Map(
            [...prev, ...data.products].map((item) => [item.id, item])
          ).values(),
        ]);
        setHasMore(data.products.length > 0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page
    fetchFilteredProducts(value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setPage(1); // Reset to first page
    fetchFilteredProducts(searchTerm);
  };

  const fetchFilteredProducts = async (searchValue) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/1`); // Reset to the first page
      const data = await response.json();
      if (data.products) {
        const filtered = data.products.filter((product) =>
          product.productName.toLowerCase().includes(searchValue.toLowerCase())
        );
        setProducts(filtered);
        setHasMore(filtered.length > 0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  return (
    <div className="products-page overflow-hidden">
      <h1 className="text-3xl md:text-5xl tracking-loose text-center mt-10 ">
        Explore the Products
      </h1>
      <div className="flex wrap justify-between p-3">
        <Search
          placeholder="Search by product name"
          onSearch={handleSearch}
          style={{ maxWidth: "300px", marginRight: 10, marginBottom: 20 }}
        />
        <Select
          defaultValue="asc"
          onChange={handleSortChange}
          style={{ marginBottom: 20 }}
        >
          <Option value="asc">Price: Low to High</Option>
          <Option value="desc">Price: High to Low</Option>
        </Select>
      </div>

      <Row gutter={12}>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Col span={8} key={index}>
              <Skeleton active />
            </Col>
          ))
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div className="p-0 md:p-5" >
              <Col key={product.id}>
                <Card
                  hoverable
                  style={{ margin: "2px" }}
                  className="w-48 h-96 mx-auto md:w-60 md:h-auto lg:w-60 lg:h-auto" // Fixed width for mobile
                  cover={
                    <img
                      alt={product.productName}
                      style={{ borderRadius: "15px" }}
                      src={product.productImages[0]}
                      className="w-full h-36 object-cover md:h-60 p-2"
                    />
                  }
                  onClick={() => {
                    // const productString = encodeURIComponent(JSON.stringify(product));
                    setCurrProduct(product);
                    router.push(`/products/${product.id}`);
                  }}
                >
                  <h3 className="text-lg">{product.productName}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-gray-500 h-20 overflow-hidden text-ellipsis">
                    {product.description.length > 50
                      ? product.description.slice(0, 50) + "..."
                      : product.description}
                  </p>
                  <div className="border-t border-gray-300 my-2" />
                  <div className="flex justify-between items-center">
                    <Button icon={<ShoppingCartOutlined />} />
                    <p className="font-bold">{product.price}/-</p>
                  </div>
                </Card>
              </Col>
            </div>
          ))
        ) : (
          <Empty description="No products found" />
        )}
      </Row>

      {hasMore && !loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Button onClick={() => setPage((prev) => prev + 1)}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Products;
