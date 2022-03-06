import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface IProps {
  isDisable: boolean;
}

const SaveToExcel = ({ isDisable }: IProps) => {
  return (
    <div className="save-line">
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
        disabled={isDisable}
      >
        Скачать
      </Button>
    </div>
  );
};

export default SaveToExcel;
