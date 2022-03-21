import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, InputNumber, Table } from "antd";
import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAppDispatch } from "../hooks/hooks";
import { insertDayAction } from "../redux/actions/creators/yearsActionCreators";

const AddDataLine = () => {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState(new Date());
  const [production, setProduction] = useState<number>(0);
  const [total_consumed, setTotalConsumed] = useState<number>(0);
  const [ZBC_consumed, setZBCConsumed] = useState<number>(0);
  const [generation, setGeneration] = useState<number>(0);
  const [procentage, setProcentage] = useState<number>(0);
  const [sold, setSold] = useState<number>(0);
  const [RUP_consumed, setRUPConsumed] = useState<number>(0);
  const [power, setPower] = useState<number>(0);
  const [plus, setPlus] = useState<boolean>(false);
  const [gkal, setGkal] = useState<number>(0);

  const onSubmit = () => {
    dispatch(
      insertDayAction({
        date: date.toString(),
        production,
        total_consumed,
        ZBC_consumed,
        generation,
        procentage,
        sold,
        RUP_consumed,
        power,
        plus,
        gkal,
      })
    );
  };

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <DatePicker
          onChange={(date) => date && setDate(date.toDate())}
          className="full_width"
          format="DD.MM.YYYY"
          locale={locale}
          defaultValue={moment(date)}
          value={moment(date)}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}>
        <InputNumber
          onChange={(value: number) => setProduction(value)}
          value={production}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2}>
        <InputNumber
          onChange={(value: number) => setTotalConsumed(value)}
          value={total_consumed}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={3}>
        <InputNumber
          onChange={(value: number) => setZBCConsumed(value)}
          value={ZBC_consumed}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4}>
        <InputNumber
          onChange={(value: number) => setGeneration(value)}
          value={generation}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5}>
        <InputNumber
          onChange={(value: number) => setProcentage(value)}
          value={procentage}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={6}>
        <InputNumber
          onChange={(value: number) => setSold(value)}
          value={sold}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={7}>
        <InputNumber
          onChange={(value: number) => setRUPConsumed(value)}
          value={RUP_consumed}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={8}>
        <InputNumber
          onChange={(value: number) => setPower(value)}
          value={power}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={9}>
        <InputNumber
          onChange={(value: number) => setPlus(!!value)}
          value={+plus}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={10}>
        <InputNumber
          onChange={(value: number) => setGkal(value)}
          value={gkal}
          className="full_width"
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={11}>
        <Button type="primary" onClick={onSubmit}>
          <PlusOutlined />
        </Button>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default AddDataLine;
