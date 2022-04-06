import {
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { TypeTR } from "../types/types";
import InputData from "./input_data";

const EditDataLine = (props: TypeTR) => {
  const [isUpdatingDay, resultUpdating] = useAppSelector((state) => [
    state.years.isUpdatingDay,
    state.years.resultUpdating,
  ]);

  const [isError, setIsError] = useState(false);

  const [date] = useState(props.date);
  const [production, setProduction] = useState(props.production);
  const [total_consumed, setTotalConsumed] = useState(props.total_consumed);
  const [ZBC_consumed, setZBCConsumed] = useState(props.ZBC_consumed);
  const [generation, setGeneration] = useState(props.generation);
  const [procentage, setProcentage] = useState(props.procentage);
  const [sold, setSold] = useState(props.sold);
  const [RUP_consumed, setRUPConsumed] = useState(props.RUP_consumed);
  const [power, setPower] = useState(props.power);
  const [plus, setPlus] = useState(props.plus);
  const [gkal, setGkal] = useState(props.gkal);

  useEffect(() => {
    total_consumed > 0 &&
      setProcentage(
        +parseFloat("" + (generation / total_consumed) * 100).toFixed(2)
      );
  }, [total_consumed, generation]);

  useEffect(() => {
    resultUpdating && message.error(resultUpdating);
  }, [resultUpdating]);

  const onSubmit = () => {
    props.onUpdate?.(props.lineKey, {
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
    });
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
    <>
      <td>{props.shortdate}</td>
      <td>
        <InputData
          onChange={handleProduction}
          onError={onError}
          min={0}
          step="1"
          data={production}
        />
      </td>
      <td>
        <InputData
          onChange={handleTotalConsumed}
          onError={onError}
          min={0}
          step="1"
          data={total_consumed}
        />
      </td>
      <td>
        <InputData
          onChange={handleZBCConsumed}
          onError={onError}
          min={0}
          step="1"
          data={ZBC_consumed}
        />
      </td>
      <td>
        <InputData
          onChange={handleGeneration}
          onError={onError}
          min={0}
          step="1"
          data={generation}
        />
      </td>
      <td>
        <Input value={procentage} readOnly={true} disabled={true} suffix="%" />
      </td>
      <td>
        <InputData
          onChange={handleSold}
          onError={onError}
          min={0}
          step="1"
          data={sold}
        />
      </td>
      <td>
        <InputData
          onChange={handleRUPConsumed}
          onError={onError}
          min={0}
          step="1"
          data={RUP_consumed}
        />
      </td>
      <td>
        {power && (
          <InputData
            onChange={handlePower}
            onError={onError}
            min={0}
            step="1"
            data={power}
          />
        )}
      </td>
      <td>
        <Space align="center">
          <Checkbox onChange={handlePlus} checked={plus} />
          <PlusOutlined />
        </Space>
      </td>
      <td>
        <InputData
          onChange={handleGkal}
          onError={onError}
          min={0}
          step="1"
          data={gkal}
        />
      </td>
      <td>
        {isUpdatingDay ? (
          <LoadingOutlined style={{ fontSize: "20px" }} />
        ) : (
          <Space size="small">
            <Typography.Link onClick={onSubmit} disabled={isError}>
              <SaveOutlined
                style={{ fontSize: "20px", verticalAlign: "middle" }}
              />
            </Typography.Link>
            <Popconfirm
              title="Вы уверены?"
              onConfirm={props.onCancel}
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
        )}
      </td>
    </>
  );
};

export default EditDataLine;
