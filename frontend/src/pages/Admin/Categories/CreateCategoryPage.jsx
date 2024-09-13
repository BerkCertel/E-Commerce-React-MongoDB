import { Form, Input, Button, message, Spin } from "antd";
import { useState } from "react";

function CreateCategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("The product has been created successfully");
        form.resetFields();
      } else {
        message.error("An error occurred while creating the product");
      }
    } catch (error) {
      console.log("Category update error:", error);
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
          label="Category Name"
          name="name"
          rules={[
            { required: true, message: "Please input your category name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category İmage(Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your category image link!",
            },
          ]}
        >
          <Input />
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

export default CreateCategoryPage;
