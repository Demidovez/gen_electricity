import { Spinner } from "react-bootstrap";

const LoadingBody = () => {
  return (
    <div className="loading_body">
      <Spinner animation="border" variant="secondary" />
    </div>
  );
};

export default LoadingBody;
