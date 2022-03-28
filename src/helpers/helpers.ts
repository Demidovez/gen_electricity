export const getApiUrl = (): string => {
  const API_PORT = process.env.REACT_APP_API_PORT;

  let api_url = "";

  if (process.env.NODE_ENV === "development") {
    api_url = "http://localhost:9082";
  } else {
    api_url = "http://" + window.location.hostname + ":" + API_PORT;
  }

  return api_url;
};
