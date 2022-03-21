import { DatePicker, Form, Input, InputNumber } from "antd";
import { EditableCellProps } from "../types/types";
import InputDate from "./input_date";

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "date" ? (
      <InputDate style={{ width: "100%" }} date={record.date} />
    ) : (
      <InputNumber size="middle" style={{ width: "100%" }} />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
