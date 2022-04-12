import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  message,
  Space,
  Table,
} from "antd";
import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { insertDayAction } from "../redux/actions/creators/yearsActionCreators";
import InputData from "./input_data";
import { RESULT } from "../types/types";

const AddDataLine = () => {
  const dispatch = useAppDispatch();

  const { errorAdding, resultAdding } = useAppSelector((state) => state.years);

  const [isError, setIsError] = useState(false);

  const [date, setDate] = useState<Date>(new Date());
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

  useEffect(() => {
    total_consumed > 0 &&
      setProcentage(
        +parseFloat("" + (generation / total_consumed) * 100).toFixed(2)
      );
  }, [total_consumed, generation]);

  useEffect(() => {
    if (resultAdding === RESULT.error) {
      message.error(errorAdding);
    } else if (resultAdding === RESULT.ok) {
      setDate(new Date());
      setProduction(0);
      setTotalConsumed(0);
      setZBCConsumed(0);
      setGeneration(0);
      setProcentage(0);
      setSold(0);
      setRUPConsumed(0);
      setPower(0);
      setPlus(false);
      setGkal(0);
    }
  }, [resultAdding, errorAdding]);

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

  const hadleDate = (date: moment.Moment | null) => {
    if (date) {
      setDate(date.toDate());
    }
  };

  const handleProduction = (value: number) => {
    setProduction(value);
  };

  const handleTotalConsumed = (value: number) => {
    setTotalConsumed(value);
  };

  const handleZBCConsumed = (value: number) => {
    setZBCConsumed(value);
  };

  const handleGeneration = (value: number) => {
    setGeneration(value);
  };

  const handleSold = (value: number) => {
    setSold(value);
  };

  const handleRUPConsumed = (value: number) => {
    setRUPConsumed(value);
  };

  const handlePower = (value: number) => {
    setPower(value);
  };

  const handlePlus = () => {
    setPlus(!plus);
  };

  const handleGkal = (value: number) => {
    setGkal(value);
  };

  const onError = (isError: boolean) => {
    setIsError(isError);
  };

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <DatePicker
          onChange={hadleDate}
          className="full_width"
          format="DD.MM.YYYY"
          locale={locale}
          defaultValue={moment(date)}
          value={moment(date)}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}>
        <InputData
          onChange={handleProduction}
          onError={onError}
          min={0}
          step="1"
          data={production}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2}>
        <InputData
          onChange={handleTotalConsumed}
          onError={onError}
          min={0}
          step="1"
          data={total_consumed}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={3}>
        <InputData
          onChange={handleZBCConsumed}
          onError={onError}
          min={0}
          step="1"
          data={ZBC_consumed}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4}>
        <InputData
          onChange={handleGeneration}
          onError={onError}
          min={0}
          step="1"
          data={generation}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5}>
        <Input value={procentage} readOnly={true} disabled={true} suffix="%" />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={6}>
        <InputData
          onChange={handleSold}
          onError={onError}
          min={0}
          step="1"
          data={sold}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={7}>
        <InputData
          onChange={handleRUPConsumed}
          onError={onError}
          min={0}
          step="1"
          data={RUP_consumed}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={8}>
        <InputData
          onChange={handlePower}
          onError={onError}
          min={0}
          step="1"
          data={power}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={9}>
        <Space align="center">
          <Checkbox onChange={handlePlus} checked={plus} />
          <PlusOutlined />
        </Space>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={10}>
        <InputData
          onChange={handleGkal}
          onError={onError}
          min={0}
          step="1"
          data={gkal}
        />
      </Table.Summary.Cell>
      <Table.Summary.Cell index={11}>
        <Button
          type="primary"
          onClick={onSubmit}
          disabled={isError || resultAdding === RESULT.loading}
        >
          {resultAdding === RESULT.loading ? (
            <LoadingOutlined />
          ) : (
            <PlusOutlined />
          )}
        </Button>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default AddDataLine;
