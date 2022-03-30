import { Form, Input, Button, Checkbox } from "antd";
import { useAppDispatch } from "../hooks/hooks";
import { tryLoginAction } from "../redux/actions/creators/userActionCreators";

const Login = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(
      tryLoginAction({ login: values.username, password: values.password })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // TODO: Запомнить меня
  return (
    <Form
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="login_form"
    >
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, message: "Пожалуйста, введите свой логин!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: "Пожалуйста, введите свой пароль!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login_submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
