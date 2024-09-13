import { Form, Input, Button, message, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateCategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const categoryId = params.id;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("The category has been updated successfully");
      } else {
        message.error("An error occurred while updating the category");
      }
    } catch (error) {
      console.log("Category update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

      if (!response.ok) {
        throw new Error("Error fetching dataı");
      }

      if (response.ok) {
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
          });
        }
      } else {
        message.error("Fetching categories failed.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, categoryId, form]);

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
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateCategoryPage;
