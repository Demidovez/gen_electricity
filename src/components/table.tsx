import { Popconfirm, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { Form } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ColumnTypes, IData } from "../types/types";
import Loading from "./loading";
import React from "react";
import {
  fetchYearAction,
  updateDayAction,
} from "../redux/actions/creators/yearsActionCreators";
import EditableCell from "./editable_cell";
import AddDataLine from "./add_data_line";
import {
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const TableData = () => {
  const dispatch = useAppDispatch();

  const { years, isLoadingYear, isLoadingYears } = useAppSelector(
    (state) => state.years
  );

  const [form] = Form.useForm();
  const [data, setData] = useState<IData[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    setData(years);
  }, [years]);

  useEffect(() => {
    if (years.length > 0) {
      const lastYear = years[years.length - 1];
      const lastKvartal = lastYear.children?.[lastYear.children?.length - 1];
      const lastMonth =
        lastKvartal?.children?.[lastKvartal?.children?.length - 1];

      setExpandedRowKeys([
        lastYear.key,
        lastKvartal?.key || "",
        lastMonth?.key || "",
      ]);
    }
  }, [years]);

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
      // colSpan: 0,
      editable: false,
      align: "left" as "left",
      render: (_: any, record: IData) => {
        const editable = isEditing(record);

        if (!record.key.includes("day_")) return null;

        return editable ? (
          <Space size="small">
            <Typography.Link onClick={() => save(record.key)}>
              <SaveOutlined
                style={{ fontSize: "20px", verticalAlign: "middle" }}
              />
            </Typography.Link>
            <Popconfirm
              title="Вы уверены?"
              onConfirm={cancel}
              okText="Да"
              cancelText="Отмена"
            >
              <a>
                <CloseCircleOutlined
                  style={{
                    fontSize: "20px",
                    color: "#eb2f96",
                    verticalAlign: "middle",
                  }}
                />
              </a>
            </Popconfirm>
          </Space>
        ) : (
          editingKey === "" && (
            <Space size="small">
              <Typography.Link onClick={() => edit(record)}>
                <EditOutlined
                  style={{ fontSize: "20px", verticalAlign: "middle" }}
                />
              </Typography.Link>

              <Popconfirm
                title="Вы уверены?"
                onConfirm={cancel}
                okText="Да"
                cancelText="Отмена"
              >
                <DeleteOutlined
                  style={{
                    fontSize: "20px",
                    color: "#eb2f96",
                    verticalAlign: "middle",
                  }}
                />
              </Popconfirm>
            </Space>
          )
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

  const onTableRowExpand = (expanded: boolean, record: IData) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.key]);

      if (record.children?.length === 0) {
        // dispatch(fetchDataAction(record.))
        console.log(record);
      }
    } else {
      setExpandedRowKeys(
        expandedRowKeys.filter((key) => key.indexOf(record.key) === -1)
      );
    }
  };

  return (
    <div className="table_days">
      {isLoadingYears ? (
        <Loading />
      ) : (
        <Form form={form} component={false}>
          <Table
            columns={columnsList}
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
              expandedRowKeys: expandedRowKeys,
            }}
            summary={() => <AddDataLine />}
            onExpand={onTableRowExpand}
          />
        </Form>
      )}
    </div>
  );
};

export default TableData;
