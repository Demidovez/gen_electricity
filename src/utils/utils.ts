export const getKvartalNumber = (month: number): number => {
  return Math.ceil(month / 3);
};

export const summa = (a: number, b: number): number => {
  return Number((a + b).toFixed(2));
};

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
