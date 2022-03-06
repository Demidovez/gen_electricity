import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <div className="loading_body">
      <LoadingOutlined style={{ fontSize: 48 }} spin />
    </div>
  );
};

export default Loading;
