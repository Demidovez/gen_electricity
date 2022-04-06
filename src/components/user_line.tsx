import { Button, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { tryLogoutAction } from "../redux/actions/creators/userActionCreators";

const UserLine = () => {
  const dispatch = useAppDispatch();

  const { firstname, secondname } = useAppSelector((state) => state.user);

  const logOut = () => {
    dispatch(tryLogoutAction());
  };

  return (
    <div className="login-line">
      <Space size="middle">
        <div>
          Здравствуйте,{" "}
          <b>
            {firstname} {secondname}
          </b>
          !
        </div>
        <Button size="large" danger onClick={logOut}>
          Выйти
        </Button>
      </Space>
    </div>
  );
};

export default UserLine;
