import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm, Space, Typography } from "antd";
import { TypeTR } from "../types/types";

const ReadDataLine = (props: TypeTR) => {
  return (
    <>
      <td>{props.shortdate}</td>
      <td>{props.production}</td>
      <td>{props.total_consumed}</td>
      <td>{props.ZBC_consumed}</td>
      <td>{props.generation}</td>
      <td>{props.procentage}</td>
      <td>{props.sold}</td>
      <td>{props.RUP_consumed}</td>
      <td>{props.power}</td>
      <td>{props.plus && <PlusOutlined />}</td>
      <td>{props.gkal}</td>
      <td>
        {props.lineKey.includes("day_") && (
          <Space size="small">
            <Typography.Link onClick={() => props.onEdit?.()}>
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
              onConfirm={() => props.onRemove?.()}
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
        )}
      </td>
    </>
  );
};

export default ReadDataLine;
