import { message, Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";

function OrderPage() {
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/payment_intents`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
            },
          }
        );
        if (response.ok) {
          const { data } = await response.json();
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
    };
    fetchData();
  }, [MY_STRIPE_SECRET_KEY]);

  const columns = useMemo(
    () => [
      {
        title: "Customer Email",
        dataIndex: "receipt_email",
        key: "receipt_email",
      },
      {
        title: "Order Total Price",
        dataIndex: "amount",
        key: "amount",
      },
    ],
    []
  );

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
      />
    </Spin>
  );
}

export default OrderPage;
