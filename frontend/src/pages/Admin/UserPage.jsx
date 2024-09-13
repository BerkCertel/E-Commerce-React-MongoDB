import { message, Table, Button, Popconfirm } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";

function UserPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users`);
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Kullanıcıları getirme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Kullanıcıları getirirken hata oluştu:", error);
      message.error("Sunucu hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = useCallback(
    async (userEmail) => {
      try {
        const response = await fetch(`${apiUrl}/api/users/${userEmail}`, {
          method: "DELETE",
        });

        if (response.ok) {
          message.success("Kullanıcı başarıyla silindi.");
          fetchUsers();
        } else {
          message.error("Kullanıcı silme işlemi başarısız oldu.");
        }
      } catch (error) {
        console.error("Kullanıcıyı silerken hata oluştu:", error);
        message.error("Sunucu hatası. Lütfen tekrar deneyin.");
      }
    },
    [apiUrl, fetchUsers]
  );

  const columns = useMemo(
    () => [
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Avatar",
        dataIndex: "avatar",
        key: "avatar",
        render: (imgSrc) => (
          <img
            src={imgSrc}
            alt="Avatar"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ),
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (text, record) => (
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteUser(record.email)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        ),
      },
    ],
    [deleteUser]
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

export default UserPage;
