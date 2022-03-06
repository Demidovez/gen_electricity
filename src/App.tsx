import "antd/dist/antd.css";
import "./style/style.css";
import TableData from "./components/table";
import Login from "./components/login";
import SaveToExcel from "./components/savetoexcel";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect } from "react";
import { fetchYearsAction } from "./redux/actions/creators/yearsActionCreators";
import { Col, Row } from "antd";

const App = () => {
  const dispatch = useAppDispatch();

  const isLoadingYears = useAppSelector((state) => state.years.isLoadingYears);

  useEffect(() => {
    dispatch(fetchYearsAction());
  }, [dispatch]);

  return (
    <div className="App">
      <Row justify="space-between">
        <Col flex="auto">
          <SaveToExcel isDisable={isLoadingYears} />
        </Col>
        <Col>
          <Login />
        </Col>
      </Row>
      <TableData />
    </div>
  );
};

export default App;
