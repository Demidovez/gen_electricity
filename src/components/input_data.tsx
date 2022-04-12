import { InputNumber } from "antd";
import { useEffect, useState } from "react";

interface IProps {
  onChange: (value: number) => void;
  onError: (isError: boolean) => void;
  min: number;
  max?: number;
  step: string;
  data: number;
  readOnly?: boolean;
}

const InputData = ({
  onChange,
  onError,
  min,
  step,
  data,
  max = 99999999,
  readOnly = false,
}: IProps) => {
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState(data.toString());

  useEffect(() => {
    setValue(data.toString());
  }, [data]);

  const isCorrect = (value: string): boolean => {
    if (min < 0 && value === "-") {
      return true;
    } else if (min >= 0 && value !== "-" && isNaN(parseFloat(value))) {
      return false;
    } else if (isNaN(parseFloat(value)) || isNaN(+value)) {
      return false;
    } else if (parseFloat(value) < min || parseFloat(value) > max) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (isCorrect(value)) {
      onChange(parseFloat(value));
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [value]);

  useEffect(() => {
    onError(isError);
  }, [isError]);

  const onBlur = () => {
    if (isCorrect(parseFloat(value).toString())) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const onStep = (value: number) => {
    setValue(value.toString());
  };

  return (
    <InputNumber
      onInput={setValue}
      onStep={onStep}
      onBlur={onBlur}
      value={parseFloat(value)}
      status={isError ? "error" : ""}
      min={min}
      style={{ color: isError ? "red" : "inherit" }}
      step={step}
      className="full_width"
      disabled={readOnly}
      readOnly={readOnly}
    />
  );
};

export default InputData;
