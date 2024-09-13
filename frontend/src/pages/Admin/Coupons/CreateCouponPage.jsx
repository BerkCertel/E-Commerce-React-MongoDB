import { Form, Input, Button, message, Spin, InputNumber } from "antd";
import { useState } from "react";

function CreateCouponPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("The coupon has been created successfully");
        form.resetFields();
      } else {
        message.error("An error occurred while creating the coupon");
      }
    } catch (error) {
      console.log("Coupon update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Coupon Code"
          name="code"
          rules={[
            { required: true, message: "Please input your coupon code!" },
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
              message: "Please input your discount percent",
            },
          ]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default CreateCouponPage;
