import { message, Table, Button, Popconfirm, Space } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function CategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Fetching categories failed.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const deleteCategory = useCallback(
    async (categoryId) => {
      try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          message.success("The category has been deleted successfully.");
          fetchCategory();
        } else {
          message.error("Category deletion failed.");
        }
      } catch (error) {
        console.error("Error while deleting category:", error);
        message.error("Server error. Please try again.");
      }
    },
    [apiUrl, fetchCategory]
  );

  const columns = useMemo(
    () => [
      {
        title: "Category İmage",
        dataIndex: "img",
        key: "img",
        render: (imgSrc) => (
          <img
            src={imgSrc}
            alt="Avatar"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
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
              onClick={() => navigate(`/admin/categories/update/${record._id}`)}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete category"
              description="Are you sure to delete this category?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteCategory(record._id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [navigate, deleteCategory]
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

export default CategoryPage;
