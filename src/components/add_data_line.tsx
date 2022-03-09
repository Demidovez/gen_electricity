import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, InputNumber, Table } from "antd";

const AddDataLine = () => {
  const onChange = () => {};

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <DatePicker onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={3}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={6}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={7}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={8}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={9}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={10}>
        <InputNumber onChange={onChange} className="full_width" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={11}>
        <Button type="primary">
          <PlusOutlined />
        </Button>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default AddDataLine;
