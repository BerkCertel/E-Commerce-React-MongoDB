import { Form, Input, Button, message, Spin, InputNumber, Select } from "antd";
import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const quillRef = useRef();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
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
    fetchCategory();
  }, [apiUrl]);

  const onFinish = async (values) => {
    const parseValues = (str) => str.split("\n").map((item) => item.trim());

    const { img, colors, sizes } = values;
    const imgLinks = parseValues(img);
    const colorList = parseValues(colors);
    const sizeList = parseValues(sizes);

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          colors: colorList,
          sizes: sizeList,
          img: imgLinks,
        }),
      });

      if (response.ok) {
        message.success("The product has been created successfully");
        form.resetFields();
      } else {
        message.error("An error occurred while creating the product");
      }
    } catch (error) {
      console.log("Product create error:", error);
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
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select 1 category!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="current"
          rules={[
            { required: true, message: "Please input your product price!" },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Product Discount Percentage"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input your product discount percentage!",
            },
          ]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your product description!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            ref={quillRef}
            style={{ backgroundColor: "white" }}
          />
        </Form.Item>

        <Form.Item
          label="Product Image (Links)"
          name="img"
          rules={[
            {
              validator: (_, value) => {
                const imgLinks = value
                  ? value.split("\n").map((item) => item.trim())
                  : [];
                if (imgLinks.length < 4) {
                  return Promise.reject(
                    new Error("Please enter at least 4 image links!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write each image link on a new line"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Colors (RGB code)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please enter at least 1 RGB code!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write each RGB code on a new line"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Sizes"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please enter at least 1 size!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Write each sizes on a new line"
            autoSize={{ minRows: 4 }}
          />
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

export default CreateProductPage;
