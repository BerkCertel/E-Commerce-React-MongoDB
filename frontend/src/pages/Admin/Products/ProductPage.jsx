import { message, Table, Button, Popconfirm, Space } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);

        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Data fetch failed");
        }

        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        const productsWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });

        setDataSource(productsWithCategories);
      } catch (error) {
        console.error("An error occurred while fetching the products:", error);
        message.error("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const deleteProduct = useCallback(
    async (productId) => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          message.success("The product has been deleted successfully.");
          // fetchCategory();
          setDataSource((prevProducts) => {
            return prevProducts.filter((product) => product._id !== productId);
          });
        } else {
          message.error("Product deletion failed.");
        }
      } catch (error) {
        console.error("An error occurred while deleting the product:", error);
        message.error("Server error. Please try again.");
      }
    },
    [apiUrl]
  );

  const columns = useMemo(
    () => [
      {
        title: "Products İmage",
        dataIndex: "img",
        key: "img",
        render: (imgSrc) => (
          <img
            src={imgSrc[0]}
            alt="Avatar"
            style={{ width: "px", maxHeight: "75px", borderRadius: "5px" }}
          />
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <b>{text}</b>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (text) => <span>{text.current.toFixed(2)}$</span>,
      },
      {
        title: "Discount Percent",
        dataIndex: "price",
        key: "price",
        render: (text) => <span>%{text.discount}</span>,
      },
      {
        title: "Category",
        dataIndex: "categoryName",
        key: "categoryName",
        render: (text) => <b>{text}</b>,
      },
      {
        title: "Creation Time",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt) => moment(createdAt).format("DD-MM-YYYY"), //HH:mm saati istersek
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (text, record) => (
          <Space>
            <Button
              type="primary"
              onClick={() => navigate(`/admin/products/update/${record._id}`)}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete Product"
              description="Are you sure to delete this product?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteProduct(record._id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [navigate, deleteProduct]
  );

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
}

export default ProductPage;
