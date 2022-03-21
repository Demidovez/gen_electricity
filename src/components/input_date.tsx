import { DatePicker, Input } from "antd";
import moment from "moment";
import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";

interface IProps {
  value?: any;
  date?: string;
  style?: React.CSSProperties;
}

const InputDate = ({ date, style }: IProps) => {
  return (
    <DatePicker
      style={style}
      defaultValue={moment(date)}
      format="DD.MM.YYYY"
      locale={locale}
    />
  );
};

export default InputDate;
