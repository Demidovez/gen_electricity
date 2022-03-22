import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, Typography } from "antd";

interface IProps {
  editable: boolean;
  onSave: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
  editingKey: string;
}

const EditableButtons = ({
  editable,
  editingKey,
  onSave,
  onEdit,
  onDelete,
  onCancel,
}: IProps) => {
  return (
    <div>
      {editable ? (
        <Space size="small">
          <Typography.Link onClick={onSave}>
            <SaveOutlined
              style={{ fontSize: "20px", verticalAlign: "middle" }}
            />
          </Typography.Link>
          <Popconfirm
            title="Вы уверены?"
            onConfirm={onCancel}
            okText="Да"
            cancelText="Отмена"
          >
            <CloseCircleOutlined
              style={{
                fontSize: "20px",
                color: "#c0392b",
                verticalAlign: "middle",
              }}
            />
          </Popconfirm>
        </Space>
      ) : (
        editingKey === "" && (
          <Space size="small">
            <Typography.Link onClick={onEdit}>
              <EditOutlined
                style={{
                  fontSize: "20px",
                  verticalAlign: "middle",
                  color: "#343a40",
                }}
              />
            </Typography.Link>

            <Popconfirm
              title="Вы уверены?"
              onConfirm={onDelete}
              okText="Да"
              cancelText="Отмена"
            >
              <DeleteOutlined
                style={{
                  fontSize: "20px",
                  color: "#c0392b",
                  verticalAlign: "middle",
                }}
              />
            </Popconfirm>
          </Space>
        )
      )}
    </div>
  );
};

export default EditableButtons;
