import { message, Table, Button, Popconfirm, Space } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function CouponPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons `);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Fetching coupon failed.");
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
      message.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const deleteCoupon = useCallback(
    async (couponId) => {
      try {
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          message.success("The coupon has been deleted successfully.");
          fetchCategory();
        } else {
          message.error("Coupon deletion failed.");
        }
      } catch (error) {
        console.error("Error while deleting coupon:", error);
        message.error("Server error. Please try again.");
      }
    },
    [apiUrl, fetchCategory]
  );

  const columns = useMemo(
    () => [
      {
        title: "Coupon Code",
        dataIndex: "code",
        key: "code",
        render: (code) => <b>{code}</b>,
      },
      {
        title: "Discount Percent",
        dataIndex: "discountPercent",
        key: "discountPercent",
        render: (code) => <span>%{code}</span>,
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
              onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete Coupon"
              description="Are you sure to delete this coupon?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteCoupon(record._id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [navigate, deleteCoupon]
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

export default CouponPage;
