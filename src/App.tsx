import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import TableData from "./components/table";
import Login from "./components/login";
import SaveToExcel from "./components/savetoexcel";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect } from "react";
import {
  fetchDaysAction,
  fetchYearsAction,
} from "./redux/actions/creators/daysActionCreators";

const App = () => {
  const dispatch = useAppDispatch();

  const isLoadingYears = useAppSelector((state) => state.days.isLoadingYears);

  useEffect(() => {
    dispatch(fetchYearsAction());
    dispatch(fetchDaysAction());
  }, [dispatch]);

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Stack direction="horizontal">
            <SaveToExcel isDisable={isLoadingYears} />
            <div className="ms-auto">
              <Login />
            </div>
          </Stack>
        </Row>
      </Container>
      <TableData />
    </div>
  );
};

export default App;
