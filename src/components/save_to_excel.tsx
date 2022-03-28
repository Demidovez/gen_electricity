import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchExcelFileAction } from "../redux/actions/creators/yearsActionCreators";
import { useEffect } from "react";
import { getExcelDataLink } from "../api";
import { RESULT } from "../types/types";

interface IProps {
  isDisable: boolean;
}

const SaveToExcel = ({ isDisable }: IProps) => {
  const dispatch = useAppDispatch();

  const { isFetchingExcel, resultExcel } = useAppSelector(
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
      dispatch(fetchExcelFileAction());
    }
  };

  return (
    <div className="save-line">
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
    </div>
  );
};

export default SaveToExcel;
