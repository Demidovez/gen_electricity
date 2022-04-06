import React from "react";
import { useEffect, useState } from "react";
import { TypeTR } from "../types/types";
import EditDataLine from "./edit_data_line";
import ReadDataLine from "./read_data_line";

const DataLine = (props: TypeTR) => {
  const [key, setKey] = useState<string>();

  useEffect(() => {
    setKey((props as any)["data-row-key"]);

    // console.log(props);
  }, [props]);

  const handleClick = () => {
    if (props.onExpand && key && !key.includes("day_")) {
      props.onExpand(key, props.year);
    }
  };

  return key ? (
    <tr data-row-key={key} className={props.className} onClick={handleClick}>
      {props.isEditedKey ? (
        <EditDataLine {...props} lineKey={key} />
      ) : (
        <ReadDataLine {...props} lineKey={key} />
      )}
    </tr>
  ) : (
    <></>
  );
};

export default React.memo(DataLine, (prevProps, nextProps) => {
  return (
    nextProps.isEditedKey === prevProps.isEditedKey &&
    nextProps.shortdate === prevProps.shortdate &&
    nextProps.production === prevProps.production &&
    nextProps.total_consumed === prevProps.total_consumed &&
    nextProps.ZBC_consumed === prevProps.ZBC_consumed &&
    nextProps.generation === prevProps.generation &&
    nextProps.procentage === prevProps.procentage &&
    nextProps.sold === prevProps.sold &&
    nextProps.RUP_consumed === prevProps.RUP_consumed &&
    nextProps.power === prevProps.power &&
    nextProps.plus === prevProps.plus &&
    nextProps.gkal === prevProps.gkal
  );
});
