import { Button } from "react-bootstrap";

interface IProps {
  isDisable: boolean;
}

const SaveToExcel = ({ isDisable }: IProps) => {
  return (
    <div className="save-line">
      <Button variant="primary" disabled={isDisable}>
        Скачать
      </Button>
    </div>
  );
};

export default SaveToExcel;
