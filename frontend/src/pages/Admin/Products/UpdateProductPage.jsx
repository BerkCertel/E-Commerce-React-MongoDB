import { Form, Input, Button, message, Spin, InputNumber, Select } from "antd";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const quillRef = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [categoriesResponse, singleProductResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products/${productId}`),
        ]);

        if (!categoriesResponse.ok || !singleProductResponse.ok) {
          message.error("Data fetch failed");
          return;
        }

        const [categoriesData, singleProductsData] = await Promise.all([
          categoriesResponse.json(),
          singleProductResponse.json(),
        ]);

        setCategories(categoriesData);

        if (singleProductsData) {
          form.setFieldsValue({
            name: singleProductsData.name,
            current: singleProductsData.price.current,
            discount: singleProductsData.price.discount,
            description: singleProductsData.description,
            img: singleProductsData.img.join("\n"),
            colors: singleProductsData.colors.join("\n"),
            sizes: singleProductsData.sizes.join("\n"),
            category: singleProductsData.category,
          });
        }
      } catch (error) {
        console.error("An error occurred while fetching the products:", error);
        message.error("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, productId, form]);

  const onFinish = async (values) => {
    console.log(values);
    const parseValues = (str) => str.split("\n").map((item) => item.trim());

    const { img, colors, sizes } = values;
    const imgLinks = parseValues(img);
    const colorList = parseValues(colors);
    const sizeList = parseValues(sizes);

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
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
        navigate("/admin/products");
      } else {
        message.error("An error occurred while creating the product");
      }
    } catch (error) {
      console.log("Product update error:", error);
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
          <InputNumber
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value?.replace("%", "")}
          />
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
              required: true,
              message: "Please enter at least 4 product links!",
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
            placeholder="Write each size on a new line"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default UpdateProductPage;
