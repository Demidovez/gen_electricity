import { Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { Form } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ColumnTypes, IData } from "../types/types";
import Loading from "./loading";
import React from "react";
import { updateDayAction } from "../redux/actions/creators/yearsActionCreators";
import EditableCell from "./editable_cell";
import AddDataLine from "./add_data_line";

const TableData = () => {
  const dispatch = useAppDispatch();

  const { years, isLoadingYear, isLoadingYears } = useAppSelector(
    (state) => state.years
  );

  const [form] = Form.useForm();
  const [data, setData] = useState<IData[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [defaultExpandedRowKeys, setDefaultExpandedRowKeys] = useState<
    string[]
  >([]);

  useEffect(() => {
    setData(years);
  }, [years]);

  useEffect(() => {
    if (years.length > 0 && defaultExpandedRowKeys.length == 0) {
      const lastYear = years[years.length - 1];
      const lastKvartal = lastYear.children?.[lastYear.children?.length - 1];
      const lastMonth =
        lastKvartal?.children?.[lastKvartal?.children?.length - 1];

      console.log([lastYear.key, lastKvartal?.key || "", lastMonth?.key || ""]);

      setDefaultExpandedRowKeys([
        lastYear.key,
        lastKvartal?.key || "",
        lastMonth?.key || "",
      ]);
    }
  }, [years, defaultExpandedRowKeys]);

  const isEditing = (record: IData) => record.key === editingKey;

  const edit = (record: Partial<IData> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IData;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.push(row);
        setData(newData);
      }

      setData(newData);
      setEditingKey("");

      dispatch(updateDayAction(row));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Дата/Месяц/Год",
      dataIndex: "date",
      key: "date",
      width: "12%",
      editable: true,
    },
    {
      title: "Выработка целлюлозы, тонн.",
      dataIndex: "production",
      key: "production",
      width: "9%",
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
          width: "9%",
        },
        {
          title: "в том числе ЗБЦ, тыс. кВтч",
          dataIndex: "ZBC_consumed",
          key: "ZBC_consumed",
          editable: true,
          width: "9%",
        },
      ],
    },
    {
      title: "Выработка электроэнергии, тыс. кВтч",
      dataIndex: "generation",
      key: "generation",
      width: "9%",
      editable: true,
    },
    {
      title: "% от общего потребления",
      dataIndex: "procentage",
      key: "procentage",
      width: "9%",
      editable: false,
    },
    {
      title: "Продано, тыс. кВтч",
      dataIndex: "sold",
      key: "sold",
      editable: true,
      width: "9%",
    },
    {
      title: 'Потреблено от РУП "Гомельэнерго"',
      editable: true,
      children: [
        {
          title: "тыс. кВтч",
          dataIndex: "RUP_consumed",
          key: "RUP_consumed",
          width: "9%",
          editable: true,
        },
        {
          title: "Мощность, МВт",
          dataIndex: "power",
          key: "power",
          colSpan: 2,
          editable: true,
          width: "9%",
        },
        {
          title: "",
          dataIndex: "plus",
          key: "plus",
          colSpan: 0,
          editable: true,
          width: "5%",
        },
        {
          title: "Гкал",
          dataIndex: "gkal",
          key: "gkal",
          width: "9%",
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
      render: (_: any, record: IData) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mapColumnsOfTable = (col: any) => {
    if (!col.editable) {
      return col;
    }

    const newCol = {
      ...col,
      onCell: (record: IData) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
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
        <Form form={form} component={false}>
          {defaultExpandedRowKeys.length > 0 && (
            <Table
              columns={columnsList as ColumnTypes}
              rowClassName="editable-row"
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={data}
              bordered
              size="small"
              pagination={false}
              indentSize={0}
              expandable={{
                expandRowByClick: true,
                expandIcon: () => <></>,
                defaultExpandedRowKeys: defaultExpandedRowKeys,
              }}
              summary={() => <AddDataLine />}
            />
          )}
        </Form>
      )}
    </div>
  );
};

export default TableData;
