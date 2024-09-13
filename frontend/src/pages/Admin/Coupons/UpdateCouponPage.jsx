import { Form, Input, Button, message, Spin, InputNumber } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateCouponPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("The coupon has been updated successfully");
      } else {
        message.error("An error occurred while updating the coupon");
      }
    } catch (error) {
      console.log("Coupon update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

      if (!response.ok) {
        throw new Error("Error fetching dataı");
      }

      if (response.ok) {
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } else {
        message.error("Fetching coupon failed.");
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
      message.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, couponId, form]);

  useEffect(() => {
    fetchSingleCategory();
  }, [fetchSingleCategory]);

  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Coupon Name"
          name="code"
          rules={[
            { required: true, message: "Please input your coupon name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Coupon Discount Percent"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Please input your coupon discount percent!",
            },
          ]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateCouponPage;
