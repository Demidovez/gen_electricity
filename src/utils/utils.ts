export const getKvartalNumber = (month: number): number => {
  return Math.ceil(month / 3);
};

export const summa = (a: number, b: number): number => {
  return Number((a + b).toFixed(2));
};

export const getApiUrl = (): string => {
  let api_url = "";

  if (process.env.NODE_ENV === "development") {
    api_url = "http://localhost:5011";
  } else {
    api_url = window.location.href + "api";
  }

  return api_url;
};
