import { Button, message, Radio, RadioChangeEvent, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchExcelFileAction } from "../redux/actions/creators/yearsActionCreators";
import { useEffect, useState } from "react";
import { getExcelDataLink } from "../api";
import { RESULT } from "../types/types";

interface IProps {
  isDisable: boolean;
}

const SaveToExcel = ({ isDisable }: IProps) => {
  const dispatch = useAppDispatch();

  const [typeSave, setTypeSave] = useState(1);

  const { isFetchingExcel, resultExcel, expandedRows } = useAppSelector(
    (state) => state.years
  );

  useEffect(() => {
    if (resultExcel === RESULT.ok) {
      getExcelDataLink();
    } else if (resultExcel === RESULT.error) {
      message.error("Ошибка создания файла!");
    }
  }, [resultExcel]);

  const onDownload = () => {
    if (!isFetchingExcel) {
      dispatch(fetchExcelFileAction(typeSave === 1 ? expandedRows : []));
    }
  };

  const onSelectTypeSave = (e: RadioChangeEvent) => {
    setTypeSave(e.target.value);
  };

  return (
    <div className="save-line">
      <Space size="large">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          loading={isFetchingExcel}
          size="large"
          disabled={isDisable}
          onClick={onDownload}
        >
          Скачать
        </Button>

        <Radio.Group onChange={onSelectTypeSave} value={typeSave}>
          <Radio value={1}>Открытое</Radio>
          <Radio value={2}>Все</Radio>
        </Radio.Group>
      </Space>
    </div>
  );
};

export default SaveToExcel;
