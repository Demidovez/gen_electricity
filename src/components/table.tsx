import { Button, Input, Table } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { FormInstance } from "antd/lib/form";
import { Form } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  ColumnTypes,
  EditableCellProps,
  EditableRowProps,
  IData,
  TColumn,
} from "../types/types";
// import EditableCell from "./editable_cell";
// import EditableRow from "./editable_row";
import Loading from "./loading";
import React from "react";
import { updateDayAction } from "../redux/actions/creators/yearsActionCreators";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const columns: TColumn[] = [
  {
    title: "Дата/Месяц/Год",
    dataIndex: "date",
    key: "date",
    width: 150,
    editable: true,
  },
  {
    title: "Выработка целлюлозы, тонн.",
    dataIndex: "production",
    key: "production",
    width: 150,
    editable: true,
  },
  {
    title: "Прямое потребление",
    editable: true,
    children: [
      {
        title: "Всего, тыс. кВтч",
        dataIndex: "total_consumed",
        key: "total_consumed",
        editable: true,
      },
      {
        title: "в том числе ЗБЦ, тыс. кВтч",
        dataIndex: "ZBC_consumed",
        key: "ZBC_consumed",
        editable: true,
      },
    ],
  },

  {
    title: "Выработка электроэнергии, тыс. кВтч",
    dataIndex: "generation",
    key: "generation",
    width: 150,
    editable: true,
  },
  {
    title: "% от общего потребления",
    dataIndex: "procentage",
    key: "procentage",
    width: 150,
    editable: false,
  },
  {
    title: "Продано, тыс. кВтч",
    dataIndex: "sold",
    key: "sold",
    editable: true,
  },
  {
    title: 'Потреблено от РУП "Гомельэнерго"',
    editable: true,
    children: [
      {
        title: "тыс. кВтч",
        dataIndex: "RUP_consumed",
        key: "RUP_consumed",
        width: 90,
        editable: true,
      },
      {
        title: "Мощность, МВт",
        dataIndex: "power",
        key: "power",
        colSpan: 2,
        editable: true,
      },
      {
        title: "",
        dataIndex: "plus",
        key: "plus",
        colSpan: 0,
        editable: true,
      },
      {
        title: "Гкал",
        dataIndex: "gkal",
        key: "gkal",
        width: 70,
        editable: true,
      },
    ],
  },
  {
    title: "",
    dataIndex: "operation",
    key: "operation",
    colSpan: 0,
    editable: false,
    align: "left" as "left",
    render: () => (
      <Button type="link" className="button_delete">
        Удалить
      </Button>
    ),
  },
];

const TableData = () => {
  const dispatch = useAppDispatch();

  const { years, isLoadingYear, isLoadingYears } = useAppSelector(
    (state) => state.years
  );

  const [dataSource, setDataSource] = useState<IData[]>([]);

  useEffect(() => {
    setDataSource(years);
  }, [years]);

  const handleDelete = (key: React.Key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleSave = (row: IData) => {
    const newData = dataSource.map((year) => ({
      ...year,
      children: year.children?.map((kvartal) => ({
        ...kvartal,
        children: kvartal.children?.map((month) => ({
          ...month,
          children: month.children?.map((day) => {
            if (day.key === row.key) {
              return {
                ...day,
                ...row,
              };
            } else {
              return day;
            }
          }),
        })),
      })),
    }));

    dispatch(updateDayAction(row));

    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const mapColumnsOfTable = (col: TColumn) => {
    if (!col.editable) {
      return col;
    }

    const newCol = {
      ...col,
      onCell: (record: IData) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };

    if (col.children) {
      newCol.children = col.children.map(mapColumnsOfTable);
    }

    return newCol;
  };

  const columnsList = columns.map(mapColumnsOfTable);

  return (
    <div className="table_days">
      {isLoadingYears ? (
        <Loading />
      ) : (
        <Table
          columns={columnsList as ColumnTypes}
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          bordered
          size="small"
          pagination={false}
        />
      )}
    </div>
  );
};

export default TableData;
