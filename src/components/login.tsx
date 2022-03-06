import { Button, Space } from "antd";

const Login = () => {
  return (
    <div className="login-line">
      <Space size="middle">
        Здравствуйте, n.demidovec@sckk.by!
        <Button size="large" danger>
          Выйти
        </Button>
      </Space>
    </div>
  );
};

export default Login;
